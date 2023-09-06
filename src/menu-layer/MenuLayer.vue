<template>
  <div class="yn-menu-layer">
	  <div
		  :class="{'bar-layout':true,['pos'+pos]:true}"
		  :style="barStyle"
	  >
		  <template v-if="type=='select'">
			  <div :class="{select:true,['pos'+pos]:true}">
				  <Button
					  v-bind="selectAppendProps"
					  class="selectAppend"
					  @click="store.leftClick()"
				  >
					  <Icon
						  :width="size"
						  :size="size-10"
						  :icon="(pos=='1'||pos=='3')?'solar:alt-arrow-left-bold':'solar:alt-arrow-up-bold'"
					  ></Icon>
				  </Button>
				  <keyboard
					  v-bind="keyboardProps(size)"
					  :keyboard="leftKeyboard"
					  class="left"
					  @call="store.leftClick()"
				  >
				  </keyboard>
				  <div
					  class="over"
					  ref="over"
				  >
					  <span
						  v-for="(d,i) in menu"
						  :ref="'menu-'+d.name"
					  >
						   <Button
							   v-bind="selectAppendProps"
							   @click="()=>{v=d.name;store.emit()}"
						   >
						  <div
							  :class="{'select-button':true,active:v==d?.name}"

						  >
							  <span> {{d.label||d.name}}</span>
						  </div>
					  </Button>
					  </span>

				  </div>
				  <keyboard
					  v-bind="keyboardProps(size)"
					  :keyboard="rightKeyboard"
					  class="right"
					  @call="store.rightClick()"
				  >
				  </keyboard>
				  <Button
					  v-bind="selectAppendProps"
					  class="selectAppend"
					  @click="store.rightClick()"
				  >
					  <Icon
						  :width="size"
						  :size="size-10"
						  :icon="(pos=='1'||pos=='3')?'solar:alt-arrow-right-bold':'solar:alt-arrow-down-bold'"
					  ></Icon>
				  </Button>
			  </div>
		  </template>
		  <template v-if="type=='scroll'">
			  <Scroller
				  :pos="pos"
				  :size="size-15"
				  :value="store.scroll"
				  :thumb-width="thumbWidth"
			  >

			  </Scroller>
		  </template>
		  <template v-if="type=='page-scroll'">
			  <Scroller
				  ref="page-scroll"
				  :pos="pos"
				  :size="size-15"
				  :value="store.pageScroll"
				  :thumb-width="store.pageThumbWidth"
				  @wheel.stop.prevent="e=>store.handlePageWheel(e)"
			  >

			  </Scroller>
		  </template>
		  <slot name="bar"></slot>
	  </div>
	  <div
		  v-if="type=='none'||type=='select'"
		  ref="content"
		  :class="{'content-layout':true,['pos'+pos]:true,[type]:true}"
		  :style="contentStyle"

	  >
		  <slot></slot>
		  <slot :name="v"></slot>
	  </div>
	  <div
		  v-else-if="type=='scroll'"
		  ref="content"
		  :class="{'content-layout':true,['pos'+pos]:true,[type]:true}"
		  :style="contentStyle"
		  @scroll.stop="store.handleScroll()"
	  >
		  <slot></slot>
	  </div>
	  <div
		  v-else-if="type=='page-scroll'"
		  ref="content"
		  :class="{'content-layout':true,['pos'+pos]:true,[type]:true}"
		  :style="contentStyle"
		  @wheel.stop.prevent="e=>store.handlePageWheel(e)"
	  >
		  <slot :name="v"></slot>
		  <slot :page="v"></slot>
	  </div>
  </div>
</template>

<script lang="ts" setup>
import Button from "../button/Button.vue";
import Icon from "../icon/Icon.vue";
import {getCurrentInstance, onMounted, onUnmounted, reactive, ref, watch} from "vue";
import Keyboard from "../keyboard/Keyboard.vue";
import Scroller from "./Scroller.vue";
import {NUtils} from "../utils/n";


//@ts-ignore
const props = withDefaults(defineProps<{
	//菜单栏 选项 , 分页滚动条 , 普通的滚动条
	type: 'select' | 'page-scroll' | 'scroll' | 'none',
	size?: number
	activeBack?: string
	activeColor?: string
	modelValue?: any
	barStyle?: any
	contentStyle?: any
	pos?: '1' | '2' | '3' | '4'
	//select选项
	menu?: {label:string,name:string}[]
	leftKeyboard?: string[]
	rightKeyboard?: string[]
	barFlex?: number | false
	//scroll选项
	thumbWidth?: number
	//page-scroll选项
	page: number


}>(),{
	page: 5,
	thumbWidth: 50,
	barFlex: 1,
	size: 40,
	type: 'select',
	menu: [{label:'A',name:'A'}],
	leftKeyboard: ['Q'],
	rightKeyboard: ['E'],
	pos: '1',
	activeBack: '#dead20',
	activeColor: '#111111',
})
const emits = defineEmits<{
	'update:modelValue': any
}>()
const v = ref(props.modelValue||'A')
const instance = getCurrentInstance()
//PROPS
const selectAppendProps = {
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
const keyboardProps = () => ({
	size: props.size-26,
	width: props.size-16,
	border: '3px solid white'
})

const store = reactive(new class {
	//SELECT
	selectIndex = 0
	leftClick () {
		this.leftSelect()
	}
	rightClick () {
		this.rightSelect()
	}
	leftSelect () {
		if (!props.menu.length) {
			return
		}
		if (this.selectIndex<=0) this.selectIndex = props.menu.length
		this.selectIndex --
		v.value=props.menu[this.selectIndex]?.name
		this.emit()
	}
	rightSelect () {
		if (!props.menu.length) {
			return
		}
		if (this.selectIndex>=props.menu.length-1) this.selectIndex = -1
		this.selectIndex ++
		v.value=props.menu[this.selectIndex]?.name
		this.emit()
	}
	scrollOver () {
		const over:HTMLElement = <any>instance?.refs.over;
		if (!over) return
		const refEl:HTMLElement = <any>instance?.refs['menu-'+v.value]?.[0]
		if (!refEl) return
		refEl.scrollIntoView(false)
	}
	//SCROLL
	scroll = 0
	handleScroll () {
		const el:HTMLElement = <any>instance?.refs.content;
		if (!el) return
		const scrollTop = el.scrollTop;
		const scrollHeight = el.scrollHeight - el.clientHeight;
		const scrollPercentage = (scrollTop / scrollHeight) * 100;
		this.scroll = scrollPercentage
	}
	//PAGE-SCROLL
	pageScroll = 0
	pageThumbWidth = 100
	initPageThumbWidth () {
		let d = <any>instance?.refs['page-scroll'];
		if (!d) return
		if (!d.getContainerLength) return;
		let length = d.getContainerLength () || 200
		this.pageThumbWidth = length / props.page
	}
	handlePageWheel (e:WheelEvent) {
		if (this.pageWait) return
		if (e.deltaY > 0) {
			this.fixPageValue(1)
		}
		else {
			this.fixPageValue(-1)
		}
	}
	pageWait = false
	fixPageValue (add:number) {
		if (!Number.isFinite(v.value)) v.value = 0
		v.value += add
		if (v.value<1) v.value = 1
		if (v.value>props.page) v.value = props.page
		//get-key map x => [1,a] -> [0,1]
		this.pageScroll = (v.value-1) / (props.page-1) * 100
		this.pageWait = true
		setTimeout(()=>{
			delete this.pageWait
		},50)
	}
	//DEFAULT
	init () {
		if (props.type=='select') {
			v.value = props.modelValue
			this.selectIndex = 0
			for (let i = 0 ; i < props.menu.length; ++i ) {
				if (v.value==props.menu[i].name) {
					v.value = i
					break
				}
			}
			this.scrollOver()
		}
		//
		else if (props.type=='page-scroll') {
			this.unInit()
			if (!Number.isFinite(v.value)) v.value = 1
			this.fixPageValue(0)
			this.initPageThumbWidth()
		}
	}
	unInit () {
	}
	emit () {
		emits('update:modelValue',v.value)
		this.scrollOver()
	}
})

onMounted(()=>{
	store.init()
})
onUnmounted(()=>{
	store.unInit()
})
watch(()=>props.type,()=>{
	store.init()
})
watch(props,()=>{
	store.init()
})

</script>

<style lang="less" scoped>
.yn-menu-layer {
	box-sizing: border-box;
	position: relative;
}
.content-layout {
	box-sizing: border-box;
	position: absolute;
	&.pos1 {
		width: 100%;
		height: calc(100% - v-bind("size+'px'"));
		left: 0;
		top: v-bind("size+'px'");
	}
	&.pos2 {
		height: 100%;
		width: calc(100% - v-bind("size+'px'"));
		top: 0;
		right: v-bind("size+'px'");
	}
	&.pos3 {
		width: 100%;
		height: calc(100% - v-bind("size+'px'"));
		left: 0;
		bottom: v-bind("size+'px'");
	}
	&.pos4 {
		height: 100%;
		width: calc(100% - v-bind("size+'px'"));
		top: 0;
		left: v-bind("size+'px'");
	}
	&.scroll {
		overflow: scroll;
		&::-webkit-scrollbar-thumb {
			width: 0px;
			height: 0px;
		}
		&::-webkit-scrollbar {
			width: 0px;
			height: 0px;
		}
		&::-webkit-scrollbar-track {
			width: 0px;
			height: 0px;
		}
	}
	&.page-scroll {
		overflow: hidden;
	}
}
.bar-layout {
	background: v-bind("type=='select'?'#333333':''");
	position: absolute;
	display: flex;
	align-items: center;
	&.pos1 {
		width: 100%;
		height: v-bind("size+'px'");
		left: 0;
		top: 0;
	}
	&.pos2 {
		flex-direction: column;
		height: 100%;
		width: v-bind("size+'px'");
		right: 0;
		top: 0;
	}
	&.pos3 {
		width: 100%;
		height: v-bind("size+'px'");
		left: 0;
		bottom: 0;
	}
	&.pos4 {
		flex-direction: column;
		height: 100%;
		width: v-bind("size+'px'");
		left: 0;
		top: 0;
	}
}



.select {
	height: 100%;
	display: flex;
	align-items: center;
	.over {
		display: flex;
		box-sizing: border-box;
		vertical-align: top;
		flex: v-bind(barFlex);
		white-space: nowrap;
		overflow: scroll;
		&::-webkit-scrollbar-thumb {
			width: 0px;
			height: 0px;
		}
		&::-webkit-scrollbar {
			width: 0px;
			height: 0px;
		}
		&::-webkit-scrollbar-track {
			width: 0px;
			height: 0px;
		}
	}
	&.pos2 , &.pos4 {
		flex-direction: column;
		.over {
			flex-direction: column;
		}
	}
	.select-button.active {
		background: v-bind(activeBack);
		color: v-bind(activeColor);
	}
	&.pos1 .select-button , &.pos3 .select-button {
		height: v-bind('size+"px"');
		line-height:  v-bind('size+"px"');
		padding: 0px 10px;
	}
	&.pos2 .select-button , &.pos4 .select-button {
		width: v-bind('size+"px"');
		line-height:  v-bind('size+"px"');
		text-align: center;
		padding: 10px 0px;
		writing-mode: vertical-lr;
	}
	&.pos1 .left , &.pos3 .left {
		margin-right: 10px;
	}
	&.pos1 .right , &.pos3 .right {
		margin-left: 10px;
	}
	&.pos2 .left , &.pos4 .left {
		margin-bottom: 10px;
	}
	&.pos2 .right , &.pos4 .right {
		margin-top: 10px;
	}
}




</style>
