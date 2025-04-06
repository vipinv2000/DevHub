import toast from 'react-hot-toast';
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { io } from "socket.io-client"; 

// Initialize socket
const socket = io("http://localhost:5001", {
  transports: ["websocket"],
});

export const ProjectGroupSidebarFunction = create((set, get) => ({
  projectGroup: [],
  projectMessages: null,
  selectedProjectGroup: null,

  getProjectGroup: async () => {
    try {
      const res = await axiosInstance.get('/projectMessage/projectGroup');
      console.log('res', res.data.ProjectGroup);
      set({ projectGroup: res.data?.ProjectGroup });
    } catch (error) {
      toast.error(error.message);
    }
  },

  setSelectedProjectGroup: (selectedProjectGroup) => {
    console.log("Selected Project Group:", selectedProjectGroup);
    set({ selectedProjectGroup });

    // Subscribe to messages for the selected project group
    get().subscribeToProjectMessages();
  },

  getProjectMessages: async (projectId) => {
    try {
      if (!projectId) return;
      console.log('Fetching messages for projectId:', projectId);
      
      const res = await axiosInstance.get(`/projectMessage/getProjectMessages/${projectId}`);
      set({ projectMessages: res.data?.chat?.messages || [] });
      console.log('Messages received:', res.data.chat);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch messages");
    }
  },

  SendProjectGroupMessage: async (MessageData) => {
    const { selectedProjectGroup, projectMessages } = get();
    if (!selectedProjectGroup) return;

    try {
      const res = await axiosInstance.post(
        `/projectMessage/sendProjectMessage/${selectedProjectGroup._id}`,
        MessageData
      );

      console.log("res.data res.data",res.data.data);
      

      set({ projectMessages: [...projectMessages, res.data?.data] });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  subscribeToProjectMessages: () => {
    const { selectedProjectGroup } = get();
    if (!selectedProjectGroup) return;

    socket.on("newMessage", (newMessage) => {
      console.log("newMessage newMessage newMessage",newMessage);
      
      set({ projectMessages: [...get().projectMessages, newMessage] });
    });
  },

  unsubscribeFromProjectMessages: () => {
    socket.off("newMessage");
  },
  Submit_CodeFile_To_Owner : async (item)=>{
    
  }
}));
