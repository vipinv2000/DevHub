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
            owner:userId,
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
        const ListOfComunityes = await Comunity.find({});

        const UpdatedCommunity = ListOfComunityes.map((comunity) => (
            {
                ...comunity.toObject(),
                alreadyIn : comunity.Members.some(user=>user.userId.toString === userId.toString())
            }
        ))
        console.log("OrgCommunit",UpdatedCommunity);
        
        return res.status(200).json({success:true,UpdatedCommunity})

    } catch (error) {
        console.error('Error in joinCommunity:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}