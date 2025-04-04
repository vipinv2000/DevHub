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
    image: {
      type: String,
      default: '',
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
          isRejected: {
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
          isOwner: {
            type: Boolean,
            default: false
          },
          moduleSubmissions: {
            type: [
              {
                title: {
                  type: String,
                  required: true,
                  trim: true
                },
                description: {
                  type: String,
                  trim: true
                },
                githubLink: {
                  type: String,
                  trim: true
                },
                filePath: {
                  type: String,
                  trim: true
                },
                files: [
                  {
                    filename: { type: String, required: true },
                    path: { type: String, required: true },
                    mimetype: { type: String, required: true },
                    size: { type: Number, required: true },
                    uploadedAt: { type: Date, default: Date.now }
                  }
                ],
                completionPercentage: {
                  type: Number,
                  required: true,
                  min: 0,
                  max: 100,
                  default: 0
                },
                submittedAt: {
                  type: Date,
                  default: Date.now
                },
                comments: [
                  {
                    content: { type: String, required: true, trim: true },
                    createdAt: { type: Date, default: Date.now }
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
