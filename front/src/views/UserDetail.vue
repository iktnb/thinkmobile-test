<template>
  <div class="pt-2">
    <v-btn @click="$router.push('/')" prepend-icon="mdi-keyboard-backspace"
      >Back</v-btn
    >
    <EventList :eventsList="eventList" />
    <CreateEvent @eventCreated="setEvents" />
  </div>
</template>

<script>
import EventList from "@/components/EventList.vue";
import CreateEvent from "@/components/CreateEvent.vue";
import { mapActions } from "pinia";
import { useAppStore } from "@/store/app";
export default {
  components: { EventList, CreateEvent },

  data() {
    return {
      eventList: [],
    };
  },
  methods: {
    ...mapActions(useAppStore, ["getEvents"]),

    setEvents() {
      this.getEvents(this.$route.params.userId).then((response) => {
        this.eventList = response;
      });
    },
  },
  mounted() {
    this.setEvents();
  },
};
</script>
