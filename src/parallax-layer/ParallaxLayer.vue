<template>
	<div
		class="parallax-layer"
		ref="parallaxContainer"
		@mousemove="handleMouseMove"
		style="overflow: hidden"
	>
		<div class="parallax-item">
			<div
				v-if="!fixed"
				class="context-auto"
				ref="body"
				style="overflow: hidden"
			>
				<slot
					:width="slotEmit.width"
					:height="slotEmit.height"
					:top="slotEmit.top"
					:left="slotEmit.left"
				></slot>
			</div>
		</div>
		<div
			v-if="fixed"
			class="context-fixed"
			ref="body"
			style="overflow: hidden;"
		>
			<slot
				:width="slotEmit.width"
				:height="slotEmit.height"
				:top="slotEmit.top"
				:left="slotEmit.left"
			></slot>
		</div>
	</div>
</template>


<script lang="ts" setup>
import {computed, getCurrentInstance, onMounted, onUnmounted, reactive, watch} from "vue";

import back from './back.png'

//@ts-ignore
const props = withDefaults(defineProps<{
	back: string
	speed: number
	paddingX?: number
	paddingY?: number
	width?: number
	height?: number
	fixed?: boolean
}>(), {
	paddingX: 10,
	paddingY: 10,
	speed: 30,
	width: 300,
	height: 200,
	fixed: false,
	back: back
})

const C = computed(()=>{
	return props.back || back
})

const offset = reactive({
	x: 0,
	y: 0
})
const ur = reactive({
	rx: 0,
	ry: 0,
	transform: ''
})
const slotEmit = reactive({
	left: 0,
	top: 0,
	width: 0,
	height: 0
})
const instance = getCurrentInstance()
const handleMouseMove = (event: MouseEvent) => {
	if (!instance?.refs?.parallaxContainer) return
	const container:HTMLElement = <any>instance?.refs?.parallaxContainer;

	const containerWidth = container.offsetWidth;
	const containerHeight = container.offsetHeight;
	const mouseX = event.pageX - container.offsetLeft;
	const mouseY = event.pageY - container.offsetTop;

	const moveX = ((containerWidth / 2 - mouseX) / containerWidth) * props.speed;
	const moveY = ((containerHeight / 2 - mouseY) / containerHeight) * props.speed;
	offset.x = mouseX
	offset.y = mouseY
	ur.transform = `translate(${moveX}px, ${moveY}px)`;
};
const handleResize = () => {

}
const initSize = () => {
	const b = instance?.refs?.body
	if (!b) return
	if (props.fixed) {
		slotEmit.top = 0
		slotEmit.left = 0
		slotEmit.width = props.width
		slotEmit.height = props.height
	}
	else {
		slotEmit.top = 0
		slotEmit.left = 0
		slotEmit.width = (100-props.paddingX)/100*props.width
		slotEmit.height = (100-props.paddingY)/100*props.width
	}
}
const init = () => {
	ur.ry = props.paddingY
	ur.rx = props.paddingX
	if (ur.rx<5) ur.rx = 5
	if (ur.ry<10) ur.ry = 10
	initSize()
}
onMounted(() => {
	init()
});
onUnmounted(() => {

});
watch(props,()=>init())
watch(()=>props.paddingX,()=>init())
watch(()=>props.paddingY,()=>init())
watch(()=>props.height,()=>init())
watch(()=>props.width,()=>init())


</script>

<style scoped>

.parallax-layer {
	color: white;
	position: relative;
	width: v-bind(width+'px');
	height: v-bind(height+'px');
	overflow: hidden;
}

.parallax-item {
	box-sizing: border-box;
	color: white;
	position: absolute;
	top: 0;
	left: 0;
	left: v-bind("`-${ur.rx}%`");
	top: v-bind("`-${ur.ry}%`");
	width: v-bind("`${ur.rx*2+100}%`");
	height: v-bind("`${ur.ry*2+100}%`");
	background-image: v-bind("`url('${C}')`");
	background-position: center;
	background-repeat: no-repeat;
	background-size: v-bind("`${ur.rx+100}%`");
	overflow: hidden;
	transform: v-bind('ur.transform')
}
.context-fixed {
	overflow: hidden;
	box-sizing: border-box;
	position: absolute;
	width: v-bind("`${100-paddingX}%`");
	/*height: v-bind("`${100-ry}%`");*/
	height: v-bind(height+'px');
	left: v-bind("`${paddingX/2}%`");
	top:  v-bind("`${paddingY/2}%`");
}
.context-auto {
	overflow: hidden;
	box-sizing: border-box;
	width: v-bind("`${100-ur.rx*2}%`");
	/*height: v-bind("`${100-ur.ry*2}%`");*/
	height: 100%;
	position: absolute;
	left: v-bind("`${ur.rx}%`");
	top:  v-bind("`${ur.ry}%`");
}
</style>
