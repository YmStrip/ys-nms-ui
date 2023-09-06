<template>
	<div class="yn-text">
		<br>
		<Icon
			style="margin-right: 5px"
			v-if="icon"
			:icon="icon"
			:size="getSize-4"
			:width="getSize"
			:light="iconLight"
			:light-color="iconLightColor"
			:light-opacity="0.8"
		></Icon>
		<div :class="{tab,context:true}">
			<slot></slot>
			<Border
				:linear-gradient="false"
				v-if="tab"
				pos="3"
				type="line"
				line-width="1"
				:color="lineColor"
			></Border>
		</div>
	</div>
</template>

<script lang="ts" setup>

import {computed} from "vue";
import Icon from "../icon/Icon.vue";
import Border from "../border/Border.vue";

//@ts-ignore
const props = withDefaults(defineProps<{
	lineColor?: string
	borderBottom?: boolean
	color: string
	size: number
	tab?: boolean
	icon?: string
	iconLight?: boolean
	iconLightColor?
}>(), {
	color: 'white',
	size: 18,
	lineColor: 'rgba(85,85,85)'
})

const getSize = computed(() => {
	if (props.tab) {
		return props.size + 5
	}
	return props.size
})


</script>

<style scoped>
.yn-text {
	user-select: none;
	box-sizing: border-box;
	position: relative;
	padding: 2px 5px;
	margin: v-bind("tab?'10px 0px':'4px 0px'");
	display: flex;
	align-items: center;
}

.tab {
	font-family: "Microsoft YaHei";
}

.context {
	position: relative;
	padding: v-bind("tab?'1px 0px 5px 0px':''");
	flex: 1;
	font-family: "Microsoft YaHei UI Light";
	font-size: v-bind(getSize+ 'px');
	color: v-bind(color);
}

.border-bottom {
	position: absolute;
	bottom: 0px;
	left: 0px;
	width: 100%;
	height: 1px;
	background: linear-gradient(45deg, rgba(255, 255, 255, 0.2), v-bind(color), rgba(255, 255, 255, 0.2));
	border-radius: 10px;
	pointer-events: none;
	z-index: 10;
}
</style>
