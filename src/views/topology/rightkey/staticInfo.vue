<template>
  <a-row :gutter="16" style="margin-top:15px;">
    <a-col class="gutter-row" :span="12">
      <a-card title="产品优势" size="small" style="width: 100%;height:500px;overflow-y:auto;" :hoverable="true">

        <div v-if="info.product_advantages">{{ info.product_advantages?info.product_advantages:'无' }}</div>
        <div v-else>
          <a-empty />
        </div>
        <!-- <p>S5120V2的特点如下:</p>
        <p>1、低功耗。300nA (TYP) 工作电流，能满足交换机低功耗的需求</p>
        <p>2、多种监控电压的选择。闹值电压可设置为4.38、4.00、3.08、2.93V、2.63，满足3V，3.3Vq5V的电源监控</p>
        <p>3、主动低电平复位，支持最低150ms延时复位信号，并支持推挽输出</p>
        <p>4、宽工作温度范围，-40~125C的工作温度范困支持工业级的应用场景</p> -->
      </a-card>

    </a-col>
    <a-col class="gutter-row" :span="12">
      <a-card title="出场信息" size="small" style="width: 100%;height:500px;overflow-y:auto;" :hoverable="true">
        <div v-if="info.factory_information"> {{info.factory_information?info.productfactory_information_advantages:'无'  }}</div>
        <div v-else>
          <a-empty />
        </div>

        <!-- <p>SN:23294232434HIIFO</p>
        <p>出厂编号:34546567697890890</p> -->
      </a-card>
    </a-col>
  </a-row>

</template>
<script>
import deviceApi from '@/api/topological/deviceApi'
import { ClockCircleOutlined } from '@ant-design/icons-vue';
export default defineComponent({
  components: {
    ClockCircleOutlined
  },
  props: ['ids'],
  setup (props) {
    const info = ref({})

    onMounted(() => {
      getDetail(props.ids)
    });

    const getDetail = (v) => {
      deviceApi.detail({ id: v }).then((res) => {
        console.log(res)
        let des = res.deviceDescribe ? res.deviceDescribe : ''
        info.value = JSON.parse(des)
      })
    }

    return {
      getDetail,
      info
    };
  },
});
</script>
<style lang="less" scoped>
/* 滚动条轨道样式 */
::-webkit-scrollbar {
	width: 8px; /* 设置滚动条宽度 */
}

/* 滚动条滑块样式 */
::-webkit-scrollbar-thumb {
	background-color: #00000073; /* 设置滑块背景颜色 */
	border-radius: 4px; /* 设置滑块圆角 */
}

/* 滚动条轨道hover状态样式 */
::-webkit-scrollbar-track:hover {
	background-color: #f1f1f1; /* 设置轨道hover状态时的背景颜色 */
}

/* 滚动条滑块hover状态样式 */
::-webkit-scrollbar-thumb:hover {
	background-color: #00000073; /* 设置滑块hover状态时的背景颜色 */
}
</style>