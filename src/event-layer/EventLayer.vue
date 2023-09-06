<template>
  <span
	  class="event-layer"
	  @mouseenter="e=>{Hover.in(e);}"
	  @mouseleave="e=>{Hover.out(e);Click.out(e)}"
	  @mouseup="e=>{Click.out(e)}"
	  @mousedown="e=>{Click.in(e)}"
	  @click.stop="e=>{if(!click){emits('click',e);PlayClick()}}"
  >
	  <slot></slot>
  </span>
</template>

<script lang="ts" setup>

import {NUtils} from "../utils/n";
import {computed, getCurrentInstance, reactive} from "vue";
import {NEventBus} from "../utils/n-events";
import {MusicUtils} from "../utils/music";
import {EventLayerProps} from "./props";

//@ts-ignore
const props = withDefaults(defineProps<EventLayerProps>(),{
	clickTime: 2000,
	click: true,
	clickMusic: true,
	hover: true,
	hoverMusic: true
})
const emits = defineEmits<{
	'click': any,
}>()



const PlayClick = async () => {
	if (props.clickMusic) {
		MusicUtils.playClick()
	}
}

const PlayHover= async () => {
	if (props.hoverMusic) {
		MusicUtils.playHover()
	}
}

const instance = getCurrentInstance()
const Hover = new NUtils.pressTimer({
	time: 150,
	call () {

	},
	start (e) {
		if (props.hoverText) NEventBus.emit('set:tag','hoverText',props.hoverText)
		if (props.hover) NEventBus.emit('set:tag','hover',true)
		PlayHover()
	},
	stop (e) {
		if (props.hover) NEventBus.emit('del:tag','hover')
		NEventBus.emit('del:tag','hoverText')
	},
})

const Click = new NUtils.pressTimer({
	time: 50,
	call (e) {
		if (!props.click) return
		Click.var.time += 150
		let v = (Click.var.time/props.clickTime)*100
		if (v<0) v = 0
		if (v>100) v = 100
		NEventBus.emit('set:tag','progress',v)
		if (Click.var.time>props.clickTime) {
			Click.var.time = 0
			Click.cool()
			PlayClick()
			emits('click',e)
		}
	},
	stop () {
		Click.var.time = 0
		NEventBus.emit('del:tag','progress')
	},
	start () {
		Click.var.time = 0
		NEventBus.emit('set:tag','progress',0)
	}
})

</script>

<style scoped>
.event-layer {
	box-sizing: border-box;
	padding: 0;
	margin: 0;
	user-select: none;
	pointer-events: all;
}
</style>
