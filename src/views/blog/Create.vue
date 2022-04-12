<template>
	<v-container>
		<v-row class="justify-center align-content-center">
			<Alert />
			<v-col md="6">
				<v-card class="mt-10" elevation="6">
					<v-card-title>Create Article</v-card-title>
					<v-card-text>
						<v-form ref="form">
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

							<v-btn class="mr-4" @click="create"> Create </v-btn>
							<v-btn @click="clear"> Clear </v-btn>
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
import { required, minLength, maxLength } from "vuelidate/lib/validators";

export default {
	mixins: [validationMixin],

	validations: {
		title: { required, minLength: minLength(10), maxLength: maxLength(60) },
		description: {
			required,
			minLength: minLength(15),
			maxLength: maxLength(100),
		},
	},

	components: {
		Alert: () => import("../../components/Alert.vue"),
	},

	data() {
		return {
			title: "",
			description: "",
			apiDomain: "https://demo-api-vue.sanbercloud.com",
		};
	},

	computed: {
		titleErrors() {
			const errors = [];
			if (!this.$v.title.$dirty) return errors;
			!this.$v.title.minLength && errors.push("Title at least 10 characters");
			!this.$v.title.maxLength && errors.push("Title at most 60 characters");
			!this.$v.title.required && errors.push("Whats your title?");
			return errors;
		},
		descriptionErrors() {
			const errors = [];
			if (!this.$v.description.$dirty) return errors;
			!this.$v.description.minLength &&
				errors.push("Description at least 15 characters");
			!this.$v.description.maxLength &&
				errors.push("Description at most 100 characters");
			!this.$v.description.required && errors.push("Whats your description?");
			return errors;
		},

		...mapGetters({
			guest: "auth/guest",
			user: "auth/user",
			token: "auth/token",
		}),
	},

	methods: {
		create: function () {
			if (
				this.titleErrors.length === 0 &&
				this.descriptionErrors.length === 0
			) {
				let formData = new FormData();
				formData.append("title", this.title);
				formData.append("description", this.description);

				let config = {
					method: "POST",
					url: this.apiDomain + "/api/v2/blog",
					data: formData,
					headers: {
						Authorization: "Bearer " + this.token,
					},
				};

				axios(config)
					.then(() => {
						this.setAlert({
							status: true,
							color: "success",
							text: "Berhasil membuat Article",
						});
						this.$router.push({ name: "Dashboard" });
					})
					.catch(() => {
						this.setAlert({
							status: true,
							color: "error",
							text: "Gagal Membuat Artikel",
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

		clear() {
			this.$v.$reset();
			this.title = "";
			this.description = "";
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
