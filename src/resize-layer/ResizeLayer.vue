<template>
  <slot
	  :width="info.width"
	  :height="info.height"
  />
</template>

<script lang="ts" setup>


import {onMounted, reactive} from "vue";

const info = reactive({
	width: 0,
	height: 0
})

const init = () => {
	info.height = window.innerHeight
	info.width = window.innerWidth
}

init()

const resize = () => {
	init()
}

onMounted(()=>{
	window.addEventListener('resize',resize)
})


onUnmounted(()=>{
	window.removeEventListener('resize',resize)
})

</script>
