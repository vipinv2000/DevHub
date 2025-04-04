import mongoose from "mongoose";
import { type } from "os";

const comunitySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Project name is required'],
            trim: true
        },
        description: {
            type: String,
            required: [true, 'Project description is required'],
            trim: true
        },
        image: {
            type: String,
            default: '',
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },
        Members: {
            type: [
                {
                    userId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User",
                        required: true,
                        index: true
                    },
                    isOwner: {
                        type: Boolean,
                        default: false
                    }
                }
            ],
            default: []
        },
        messages: {
            type: [
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
            default: []
        },
        posts: {
            type: [
                {
                    senderId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User",
                        required: true,
                    },
                    name: {
                        type: String,
                    },
                    image: {
                        type: String,
                    },
                    createdAt: {
                        type: Date,
                        default: Date.now,
                    },
                    description: {
                        type: String,
                        default: false
                    },
                    link: {
                        type: String,
                        default: false
                    },
                    isPost: {
                        type: Boolean,
                        default: true
                    }
                },
            ],
            default: []
        }
    },
    { timestamps: true }
);

const Comunity = mongoose.model("Comunity", comunitySchema);

export default Comunity;
