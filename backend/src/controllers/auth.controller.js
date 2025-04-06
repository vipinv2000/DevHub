import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";
import transporter from '../lib/nodeMailer.js';
import { EMAIL_VERIFY_TEMPLATE } from '../../utils/MailTemplate.js';

export const signup = async (req, res) => {
  const { fullName, email, password, field } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Parse 'field' only if necessary
    let parsedField = field;
    if (typeof field === "string") {
      try {
        parsedField = JSON.parse(field);
      } catch (error) {
        return res.status(400).json({ message: "Invalid field format. Must be a valid JSON array." });
      }
    }

    // Validate 'field'
    if (!Array.isArray(parsedField) || parsedField.length === 0) {
      return res.status(400).json({ message: "Must mention at least one field." });
    }

    console.log("Field:", parsedField);
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      field: parsedField, // Store parsed field in database
      isRegister: true,
      otp: otp
    });

    if (newUser) {
      // Generate JWT token
      generateToken(newUser._id, res);
      await newUser.save();

    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Hello Welcomt to DevHub",
      // text: "MERN Email Authentication confirm",
      html: EMAIL_VERIFY_TEMPLATE(otp, fullName)
    };

    try {
      const info = await transporter.sendMail(mailOption);
      console.log('✅ Email sent: ', info.response);
    } catch (error) {
      console.error('❌ Email sending error:', error);
      return { success: false, message: 'Failed to send email', error };
    }

    return res.status(201).json({
      _id: newUser._id,

      message: `OTP send to ${newUser.email}. Please check`
    });


  } catch (error) {
    console.log("Error in signup controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email,isOTPVerifyed:true });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    console.log(req.body);

    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const VerifyOtp = async (req, res) => {
  try {
    const { userId } = req.params;
    const { otp } = req.body;
    const founedUser = await User.findOne({_id:userId,isOTPVerifyed:false,isRegister:true});

    if (!founedUser) {
      return res.status(404).json({ success: false, message: "User Not Found" });
    }

    if (founedUser.isRegister === true && founedUser.isOTPVerifyed === false && founedUser.otp.toString() === otp.toString()) {
      founedUser.isOTPVerifyed = true;
      await founedUser.save()
      return res.status(200).json({
        success: true,
        _id: founedUser._id,
        fullName: founedUser.fullName,
        email: founedUser.email,
        profilePic: founedUser.profilePic,
        message: "otp verification success"
      })
    } else {
      return res.status(400).json({
        success: false,
        message: "OTP verification failed"
      })
    }
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
