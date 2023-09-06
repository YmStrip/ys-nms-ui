<template>
	<div @click="call" class="cont font-family">
		<template v-for="(d,i) in keyboard">
			<div v-if="i>0" class="pipe">+</div>
			<div style="display: inline-block">
				<div :class="{keyboard,padding:d.length>1}">
					<div style="text-align: center;flex: 1">
						{{d}}
					</div>
				</div>
			</div>
		</template>
	</div>
</template>
<script lang="ts" setup>
import {onMounted, onUnmounted, reactive, watch} from "vue";
import {MusicUtils} from "../utils/music";
//@ts-ignore
const props = withDefaults(defineProps<{
	padding?: string
	radius?: number
	size?: string
	border?: string
	width?: number
	color?: string
	keyboard: string[]
	//等待秒
	wait?: number
	//可持续
	keep?: boolean
	callMusic?:boolean
}>(),{
	padding: '0px 5px',
	border: '4px solid white',
	callMusic: true,
	radius: 0,
	borderWidth: 2,
	fontSize: '0.8em',
	wait: 0,
	keep: false,
	size: 16,
	keyboard: ['A'],
	color: 'white',
})

const playCall = () => {
	if (props.callMusic) MusicUtils.playClick()
}

const emits = defineEmits<{
	'call': any[]
}>()
//轮子：当按下一个键的时候,
const info = reactive({
	list: {},
	//等待中
	wait: false,
	//当前触发持续
	keep: false,
	//当前的检测列表
	test: {},
	up (e:KeyboardEvent) {
		let key = e.key.toLowerCase()
		//删除
		delete this.test['_'+key]
		delete this.test[key]
		//如果是需求列表,立即结束keep
		if (this.list[key]) {
			this.keep = false
		}
	},
	input (e:KeyboardEvent) {
		let key = e.key.toLowerCase()
		//预处理Key
		{
			if (!this.test[key]) this.test[key] = 0
			this.test[key]++
			const cache = this.test[key]
			this.test['_'+key] = cache
		}
		//检测函数
		{
			for (let i in this.list) {
				if (!this.test[i]) return
			}
		}
		//wait中
		if (this.wait) return
		this.wait = true
		setTimeout(()=>{
			this.wait = false
		},props.wait || 0)
		//已经执行中
		if (this.keep&&!props.keep) return
		this.keep = true
		call()
	}
})
const call = () => {
	playCall()
	emits('call',true)
}
const ev = (e) => {
	info.input(e)
}
const dev = (e) => {
	info.input(e)
}
const uev = (e) => {
	info.up(e)
}
const init = () => {
	info.list = {}
	for (let i in props.keyboard) {
		info.list[props.keyboard[i].toLowerCase()] = true
	}
}
onMounted(()=>{
	document.addEventListener('keydown',dev)
	document.addEventListener('keyup',uev)
})
onUnmounted(()=>{
	document.removeEventListener('keydown',dev)
	document.removeEventListener('keyup',uev)
})
init()

watch(()=>props.keyboard,()=>{
	init()
})

</script>
<style scoped lang="less">
@import "../style/font-family";
.cont {
	box-sizing: border-box;
	vertical-align: top;
	display: inline-block;
	user-select: none;
}
.pipe {
	display: inline-block;
	margin: 0px 5px;
}
.keyboard {
	display: flex;
	align-items: center;
	box-sizing: border-box;
	color: v-bind("color");
	padding: v-bind(padding);
	height: v-bind("(width!==undefined?width:size+16)+'px'");
	font-size:v-bind("size+'px'");
	text-align: center;
	border-radius: v-bind("radius+'px'");
	border: v-bind("border");
}
.keyboard.padding {
	margin: 0px 4px;
}
</style>