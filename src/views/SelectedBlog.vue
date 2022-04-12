<template>
	<v-container class="mt-4">
		<v-card v-if="blog.id">
			<v-img
				:src="
					blog.photo ? apiDomain + blog.photo : 'https://picsum.photos/200/300'
				"
				class="white--text"
				height="400px"
			>
				<v-card-title
					class="fill-height align-end"
					v-text="blog.title"
				></v-card-title>
			</v-img>
			<v-card-text>
				<v-simple-table dense>
					<tbody>
						<tr>
							<td><v-icon>mdi-format-title</v-icon> Judul</td>
							<td class="blue--text">{{ blog.title }}</td>
						</tr>
						<tr>
							<td><v-icon>mdi-note</v-icon> Deskripsi</td>
							<td>{{ blog.description }}</td>
						</tr>
					</tbody>
				</v-simple-table>
			</v-card-text>
		</v-card>
	</v-container>
</template>
<script>
export default {
	data() {
		return {
			apiDomain: "https://demo-api-vue.sanbercloud.com",
			blog: {},
		};
	},
	methods: {
		getBlog() {
			const { id } = this.$route.params;
			const api = `${this.apiDomain}/api/v2/blog/${id}`;
			this.axios
				.get(api)
				.then((response) => {
					const { blog } = response.data;
					this.blog = blog;
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
	mounted() {
		this.getBlog();
	},
};
</script>
