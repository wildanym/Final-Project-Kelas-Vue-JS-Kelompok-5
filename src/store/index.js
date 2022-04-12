import Vue from "vue";
import Vuex from "vuex";
import alert from "./alert.js";
import dialog from "./dialog.js";
import auth from "./auth.js";
import VuexPersist from "vuex-persist";

const vuexPersist = new VuexPersist({
	key: "sanbercode",
	storage: localStorage,
});

Vue.use(Vuex);
export default new Vuex.Store({
	plugins: [vuexPersist.plugin],
	modules: {
		alert,
		dialog,
		auth,
	},
});
