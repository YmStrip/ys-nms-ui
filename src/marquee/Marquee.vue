<template>
	<div
		@mouseleave="()=>info.hover=false"
		@mouseenter="()=>info.hover=true"
		class="marquee-container noscroll"
		ref="container">
		<div
			:class="{
				content:true,
				scroll:info.scroll&&(auto||info.hover),
			}"
			ref="content"
		>
			{{ text }}
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts" setup>

import {getCurrentInstance, onMounted, reactive, watch} from "vue";

const props = defineProps<{
	text: string
	auto?: boolean
}>()

const info = reactive({
	hover: false,
	scroll: false,
	display: 'inline'
})
const instance = getCurrentInstance()
const checkOverflow = async () => {
	info.scroll = false
	info.display = 'inline'
	const container: HTMLElement = instance?.refs.container;
	const content: HTMLElement = instance?.refs.content
	if (!content) return
	setTimeout(()=>{
		info.display = 'block'
		if (content.offsetWidth > container.offsetWidth) {
			info.scroll = true

		} else {
			info.scroll = false
		}
	},150)
}
onMounted(() => {
	checkOverflow()
})
watch(() => props.text, () => checkOverflow())
</script>


<style scoped>
.marquee-container {
	width: 100%;
	white-space: nowrap;

}

.content {
	display: v-bind('info.display');
}

.scroll {
	animation: scroll 5s linear infinite;
}

@keyframes scroll {
	0% {
		transform: translateX(-50%);
	}
	50% {
		transform: translateX(25%);
	}
	100% {
		transform: translateX(-50%);
	}
}

</style>
