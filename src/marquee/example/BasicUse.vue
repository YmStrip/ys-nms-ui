<template>
	<div style="width: 250px;height: 150px;background: linear-gradient(45deg,#9e9e9e,#607d8b);overflow: hidden">
		<Marquee
			text="AAAAAAAAAAAAAASSSSSSAAAAAAAAAAA"
		></Marquee>
		<Marquee
			text="AAAAAAAAAAAAAASSSSSSAAAAAAAAAAA"
			auto
		></Marquee>
	</div>
</template>
<script setup lang="ts">
import Marquee from "../Marquee.vue";
</script>