<template>
	<v-card>
		<v-card-title class="text-h5">
			Are you sure you want to delete this article?
		</v-card-title>
		<v-divider></v-divider>
		<v-card-subtitle class="mt-2">Article Details</v-card-subtitle>
		<v-card-text
			>Title: {{ title }}<br />
			Description: {{ description }}</v-card-text
		>
		<v-card-actions>
			<v-spacer></v-spacer>

			<v-btn color="green darken-1" text @click="remove"> Yes </v-btn>
			<v-btn color="green darken-1" text @click.native="close"> No </v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
	props: ["id", "title", "description"],
	data() {
		return {
			apiDomain: "https://demo-api-vue.sanbercloud.com",
		};
	},
	methods: {
		close() {
			this.$emit("closed", false);
		},
		remove: function () {
			const config = {
				method: "post",
				url: `${this.apiDomain}/api/blog/${this.id}`,
				params: { _method: "DELETE" },
			};

			axios(config)
				.then((response) => {
					this.setAlert({
						status: true,
						color: "success",
						text: response.data.message,
					});
					this.close();
				})
				.catch(() => {
					this.setAlert({
						status: true,
						color: "error",
						text: "Gagal Delete Artikel",
					});
				});
		},

		closed: function (value) {
			this.dialog = value;
		},
		...mapActions({
			setAlert: "alert/set",
		}),
	},
};
</script>

<style></style>
