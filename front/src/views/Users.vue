<template>
  <div>
    <UserList :userList="userList" />

    <CreateUser ref="CreateUserModal" />
  </div>
</template>

<script setup>
import UserList from "@/components/UserList.vue";
import CreateUser from "@/components/CreateUser.vue";
import { useAppStore } from "@/store/app";
import { computed, onMounted, reactive, ref } from "vue";

const CreateUserModal = ref(null);

function openCreateUserModal() {
  CreateUserModal.value.openDialog();
}

const userList = computed(() => {
  const appStore = useAppStore();
  return appStore.userList;
});

onMounted(async () => {
  const appStore = useAppStore();

  appStore.getAllUsers();
});
</script>
