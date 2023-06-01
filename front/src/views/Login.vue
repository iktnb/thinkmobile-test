<template>
 <div class="wrapper"> <v-card class="px-2 py-2"><LoginForm /></v-card></div>
</template>

<script setup>
import LoginForm from "@/components/LoginForm.vue";
</script>
<style scoped>
.wrapper {
  max-width: 400px;
  margin: 0 auto;
  margin-top: 100px;
}
</style>