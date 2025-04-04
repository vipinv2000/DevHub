import React, { useEffect } from 'react';
import { ProjectGroupSidebarFunction } from '../store/projectGroupStore.js';
import { Users } from 'lucide-react';

const ProjectGroupSidebar = () => {
  const { projectGroup, getProjectGroup, setSelectedProjectGroup, selectedProjectGroup } = ProjectGroupSidebarFunction();

  useEffect(() => {
    getProjectGroup();
  }, []);

  return (
    <div>
      <aside className="h-screen w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
        <div className="border-b border-base-300 w-full p-5 bg-gray-400 rounded-xl">
          <div className="flex items-center gap-2 ">
            <Users className="size-6 " />
            <span className="font-medium hidden lg:block">Groups</span>
          </div>
        </div>

        <div className="overflow-y-auto w-full py-3">
          {projectGroup.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedProjectGroup(user)}
              className={`
                w-full p-3 flex items-center gap-3
                hover:bg-base-300 transition-colors  border-b-2 border-gray-100 
                ${selectedProjectGroup?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
              `}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.image || "/avatar.png"}
                  alt={user.name}
                  className="size-12 object-cover border- rounded-full"
                />
              </div>

              <div className="hidden lg:block text-left min-w-0">
                <div className="font-medium truncate">{user.name}</div>
                <p className='text-xs italic text-slate-500'>founder  {user.owner.fullName}</p>
              </div>
            </button>
          ))}

{projectGroup.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No Groups </div>
        )}
      </div>
    </aside>
  </div>
)};

export default ProjectGroupSidebar;
