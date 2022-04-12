<template>
	<v-container class="mt-2">
		<v-carousel
			cycle
			height="300"
			hide-delimiter-background
			show-arrows-on-hover
			class="rounded-lg"
		>
			<v-carousel-item v-for="(blog, i) in blogs" :key="i">
				<v-sheet height="100%" color="blue-grey darken-4" class="pa-5">
					<v-row class="fill-height" align="center" justify="center">
						<v-card
							:to="'/blogs/' + blog.id"
							height="280"
							width="700"
							elevation="8"
						>
							<v-img
								:src="
									blog.photo
										? apiDomain + blog.photo
										: 'https://picsum.photos/400/700'
								"
								class="white--text"
								height="100%"
							>
							</v-img>
							<div class="judul">
								<h1>{{ blog.title }}</h1>
								<p>{{ blog.description }}</p>
							</div>
						</v-card>
					</v-row>
				</v-sheet>
			</v-carousel-item>
		</v-carousel>
	</v-container>
</template>
<script>
import axios from "axios";
export default {
	data() {
		return {
			slides: ["First", "Second", "Third", "Fourth", "Fifth"],
			blogs: [],
			apiDomain: "https://demo-api-vue.sanbercloud.com",
		};
	},
	computed: {
		photos: function () {
			return this.blogs.map((e) => {
				return this.urlPhoto + e.photo;
			});
		},
	},
	methods: {
		getBlogs: function () {
			const config = {
				method: "get",
				url: `https://demo-api-vue.sanbercloud.com/api/v2/blog/random/3`,
			};
			axios(config)
				.then((response) => {
					let { blogs } = response.data;
					this.blogs = blogs;
				})
				.catch(() => {
					console.log("error");
				});
		},
	},
	mounted() {
		this.getBlogs();
	},
};
</script>
<style scoped>
.judul {
	position: absolute;
	top: 0;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.judul h1 {
	color: white;
	background-color: rgba(209, 66, 0, 0.904);
	padding: 5px 20px;
	border-radius: 10px;
	margin-bottom: 10px;
	box-shadow: 0 0 20px black;
}

.judul p {
	background-color: rgba(255, 255, 255, 0.808);
	padding: 10px;
	border-radius: 5px;
	box-shadow: 0 0 20px black;
}
</style>
