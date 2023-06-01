<template>
  <v-table>
    <template v-if="userList.length">
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Email</th>
          <th class="text-left">Telephone</th>
          <th class="text-left">Events</th>
          <th class="text-left">Next event date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in userList" :key="item.name">
          <td>
            {{
              (item.firstName ? item.firstName + " " : "") +
                (item.lastName || "") || "No data"
            }}
          </td>
          <td>{{ item.email || "No data" }}</td>
          <td>{{ item.phoneNumber || "No data" }}</td>
          <td>{{ item.eventCount || 0 }}</td>
          <td>{{ formatDateTime(item.nextEventDate) || "No date" }}</td>
          <td><v-btn @click="routeToUserDetail(item._id)">More</v-btn></td>
        </tr>
      </tbody>
    </template>
    <template v-else> <h4 class="text-center pt-2">No data</h4> </template>
  </v-table>
</template>

<script setup>
import { formatDateTime } from "@/utils";

import { useRouter } from "vue-router";

defineProps({
  userList: {
    type: Array,
    default: () => [],
  },
});
const router = useRouter();
function routeToUserDetail(userId) {
  router.push({
    name: "UserDetail",
    params: {
      userId,
    },
  });
}
</script>
