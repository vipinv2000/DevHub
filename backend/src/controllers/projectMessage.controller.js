import Project from "../models/project.model.js";
import ProjectMessage from "../models/projectMessage.model.js";

import { getReceiverSocketId, io } from '../lib/socket.js';
import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js";
import fs from "fs";
import path from "path";

export const getGroupsForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        console.log("loggedInUserId", loggedInUserId);

        const ProjectGroup = await Project.find({
            "contributors": {
                $elemMatch: {
                    userId: loggedInUserId,
                }
            }
        }).select('-interestedDev').populate("owner", "-field -password -profilePic -action")

        res.status(200).json({ success: true, ProjectGroup });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const sendProjectMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { projectId } = req.params;
        const senderId = req.user._id;

        const senderUser = await User.findOne({ _id: senderId }).select("_id fullName profilePic");
        const projectDetails = await Project.findById(projectId);
        if (!projectDetails) {
            return res.status(404).json({ success: false, message: "Project Group Not Found!" });
        }

        const contributorIndex = projectDetails.contributors.findIndex(dev => dev.userId.toString() === senderId.toString());
        if (contributorIndex === -1) {
            return res.status(403).json({ success: false, message: "You're not a part of this project!" });
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

        const groupList = await ProjectMessage.findOne({ groupId: projectId });
        let sendingMessage = {
            senderId: senderId,
            text,
            image: imageUrl,
            createdAt: new Date(),
            isOwner: projectDetails.owner.toString() === senderId.toString()
        };

        if (groupList) {
            groupList.messages.push(sendingMessage);
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
};

export const getProjectMessages = async (req, res) => {
    try {
        console.log("pId", req.params);

        const userId = req.user._id;
        const { projectId } = req.params;

        const project = await Project.findById(projectId);
        console.log(project);

        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }

        const isUserIncluded = project.contributors.some(dev => dev.userId.toString() === userId.toString());
        if (!isUserIncluded) {
            return res.status(403).json({ success: false, message: "You are not authorized to read messages" });
        }

        const chat = await ProjectMessage.findOne({ groupId: projectId })
            .populate("messages.senderId", "fullName email profilePic");

        console.log("Fetched messages:", chat);

        if (!chat || (chat?.messages && chat?.messages.length === 0)) {
            return res.status(200).json({ success: true, "chat.messages": [] });
            //return res.status(401).json({ success: false, message:"There Is No Group Exist" });
        }

        res.status(200).json({ success: true, chat });

    } catch (error) {
        console.error("Error in getProjectMessages controller:", error.message);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

import { fileURLToPath } from "url";
// Fix for `__dirname`
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const CodeSubmission = async (req, res) => {
    try {
        const userId = req.user._id; // Get user ID from authenticated request
        const { projectId } = req.params;
        const { title, githubLink, description } = req.body;
        const zipFile = req.files?.zipFile; // express-fileupload handles file uploads as req.files

        if (!title || !githubLink || !description) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Find the project
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not Found" });
        }

        // Find contributor
        const contributor = project.contributors.find(contrib => contrib.userId.toString() === userId.toString());
        if (!contributor) {
            return res.status(403).json({ success: false, message: "User is not a contributor" });
        }

        // Handle File Storage (Saving to 'uploads/' directory)
        let zipFilePath = "";
        if (zipFile) {
            const uploadDir = path.join(__dirname, "..", "uploads", projectId); // Store in `uploads/projectId/`
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            zipFilePath = path.join(uploadDir, zipFile.name);

            // Move the file to the server storage
            await zipFile.mv(zipFilePath);
        }

        // Create module submission
        const moduleSubmission = {
            title,
            githubLink,
            description,
            zipFile: zipFilePath, // Store file path
            submittedAt: new Date(),
        };

        // Push submission into contributor's moduleSubmissions
        contributor.moduleSubmissions.push(moduleSubmission);

        // Save updated project
        await project.save();

        // Respond with success
        res.status(200).json({
            success: true,
            message: "Module submitted successfully",
            moduleSubmission,
        });

    } catch (error) {
        console.error("Error in CodeSubmission controller:", error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};
