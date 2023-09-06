<template>
	<event-layer
		v-bind="event"
		:class="props.class"
		:style="props.style"
	>
		<div
			:class="Object.assign({
				active,
				'font-family': true,
				'yn-button':true
			},
				NUtils.parseClass(props.contentClass)
			)"
			:style="props.contentStyle"
		>
			<slot></slot>
			<slot name="border"></slot>
		</div>
	</event-layer>
</template>

<script lang="ts" setup>
import EventLayer from "../event-layer/EventLayer.vue";
import {ButtonProps} from "./props";
import {NUtils} from "../utils/n";


//@ts-ignore
const props = withDefaults(defineProps<ButtonProps>(),{
	//basic,
	event: {},
	size: 18,
	padding: '10px 15px',
	margin: '5px',
	color: 'white',
	back: 'rgba(0,34,85,0.1)',
	//active
	activeColor: 'black',
	activeBack: '#dead20',
	//hover
	hoverBack: 'linear-gradient(45deg,rgba(0,34,85,0.4),rgba(88,102,152,0.4))',
	hoverColor: 'white',
	//border
	borderLeft: '2px solid rgba(255,255,255,0.4)',
	hoverBorderLeft: '2px solid white'
})


</script>

<style scoped lang="less">
@import "../style/font-family";
.yn-button {
	position: relative;
	font-size: v-bind("size+'px'");
	color: v-bind(color);
	margin: v-bind(margin);
	padding:v-bind(padding);
	display: inline-block;
	transition-duration: 0.2s;
	background: v-bind(back);
	border-left: v-bind(borderLeft);
	border-right: v-bind(borderRight);
	border-top: v-bind(borderTop);
	border-bottom: v-bind(borderBottom);
}
.yn-button:hover {
	background: v-bind(hoverBack);
	color: v-bind(hoverColor);
	border-left: v-bind("hoverBorderLeft||borderLeft");
	border-right: v-bind("borderRight||borderRight");
	border-top: v-bind("borderTop||borderTop");
	border-bottom: v-bind("borderBottom||borderBottom");
}
.yn-button:active ,.yn-button.active{
	border-color: rgba(0,0,0,0);
	color: v-bind("activeColor||hoverColor||color");
	background: v-bind("activeBack||hoverBack||back");
}
</style>
