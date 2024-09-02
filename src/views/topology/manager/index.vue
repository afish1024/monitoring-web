<template>
  <a-row>
    <a-col :span="5">
      <div class="cardImp">
        <div style="background: #096dd9;height: 40px;line-height: 40px;color: #fff;padding-left: 8px;">
          视图列表
        </div>
        <!-- <a-tree v-if="treeData.length > 0" v-model:expandedKeys="defaultExpandedKeys" :tree-data="treeData" :field-names="treeFieldNames" v-model:selectedKeys="selectedKeys" @select="selectTree" show-icon style="margin-top: 5px;"> -->
        <a-tree v-if="treeData.length > 0" v-model:expandedKeys="defaultExpandedKeys" @select="selectTree" :field-names="treeFieldNames" :tree-data="treeData" show-icon default-expand-all v-model:selectedKeys="selectedKeys">
          <template #icon="{ key, selected }">
            <img style="width:20px;height:20px;" src="@/assets/images/line.svg" alt="">
          </template>
        </a-tree>
        <a-empty v-else :image="Empty.PRESENTED_IMAGE_SIMPLE" />
      </div>
    </a-col>
    <a-col :span="19">
      <!-- <a-card :bordered="false" style="margin-bottom: 10px">
        <span style="color: red;">温馨提示：滚动鼠标放大缩小拓扑图。</span>
      </a-card> -->
      <a-card :bordered="false" style="margin-bottom: 10px">
        <!-- <div id="container" v-if="equip_visible == true">

        </div> -->
        <!-- <div id="container2" v-if="internet_visible == true">
          <ul>
            <li @click="getData(i)" v-for="(i,l) in dataValue" :class="bgImg[i.status]" style="position: absolute;" :style="{width:i.width+'px',height:i.height+'px',top:i.pos_top+'px',left:i.pos_left+'px'}"></li>
          </ul>
        </div> -->

        <div id="container3">
          <!-- <rightKeyComponent /> -->

          <component @some-event="callback" :is="currentComponent" :par="par"></component>
        </div>

        <!-- <div :style="{ display: rightKey_visible ? 'none' : '' }">
          <rightKeyComponent @menu-click="menuClick" />
        </div> -->
      </a-card>
    </a-col>
  </a-row>
</template>
<script setup name="topologyList">
import rightKeyComponent from '../rightkey/rightKeyComponent.vue'
import exchange from '../exchange/index.vue'
import * as echarts from 'echarts';
import { ClockCircleOutlined } from '@ant-design/icons-vue';
import { message, Empty } from 'ant-design-vue'
import topologyApi from '@/api/topology/topologyApi';
import { mockData0, mockData1 } from '../exchange/data';
import internet from '@/assets/images/internet.png';
import exchanges from '@/assets/images/exchange.svg';
import G6 from '@antv/g6';
import { useRouter } from "vue-router";
const currentComponent = ref(rightKeyComponent);

// import { ref, provide } from 'vue';
const par = ref({
  id: '',
  pid: '',
  networkName: ''
})
// provide('par', null)
const dataValue = ref([])
const flag = ref(true)
const route = useRouter()
const cardLoading = ref(true)
const checked1 = ref(true)
// 默认展开的节点
let defaultExpandedKeys = ref([])
const bgImg = ref()
const visible = ref(false);
const equip_visible = ref(true);
const rightKey_visible = ref(false);
const internet_visible = ref(false);
const value1 = ref()
let myEcharts = echarts;
const expandedKeys = ref(['0-0', '0-1']);
const selectedKeys = ref(["0"])
const treeData = ref([])
// 替换treeNode 中 title,key,children
const treeFieldNames = { children: 'children', title: 'name', key: 'id' }
let graph = null
let treeMap = {}

onMounted(() => {
  loadTreeData()
  dataValue.value = mockData0
  bgImg.value = ["bg-img0", "bg-img1", "bg-img2"]
})


const callback = (v) => {
  console.log(v)
  par.value.id = v.id
  par.value.networkName = v.name
  if (v.ptype == 'equipment') {
    currentComponent.value = exchange
  }
  selectedKeys.value = [v.id]
}



const selectTree = (key, info) => {
  par.value.id = info.node.id
  par.value.pid = info.node.parentId
  par.value.networkName = info.node.name
  if (info.node.type == "equipment") {
    currentComponent.value = exchange
  } else {
    currentComponent.value = rightKeyComponent
  }

}

const loadTreeData = () => {
  topologyApi.viewTree().then((res) => {
    if (!res) {
      treeData.value = []
      return
    }
    cardLoading.value = false
    treeData.value = res

    // 默认展开2级
    treeData.value.forEach((item) => {
      // 因为0的顶级
      if (item.parentId === '0') {
        defaultExpandedKeys.value.push(item.id)
        // 取到下级ID
        if (item.children) {
          treeMap[item.id] = item.children
          item.children.forEach((items) => {
            treeMap[items.id] = items.children
            defaultExpandedKeys.value.push(items.id)
          })
        }
      }
    })
  })
}


</script>
<style lang="less" scoped>
.cardImp {
	margin-right: 10px;
  height: ~"calc(100vh - 80px)";
  overflow-y:scroll;
  overflow-x: hidden;
}

.bg-img0 {
	background: url('@/assets/images/status1.svg');
	background-repeat: no-repeat;
	background-size: 100% 100%;
}
.bg-img1 {
	background: url('@/assets/images/status2.svg');
	background-repeat: no-repeat;
	background-size: 100% 100%;
}
.bg-img2 {
	background: url('@/assets/images/status3.svg');
	background-repeat: no-repeat;
	background-size: 100% 100%;
}
ul,
li {
	list-style: none;
}
.cardImp {
	margin-right: 10px;
}
#container2 > ul {
	width: 100%;
	height: 100%;
}
#container2 > ul > li {
	cursor: pointer;
}
#container2 {
	width: 800px;
	height: 533px;
	margin: 0 auto;
	background-image: url('@/assets/images/jhj.jpg');
	background-repeat: no-repeat;
	background-size: 100% 100%;
	position: relative;
}
#container {
	width: 1200px;
	height: 533px;
	margin: 0 auto;
	position: relative;
}
.h15 {
	height: 150px;
	display: flex;
	flex-direction: column;
}
.h20 {
	height: 200px;
}
.h25 {
	height: 280px;
}
.picTitle {
	display: flex;
	div {
		float: right;
	}
	p {
		display: flex;
		flex: 1;
		flex-direction: column;
		margin-left: 10px;
		span:nth-child(1) {
			display: inline-block;
			font-size: 16px;
			font-weight: 600;
		}
		span:nth-child(2) {
			display: inline-block;
			font-size: 12px;
			color: #00000073;
		}
	}
	img {
		display: block;
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}
}
.picInfo {
	display: flex;
	div {
		float: right;
	}
	p {
		display: flex;
		flex: 1;
		flex-direction: column;
		margin-left: 10px;
		span:nth-child(1) {
			display: inline-block;
			font-size: 14px;
			font-weight: 600;
			color: #00000073;
		}
		span:nth-child(2) {
			display: inline-block;
			font-size: 14px;
			font-weight: 600;
		}
	}
	img {
		display: block;
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}
}

.newAlarm {
	p {
		display: flex;
		span:nth-child(1) {
			flex: 1;
			font-weight: 600;
		}
		span:nth-child(2) {
			color: #00000073;
		}
	}
}

.target {
	p:nth-child(1) {
		display: flex;
		span:nth-child(1) {
			flex: 1;
			font-weight: 600;
		}
		span:nth-child(2) {
			color: #00000073;
		}
	}
	p:nth-child(2) {
		span:nth-child(1) {
			font-weight: 600;
		}
	}
}

.flow {
	margin-top: 20px;
	p:nth-child(1) {
		span:nth-child(1) {
			font-weight: 600;
		}
	}
}

.dividers {
	width: 100%;
	height: 20px;
	border-bottom: 1px solid var(--divider-color);
}
.ant-tree-switcher {
	position: relative;
	flex: none;
	align-self: stretch;
	width: 24px;
	margin: 0;
	line-height: 17px;
	text-align: center;
	cursor: pointer;
	-webkit-user-select: none;
	-moz-user-select: none;
	user-select: none;
}
</style>