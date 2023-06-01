<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Title</th>
        <th class="text-left">Description</th>
        <th class="text-left">Start date</th>
        <th class="text-left">End date</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item of eventsList" :key="item._id">
        <td>
          {{ item.title }}
        </td>
        <td>{{ item.description }}</td>
        <td>{{ formatDateTime(item.startDate) }}</td>
        <td>{{ formatDateTime(item.endDate) }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup>
import { formatDateTime } from "@/utils";

defineProps({
  eventsList: {
    type: Array,
    default: () => [],
  },
});
</script>
