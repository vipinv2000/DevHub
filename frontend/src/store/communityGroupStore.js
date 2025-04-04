import toast from 'react-hot-toast';
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { io } from "socket.io-client"; 

// Initialize socket
const socket = io("http://localhost:5001", {
  transports: ["websocket"],
});

export const CommunityGroupSidebarFunction = create((set, get) => ({
  communityGroup: [],
  communityMessages: null,
  slectedCommunityGroup: null,

  getCommunityGroup: async () => {
    try {
      const res = await axiosInstance.get('/comunity/communityGroup');
      console.log('res', res.data.CommunityGroup);
      set({ communityGroup: res.data?.CommunityGroup });
    } catch (error) {
      toast.error(error.message);
    }
  },

  setSelectedCommunityGroup: (slectedCommunityGroup) => {
    console.log("Selected commmmmm Group:", slectedCommunityGroup);
    set({ slectedCommunityGroup });

    // Subscribe to messages for the selected project group
    get().subscribeToProjectMessages();
  },

  getCommunitytMessages: async (projectId) => {
    try {
      if (!projectId) return;
      console.log('Fetching messages for projectId:', projectId);
      
      const res = await axiosInstance.get(`/comunity/getcommunityMessages/${projectId}`);
      set({ communityMessages: res.data?.joinedMessages|| [] });
      console.log('Messages received:', res.data?.joinedMessages);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch messages");
    }
  },

  SendCommunityMessage: async (MessageData) => {
    const { slectedCommunityGroup, communityMessages } = get();
    if (!slectedCommunityGroup) return;

    try {
      const res = await axiosInstance.post(
        `/comunity/sendCommunityMessage/${slectedCommunityGroup._id}`,
        MessageData
      );

      console.log("res.data res.data",res.data.data);
      

      set({ communityMessages: [...communityMessages, res.data?.data] });
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
  Submit_CodeFile_To_Woner : async (item)=>{
    
  }
}));
