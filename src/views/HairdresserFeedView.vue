<template>
	<main>
			<HairdresserFeedBody />
	</main>
</template>

<script>
	import HairdresserFeedBody from "../components/HairdresserFeedBody.vue";

	export default {
		components: {
			HairdresserFeedBody,
		},
	};
</script>

<style lang="scss" scoped>
main {
    background-color: $pastel-yellow;
    height: 35vh;
  }
</style>