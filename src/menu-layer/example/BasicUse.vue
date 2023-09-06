<template>
	<mouse-layer style="width: 100%">
		<MenuLayer
			pos="1"
			class="c"
			:bar-flex="1"
			:menu="[
				{
					label: 'A菜单',
					name: 'A'
				},
				{
					label: 'B菜单',
					name: 'B'
				},
				{
					label: 'C菜单',
					name: 'C'
				}
			]"
		>
			DEF
			<template #A>A</template>
		</MenuLayer>
		<MenuLayer
			pos="3"
			class="c"
			:bar-flex="1"
			:menu="[
				{
					label: 'A菜单',
					name: 'A'
				},
				{
					label: 'B菜单',
					name: 'B'
				},
				{
					label: 'C菜单',
					name: 'C'
				}
			]"
		>
			DEF
			<template #A>A</template>
		</MenuLayer>
		<div style="display: flex">
			<MenuLayer
				pos="2"
				class="c1"
				:bar-flex="1"
				:menu="[
				{
					label: 'A菜单',
					name: 'A'
				},
				{
					label: 'B菜单',
					name: 'B'
				},
				{
					label: 'C菜单',
					name: 'C'
				}
			]"
			>
				DEF
				<template #A>A</template>
			</MenuLayer>
			<MenuLayer
				pos="4"
				class="c1"
				:bar-flex="1"
				:menu="[
				{
					label: 'A菜单',
					name: 'A'
				},
				{
					label: 'B菜单',
					name: 'B'
				},
				{
					label: 'C菜单',
					name: 'C'
				}
			]"
			>
				DEF
				<template #A>A</template>
			</MenuLayer>
		</div>
		<br>
		<div style="display: flex">
			<MenuLayer
				pos="1"
				class="c1"
				type="scroll"
			>
				<div style="height: 150px">HHC</div>
				<div style="height: 150px">HHC</div>
				<div style="height: 150px">HHC</div>
				<div style="height: 150px">HHC</div>
				<div style="height: 150px">HHC</div>
			</MenuLayer>
			<MenuLayer
				pos="2"
				class="c1"
				type="scroll"
			>
				<div style="height: 150px">HHC</div>
				<div style="height: 150px">HHC</div>
				<div style="height: 150px">HHC</div>
				<div style="height: 150px">HHC</div>
				<div style="height: 150px">HHC</div>
			</MenuLayer>
		</div>
		<div style="display: flex">
			<MenuLayer
				pos="3"
				class="c1"
				type="scroll"
			>
				<div style="height: 150px">HHC</div>
				<div style="height: 150px">HHC</div>
				<div style="height: 150px">HHC</div>
				<div style="height: 150px">HHC</div>
				<div style="height: 150px">HHC</div>
			</MenuLayer>
			<MenuLayer
				pos="4"
				class="c1"
				type="scroll"
			>
				<div style="height: 150px">HHC</div>
				<div style="height: 150px">HHC</div>
				<div style="height: 150px">HHC</div>
				<div style="height: 150px">HHC</div>
				<div style="height: 150px">HHC</div>
			</MenuLayer>
		</div>
		<br>
		<div style="display:flex">
			<MenuLayer
				pos="1"
				class="c1"
				type="page-scroll"
				:page="10"
			>
				<div style="height: 150px">HHC</div>
				<div style="height: 150px">HHC</div>
				<div style="height: 150px">HHC</div>
				<div style="height: 150px">HHC</div>
				<div style="height: 150px">HHC</div>
			</MenuLayer>
			<MenuLayer
				pos="2"
				class="c1"
				type="page-scroll"
				:page="8"
			>
				<div style="height: 150px">HHC</div>
				<div style="height: 150px">HHC</div>
				<div style="height: 150px">HHC</div>
				<div style="height: 150px">HHC</div>
				<div style="height: 150px">HHC</div>
			</MenuLayer>
		</div>
		<div style="display:flex">
			<MenuLayer
				pos="3"
				class="c1"
				type="page-scroll"
				:page="6"
			>
				<div style="height: 150px">HHC</div>
				<div style="height: 150px">HHC</div>
				<div style="height: 150px">HHC</div>
				<div style="height: 150px">HHC</div>
				<div style="height: 150px">HHC</div>
			</MenuLayer>
			<MenuLayer
				pos="4"
				class="c1"
				type="page-scroll"
				:page="4"
			>
				<template #1>
					<Button>1 SLOT</Button>
				</template>
				<template v-slot:default="{page}">
					<Button>{{page}} Default</Button>
				</template>
			</MenuLayer>
		</div>
	</mouse-layer>
</template>
<script setup lang="ts">
import MenuLayer from "../MenuLayer.vue";
import MouseLayer from "../../mouse-layer/MouseLayer.vue";
import Button from "../../button/Button.vue";</script>
<style scoped>
.c {
	border: 1px solid #333333;
	width: 100%;
	height: 100px;
	background: #9e9e9e9f;
}
.c1 {
	flex: 0.5;
	border: 1px solid #333333;
	height: 300px;
	background: #9e9e9e9f;
}
</style>