<template>
	<div
		:class="{
	  'yn-border':true,
	  ['pos'+pos]: true,
	  [type]: true,
	  active
	  }"
	>
	</div>
</template>

<script lang="ts" setup>
import {ColorUtils} from "../utils/color";
import button from "../button";

//@ts-ignore
const props = withDefaults(defineProps<{
	left?: string
	top?: string
	pos: '1' | '2' | '3' | '4'
	type?: 'border' | 'cube' | 'line'
	borderWidth?: number
	borderSize?: number
	borderRadius?: number
	cubeSize?: number
	lineWidth?: number
	color?: string
	active?: boolean
	activeColor?: string
	linearGradient?: boolean
	opacity?: number
}>(), {
	opacity: 0.6,
	linearGradient: true,
	borderRadius: 0,
	cubeSize: 4,
	lineWidth: 0.5,
	pos: '1',
	type: 'border',
	borderWidth: 0.5,
	borderSize: 5,
	color: 'rgba(255,255,255)',
	activeColor: 'orange'
})

const getLineColor = (mode:1|2=1) => {
	if (!props.linearGradient) return getColorA(props.color,props.opacity)
	let d = `linear-gradient(to ${mode==1?'right':'bottom'},${getColorA(props.color, props.opacity-0.2)},${getColorA(props.color)},${getColorA(props.color, props.opacity-0.2)})`
	return d
}

const getCubeColor = () => {
	if (!props.linearGradient) return getColorA(props.color,props.opacity)
	let d = `linear-gradient(45deg, ${getColorA(props.color, props.opacity-0.2)}, ${getColorA(props.color, props.opacity+0.2)})`
	return d
}

const getColorA = (c, al = 1) => {
	let color = props.color
	if (props.active) color = props.activeColor
	let d = ColorUtils
		.getRgb(color)
		.setAlpha(al)
		.dump()
	return d
}


</script>

<style scoped lang="less">
.yn-border {
	box-sizing: border-box;
	position: absolute;
}

.border {
	border-radius: v-bind("borderRadius+'px'");
	width: v-bind("borderSize+'px'");
	height: v-bind("borderSize+'px'");
	border: v-bind("borderWidth+'px'") solid v-bind("getColorA(color, opactity,active)");
}

.cube {
	width: v-bind("cubeSize+'px'");
	height: v-bind("cubeSize+'px'");
	background: v-bind("getCubeColor(color,active,opacity)");
}


.pos1 {
	position: absolute;
	left: v-bind("left?left:'0px'");
	top: v-bind("top?top:'0px'");


	&.border {
		border-right: 0px;
		border-bottom: 0px;
	}

	&.line {
		height: v-bind("lineWidth+'px'");
		width: 100%;
		background: v-bind("getLineColor(1,color,active,opacity)")
	}
}

.pos2 {
	position: absolute;
	right: v-bind("left?left:'0px'");
	top: v-bind("top?top:'0px'");

	&.border {
		border-left: none;
		border-bottom: none;
	}

	&.line {
		width: v-bind("lineWidth+'px'");
		height: 100%;
		background: v-bind("getLineColor(2,color,active,opacity)")
	}
}

.pos3 {
	position: absolute;
	right: v-bind("left?left:'0px'");
	bottom: v-bind("top?top:'0px'");

	&.border {
		border-top: none;
		border-left: none;
	}

	&.line {
		height: v-bind("lineWidth+'px'");
		width: 100%;
		background: v-bind("getLineColor(1,color,active,opacity)")
	}
}

.pos4 {
	position: absolute;
	left: v-bind("left?left:'0px'");
	bottom: v-bind("top?top:'0px'");

	&.border {
		border-top: none;
		border-right: none;
	}

	&.line {
		width: v-bind("lineWidth+'px'");
		height: 100%;
		background: v-bind("getLineColor(2,color,active,opacity)")
	}
}


</style>
