<template>
	<keyboard
		@call="e=>{}"
		:keyboard="['SHIFT','A']"
	></keyboard>
	<br>
	<keyboard
		keep
		@call="e=>{}"
		:keyboard="['SHIFT','B']"
	></keyboard>
</template>
<script setup lang="ts">
import Keyboard from "../Keyboard.vue";
import {NUtils} from "../../utils/n";
</script>