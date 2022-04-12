<template>
	<v-card class="rounded-lg" elevation="8">
		<v-card-title>Upload Photo</v-card-title>
		<v-divider></v-divider>
		<v-card-subtitle class="mt-2">Article Details</v-card-subtitle>
		<v-card-text
			>Title: {{ title }}<br />
			Description: {{ description }}</v-card-text
		>
		<v-card-text>
			<v-form ref="form">
				<input
					type="file"
					label="Thumbnail"
					ref="photo"
					name="photo"
					class="me-10"
				/>
				<v-btn
					:loading="loading"
					class="me-3 mt-2 success"
					@click="submitPhoto"
				>
					Upload <v-icon right dark> mdi-cloud-upload </v-icon>
				</v-btn>
				<v-btn @click.native="close" class="red white--text mt-2">
					Cancel
				</v-btn>
			</v-form>
		</v-card-text>
	</v-card>
</template>
<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
	props: ["id", "title", "description"],
	data() {
		return {
			loading: false,
			apiDomain: "https://demo-api-vue.sanbercloud.com",
		};
	},
	methods: {
		close() {
			this.$emit("closed", false);
		},
		submitPhoto: function () {
			this.loading = true;
			let file = this.$refs.photo.files[0];

			let formData = new FormData();
			formData.append("photo", file);

			let config = {
				method: "post",
				url: `${this.apiDomain}/api/blog/${this.id}/upload-photo`,
				data: formData,
			};

			axios(config)
				.then((response) => {
					this.loading = false;
					this.$emit("closed", false);
					this.setAlert({
						status: true,
						color: "success",
						text: response.data.message,
					});
				})
				.catch(() => {
					this.loading = false;
					this.setAlert({
						status: true,
						color: "error",
						text: "Gagal Mengupload Photo",
					});
				});
		},

		...mapActions({
			setAlert: "alert/set",
		}),
	},
};
</script>
