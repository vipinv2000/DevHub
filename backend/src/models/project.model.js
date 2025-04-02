import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
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
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true  // Improves query performance
    },
    status: {
      type: String,
      enum: ['Planning', 'In Progress', 'Completed', 'On Hold'],
      default: 'Planning'
    },
    deadline: {
      type: Date,
      required: [true, 'Project deadline is required']
    },
    techStack: {
        type: [String], // Array of strings
        default: [] // Ensures an empty array if no tech stack is provided
      },
      

    interestedDev: {
      type: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
          },
          DateTime: {
            type: Date,
            default: () => new Date()
          },
          isRejected:{
            type: Boolean,
            default: false
          }
        }
      ],
      default: []
    },

    contributors: {  // Corrected spelling
      type: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
          },
          DateTime: {
            type: Date,
            default: () => new Date()
          },
          moduleSubmissions: {
            type: [
              {
                title: {
                  type: String,
                  required: true
                },
                description: {
                  type: String,
                  trim: true
                },
                githubLink: {
                  type: String,
                  trim: true
                },
                files: [
                  {
                    filename: String,
                    path: String,
                    mimetype: String,
                    size: Number,
                    uploadedAt: {
                      type: Date,
                      default: () => new Date()
                    }
                  }
                ],
                completionPercentage: {
                  type: Number,
                  required: true,
                  min: 0,
                  max: 100
                },
                submittedAt: {
                  type: Date,
                  default: () => new Date()
                },
                comments: [
                  {
                    content: String,
                    createdAt: {
                      type: Date,
                      default: () => new Date()
                    }
                  }
                ]
              }
            ],
            default: []
          }
        }
      ],
      default: []
    }
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
