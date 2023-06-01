<template>
  <v-row justify="center">
    <v-dialog v-model="createUserModalView" persistent width="1024">
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="4">
                <v-text-field
                  label="Legal first name"
                  v-model="firstName"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field
                  label="Legal last name"
                  persistent-hint
                  required
                  v-model="lastName"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="4">
                <v-text-field
                  v-model="email"
                  label="Email"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field
                  label="Telephone"
                  persistent-hint
                  v-model="phoneNumber"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="closeDialog"
          >
            Close
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="createUser">
            Create user
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useAppStore } from "@/store/app";

export default {
  data: () => ({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  }),

  computed: {
    ...mapState(useAppStore, ["createUserModalView"]),
  },

  methods: {
    ...mapActions(useAppStore, [
      "createNewUser",
      "closeCreateUserModal",
      "openCreateUserModal",
    ]),

    openDialog() {
      this.openCreateUserModal();
    },

    closeDialog() {
      this.closeCreateUserModal();
    },

    refreshFields() {
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.phoneNumber = "";
    },

    async createUser() {
      await this.createNewUser({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNumber: this.phoneNumber,
      });
      this.closeDialog();
      this.refreshFields();
    },
  },
};
</script>
