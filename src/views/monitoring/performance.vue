<template>
	<Performance />
</template>
<script setup name="monitoring-performance">
	import { Performance } from '@/views/monitoring/pages'
</script>

<style lang="less">
	.performance-select-box {
		display: flex;
		align-items: center;

		.label.ant-select {
			color: #83858b !important;
			.ant-select-selection-item {
				color: #83858b !important;
			}
			.ant-select-selector {
				padding: 0 5px !important;
				border-right-width: 0 !important;
				background: #fff !important;
				cursor: default !important;
			}
			.ant-select-selection-item {
				padding-right: 0 !important;
			}
			.ant-select-arrow {
				display: none !important;
			}

			& ~ .ant-select {
				.ant-select-selector {
					border: 1px solid var(--border-color-base) !important;
					border-left-width: 0 !important;
				}
			}
			& ~ .ant-select-focused {
				.ant-select-selector {
					border: 1px solid var(--border-color-base) !important;
					border-left-width: 0 !important;
					box-shadow: none !important;
				}
			}
			& ~ .ant-select:hover {
				.ant-select-selector {
					border: 1px solid var(--border-color-base) !important;
					border-left-width: 0 !important;
				}
			}
		}
	}
	.performance {
		height: 100%;
		.ant-card-body {
			height: 100%;
		}
		.tip-len {
			color: red;
		}
		.search {
			margin-top: 10px;
			margin-bottom: 10px;
		}
		.w-full {
			width: 100%;
		}
		.justify-between {
			justify-content: space-between;
		}
		.list {
			background-color: #fff;

			.aside-card {
				border: 0;
			}
		}
		.bordered-r {
			border-right: 1px solid var(--border-color-split);
		}
	}
</style>
