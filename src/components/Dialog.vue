<template>
	<keep-alive>
		<template>
			<v-row justify="center">
				<v-dialog v-model="dialog" persistent max-width="600px">
					<component
						:is="currentComponent"
						@closed="setDialogStatus"
						:id="id"
						:title="title"
						:description="description"
					></component>
				</v-dialog>
			</v-row>
		</template>
	</keep-alive>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
	data() {
		return {
			apiDomain: "https://demo-api-vue.sanbercloud.com",
		};
	},
	components: {
		Upload: () => import("./Upload.vue"),
		Delete: () => import("./Delete.vue"),
	},
	computed: {
		...mapGetters({
			dialogStatus: "dialog/status",
			currentComponent: "dialog/component",
			id: "dialog/id",
			title: "dialog/title",
			description: "dialog/description",
		}),
		dialog: {
			get() {
				return this.dialogStatus;
			},
			set(value) {
				this.setDialogStatus(value);
			},
		},
	},
	methods: {
		...mapActions({
			setDialogStatus: "dialog/setStatus",
		}),
	},

	updated() {
		this.$emit("getBlogs");
	},
};
</script>
