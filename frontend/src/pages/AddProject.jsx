import React, { useState } from 'react';

const AddProject = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    deadline: '',
    techStack: [],
  });
  return (
    <>
      <div>
        <div>
          <h1>Add Project</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Project Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={e =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">description</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <textarea
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white"
            rows="2"
            placeholder="Write a description (optional)..."
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
          />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProject;
