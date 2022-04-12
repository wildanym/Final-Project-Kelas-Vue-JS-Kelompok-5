<template>
	<div>
		<v-layout wrap>
			<Carousel></Carousel>
			<v-container>
				<v-divider></v-divider>
				<HomeComponent></HomeComponent>
			</v-container>
		</v-layout>
	</div>
</template>

<script>
// @ is an alias to /src
import Carousel from "../components/Carousel";
import HomeComponent from "../components/HomeComponent.vue";

export default {
	name: "Home",
	components: { Carousel, HomeComponent },
};
</script>
