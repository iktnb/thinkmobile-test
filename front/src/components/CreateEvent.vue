<template>
  <div class="mt-3">
    <v-row class="ms-4 mt-4"
      ><input placeholder="Title" v-model="title" required />

      <input placeholder="description" v-model="description" required />

      <input type="datetime-local" placeholder="End date" v-model="startDate" />

      <input type="datetime-local" v-model="endDate" />

      <v-btn color="ms-4" size="x-large" @click="newEvent($route.params.userId)"
        >Create event</v-btn
      ></v-row
    >
  </div>
</template>

<script setup>
import { useAppStore } from "@/store/app";
import { ref } from "vue";
import { useRoute } from "vue-router";
const title = ref("");
const description = ref("");
const startDate = ref(null);
const endDate = ref(null);
const route = useRoute();

const emit = defineEmits(["eventCreated"]);

async function newEvent(userId) {
  const appStore = useAppStore();

  const payload = {
    title: title.value,
    description: description.value,
    startDate: startDate.value,
    endDate: endDate.value,
    userId,
  };
  await appStore.createEvent(payload);
  emit("eventCreated");
  clearInputs();
}

function clearInputs() {
  title.value = "";
  description.value = "";
  startDate.value = null;
  endDate.value = null;
}
</script>
