<template>
	<Home />
</template>
<script setup name="monitoring-home">
	import { Home } from '@/views/monitoring/pages'
</script>

<style lang="less">
	.monitoring-home {
		.light-title {
			padding-left: 10px;
			line-height: 16px;
			font-weight: 500;
			font-size: 16px;
			border-left: 4px solid #3a6fd7;
		}

		.device {
			width: 22%;
			font-size: 20px;
			padding-top: 15px;
			background-color: #5140b4;
			border-radius: 100%;
			overflow: hidden;
			height: 100%;
			position: relative;
			top: 10px;
		}
		.connect {
			width: 22%;
			font-size: 20px;
			padding-top: 15px;
			background-color: #1890ff;
			border-radius: 100%;
			overflow: hidden;
			height: 100%;
			position: relative;
			top: 10px;
		}
		.alarm {
			width: 22%;
			font-size: 20px;
			padding-top: 15px;
			background-color: #ff7d18;
			border-radius: 100%;
			overflow: hidden;
			height: 100%;
			position: relative;
			top: 10px;
		}
		.task {
			width: 22%;
			font-size: 20px;
			padding-top: 15px;
			background-color: #185eff;
			border-radius: 100%;
			overflow: hidden;
			height: 100%;
			position: relative;
			top: 10px;
		}
		.icon {
			display: flex;
			justify-content: center;
			position: relative;
			color: #fff;
			bottom: 7px;
		}
		.iconleft {
			width: 4px;
			height: 25px;
			background-color: #0069d2;
			float: left;
		}
		:deep(.ant-card-body) {
			padding: 10px;
		}
	}
	.realtime-list {
		// margin-top: -48px;
		// padding-bottom: 48px;

		max-height: 505px;
		overflow-y: scroll;

		.line-title {
			width: 100%;
			height: 30px;
			padding-top: 10px;
			.left-line {
				height: 30px;
				width: 4px;
				background-color: #3a6fd7;
				height: 30px;
				float: left;
				border-radius: 15px;
			}
			.title {
				line-height: 30px;
				margin-left: 10px;
				font-weight: 550;
				font-size: 18px;
				cursor: pointer;
				margin-right: 30px;
			}
		}
		.vertical-line {
			height: 200px;
			background-color: #ececec;
			width: 1px;
		}
		.statistics-info {
			margin-top: 50px;
			.item {
				margin-bottom: 20px;
				.title {
					color: #ccc;
					font-size: 16px;
				}
				.value {
					font-size: 18px;
				}
			}
		}
		.lists-level {
			color: #fff;
			text-align: center;
			padding: 5px 0px;
			border-radius: 15px;
			width: 60px;
		}
		.bg-yellow {
			background-color: #f4cc61;
		}
		.bg-orage {
			background-color: #fd945f;
		}
		.bg-red {
			background-color: #f56372;
		}
	}
</style>
