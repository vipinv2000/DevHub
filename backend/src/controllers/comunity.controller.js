import cloudinary from "../lib/cloudinary.js";
import Comunity from "../models/comunity.model.js";

export const createCommunity = async (req, res) => {
    try {
        const userId = req.user._id;
        const { name, description, image } = req.body;
        let imageUrl = '';

        if (image) {
            try {
                const uploadResponse = await cloudinary.uploader.upload(image);
                imageUrl = uploadResponse.secure_url;
            } catch (uploadError) {
                console.error('Cloudinary upload error:', uploadError.message);
                return res.status(400).json({ error: 'Image upload failed' });
            }
        }

        const community = new Comunity({
            name,
            description,
            image: imageUrl,
            owner: userId,
            Members: [{
                userId: userId,
                isOwner: true  // Ensure your schema includes this field.
            }]
        });

        await community.save();
        return res.status(201).json({ success: true, message: "Community Created Successfully" });
    } catch (error) {
        console.error('Error in createCommunity: ', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const joinCommunity = async (req, res) => {
    try {
        const userId = req.user._id;
        const { comunityId } = req.params;

        const communityDetails = await Comunity.findById(comunityId);
        if (!communityDetails) {
            return res.status(404).json({ success: false, message: "Community Not Found" });
        }

        const isMemberAlreadyIn = communityDetails.Members.some(
            (member) => member.userId.toString() === userId.toString()
        );
        if (isMemberAlreadyIn) {
            return res.status(400).json({ success: false, message: "You are already part of this community" });
        }

        communityDetails.Members.push({
            userId,
            isOwner: false,
        });

        await communityDetails.save();
        return res.status(201).json({ success: true, message: "You have joined the community successfully" });

    } catch (error) {
        console.error('Error in joinCommunity:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const listComunity = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log("uuuuuu",userId);
        
        const ListOfComunityes = await Comunity.find({}).populate('owner',"-password -profilePic")
       

        const UpdatedCommunity = ListOfComunityes.map((comunity) => (
            {
                ...comunity.toObject(),
                alreadyIn: comunity.Members.some(user => user.userId.toString() === userId.toString())
            }
        ))
     

        return res.status(200).json({ success: true, UpdatedCommunity })

    } catch (error) {
        console.error('Error in joinCommunity:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const communityGroupForSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        console.log("loggedInUserId", loggedInUserId);

        const CommunityGroup = await Comunity.find({
            "Members": {
                $elemMatch: {
                    userId: loggedInUserId,
                }
            }
        }).select('-messages -posts -Members').populate("owner", "_id email fullName profilePic")

        res.status(200).json({ success: true, CommunityGroup });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const sendCommunityMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { cumId } = req.params;
        const senderId = req.user._id;

        const senderUser = await User.findOne({ _id: senderId }).select("_id fullName profilePic");
        const CumDetails = await Comunity.findById(cumId);
        if (!CumDetails) {
            return res.status(404).json({ success: false, message: "Community Not Found!" });
        }

        const MembersIndex = CumDetails.Members.findIndex(dev => dev.userId.toString() === senderId.toString());
        if (MembersIndex === -1) {
            return res.status(403).json({ success: false, message: "You're not a part of this Community!" });
        }

        let imageUrl = null;
        if (image) {
            try {
                const uploadResponse = await cloudinary.uploader.upload(image);
                imageUrl = uploadResponse.secure_url;
            } catch (uploadError) {
                console.error("Cloudinary upload error:", uploadError);
                return res.status(500).json({ success: false, message: "Image upload failed!" });
            }
        }

// .................................................................................................................

        const groupList = await ProjectMessage.findOne({ groupId: projectId });
        let sendingMessage = {
            senderId: senderId,
            text,
            image: imageUrl,
            createdAt: new Date(),
            isOwner: projectDetails.owner.toString() === senderId.toString()
        };

        if (groupList) {
            groupList.messages.push(sendingMessage);xc 

            
            await groupList.save();
        } else {
            const newProjectMessage = new ProjectMessage({
                groupId: projectId,
                messages: [sendingMessage]
            });
            await newProjectMessage.save();
        }

        sendingMessage = {
            senderId: senderUser,
            text,
            image: imageUrl,
            createdAt: new Date(),
            isOwner: projectDetails.owner.toString() === senderId.toString()
        }

        const receiverSocketId = getReceiverSocketId(projectId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', sendingMessage);
        }

        res.status(201).json({ success: true, message: "Message sent successfully!", data: sendingMessage });
    } catch (error) {
        console.error('Error in sendProjectMessage controller:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}