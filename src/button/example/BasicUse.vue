<template>
	<mouse-layer
		style="width: 400px;height: 400px;padding:5px;background: linear-gradient(45deg,#212121,#9e9e9e,#9e9e9e20)"
	>
		<br>
		<Button :event="{hover:false,clickTime:10000,hoverText:'E'}">按钮</Button>
		<br>
		<Button border="cube">按钮</Button>
		<br>
		<Button border="cube" active :event="{click:false}">按钮</Button>

	</mouse-layer>
</template>
<script setup lang="ts">
import Button from "../Button.vue";
import MouseLayer from "../../mouse-layer/MouseLayer.vue";
</script>