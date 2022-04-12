<template>
  <v-snackbar
    v-model="alert"
    :color="color"
    buttom
    timeout="3000"
    multi-line
    shaped
    top
    right
  >
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn color="red" text v-bind="attrs" @click="close">Close</v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "alert",
  methods: {
    ...mapActions("alert", {
      setAlert: "set",
    }),
    close() {
      this.setAlert({ status: false });
    },
  },
  computed: {
    ...mapGetters("alert", {
      status: "status",
      color: "color",
      text: "text",
    }),
    alert: {
      get() {
        return this.status;
      },
      set(value) {
        this.setAlert({ status: value });
      },
    },
  },
};
</script>
