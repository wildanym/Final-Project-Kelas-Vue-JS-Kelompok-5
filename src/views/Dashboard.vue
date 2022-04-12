<template>
	<v-container class="mt-4">
		<Dialog @getBlogs="getBlogs" />
		<v-toolbar elevation="1">
			<h2>Dashboard</h2>
			<v-spacer></v-spacer>
			<v-btn class="primary" to="/blog/create">Create Blog</v-btn>
		</v-toolbar>
		<v-divider></v-divider>
		<v-data-table
			dense
			:headers="headers"
			:items="blogs"
			item-key="id"
			class="elevation-1 mt-7"
		>
			<template v-slot:[`item.photo`]="{ item }">
				<v-img
					:src="
						item.photo
							? apiDomain + item.photo
							: 'https://picsum.photos/100/100'
					"
					width="100"
				>
				</v-img>
			</template>
			<template v-slot:[`item.action`]="{ item }">
				<v-sheet class="d-flex align-center justify-start transparent">
					<v-btn small class="ma-4 success" :to="'/blog/' + item.id + '/edit'"
						>Edit</v-btn
					>
					<v-btn
						small
						class="ma-4 red white--text"
						@click.native="remove(item.id, item.title, item.description)"
						>Delete</v-btn
					>
					<v-btn
						small
						class="warning"
						@click.native="upload(item.id, item.title, item.description)"
						>Upload Image</v-btn
					>
				</v-sheet>
			</template>
		</v-data-table>
	</v-container>
</template>
<script>
import axios from "axios";
import { mapActions } from "vuex";
import Dialog from "../components/Dialog.vue";

export default {
	components: {
		Dialog,
	},
	data() {
		return {
			id: "",
			headers: [
				{ text: "Image", value: "photo", align: "start", sortable: false },
				{
					text: "Title",
					align: "start",
					sortable: true,
					value: "title",
				},
				{
					text: "Description",
					value: "description",
					align: "start",
					sortable: false,
				},
				{ text: "Actions", value: "action", align: "start", sortable: false },
			],
			apiDomain: "https://demo-api-vue.sanbercloud.com",
			blogs: [],
		};
	},
	methods: {
		getBlogs: function () {
			const config = {
				method: "get",
				url: `https://demo-api-vue.sanbercloud.com/api/blog`,
			};
			axios(config)
				.then((response) => {
					this.blogs = response.data.blogs;
				})
				.catch(() => {
					console.log("error");
				});
		},
		upload(id, title, description) {
			this.setDialogComponent({
				component: "Upload",
				id: id,
				title: title,
				description: description,
			});
		},
		remove(id, title, description) {
			this.setDialogComponent({
				component: "Delete",
				id: id,
				title: title,
				description: description,
			});
		},

		...mapActions({
			setAlert: "alert/set",
			setDialogComponent: "dialog/setComponent",
		}),
	},

	created() {
		this.getBlogs();
	},
};
</script>
