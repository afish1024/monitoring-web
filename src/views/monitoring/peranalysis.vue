<template>
	<Peranalysis />
</template>
<script setup name="monitoring-peranalysis">
	import { Peranalysis } from '@/views/monitoring/pages'
</script>

<style lang="less">
	.monitoring-peranalysis {
		.ant-card ~ .ant-card {
			margin-top: 10px;
		}
		.mr-10 {
			margin-right: 10px;
		}
		.light-title {
			padding-left: 10px;
			margin-bottom: 15px;
			line-height: 16px;
			font-weight: 500;
			font-size: 16px;
			border-left: 4px solid #3a6fd7;
		}
	}
</style>
