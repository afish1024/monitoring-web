<template>
  <a-row :gutter="16" style="margin-top:15px;">
    <a-col class="gutter-row" :span="12">
      <a-card title="操作日志" size="small" style="width: 100%;height:500px;overflow-y:auto;" :hoverable="true">
        <a-timeline mode="alternate" v-if="operation.length>0">
          <!-- <a-timeline> -->
          <a-timeline-item v-for="item in operation">
            <template #dot>
              <img style="display:block;width:30px;height:30px" src="@/assets/images/circle.svg" alt="">
            </template>
            <span style="color:#00000073">{{item.createTime}}</span><br>
            <span style="color:#000;font-weight: 600;font-size: 14px;">{{ item.operationTitle }}</span><br>
            <span style="color:#5CA897;font-weight: 600">{{item.operationResult}}</span><br>
            <span style="color:#00000073;font-size: 12px">{{ item.operationUser }}</span><br>
          </a-timeline-item>
          <!-- <a-timeline-item>
            <template #dot>
              <img style="display:block;width:30px;height:30px" src="@/assets/images/circle.svg" alt="">
            </template>
            <span style="color:#00000073">2021-03-21 10:09:03</span><br>
            <span style="color:#000;font-weight: 600;font-size: 14px;">leon (技术总监)【新增/添加命令下发】</span><br>
            <span style="color:#5CA897;font-weight: 600">成功</span><br>
            <span style="color:#00000073;font-size: 12px">操作对象 0_H3C</span><br>
          </a-timeline-item>
          <a-timeline-item>
            <template #dot>
              <img style="display:block;width:30px;height:30px" src="@/assets/images/circle.svg" alt="">
            </template>
            <span style="color:#00000073">2021-03-21 10:09:03</span><br>
            <span style="color:#000;font-weight: 600;font-size: 14px;">leon (技术总监)【新增/添加命令下发】</span><br>
            <span style="color:#5CA897;font-weight: 600">成功</span><br>
            <span style="color:#00000073;font-size: 12px">操作对象 0_H3C</span><br>
          </a-timeline-item>
          <a-timeline-item>
            <template #dot>
              <img style="display:block;width:30px;height:30px" src="@/assets/images/circle.svg" alt="">
            </template>
            <span style="color:#00000073">2021-03-21 10:09:03</span><br>
            <span style="color:#000;font-weight: 600;font-size: 14px;">leon (技术总监)【新增/添加命令下发】</span><br>
            <span style="color:#5CA897;font-weight: 600">成功</span><br>
            <span style="color:#00000073;font-size: 12px">操作对象 0_H3C</span><br>
          </a-timeline-item>
          <a-timeline-item>
            <template #dot>
              <img style="display:block;width:30px;height:30px" src="@/assets/images/circle.svg" alt="">
            </template>
            <span style="color:#00000073">2021-03-21 10:09:03</span><br>
            <span style="color:#000;font-weight: 600;font-size: 14px;">leon (技术总监)【新增/添加命令下发】</span><br>
            <span style="color:#5CA897;font-weight: 600">成功</span><br>
            <span style="color:#00000073;font-size: 12px">操作对象 0_H3C</span><br>
          </a-timeline-item> -->
        </a-timeline>
        <div v-else>
          <a-empty />
        </div>
      </a-card>

    </a-col>
    <a-col class="gutter-row" :span="12">
      <a-card title="安装日志" size="small" style="width: 100%;height:500px;overflow-y:auto;" :hoverable="true">
        <a-timeline mode="alternate" v-if="installation.length>0">
          <!-- <a-timeline> -->
          <a-timeline-item v-for="item in installation">
            <template #dot>
              <img style="display:block;width:30px;height:30px" src="@/assets/images/circle.svg" alt="">
            </template>
            <span style="color:#00000073">{{item.createTime}}</span><br>
            <span style="color:#000;font-weight: 600;font-size: 14px;">{{ item.operationTitle }}</span><br>
            <span style="color:#5CA897;font-weight: 600">{{item.operationResult}}</span><br>
            <span style="color:#00000073;font-size: 12px">{{ item.operationUser }}</span><br>
          </a-timeline-item>

          <!-- <a-timeline-item>
            <template #dot>
              <img style="display:block;width:30px;height:30px" src="@/assets/images/circle.svg" alt="">
            </template>
            <span style="color:#00000073">2021-03-21 10:09:03</span><br>
            <span style="color:#000;font-weight: 600;font-size: 14px;">leon (技术总监)【新增/添加命令下发】</span><br>
            <span style="color:#5CA897;font-weight: 600">执行完成</span><br>
            <span style="color:#00000073;font-size: 12px">藏争内容S512V2时鲜点汇下: 1，亚现具，现OnA(TYP)T作电点，陈天是交接租8h4Lpg需求。2、多种监控电压的选授。偶值电压可调期74.38，4,00，3.08、2 93W，2.63，满理3V，手3V05V的电源监控3.车动的电学费位要持量位150r11e合有0将司，井支门和境聊出。4，贸工作造股河周，-40-1225元的工作星座范型资持工业视的庞用瑞展</span><br>
          </a-timeline-item>
          <a-timeline-item>
            <template #dot>
              <img style="display:block;width:30px;height:30px" src="@/assets/images/circle.svg" alt="">
            </template>
            <span style="color:#00000073">2021-03-21 10:09:03</span><br>
            <span style="color:#000;font-weight: 600;font-size: 14px;">leon (技术总监)【新增/添加命令下发】</span><br>
            <span style="color:#5CA897;font-weight: 600">执行完成</span><br>
            <span style="color:#00000073;font-size: 12px">操作对象 0_H3C</span><br>
          </a-timeline-item>
          <a-timeline-item>
            <template #dot>
              <img style="display:block;width:30px;height:30px" src="@/assets/images/circle.svg" alt="">
            </template>
            <span style="color:#00000073">2021-03-21 10:09:03</span><br>
            <span style="color:#000;font-weight: 600;font-size: 14px;">leon (技术总监)【新增/添加命令下发】</span><br>
            <span style="color:#5CA897;font-weight: 600">执行完成</span><br>
            <span style="color:#00000073;font-size: 12px">操作对象 0_H3C</span><br>
          </a-timeline-item>
          <a-timeline-item>
            <template #dot>
              <img style="display:block;width:30px;height:30px" src="@/assets/images/circle.svg" alt="">
            </template>
            <span style="color:#00000073">2021-03-21 10:09:03</span><br>
            <span style="color:#000;font-weight: 600;font-size: 14px;">leon (技术总监)【新增/添加命令下发】</span><br>
            <span style="color:#5CA897;font-weight: 600">执行完成</span><br>
            <span style="color:#00000073;font-size: 12px">操作对象 0_H3C</span><br>
          </a-timeline-item> -->
        </a-timeline>
        <div v-else>
          <a-empty />
        </div>

      </a-card>
    </a-col>
  </a-row>

</template>
<script>
import { ClockCircleOutlined } from '@ant-design/icons-vue';

import deviceApi from '@/api/topological/deviceApi'
export default defineComponent({
  components: {
    ClockCircleOutlined
  },
  props: ['ids'],
  setup (props) {
    const operation = ref([])
    const installation = ref([])

    onMounted(() => {
      getLog()
    });

    watch(props, (value, old) => {
      setTimeout(() => {
        getLog()
      }, 100)

      getTree()
    })

    const getLog = () => {
      deviceApi.getlog({ deviceId: props.ids, category: 'operation' }).then((res) => {
        operation.value = res.records
      })

      deviceApi.getlog({ deviceId: props.ids, category: 'installation' }).then((res) => {
        installation.value = res.records
      })
    }



    return {
      getLog,
      operation,
      installation
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