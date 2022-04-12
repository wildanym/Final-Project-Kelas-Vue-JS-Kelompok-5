<template>
  <v-container>
    <v-row class="justify-center align-content-center">
      <Alert />

      <v-col md="6">
        <v-card>
          <v-card-title>Form Login</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-model="email"
                label="E-mail"
                required
                append-icon="mdi-email"
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
                :error-messages="emailErrors"
              ></v-text-field>

              <v-text-field
                v-model="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                counter
                @click:append="showPassword = !showPassword"
                :error-messages="passwordErrors"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
              ></v-text-field>

              <div class="text-xs-center">
                <v-btn color="success lighten-1" @click="submit">
                  Login
                  <v-icon right dark>mdi-lock-open</v-icon>
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    password: { required },
  },

  components: {
    Alert: () => import("../components/Alert.vue"),
  },

  data() {
    return {
      email: "",
      showPassword: false,
      password: "",
      apiDomain: "https://demo-api-vue.sanbercloud.com",
    };
  },

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push("E-mail harus diisi");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password harus diisi");
      return errors;
    },
  },

  methods: {
    ...mapActions({
      setAlert: "alert/set",
      setToken: "auth/setToken",
    }),

    submit() {
      const config = {
        method: "post",
        url: this.apiDomain + "/api/v2/auth/login",
        data: {
          email: this.email,
          password: this.password,
        },
      };

      axios(config)
        .then((response) => {
          this.setToken(response.data.access_token);
          this.setAlert({
            status: true,
            color: "success",
            text: "Login berhasil",
          });
          this.$router.push({ name: "Home" });
        })
        .catch(() => {
          this.setAlert({
            status: true,
            color: "error",
            text: "Gagal Login",
          });
        });
    },
  },
};
</script>

<style></style>
