<template>
  <v-app>
    <Alert />
    <v-app-bar app dense color="deep-orange">
      <v-toolbar-title class="white--text mr-4">WAD</v-toolbar-title>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn x-small class="hidden-md-and-up" text v-bind="attrs" v-on="on">
            Menu
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-btn to="/">Home</v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn to="/about">About</v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn to="/blogs">Blogs</v-btn>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn class="hidden-sm-and-down black--text" plain to="/">Home</v-btn>
      <v-btn class="hidden-sm-and-down black--text" plain to="/about"
        >About</v-btn
      >
      <v-btn class="hidden-sm-and-down black--text" plain to="/blogs"
        >Blogs</v-btn
      >
      <v-spacer></v-spacer>
      <div right v-if="guest">
        <v-btn text to="/login">Login</v-btn>
        <v-btn text to="/register">Register</v-btn>
      </div>

      <div class="text-center" v-if="!guest">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-x
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on"> Halo, {{ user.name }} ! </v-btn>
          </template>

          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-avatar size="51">
                  <v-img
                    :src="
                      user.photo_profile
                        ? apiDomain + user.photo_profile
                        : 'https://randomuser.me/api/portraits/men/78.jpg'
                    "
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ user.name }}</v-list-item-title>
                  <v-list-item-subtitle>Already logged in</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <v-btn text to="/dashboard">Dashboard</v-btn>
                </v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-title>
                  <v-btn text @click="logout">
                    <v-icon left>mdi-lock</v-icon> Logout
                  </v-btn>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer app
      ><small>&copy; WAD Project | VueJS Kelompok 5</small>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Alert: () => import("./components/Alert.vue"),
  },

  data: () => ({
    menu: false,
    drawer: false,
    apiDomain: "https://demo-api-vue.sanbercloud.com",
    selectedItem: 0,
    items: [
      { text: "Add Blog", icon: "mdi-post" },
      { text: "Edit Blogs", icon: "mdi-pencil" },
    ],
    search: "",
  }),

  computed: {
    ...mapGetters({
      guest: "auth/guest",
      user: "auth/user",
      token: "auth/token",
    }),
  },

  methods: {
    logout() {
      let config = {
        method: "post",
        url: this.apiDomain + "/api/v2/auth/logout",
        headers: {
          Authorization: "Bearer " + this.token,
        },
      };

      this.axios(config)
        .then((response) => {
          this.setToken("");
          this.setUser({});
          this.$router.push({ name: "Home" });

          this.setAlert({
            status: true,
            color: "success",
            text: response.data.message,
          });
        })
        .catch((response) => {
          this.setAlert({
            status: true,
            color: "error",
            text: response.data.error,
          });
        });
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
