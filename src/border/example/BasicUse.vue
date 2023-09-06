<template>
	<div class="c">
		<Border></Border>
		<Border pos="2"></Border>
		<Border pos="3"></Border>
		<Border pos="4"></Border>
	</div>
	<div class="c">
		<Border pos="2" type="cube" color="cyan"></Border>
		<Border pos="2" type="cube" color="cyan" left="7px"></Border>
	</div>
	<div class="c">
		<Border pos="2" type="cube" color="cyan" active></Border>
		<Border pos="2" type="cube" color="cyan" left="7px" active></Border>
	</div>
	<div class="c">
		<Border pos="1" type="line"></Border>
		<Border pos="2" type="line"></Border>
		<Border pos="3" type="line" active></Border>
		<Border pos="4" type="line" color="cyan"></Border>
	</div>
</template>
<style scoped>
.c {
	box-sizing: border-box;
	background: linear-gradient(45deg,rgba(255,255,255,0.1),rgba(255,255,255,0.2));
	padding: 10px 5px;
	margin: 5px 0px;
	position: relative;
}
</style>
<script setup lang="ts">
import Border from "../Border.vue";
</script>