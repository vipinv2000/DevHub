import toast from 'react-hot-toast';
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
export const ProjectGroupSidebarFunction = create(set => ({
  projectGroup: [],
  projectMessages: null,
  getProjectGroup: async () => {
    try {
      const res = await axiosInstance.get('/projectMessage/projectGroup');
      console.log('res', res.data.ProjectGroup);

      set({ projectGroup: res.data?.ProjectGroup });
    } catch (error) {
      // toast.error(error.message);
      toast.error(error.message);
    }
  },
  setSelectedProgectGroup: selectedProjectGroup => {
    console.log(selectedProjectGroup);
    set({ selectedProjectGroup });
  },
  getProjectMessages: async projectId => {
    try {
      console.log('projectId', projectId);

      const res = await axiosInstance.get(
        `/projectMessage/getProjectMessages/${projectId}`
      );
      set({ projectMessages: res.data?.chat });
      console.log('mmmmmmmmmm', res.data.chat);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  SendProjectGroupMessage: async MessageData => {
    const { selectedProjectGroup, projectMessages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedProjectGroup._id}`,
        MessageData
      );
      set({ messages: [...projectMessages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));
