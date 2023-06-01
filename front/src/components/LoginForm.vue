<template>
  <form @submit.prevent="submit">
    <v-text-field
      v-model="login.value.value"
      :disabled="loading"
      :counter="10"
      :error-messages="login.errorMessage.value"
      label="Login"
    ></v-text-field>
    <v-text-field
      v-model="password.value.value"
      :disabled="loading"
      :counter="10"
      :error-messages="password.errorMessage.value"
      label="Password"
    ></v-text-field>

    <v-btn :loading="loading" class="me-4" type="submit"> Login </v-btn>
  </form>
</template>

<script>
import { ref } from "vue";
import { useField, useForm } from "vee-validate";

import { useAuthStore } from "@/store/auth.js";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const { handleSubmit } = useForm({
      validationSchema: {
        login(value) {
          if (value?.length >= 2) return true;

          return "Name needs to be at least 2 characters.";
        },
        password(value) {
          if (value?.length >= 2) return true;

          return "Name needs to be at least 2 characters.";
        },
      },
    });
    const login = useField("login");
    const password = useField("password");
    const loading = ref(false);
    const storeAuth = useAuthStore();
    const submit = handleSubmit((values) => {
      loading.value = true;
      console.log(values);
      storeAuth.login(values).then((resp) => {
        loading.value = false;

        if (resp) {
          router.push("/");
        }
      });
    });

    return { login, password, submit, loading };
  },
};
</script>
