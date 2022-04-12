<template>
	<v-container class="mt-7">
		<Alert />
		<v-row no-gutters class="justify-center align-content-center">
			<v-col md="6">
				<v-card class="rounded-lg" elevation="8">
					<v-card-title>Edit Article</v-card-title>
					<v-divider></v-divider>
					<v-container fluid>
						<form>
							<v-text-field
								v-model="title"
								:error-messages="titleErrors"
								:counter="60"
								label="Title"
								required
								@input="$v.title.$touch()"
								@blur="$v.title.$touch()"
							></v-text-field>
							<v-textarea
								v-model="description"
								:error-messages="descriptionErrors"
								:counter="100"
								label="Description"
								required
								@input="$v.description.$touch()"
								@blur="$v.description.$touch()"
							></v-textarea>

							<v-btn class="mr-4 white--text" color="success" @click="update"
								>Update <v-icon right dark>mdi-update</v-icon>
							</v-btn>
							<v-btn
								class="mr-4 white--text"
								color="deep-orange"
								to="/dashboard"
								>Cancel <v-icon right dark>mdi-cancel</v-icon>
							</v-btn>
						</form>
					</v-container>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
	mixins: [validationMixin],

	validations: {
		title: { required, maxLength: maxLength(60), minLength: minLength(10) },
		description: {
			required,
			maxLength: maxLength(100),
			minLength: minLength(15),
		},
	},
	components: {
		Alert: () => import("../../components/Alert.vue"),
	},

	data() {
		return {
			title: "",
			description: "",
			id: "",
			apiDomain: "https://demo-api-vue.sanbercloud.com",
		};
	},
	computed: {
		titleErrors() {
			const errors = [];
			if (!this.$v.title.$dirty) return errors;
			!this.$v.title.minLength && errors.push("Title at least 10 characters");
			!this.$v.title.maxLength && errors.push("Title at most 60 characters");
			!this.$v.title.required &&
				errors.push("Whats your title? Title cannot be empty");
			return errors;
		},
		descriptionErrors() {
			const errors = [];
			if (!this.$v.description.$dirty) return errors;
			!this.$v.description.minLength &&
				errors.push("Description at least 15 characters");
			!this.$v.description.maxLength &&
				errors.push("Description at most 100 characters");
			!this.$v.description.required &&
				errors.push("Whats your description? Description cannot be empty");
			return errors;
		},
		...mapGetters({
			guest: "auth/guest",
			user: "auth/user",
			token: "auth/token",
		}),
	},
	methods: {
		go() {
			const { id } = this.$route.params;
			const api = `${this.apiDomain}/api/v2/blog/${id}`;
			this.axios
				.get(api)
				.then((response) => {
					const { blog } = response.data;
					this.title = blog.title;
					this.description = blog.description;
					this.id = blog.id;
				})
				.catch((error) => {
					console.log(error);
				});
		},
		update: function () {
			if (
				this.titleErrors.length === 0 &&
				this.descriptionErrors.length === 0
			) {
				let formData = new FormData();
				formData.append("title", this.title);
				formData.append("description", this.description);

				let config = {
					method: "POST",
					url: `${this.apiDomain}/api/blog/${this.id}`,
					params: { _method: "PUT" },
					data: formData,
					headers: {
						Authorization: "Bearer " + this.token,
					},
				};

				axios(config)
					.then((response) => {
						this.setAlert({
							status: true,
							color: "success",
							text: response.data.message,
						});
						this.$router.push("/dashboard");
					})
					.catch(() => {
						this.setAlert({
							status: true,
							color: "error",
							text: "Gagal Mengupdate Artikel",
						});
					});
			} else {
				this.setAlert({
					status: true,
					color: "success",
					text: `${this.titleErrors[0] ? this.titleErrors[0] : ""} ${
						this.descriptionErrors[0] ? this.descriptionErrors[0] : ""
					}`,
				});
			}
		},
		...mapActions({
			setAlert: "alert/set",
			setToken: "auth/setToken",
			setUser: "auth/setUser",
			checkToken: "auth/checkToken",
		}),
	},

	mounted() {
		this.go();

		if (this.token) {
			this.checkToken(this.token);
		}
	},
};
</script>

<style></style>
