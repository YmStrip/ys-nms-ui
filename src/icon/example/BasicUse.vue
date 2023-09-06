<template>
	<div style="padding: 10px">
		<icon></icon>
		<icon :size="20"></icon>
		<icon :size="30"></icon>
		<icon :size="40" light></icon>
		<icon :size="40" icon="ic:twotone-integration-instructions" light light-color="red" :light-opacity="0.95" ></icon>
		<icon :size="40" light light-color="green"></icon>
		<icon :size="40" light light-color="cyan" :light-opacity="0.95" icon="icon-park-twotone:three-hexagons"></icon>
	</div>
	<br>
</template>
<script setup lang="ts">
import Icon from "../Icon.vue";
</script>
<style>
.a {
	color: violet;
}
</style>