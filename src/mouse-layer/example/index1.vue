<template>
	<div>
		<EventLayer
			hover-music
			click-music
			hover-text="E"
			hover
			click
			@click="()=>{}"
		>
			<slot></slot>
		</EventLayer>
	</div>
</template>
<script setup lang="ts">
import EventLayer from "../../event-layer/EventLayer.vue";
const al = (e) => {
	alert(e)
}
</script>