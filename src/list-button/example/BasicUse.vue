<template>
	<mouse-layer
		style="width: 400px;height: 800px;background: linear-gradient(45deg, #9e9e9e,#212121);;box-sizing: border-box"
	>
		<ListForm type="input" label="基础组件"></ListForm>
		<ListForm type="number" :model-value="0" label="数字"></ListForm>
		<ListForm type="password" :model-value="'HH'" label="密码"></ListForm>
		<ListForm type="select" :model-value="true" :options="[{label:'开',value:true},{label:'关',value:false}]" label="开关" :size="40"></ListForm>
		<ListForm type="select" :model-value="true" :options="[{label:'开',value:true},{label:'关',value:false}]" label="开关" color="red"></ListForm>
		<ListForm type="select" :model-value="true" :options="[{label:'开',value:true},{label:'关',value:false}]" label="开关" color="white" :append="false" :in-border="false" left-border ></ListForm>
	</mouse-layer>
</template>
<script setup lang="ts">
import ListForm from "../../list-form/ListForm.vue";
import MouseLayer from "../../mouse-layer/MouseLayer.vue";
</script>