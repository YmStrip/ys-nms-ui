<template>
	<div class="container font-family">
		<div class="label">
			<slot v-if="$slots.label"></slot>
			<div v-else>
				{{label}}
			</div>
		</div>
		<div class="yn-list-form ">
			<Button
				v-bind="AppendProps"
				v-if="store.isLeftAppend(type)"
				class="append left"
				@mousedown="()=>{
				RemovePress.in();
				store.leftClick()
			}"
				@mouseover="RemovePress.out()"
				@mouseup="()=>RemovePress.out()"
			>
				<Icon
					:size="size-4"
					:width="size"
					:icon="store.getLeftIcon(type)"
				></Icon>
			</Button>
			<Button
				content-style="width: 100%"
				v-bind="ContentProps(type,leftBorder)"
				class="center"
			>
				<template #border>
					<Border
						v-if="inBorder"
						size="5"
						border-width="1.5"
						pos="2"
						type="border"
						:color="color"
					>
					</Border>
					<slot name="border"></slot>
				</template>
				<div class="content">
					<input
						ref="input"
						class="input"

						v-if="store.isInput(type)"
						v-model="v"

						:type="store.getInputType(store.inputEye,type)"

						@keydown.stop
						@keypress.stop
						@input="()=>{store.input(this.$refs.input.value)}"
					>
					<div
						v-else-if="type=='select'"
						class="select"
						@click="store.rightClick()"
					>
						{{ store.selectLabel(v,type) }}
					</div>
				</div>
			</Button>
			<Button
				v-bind="AppendProps"
				v-if="store.isRightAppend(type)"
				class="append right"
				@mousedown="()=>{
				AddPress.in();
				store.rightClick()
			}"
				@mouseover="AddPress.out()"
				@mouseup="()=>AddPress.out()"
			>
				<Icon
					:size="size-4"
					:width="size"
					:icon="store.getRightIcon(type,store.inputEye)"
				></Icon>
			</Button>
		</div>
	</div>
</template>
<script setup lang="ts">

import {reactive, ref, watch} from "vue";
import {NUtils} from "../utils/n";
import Icon from "../icon/Icon.vue";
import Border from "../border/Border.vue";
import Button from "../button/Button.vue";
import {MusicUtils} from "../utils/music";


//@ts-ignore
const props = withDefaults(defineProps<{
	type: 'number' | 'select' | 'input' | 'password'
	options?: { label: string, value: any }[]
	modelValue?: any
	color?: string
	size?: number
	padding?: string
	//数字加速度
	numberTime?: number
	numberSpeed?: number
	//flex
	flex?: number
	label?: string
	append?: boolean
	//样式
	inBorder?: boolean
	leftBorder?: boolean
}>(), {
	flex: 0.25,
	label: '',
	padding: '0px 10px',
	options: [],
	numberSpeed: 50,
	numberTime: 10 * 1000,
	color: '#10ebeb',
	size: 28,
	append: true,
	inBorder: true,
	leftBorder: false
})


const emits = defineEmits<{ 'update:modelValue': any }>()





const AppendProps = {
	event: {
		click: false,
		clickMusic: false,
		hoverMusic: false,
		hover: true
	},
	borderLeft: '',
	hoverBorderLeft:"",
	padding: '0',
	margin: '0',
}
const ContentProps = (type?) => {
	const data = {
		borderLeft: '',
		hoverBorderLeft:"",
		padding: '0px',
		margin: '0px',
		event: {
		}
	}
	//BORDER-STYLE
	if (props.leftBorder) {
		delete data.borderLeft
		delete data.hoverBorderLeft
	}
	//INPUT,NUMBER,PASSWORD
	if (props.type=='input'||props.type=='number'||props.type=='password') {
		data.event = {
			click: false,
			clickMusic: false,
			hoverMusic: false,
			hover: false
		}
	}
	//CanClick
	else {
		data.event = {
			click: false,
			clickMusic: true,
			hover: true,
			hoverMusic: true
		}
	}
	return data
}


const store = reactive(new class{
	inputEye = true
	isInput (type) {
		return type=='number'||type=='password'||type=='input'
	}
	getInputType (...arg) {
		if (props.type=='password') {
			if (this.inputEye) {
				return 'password'
			}
		}
		return 'text'
	}
	isAppend () {
		if (!props.append) return false
		if (props.type=='number'||props.type=='select') return true
	}
	isLeftAppend () {
		return this.isAppend()
	}
	isRightAppend () {
		return this.isLeftAppend() || (props.type=='password')
	}
	getLeftIcon (...arg) {
		return 'solar:alt-arrow-left-bold'
	}
	getRightIcon (...arg) {
		if (props.type=='password') {
			if (this.inputEye) {
				return 'foundation:eye'
			}
			return 'mingcute:eye-close-line'
		}
		return 'solar:alt-arrow-right-bold'
	}

	selectIndex = 0

	leftClick () {
		MusicUtils.playHover()
		if (props.type=='number') {
			v.value--
			this.emit()
		}
		//
		else if (props.type=='select') {
			this.leftSelect()
		}
	}
	rightClick () {
		MusicUtils.playHover()
		if (props.type=='number') {
			v.value++
			this.emit()
		}
		//
		else if (props.type=='select') {
			this.rightSelect()
		}
		//password
		else if (props.type=='password') {
			this.inputEye = !this.inputEye
		}
	}
	leftSelect = () => {
		if (!props.options.length) return
		if (this.selectIndex <= 0) this.selectIndex = props.options.length
		this.selectIndex --
		v.value = props.options[this.selectIndex].value
		this.emit()
	}
	rightSelect () {
		if (!props.options.length) return
		if (this.selectIndex >= props.options.length - 1) this.selectIndex = -1
		this.selectIndex++
		v.value = props.options[this.selectIndex].value
		this.emit()
	}
	selectLabel (v:any) {
		for (let i in props.options) {
			if (props.options[i] == v) return v
			if (props.options[i].value == v) return props.options[i].label || v
		}
		return v
	}
	emit () {
		emits('update:modelValue',v.value)
	}
	input (data) {
		emits('update:modelValue',data)
	}
	init () {
		//initSelect
		{
			this.selectIndex = 0
			for (let i = 0; i < props.options.length; ++i) {
				if (props.options[i]?.value == v.value) {
					this.selectIndex = i
					break
				}
			}
		}
	}
})







const v = ref(props.modelValue)

const Remove = new NUtils.speedCall({
	maxSpeed: props.numberSpeed,
	time: props.numberTime,
	call() {
		store.leftClick()
	}
})
const RemovePress = new NUtils.pressTimer({
	call(e) {
		Remove.emit(e)
	},
	stop() {
		Remove.stop()
	}
})

const Add = new NUtils.speedCall({
	maxSpeed: props.numberSpeed,
	time: props.numberTime,
	call() {
		store.rightClick()
	}
})
const AddPress = new NUtils.pressTimer({
	call(e) {
		Add.emit(e)
	},
	stop() {
		Add.stop()
	}
})



watch(() => props.modelValue, (vs) => {
	v.value = vs
	store.init()
})

store.init()

</script>
<style scoped lang="less">

@import "../style/font-family";

.yn-list-form {
	flex: 1;
	cursor: none;
	height: v-bind("height+ 'px'");
	display: flex;
	box-sizing: border-box;
	.append {
		width: v-bind("size+ 'px'");
		height: v-bind("size+ 'px'");
		&.left {
			margin-right: 3px;
		}
		&.right {
			margin-left: 3px;
		}
	}
	.center {
		flex: 1;
		line-height: v-bind("size+'px'");
		height:  v-bind("size+'px'");
	}
}

.input,.center,.select {
	color: v-bind(color);
}

.content {
	width: 100%;
	padding: 0px 5px;
}

.container {
	font-family: "Microsoft YaHei UI Light";
	position: relative;
	display: flex;
	align-items: center;
	.label {
		font-size: v-bind("(size/25)+'em'");
		height: v-bind("size+'px'");
		line-height: v-bind("size+'px'");
		padding-right: 5px;
		text-align: right;
		flex: v-bind(flex);
		width: 150px;
	}
}


.data {
	cursor: none;
	position: relative;
	font-weight: lighter;
	color: v-bind(color);
	flex: 1;
	text-align: left;
}

.input {
	cursor: none;
	font-size: v-bind("(size/24)+'em'");
	color: v-bind(color);
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0);
	padding: v-bind(padding);
	text-align: left;
	outline: none;
	border: 0;
}

.select {
	font-size: v-bind("(size/24)+'em'");
	cursor: none;
	padding: v-bind(padding);
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
</style>