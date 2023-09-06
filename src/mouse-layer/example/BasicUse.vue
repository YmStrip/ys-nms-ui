<template>
	<MouseLayer
		style="width: 250px;height: 250px;border: 1px solid white;background: linear-gradient(45deg,#607d8b,#9e9e9e)"
	>
		<index1>
			<div class="b">asd</div>
		</index1>
	</MouseLayer>
</template>
<script setup lang="ts">
import MouseLayer from "../MouseLayer.vue";
import Index1 from "./index1.vue";
</script>
<style scoped>
.b {
	color: white;
	font-weight: bold;
	background: rgba(0,0,0,0.6);
	display: inline-block;
	padding: 5px 10px;
	border-radius: 5px;
}
</style>