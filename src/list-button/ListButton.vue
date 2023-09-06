<template>
	<div
		@mouseenter="()=>info.active=true"
		@mouseleave="()=>info.active=false"
		@mousedown="()=>info.active=true"
		class="modal"
	>
		<div
			:style="contentStyle"
			:class="{
				'left-border': leftBorder,
				scale,
				container:true,
				border:true,
				active: active||info.active
			}"
		>
			<Icon
				v-if="icon"
				:size="size"
			>
			</Icon>

			<slot></slot>
			<div v-if="twoPoint">

			</div>
			<div v-if="twoPoint" :class="{point:true,point1:true,active:active||info.active}"></div>
			<div v-if="twoPoint" :class="{point:true,point2:true,active:active||info.active}"></div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import {Icon} from "@iconify/vue";
import {reactive} from "vue";
//@ts-ignore
const props = withDefaults(defineProps<{
	contentStyle?
	padding: string
	size: number
	icon: string
	active?:boolean
	color: string
	margin: any
	fontSize: number
	twoPoint?: boolean
	leftBorder?: boolean
	scale?: boolean
}>(),{
	padding: '0px 5px',
	scale: true,
	leftBorder: true,
	twoPoint: true,
	color: 'orange',
	size: 18,
	margin: '1px 1px'
})
const info = reactive({
	active: false
})
</script>
<style scoped>
.modal {
	width: 100%;
}
.container {
	margin: v-bind(margin);
	left: 0px;
	position: relative;
	font-weight: bold;
	cursor: pointer;
	transition-duration: 0.2s;
	height: v-bind(size+'px');
	line-height: v-bind(size+'px');
	padding: v-bind(padding);
	display: flex;
	font-size: v-bind("(fontSize?fontSize:size-5)+'px'");
	background: linear-gradient(45deg,rgba(255,255,255,0.1),rgba(255,255,255,0.07),rgba(255,255,255,0.1));
}
.container:hover {
	background: linear-gradient(45deg,rgba(255,255,255,0.1),rgba(255,255,255,0.2),rgba(255,255,255,0.1));
}
.icon {
	line-height:0px;
	width: v-bind(size+'px ');
	height: v-bind(size+'px');
	position: relative;
	text-align: center;

}
.icon1 {
	position: relative;
	margin-top: 1px;
	vertical-align: middle;
	font-size: v-bind("(size-2)+'px'");
}
.container.left-border {
	border-left: 3px solid rgba(255,255,255,0.2);
}
.container.active , .container:hover, .container:active {
	border-color: v-bind(color);
	color: v-bind(color);
}
.scale:active {
	transform: scale(0.95);
}
.point {
	top: 0;
	position: absolute;
	width: 3px;
	height: 3px;
	background: rgba(255,255,255,0.4);
}
.point.active {
	background: v-bind(color);
}
.point1 {
	right: 0px;
}
.point2 {
	right: 5px;
}
.modal {
	width: 100%;
	display: inline-block;
}
</style>