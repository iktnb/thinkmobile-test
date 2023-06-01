// Utilities
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    userList: [],

    createUserModalView: false,
  }),

  actions: {
    openCreateUserModal() {
      this.createUserModalView = true;
    },
    closeCreateUserModal() {
      this.createUserModalView = false;
    },
    async getAllUsers() {
      try {
        const response = await this.$api.get("/users");
        this.userList = response.data;
      } catch (error) {
        throw error;
      }
    },

    async createNewUser(payload) {
      try {
        const response = await this.$api.post("/users", payload);
        console.log(response);
        this.userList.push(response.data);
      } catch (error) {
        throw error;
      }
    },

    async createEvent(payload) {
      try {
        const response = await this.$api.post(
          `/users/${payload.userId}/events`,
          payload
        );

        return response;
      } catch (error) {
        alert(error.response.data.error);
        throw error;
      }
    },

    async getEvents(payload) {
      try {
        const response = await this.$api.get(`/users/${payload}/events`);

        return response.data;
      } catch (error) {
        alert(error.response.data.error);
        throw error;
      }
    },
  },
});
