<template>
	<v-container class="ma-0 pa-0" grid-list-sm>
		<v-subheader class="font-weight-black">
			<v-btn text to="/blogs/">See All</v-btn>
		</v-subheader>
		<v-layout wrap>
			<v-flex v-for="blog in blogs" :key="blog.id">
				<v-hover v-slot="{ hover }" open-delay="100">
					<v-card
						:to="'/blogs/' + blog.id"
						class="mx-auto mb-2"
						width="250"
						:elevation="hover ? 16 : 2"
						:class="{ 'on-hover': hover }"
					>
						<v-img
							:src="
								blog.photo
									? apiDomain + blog.photo
									: 'https://picsum.photos/200/300'
							"
							class="white--text"
							height="150px"
						>
						</v-img>

						<v-card-title> {{ blog.title }}</v-card-title>

						<v-card-subtitle>
							{{ blog.description.substring(0, 30) }}...</v-card-subtitle
						>

						<v-card-actions>
							<v-btn color="deep-orange" text> Read </v-btn>
						</v-card-actions>
					</v-card>
				</v-hover>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	data() {
		return {
			apiDomain: "https://demo-api-vue.sanbercloud.com",
			blogs: [],
		};
	},

	methods: {
		go() {
			const config = {
				method: "get",
				url: "https://demo-api-vue.sanbercloud.com/api/v2/blog",
			};
			this.axios(config)
				.then((response) => {
					const { blogs } = response.data;
					this.blogs = blogs.data;
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
	created() {
		this.go();
	},
};
</script>
