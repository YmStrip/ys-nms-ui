<template>
	<div style="display: inline-block;vertical-align: top">
		<div class="yn-icon">
			<icon
				v-if="store.show"
				:icon="props.icon"
				class="icon"
				style="flex: 1"
			>
			</icon>
			<div class="light" v-if="light"></div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import {Icon} from "@iconify/vue";
import {ColorUtils} from "../utils/color";
import {onUnmounted, reactive, watch} from "vue";
//@ts-ignore
const props = withDefaults(defineProps<{
	width?: number
	size?: number
	color?: string
	icon?: string
	//高亮
	light?: boolean
	//颜色
	lightColor?: string
	lightOpacity?: number
	//重复播放?
	repeatTime?: number
}>(), {
	icon: 'game-icons:perspective-dice-six-faces-random',
	color: 'white',
	lightColor: 'gold',
	lightOpacity: 0.5,
	size: 18,
	repeatTime: 0
})

const getColor = () => {
	let C = ColorUtils.getRgb(props.lightColor)
	C.a = props.lightOpacity
	let d = ColorUtils.rgb2hex(C)
	return d
}

const store = reactive(new class {
	show = true
	getIcon () {
		return props.icon
	}
	repeatIter
	init () {
		if (this.repeatIter) clearInterval(this.repeatIter)
		if (props.repeatTime>0) {
			this.repeatIter = setInterval(()=>{
				this.show = false
				setTimeout(()=>{
					this.show = true
				},150)
			},props.repeatTime)
		}
	}
	unInit () {
		if (this.repeatIter) clearInterval(this.repeatIter)
		delete this.repeatIter
	}
})
store.init()
onUnmounted(()=>{
	store.unInit()
})
watch(()=>props.repeatTime,()=>{
	store.init()
})
</script>

<style scoped>
.icon {
	background: rgba(0, 0, 0, 0);
	color: v-bind(color);
	font-size: v-bind(size+ 'px');
}

.light {
	z-index: 10;
	position: absolute;
	left: 50%;
	top:50%;
	width: 0px;
	height:0px;
	border-radius: 50%;
	box-shadow: 0 0 v-bind("(size/1.5)+'px'") v-bind("(size/4)+'px'") v-bind('getColor()');
}

.yn-icon {
	position: relative;
	background: rgba(0, 0, 0, 0);
	vertical-align: top;
	padding: 0;
	box-sizing: border-box;
	width: v-bind("(width||size)+'px'");
	height: v-bind("(width||size)+'px'");
	display: flex;
	justify-items: center;
	align-items: center;

}
</style>
