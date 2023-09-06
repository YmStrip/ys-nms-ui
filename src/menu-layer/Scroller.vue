<template>
	<div :class="{'yn-scroller':true,['pos'+pos]:true}">
		<Button
			v-bind="iconProps"
		>
			<Icon
				:repeat-time="2500"
				:size="size"
				:icon="(pos=='2'||pos=='4')?'line-md:chevron-small-double-up':'line-md:chevron-small-double-left'"
			></Icon>
		</Button>
		<div
			class="thumb-container"
			ref="thumb-container">
			<div class="thumb">
				<slot v-if="$slots.default"></slot>
				<div v-else class="thumb-style" style="color: black">
				</div>
			</div>
		</div>
		<Button
			v-bind="iconProps"
		>
			<Icon
				:repeat-time="2500"
				:size="size"
				:icon="(pos=='2'||pos=='4')?'line-md:chevron-small-double-down':'line-md:chevron-small-double-right'"
			></Icon>
		</Button>
	</div>
</template>
<script lang="ts" setup>
import Button from "../button/Button.vue";
import Icon from "../icon/Icon.vue";
import {defineSlots, getCurrentInstance} from "vue";


//@ts-ignore
const props = withDefaults(defineProps<{
	padding?: string
	border?: string
	radius?: number
	size?: number
	pos?: '1' | '2' | '3' | '4'
	thumbWidth?: number
	color?: string
	back?: string
	value?: any
}>(),{
	value: 0,
	color: 'white',
	back: 'rgba(255,255,255,0.3)',
	border: '2px solid rgba(255,255,255,0.5)',
	radius: 15,
	padding: '2px 1px',
	thumbWidth: 50,
	size: 40,
	pos: '1'
})
const instance = getCurrentInstance()
const getPosY = () => {
	let v = props.value
	if (v<0) v = 0
	if (v>100) v = 100
	const el:HTMLElement = <any>instance?.refs['thumb-container'];
	if (!el) return
	const p = (el.offsetHeight - props.thumbWidth) * v / 100
	return p+'px'
}
const getPosX = () => {
	let v = props.value
	if (v<0) v = 0
	if (v>100) v = 100
	const el:HTMLElement = <any>instance?.refs['thumb-container'];
	if (!el) return
	const p = (el.offsetWidth - props.thumbWidth) * v / 100
	return p+'px'
}

defineExpose({
	getContainerRef () {
		return instance?.refs['thumb-container']
	},
	getContainerLength () {
		let el:HTMLElement = <any>instance?.refs['thumb-container'];
		if (!el) return
		if (props.pos=='1'||props.pos=='3') return el.offsetWidth;
		return; el.offsetHeight
	}
})

const iconProps = {
	event: {
		click: false,
		hoverMusic: false,
	},
	margin:'',
	padding: '',
	back: '',
	hoverBack: '',
	activeBack: '',
	activeColor: '',
	borderLeft: '',
	hoverBorderLeft: '',
}
</script>
<style scoped lang="less">
.yn-scroller {
	align-items: center;
	box-sizing: border-box;
	border: v-bind(border);
	border-radius: v-bind("radius+'px'");
	padding: v-bind(padding);
	display: flex;
	.thumb-container {
		position: relative;
		background: v-bind(back);
		flex: 1;
	}

	.thumb-style {
		width: 100%;
		height: 100%;
		background: v-bind(color);
	}
	&.pos2,&.pos4 {
		flex-direction: column;
		width: v-bind("size+'px'");
		height: 100%;
		.thumb-container {
			width: 65%;
			height: 100%;
			flex-direction: column;
		}
		.thumb {
			position: absolute;
			width: 100%;
			height: v-bind("thumbWidth+'px'");
			top: v-bind('getPosY(value,thumbWidth)');
		}
	}
	&.pos1,&.pos3 {
		height: v-bind("size+'px'");
		width: 100%;
		.thumb-container {
			height: 65%;
			width: 100%;
		}
		.thumb {
			position: absolute;
			height: 100%;
			width: v-bind("thumbWidth+'px'");
			left: v-bind('getPosX(value,thumbWidth)');
		}
	}

}
</style>