<template>
    
        <a-row class="list">
            <a-col :span="24" >
				<a-card
				style="width: 100%"
				:bordered="false"
				:tab-list="tabDataSource"
				:active-tab-key="noTitleKey"
				@tabChange="(key) => onTabChange(key, 'noTitleKey')"
			>
			 	<template v-if="noTitleKey === 'category'">
					<categorystatement></categorystatement>
				</template>
				<template v-if="noTitleKey === 'added'">
					<addedstatement :categoryList="categoryList"></addedstatement>
				</template>
				<template v-if="noTitleKey === 'maintain'">
					<maintainstatement :categoryList="categoryList" :userList="userList"></maintainstatement>
				</template>
				<template v-if="noTitleKey === 'scrap'">
					<scrapstatement :categoryList="categoryList" :userList="userList"></scrapstatement>
				</template>
				
				<template #customTab="item">
					<span>
						<global-outlined v-if="item.key === 'network'" />
						<hdd-outlined v-if="item.key === 'device'" />
						<share-alt-outlined v-if="item.key === 'link'" />
						<appstore-outlined v-if="item.key === 'resource'" />
						{{ item.tab }}
					</span>
				</template>
			</a-card>

            </a-col>
        </a-row>
      


   
</template>


<script  setup name="statement">
	import { Empty } from 'ant-design-vue'
	const key = ref('category')
	const noTitleKey = ref('category')
	const pageParams = ref([])
	const selectedKeys = ref([])
	const treeData = ref([])
	let searchFormState = reactive({})
	const categoryList =  ref([]) 
	const userList =  ref([]) 
    import categoryApi from '@/api/biz/categoryApi'
	import userApi from '@/api/sys/userApi'
	const tabDataSource = [
		{ key: 'category', tab: '资产分类报表' },
		{ key: 'added', tab: '新增资产报表' },
		{ key: 'maintain', tab: '维修到期资产报表' },
		{ key: 'scrap', tab: '清理报废资产报表' }
	]

	const onTabChange = (value, type) => {
		if (type === 'key') {
			key.value = value
		} else if (type === 'noTitleKey') {
			noTitleKey.value = value
		}
	}

	onMounted(() => {
		userApi.useList({}).then((data) => {
			userList.value = data
		})

		categoryApi.categoryTree({}).then((data) => {
			
			categoryList.value = data
		})
	})
</script>

<style lang="less" >
.title{
	width: 100%;
	height: 25px;
	.line{
		height: 25px;
		width: 4px;
		background-color: #0069d2;
		float: left;
		border-radius: 15px;
	}
	.value{
		line-height: 25px;
		margin-left: 10px;
		font-weight: 550;
		font-size: 14px;
		cursor: pointer;
		margin-right: 30px;
	}
}

</style>