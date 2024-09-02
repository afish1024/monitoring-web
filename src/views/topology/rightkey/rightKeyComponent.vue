<template>
  <a-button @click="saveData" type="primary" html-type="submit" :disabled="disabled">保存</a-button>
  <div id="divId" style="height:calc(84vh - 50px); width: 100%px; border: 1px solid gray;margin-top:10px"></div>
  <a-modal :closable="true" v-model:visible="visible" :footer="null" @ok="handleOk" width="1200px">
    <ul>
      <li @click="jump(i.component)" v-for="(i,l) in menuList" :class="[ isActive == i.component ? 'activeClass' : '']">
        <img :src="i.imgSrc" alt="">
        <p>{{i.title}}</p>
      </li>
    </ul>

    <div class="components">
      <component :is="currentComponent" :ids="ids"></component>
    </div>
  </a-modal>

  <a-modal :closable="true" v-model:visible="visible1" :footer="null" @ok="handleOk1" width="800px">
    <a-form autocomplete="off" :label-col="{span: 4, offset: 2}" :wrapper-col="wrapperCol">

      <a-form-item :wrapper-col="{ offset: 6, span: 16 }">
        <a-button :loading="loading" type="primary" html-type="submit" @click="getResult">命令下发</a-button>
      </a-form-item>

      <a-form-item label="返回结果" name="strategyKey">
        <a-textarea v-model:value="resultData" style="width: 400px" :rows="8" />
      </a-form-item>

    </a-form>
  </a-modal>
</template>
<script setup name="topologyList">
import { topoManager } from "./TopoManager";
import topologyApi from '@/api/topology/topologyApi';
import { message } from 'ant-design-vue';
import deviceApi from '@/api/topological/deviceApi'
import alarmApi from '@/api/alarm/indexApi'
import overview from './overview.vue'
import staticInfo from './staticInfo.vue'
import alarm from './alarm.vue'
import equipmentLog from './equipmentLog.vue'
import performance from './performance.vue'
import sbgl from '@/assets/images/sbgl2.svg';
import ssgj from '@/assets/images/ssgj.svg';
import xnfx from '@/assets/images/xnfx.svg';
import sbrz from '@/assets/images/sbrz.svg';
import jtxx from '@/assets/images/jtxx.svg';
const emit = defineEmits(['some-event'])
const visible = ref(false);
const visible1 = ref(false);
const disabled = ref(true)
import { getCurrentInstance } from "vue"
const formState = reactive({
  strategyName: '',
  strategyKey: '',
  enableStatus: true,
  strategyDescription: '',
  id: ''
});
const loading = ref(false)
const resultData = ref()
const menuList = ref([
  {
    imgSrc: sbgl,
    title: '设备概览',
    component: overview
  }, {
    imgSrc: ssgj,
    title: '实时告警',
    component: alarm
  },
  {
    imgSrc: xnfx,
    title: '性能分析',
    component: performance
  },
  {
    imgSrc: sbrz,
    title: '设备日志',
    component: equipmentLog
  },
  {
    imgSrc: jtxx,
    title: '静态信息',
    component: staticInfo
  }
])
const pingId = ref({})
const ids = ref('')
const renderIds = ref('')
const isActive = ref(overview);
const currentComponent = ref(overview);
const ctx = getCurrentInstance()
const bus = ctx?.appContext.config.globalProperties.$bus
window.bus = bus


const jump = (v) => {
  isActive.value = v
  currentComponent.value = v
}


const onFinish = values => {
  console.log(values, formState);
};



onMounted(() => {


  bus.on('sendVal', (data) => {
    console.log(data)
  })

  bus.on('delVal', (data) => {
    console.log(data)
    if (data.type == 'link') {
      delLink(data.id)
    }

    if (data.type == 'node') {
      delNode(data.id)
    }

  })


  bus.on('typeVal', (data) => {
    editLink(data)

  })


  bus.on('getChild', (data) => {
    // initTopology(data.id)
    renderIds.value = data.id
    topologyApi.topology({ id: data.id }).then((res1) => {
      console.log(res1)
      if(res1.linkNode){
        disabled.value = false
        topoManager.render(res1, 'child')
      }
      
    })
  })

  bus.on('getExchange', (data) => {
    emit('some-event', data)
  })



  bus.on('pingVal', (v) => {
    pingId.value = v
    visible1.value = true
    resultData.value = ''
  })



  bus.on('portVal', (data) => {
    console.log('portVal')

  })



  bus.on('infoVal', (data) => {
    ids.value = data.id
    isActive.value = overview
    currentComponent.value = overview
    visible.value = true

  })




  if (props.par.id && props.par.id != '0') {
    disabled.value = false
    topologyApi.topology({ id: props.par.id }).then((res) => {
      if (res.node != undefined) {
        topoManager.init(document.getElementById("divId"), res)
      } else {
        disabled.value = true
        message.warning('暂无数据')
      }
    })

  } else {
    disabled.value = true
    topologyApi.viewTree().then((res) => {
      topoManager.init(document.getElementById("divId"), res, 'all')
    })
  }



});

const getResult = () => {
  loading.value = true
  topologyApi.commandIp(pingId.value).then((res) => {
    console.log(res)
    loading.value = false
    resultData.value = res.line
  })
}


const delLink = (v) => {
  topologyApi.delLink([
    {
      "id": v
    }
  ]).then((res) => {
    initTopology(props.par.id)
    disabled.value = false
  }).catch((err) => {
    console.log(err)
  })

}

const delNode = (v) => {
  console.log(v)
}

const editLink = (v) => {
  topologyApi.editLink(
    {
      "id": v.id,
      "linkType": v.ptype
    }
  ).then((res) => {

    topologyApi.topology({ id: (props.par.id ? props.par.id : renderIds.value) }).then((res1) => {
      console.log(res1)
      disabled.value = false
      topoManager.render(res1, 'child')
    })
  }).catch((err) => {
    console.log(err)
  })
}


const props = defineProps({
  par: {
    type: Object,
    default: {},
  },
})



watch(props, (value, old) => {
  if (props.par.id == '0') {
    initData()
    disabled.value = true
  } else {
    // initTopology(props.par.id)
    topologyApi.topology({ id: props.par.id }).then((res1) => {
      console.log(res1)
      disabled.value = false
      topoManager.render(res1, 'child')
    })

    disabled.value = false
  }
})

const initData = () => {
  topologyApi.viewTree().then((res) => {
    topoManager.render(res, 'all');
  })
}

const initTopology = (id, rander) => {
  topologyApi.topology({ id: id }).then((res) => {
    if (res.node != undefined) {
      if (rander == 'rander') {
        topoManager.init(document.getElementById("divId"), res)
      } else {
        disabled.value = false
        topoManager.render(res, 'child')
      }

    } else {
      disabled.value = true
      message.warning('暂无数据')
    }

  })
}

const saveData = () => {
  let res = topoManager.saveData()
 
  const resArr1 = res.filter(item => (item.userData && item.userData.ptype == 'equipment'))
  const resArr2 = res.filter(item => (item.userData && item.userData.ptype == 'intranet'))
  console.log(resArr1)
  console.log(resArr2)
  let arr1 = []
  for (let i = 0; i < resArr1.length; i++) {
    if (resArr1[i].userData && resArr1[i].userData.type == 'node') {
      arr1[i] = {}
      arr1[i].id = resArr1[i].userData.id
      arr1[i].xcoordinate = resArr1[i].x
      arr1[i].ycoordinate = resArr1[i].y
    }
  }
  let arr2 = []
  for (let i = 0; i < resArr2.length; i++) {
    if (resArr2[i].userData && resArr2[i].userData.type == 'node') {
      arr2[i] = {}
      arr2[i].id = resArr2[i].userData.id
      arr2[i].xcoordinate = resArr2[i].x
      arr2[i].ycoordinate = resArr2[i].y
    }
  }
  topologyApi.topologyedit(arr1).then((res) => {
    console.log(res)
    if (res == null) {
      message.success('保存成功')
    }
  })

  topologyApi.topologynetwork(arr2).then((res) => {
    console.log(res)
  })
}


</script>
<style lang="less" scoped>
.cardImp {
	margin-right: 10px;
}
#container {
	// background: #000;
}
#contextMenu {
	position: absolute;
	list-style-type: none;
	padding: 10px 8px;
	left: -150px;
	background-color: rgba(255, 255, 255);
	border: 1px solid #e2e2e2;
	border-radius: 4px;
	font-size: 12px;
	color: #545454;
}
#contextMenu li {
	list-style: none;
	height: 20px;
	width: 120px;
	border-bottom: 1px solid #eee;
	cursor: pointer;
	list-style-type: none;
	list-style: none;
	margin-left: 0px;
}
#contextMenu li:hover {
	color: #aaa;
}
li:hover {
	background: #f0f1fe;
}
.activeClass {
	background: #f0f1fe;
}
ul {
	display: flex;
}
ul li {
	list-style: none;
	border-radius: 5px;
	cursor: pointer;
	margin-right: 20px;
	width: 80px;
	height: 80px;
	padding-top: 5px;
	p {
		width: 100%;
		text-align: center;
		font-weight: 600;
	}
	// padding: 10px 10px 10px 10px;
	img {
		width: 50px;
		height: 50px;
		margin: 0 auto;
		display: block;
	}
}

.activeClass {
	background: #f0f1fe;
}
.menuUl {
	display: flex;
}
.menuUl li {
	list-style: none;
	border-radius: 5px;
	cursor: pointer;
	margin-right: 20px;
	width: 80px;
	height: 80px;
	padding-top: 5px;
	p {
		width: 100%;
		text-align: center;
		font-weight: 600;
	}
	// padding: 10px 10px 10px 10px;
	img {
		width: 50px;
		height: 50px;
		margin: 0 auto;
		display: block;
	}
}
</style>