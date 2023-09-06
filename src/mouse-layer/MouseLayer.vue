<template>
	<div
		class="yn-mouse-layer"
		ref="root"
		@mousemove="(e)=>setMouse(e)"
	>
		<div :class="Object.assign({mouse:true},tags)">
			<slot name="cursor" v-if="$slots.cursor"></slot>
			<template
				v-else

			>
				<div class="cursor">
					<div style="text-align: center;flex: 1">
						{{tags.hoverText}}
					</div>
				</div>
				<yn-progress
					no-cursor
					style="pointer-events: none;cursor: none;"
					class="ch-progress"
					:size="tags.hover?size:size*0.8"
					:width="tags.hover?borderWidth:borderWidth*2/3"
					:value="tags.progress||0"
					v-if="tags.progress!==undefined"
				>
				</yn-progress>
			</template>
		</div>
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts" setup>
import {getCurrentInstance, onMounted, onUnmounted, reactive, watch} from "vue";
import YnProgress from '../progress/Progress.vue'
import {NEventBus} from "../utils/n-events";

//@ts-ignore
const props = withDefaults(defineProps<{
	borderWidth: number
	borderColor: string
	size: number
}>(), {
	borderColor: 'rgba(250,250,250,0.5)',
	borderWidth: 7,
	size: 40
})

const bus = new NEventBus.create().init()

const instance = getCurrentInstance()

const info = reactive({
	x: 0,
	y: 0
})

const tags = reactive({

})

const initAll = () => {

}
const setMouse = (e: MouseEvent) => {
	const root: HTMLElement = <any>instance?.refs.root;
	if (!root) return
	const sty = root.getBoundingClientRect()
	setPos(e.clientX - sty.left, e.clientY - sty.top)
}

const setPos = (x: number, y: number) => {
	info.x = x
	info.y = y
}

bus.on('set:tag',(name,data)=>{
	tags[name] = data
})
bus.on('del:tag',(name)=>delete tags[name])

onMounted(() => {
	//@ts-ignore
	instance.appContext.config.warnHandler = () => null
	initAll()
})
onUnmounted(()=>{
	bus.unInit()
})
watch(props, () => {
	initAll()
})


</script>

<style scoped>
* {
	box-sizing: border-box;
}

.yn-mouse-layer {
	overflow: hidden;
	box-sizing: border-box;
	cursor: none;
	min-width: 50px;
	min-height: 50px;
	position: relative;
}

.mouse {
	z-index: 50;
	overflow: hidden;
	width: v-bind(size+ 'px');
	height: v-bind(size+ 'px');
	pointer-events: none;
	position: absolute;
	left: v-bind("(info.x-size/2)+'px'");
	top: v-bind("(info.y-size/2)+'px'");
}

.cursor {
	display: flex;
	align-items: center;
	text-align: center;
	font-weight: bold;
	width: 80%;
	height: 80%;
	left: 10%;
	top: 10%;
	border-radius: 50%;
	border: v-bind("(borderWidth*2/3)+'px'") solid v-bind(borderColor);
	transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
@keyframes bounce {
	50% {
		transform: scale(1);
	}
	75% {
		transform: scale(0.9);
	}
	100% {
		transform: scale(1);
	}
}

.hover > .cursor {
	width: 100%;
	height: 100%;
	left: 0%;
	top: 0%;
	border: v-bind("borderWidth+'px'") solid v-bind(borderColor);
	animation: bounce 0.6s;
}
.content {
	position: relative;
	width: 100%;
	height: 100%;
	pointer-events: all;
}
.ch-progress {
	position: absolute;
	left: 0;
	top: 0;
	z-index: 10;
}

</style>
<style>
.yn-mouse-layer > * {
	cursor: none !important;
}
</style>