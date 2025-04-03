import mongoose from "mongoose";

const projectMessageSchema = new mongoose.Schema(
    {
        groupId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        messages: [
            {
                senderId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                text: {
                    type: String,
                },
                image: {
                    type: String,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
                isOwner: {
                    type: Boolean,
                    default: false
                }
            },
        ],
    },
    { timestamps: true }
);

const ProjectMessage = mongoose.model("ProjectMessage", projectMessageSchema);

export default ProjectMessage;
