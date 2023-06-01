// Utilities
import { setAuthToken } from "@/services/ApiService";
import { defineStore } from "pinia";

import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", {
  actions: {
    async login({ login, password }) {
      console.log(this);
      try {
        const response = await this.$api.post("/login", {
          username: login,
          password,
        });
        window.localStorage.setItem("token", response.data.token);
        setAuthToken(response.data.token);
        return response.data;
      } catch (error) {
        alert(error.response.data.error);

        return false;
      }
    },
  },
});
