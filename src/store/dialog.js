export default {
	namespaced: true,
	state: {
		status: false,
		component: "",
		id: "",
		title: "",
		description: "",
	},
	mutations: {
		setStatus: (state, status) => {
			state.status = status;
		},
		setComponent: (state, { component, id, title, description }) => {
			state.component = component;
			state.id = id;
			state.title = title;
			state.description = description;
		},
	},
	actions: {
		setStatus: ({ commit }, status) => {
			commit("setStatus", status);
		},
		setComponent: ({ commit }, { component, id, title, description }) => {
			commit("setComponent", { component, id, title, description });
			commit("setStatus", true);
		},
	},
	getters: {
		status: (state) => state.status,
		component: (state) => state.component,
		id: (state) => state.id,
		title: (state) => state.title,
		description: (state) => state.description,
	},
};
