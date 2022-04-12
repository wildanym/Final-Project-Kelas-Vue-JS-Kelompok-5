<template>
  <v-container class="mt-4">
    <v-row class="justify-center align-content-center">
      <Alert />

      <v-col md="6">
        <v-card>
          <v-card-title>Formulir Register</v-card-title>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                v-model="name"
                :error-messages="nameErrors"
                :counter="20"
                label="Masukkan Nama"
                required
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
              ></v-text-field>

              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="Masukkan E-mail"
                required
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>

              <v-text-field
                v-model="password"
                required
                :error-messages="passwordErrors"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                counter
                @click:append="showPassword = !showPassword"
              >
              </v-text-field>

              <input
                type="file"
                label="Pilih Foto"
                ref="photo_profile"
                name="photo_profile"
              />

              <v-btn class="mr-4" @click="register"> Register </v-btn>
              <v-btn @click="clear"> clear </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import {
  required,
  maxLength,
  email,
  minLength,
} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    name: { required, maxLength: maxLength(20), minLength: minLength(2) },
    email: { required, email },
    password: { required, minLength: minLength(5) },
  },

  components: {
    Alert: () => import("../components/Alert.vue"),
  },

  data() {
    return {
      email: "",
      showPassword: false,
      password: "",
      name: "",
      apiDomain: "https://demo-api-vue.sanbercloud.com",
    };
  },

  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.minLength && errors.push("Nama minimal 2 karakter");
      !this.$v.name.maxLength && errors.push("Nama maksimal 20 karakter");
      !this.$v.name.required && errors.push("Nama harus diisi.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Email harus valid");
      !this.$v.email.required && errors.push("E-mail harus diisi");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength && errors.push("Nama minimal 5 karakter");
      !this.$v.password.required && errors.push("Password harus diisi");
      return errors;
    },

    ...mapGetters({
      guest: "auth/guest",
      user: "auth/user",
      token: "auth/token",
    }),
  },

  methods: {
    register: function () {
      let file = this.$refs.photo_profile.files[0];

      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("email", this.email);
      formData.append("password", this.password);
      formData.append("photo_profile", file);

      const config = {
        method: "POST",
        url: this.apiDomain + "/api/v2/auth/register",
        data: formData,
      };

      axios(config)
        .then(() => {
          this.setAlert({
            status: true,
            color: "success",
            text: "Berhasil Register",
          });
          this.$router.push({ name: "Login" });
        })
        .catch(() => {
          this.setAlert({
            status: true,
            color: "error",
            text: "Gagal Register",
          });
        });
    },

    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.password = "";
    },

    ...mapActions({
      setAlert: "alert/set",
      setToken: "auth/setToken",
      setUser: "auth/setUser",
      checkToken: "auth/checkToken",
    }),
  },

  mounted() {
    if (this.token) {
      this.checkToken(this.token);
    }
  },
};
</script>
