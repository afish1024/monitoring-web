<template>
	<Reports />
</template>
<script setup name="monitoring-reports">
	import { Reports } from '@/views/monitoring/pages'
</script>

<style lang="less">
	.monitoring-reports {
		.flex {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.light-title {
			padding-left: 10px;
			line-height: 16px;
			font-weight: 500;
			font-size: 16px;
			border-left: 4px solid #3a6fd7;
		}
	}
</style>
