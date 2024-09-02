<template>
    <a-drawer
    :title="formData.id ? '编辑资产清单' : '新增资产清单'"
    :width="800"
    :visible="visible"
    :destroy-on-close="true"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    :maskClosable="false"
    @close="onClose"
>
    <a-card
    style="width: 100%"
    :bordered="false"
    :tab-list="tabDataSource"
    :active-tab-key="noTitleKey"
    @tabChange="(key) => onTabChange(key, 'noTitleKey')"
    >   
        <template v-if="noTitleKey === 'qrcode'">
            <a-row :gutter="20"  justify="center" class="qrcode">
                <a-col :span="8" >
                    <img :src="datainfo.twoDimensionalCode" class="imgqrcode" v-if="datainfo.twoDimensionalCode">

                </a-col>
                <a-col :span="16" class="rightinfo">
                    <div class="line">
                        资产名称：{{ datainfo.assetName }}
                    </div>
                    <div class="line">
                        资产编号：{{ datainfo.assetCode }}
                    </div>
                    <div class="line">
                        责任人：{{ datainfo.responsibleUserName }}
                    </div>
                </a-col>
            </a-row>
        </template>
        <template v-if="noTitleKey === 'alteration'">
            <a-row :gutter="50"  justify="center">
                <a-col :span="6" >
                    <a-steps :current="current" direction="vertical"  size="small">
                        <a-step :key="0" title="入库"  description="领用人" />
                        <a-step :key="1" title="领用" />
                        <a-step :key="2" title="归还" />
                    </a-steps>
                </a-col>
            </a-row>
        </template>
        <template v-if="noTitleKey === 'maintenance'">
            <a-row :gutter="50" class="mb15">
				<a-col :span="12">
					<a-row :gutter="10" >
						<a-col :span="8" class="tc">
							购入日期
						</a-col>
						<a-col :span="16">
							<a-input  placeholder="暂无" allow-clear  disabled="false"  v-model:value="datainfo.receiptDate" />
						</a-col>
					</a-row>

				</a-col>
				<a-col :span="12">
					<a-row :gutter="10" >
						<a-col :span="8" class="tc">
							维修到期日期
						</a-col>
						<a-col :span="16">
							<a-input  placeholder="暂无" allow-clear disabled="false"   v-model:value="datainfo.maintenanceExpirationDate" />
						</a-col>
					</a-row>

				</a-col>
			</a-row>
            <a-row :gutter="50" class="mb15">
				<a-col :span="12">
					<a-row :gutter="10" >
						<a-col :span="8" class="tc">
							维保单位
						</a-col>
						<a-col :span="16">
							<a-input  placeholder="暂无" allow-clear  disabled="false"   v-model:value="datainfo.assetCode" />
						</a-col>
					</a-row>

				</a-col>
				<a-col :span="12">
					<a-row :gutter="10" >
						<a-col :span="8" class="tc">
							联系人
						</a-col>
						<a-col :span="16">
							<a-input  placeholder="暂无" allow-clear  disabled="false"   v-model:value="datainfo.assetCode" />
						</a-col>
					</a-row>

				</a-col>
			</a-row>
            <a-row :gutter="50" class="mb15">
				<a-col :span="12">
					<a-row :gutter="10" >
						<a-col :span="8" class="tc">
							联系方式
						</a-col>
						<a-col :span="16">
							<a-input  placeholder="暂无" allow-clear  disabled="false"   v-model:value="datainfo.assetCode" />
						</a-col>
					</a-row>

				</a-col>
				<a-col :span="12">
					<a-row :gutter="10" >
						<a-col :span="8" class="tc">
							联系说明
						</a-col>
						<a-col :span="16">
							<a-input  placeholder="暂无" allow-clear  disabled="false"   v-model:value="datainfo.assetCode" />
						</a-col>
					</a-row>

				</a-col>
			</a-row>
            
        </template>
        <template v-if="noTitleKey === 'base'">
            <a-row :gutter="50" class="mb15">
				<a-col :span="12">
					<a-row :gutter="10" >
						<a-col :span="8" class="tc">
							资产编码
						</a-col>
						<a-col :span="16">
							<a-input  placeholder="暂无" allow-clear disabled="false"  v-model:value="datainfo.assetCode"  />
						</a-col>
					</a-row>

				</a-col>
				<a-col :span="12">
					<a-row :gutter="10" >
						<a-col :span="8" class="tc">
							资产名称
						</a-col>
						<a-col :span="16">
							<a-input  placeholder="暂无" allow-clear  disabled="false"  v-model:value="datainfo.assetName"  />
						</a-col>
					</a-row>

				</a-col>
			</a-row>

            <a-row :gutter="50" class="mb15">
				<a-col :span="12">
					<a-row :gutter="10" >
						<a-col :span="8" class="tc">
							资产分类
						</a-col>
						<a-col :span="16">
							<a-input  placeholder="暂无" allow-clear  disabled="false"  v-model:value="datainfo.categoryName" />
						</a-col>
					</a-row>

				</a-col>
				<a-col :span="12">
					<a-row :gutter="10" >
						<a-col :span="8" class="tc">
							资产状态
						</a-col>
						<a-col :span="16">
							{{  datainfo.assetStatusName }}
						</a-col>
					</a-row>

				</a-col>
			</a-row>

            <a-row :gutter="50" class="mb15">
				<a-col :span="12">
					<a-row :gutter="10" >
						<a-col :span="8" class="tc">
							品牌
						</a-col>
						<a-col :span="16">
							<a-input  placeholder="暂无" allow-clear disabled="false"  v-model:value="datainfo.assetBrandName"  />
						</a-col>
					</a-row>

				</a-col>
				<a-col :span="12">
					<a-row :gutter="10" >
						<a-col :span="8" class="tc">
							规格型号
						</a-col>
						<a-col :span="16">
							<a-input  placeholder="暂无" allow-clear disabled="false"  v-model:value="datainfo.assetSpecification" />
						</a-col>
					</a-row>

				</a-col>
			</a-row>

            <a-row :gutter="50" class="mb15">
				<a-col :span="12">
					<a-row :gutter="10" >
						<a-col :span="8" class="tc">
							资产来源
						</a-col>
						<a-col :span="16">
							<a-input  placeholder="暂无" allow-clear disabled="false"  v-model:value="datainfo.assetSources" />
						</a-col>
					</a-row>

				</a-col>
				<a-col :span="12">
					<a-row :gutter="10" >
						<a-col :span="8" class="tc">
							入库日期
						</a-col>
						<a-col :span="16">
							<a-input  placeholder="暂无" allow-clear disabled="false"  v-model:value="datainfo.receiptDate"  />
						</a-col>
					</a-row>

				</a-col>
			</a-row>

            <a-row :gutter="50" class="mb15">
				<a-col :span="12">
					<a-row :gutter="10" >
						<a-col :span="8" class="tc">
							责任人
						</a-col>
						<a-col :span="16">
							<a-input  placeholder="暂无" allow-clear disabled="false"  v-model:value="datainfo.responsibleUserName"  />
						</a-col>
					</a-row>

				</a-col>
				<a-col :span="12">
					<a-row :gutter="10" >
						<a-col :span="8" class="tc">
							领用人
						</a-col>
						<a-col :span="16">
							<a-input  placeholder="暂无" allow-clear  disabled="false"  v-model:value="datainfo.requisitionUserName" />
						</a-col>
					</a-row>

				</a-col>
			</a-row>

            <a-row :gutter="50" class="mb15">
				<a-col :span="12">
					<a-row :gutter="10" >
						<a-col :span="8" class="tc">
							领用部门
						</a-col>
						<a-col :span="16">
							<a-input  placeholder="暂无" allow-clear disabled="false"  v-model:value="datainfo.requisitionDepartment"  />
						</a-col>
					</a-row>

				</a-col>
				<a-col :span="12">
					<a-row :gutter="10" >
						<a-col :span="8" class="tc">
							领用日期
						</a-col>
						<a-col :span="16">
							<a-input  placeholder="暂无" allow-clear disabled="false"  v-model:value="datainfo.requisitionDate" />
						</a-col>
					</a-row>

				</a-col>
			</a-row>

            <a-row :gutter="50" class="mb15">
				<a-col :span="12">
					<a-row :gutter="10" >
						<a-col :span="8" class="tc">
							领用说明
						</a-col>
						<a-col :span="16">
							<a-input  placeholder="暂无" allow-clear disabled="false"  v-model:value="datainfo.requisitionInstructions" />
						</a-col>
					</a-row>

				</a-col>
				<a-col :span="12">
					<a-row :gutter="10" >
						<a-col :span="8" class="tc">
							领用凭证
						</a-col>
						<a-col :span="16">
							<a-input  placeholder="暂无" allow-clear disabled="false"  v-model:value="datainfo.requisitionVoucher" />
						</a-col>
					</a-row>

				</a-col>
			</a-row>
            <a-row :gutter="50" class="mb15">
				<a-col :span="12">
					<a-row :gutter="10" >
						<a-col :span="8" class="tc">
							资产备注
						</a-col>
						<a-col :span="16">
							<a-input  placeholder="暂无" allow-clear disabled="false"  v-model:value="datainfo.assetRemark"  />
						</a-col>
					</a-row>

				</a-col>
				<a-col :span="12">
					<a-row :gutter="10" >
						<a-col :span="8" class="tc">
							资产照片
						</a-col>
						<a-col :span="16">
							<img :src="datainfo.assetImage" width="100">
						</a-col>
					</a-row>

				</a-col>
			</a-row>
        </template>
    </a-card>
</a-drawer>
</template>
<script setup name="deviceFrom">
import { required, rules } from '@/utils/formRules'

import assetApi from '@/api/biz/assetApi'
import tool from '@/utils/tool'

const loading = ref(false)
let visible = $ref(false)
const noTitleKey = ref('base')
const current = ref(0)
const datainfo = ref([])

const tabDataSource = [
    { key: 'base', tab: '基础信息' },
    { key: 'maintenance', tab: '维保信息' },
    { key: 'alteration', tab: '变更记录' },
    { key: 'qrcode', tab: '二维码' }
]

const onTabChange = (value, type) => {
    if (type === 'key') {
        key.value = value
    } else if (type === 'noTitleKey') {
        noTitleKey.value = value
    }
}


// 默认要校验的
const formRules = {
 
}
// 表单数据
let formData = ref({})
const onOpen = (record) => {
    visible = true
    if(record){
		assetApi.inventoryDetail({id:record.id}).then((data) => {
			console.log(data)
            formData.value = data
		})
	}
}

// 关闭抽屉
const onClose = () => {
    visible = false
}

// 调用这个函数将子组件的一些数据和方法暴露出去
defineExpose({
    onOpen
})
</script>
<style lang="less">
.tc{
    text-align: center;
}

.mb15{
	margin-bottom:15px;
}
.qrcode{
    border: 1px solid #ececec;
    border-radius: 15px;
    .imgqrcode{
        width: 200px;
    }
    .rightinfo{
        margin-top: 20px;
        .line{
            height: 50px;
            line-height: 50px;
            color: #5b5959;
        }
    }
}
</style>