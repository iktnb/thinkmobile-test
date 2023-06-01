<template>
  <v-app>
    <v-toolbar :elevation="8" title="Users">
      <v-btn
        @click="openCreateUserModal"
        variant="outlined"
        prepend-icon="mdi-plus"
        size="x-large"
      >
        Create user
      </v-btn>
    </v-toolbar>
    <default-view />
  </v-app>
</template>

<script setup>
import { useAppStore } from "@/store/app";
import DefaultView from "./View.vue";

function openCreateUserModal() {
  const appStore = useAppStore();
  appStore.openCreateUserModal();
}
</script>
