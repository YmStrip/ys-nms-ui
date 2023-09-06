<template>
  <div class="yn-progress">
	  <template v-if="type=='circle'">
		  <svg
			  :width="size"
			  :height="size"
		  >
			  <circle
				  :cx="size/2"
				  :cy="size/2"
				  :r="size/2-width/2"
			  />
		  </svg>
		  <div class="content">
			  <div style="align-items: center;font-weight: bold;flex: 1">
				  <slot></slot>
			  </div>
		  </div>
	  </template>
  </div>
</template>

<script lang="ts" setup>
import {computed, onMounted} from "vue";
import {ref} from "@vue/runtime-core";

//@ts-ignore
const props = withDefaults(defineProps<{
	size: number
	color: string
	type: 'circle'
	value: number
	width: number
	noCursor?: boolean
}>(),{
	size: 50,
	color: 'white',
	type: 'circle',
	value: 0,
	width: 4
})


</script>

<style scoped>
* {
	box-sizing: border-box;
}
.yn-progress {
	pointer-events: none;
	width: v-bind(size+'px');
	height: v-bind(size+'px');
	position: relative;
}
svg {
	pointer-events: none;
}
circle {
	transition: stroke-dashoffset 0.1s ease-in-out;
	transform: rotate(-90deg);
	transform-origin: center;
	fill: transparent;
	stroke: v-bind(color);
	stroke-width:v-bind(width+'px');
	stroke-dasharray: v-bind("Math.PI*2*size/2");
	stroke-dashoffset: v-bind("Math.PI*2*size/2*(1-value/100)");
}

.content {
	cursor: v-bind("noCursor?'none':'default'");
	color: v-bind(color);
	pointer-events: none;
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 5;
	display: flex;
	align-items: center;
	text-align: center;
}
</style>
