<template>
  <a-row :gutter="16">
    <a-col class="gutter-row" :span="8">
      <a-card style="height: 200px;">
        <div>
          <div class="iconleft"></div>
          <div style="margin-left:15px;font-weight: 600;line-height: 20px;">流程定义上线统计</div>
        </div>

        <div class="box-warp">
          <div id="echartsTarget" style="width:200px;height: 150px"></div>
          <div class="box-text">
            <span>已上线</span>
            <span>7</span>
            <span>未上线</span>
            <span>1</span>
          </div>
        </div>

      </a-card>
    </a-col>
    <a-col class="gutter-row" :span="8">
      <a-card style="height: 200px;">
        <div>
          <div class="iconleft"></div>
          <div style="margin-left:15px;font-weight: 600;line-height: 20px;">流程定义触发统计</div>
        </div>

        <div class="box-warp">
          <div id="echartsTarget1" style="width:250px;height: 150px"></div>
          <div class="box-text">
            <span>流程定义总数</span>
            <span>7</span>
            <span>定时触发</span>
            <span>1</span>
          </div>
          <div class="box-text" style="margin-left:30px">
            <span>告警触发</span>
            <span>7</span>
            <span>其它 </span>
            <span>1</span>
          </div>
        </div>

      </a-card>
    </a-col>
    <a-col class="gutter-row" :span="8">
      <a-card style="height: 200px;">
        <div>
          <div class="iconleft"></div>
          <div style="margin-left:15px;font-weight: 600;line-height: 20px;">流程实例执行状态</div>
        </div>

        <div class="box-warp">
          <div id="echartsTarget2" style="width:250px;height: 150px"></div>
          <div class="box-text">
            <span>实例总数</span>
            <span>7</span>
            <span>执行成功</span>
            <span>1</span>
          </div>
          <div class="box-text" style="margin-left:30px">
            <span>待执行</span>
            <span>7</span>
            <span>执行失败 </span>
            <span>1</span>
          </div>
          <div class="box-text" style="margin-left:30px">
            <span>执行中</span>
            <span>7</span>
            <span>执行中断 </span>
            <span>1</span>
          </div>
        </div>

      </a-card>
    </a-col>
  </a-row>

  <a-row :gutter="16" style="margin-top:10px">
    <a-col class="gutter-row" :span="12">
      <a-card style="height: 250px;">
        <div style="display:flex">
          <div class="iconleft"></div>
          <div style="margin-left:15px;font-weight: 600;line-height: 20px;flex: 1">执行失败TOP5</div>
          <div>
            <a-radio-group v-model:value="value1" button-style="solid">
              <a-radio-button value="a">流程定义</a-radio-button>
              <a-radio-button value="b">任务节点</a-radio-button>
            </a-radio-group>
          </div>
        </div>
        <p style="margin-top:10px;text-align: right;width: 200px;">VPN级务自动配置</p>
        <p style="margin-top:10px;text-align: right;width: 200px;">高可用服务监测</p>
        <p style="margin-top:10px;text-align: right;width: 200px;">华为交换机配置流量调度</p>
        <p style="margin-top:10px;text-align: right;width: 200px;">碰盘爆满故障自愈</p>

      </a-card>
    </a-col>
    <a-col class="gutter-row" :span="12">
      <a-card style="height: 250px;">
        <div style="display:flex">
          <div class="iconleft"></div>
          <div style="margin-left:15px;font-weight: 600;line-height: 20px;">流程定义手动执行次数TOP5</div>
        </div>
        <div id="echartsTarget3" style="width:100%;height: 250px;"></div>
      </a-card>
    </a-col>

  </a-row>

  <a-row :gutter="16" style="margin-top:10px">
    <a-col class="gutter-row" :span="12">
      <a-card style="height: 280px;">
        <div style="display:flex">
          <div class="iconleft"></div>
          <div style="margin-left:15px;font-weight: 600;line-height: 20px;flex: 1">运行时长分布</div>
          <div>
            <a-radio-group v-model:value="value1" button-style="solid">
              <a-radio-button value="a">流程定义</a-radio-button>
              <a-radio-button value="b">任务节点</a-radio-button>
            </a-radio-group>
          </div>
        </div>
        <div id="echartsTarget4" style="width:100%;height: 250px;"></div>
      </a-card>
    </a-col>
    <a-col class="gutter-row" :span="12">
      <a-card style="height: 280px;">
        <div style="display:flex">
          <div class="iconleft"></div>
          <div style="margin-left:15px;font-weight: 600;line-height: 20px;flex: 1">运行时长TOP5</div>
          <div>
            <a-radio-group v-model:value="value1" button-style="solid">
              <a-radio-button value="a">流程定义</a-radio-button>
              <a-radio-button value="b">任务节点</a-radio-button>
            </a-radio-group>
          </div>
        </div>
        <div id="echartsTarget5" style="width:100%;height: 250px;"></div>
      </a-card>
    </a-col>

  </a-row>

</template>

<script setup name="network">
import * as echarts from 'echarts';
let myEcharts = echarts;
const value1 = ref('a')
onMounted(() => {
  setTimeout(() => {
    initChart()
  }, 100)
});
const initChart = () => {
  let echartsTarget = myEcharts.init(document.getElementById("echartsTarget"))
  let echartsTarget1 = myEcharts.init(document.getElementById("echartsTarget1"))
  let echartsTarget2 = myEcharts.init(document.getElementById("echartsTarget2"))
  let echartsTarget3 = myEcharts.init(document.getElementById("echartsTarget3"))
  let echartsTarget4 = myEcharts.init(document.getElementById("echartsTarget4"))
  let echartsTarget5 = myEcharts.init(document.getElementById("echartsTarget5"))
  echartsTarget.setOption({
    tooltip: false,

    series: [
      {
        name: '合计',
        type: 'pie',
        radius: ['45%', '60%'],
        center: ['40%', '50%'],
        label: {
          position: 'center',
          show: true,
          formatter: function () {
            let str = '总数37'
            return str
          },
          rich: {
            a: {
              color: '#333333',//a、b不设置颜色的话，字体颜色就会是饼图颜色的混合色
              fontSize: '18',
            },
            b: {
              fontSize: '18',
              color: '#333333',
            }
          }
        },
        startAngle: 0,
        data: [
          { value: 1048, name: '次要' },
          { value: 158, name: '主要' },

        ]
      }
    ]
  });

  echartsTarget1.setOption({
    series: [
      {
        name: '合计',
        type: 'pie',
        radius: ['45%', '60%'],
        center: ['40%', '50%'],
        label: {
          position: 'center',
          show: true,
          formatter: function () {
            let str = '总数37'
            return str
          },
          rich: {
            a: {
              color: '#333333',//a、b不设置颜色的话，字体颜色就会是饼图颜色的混合色
              fontSize: '18',
            },
            b: {
              fontSize: '18',
              color: '#333333',
            }
          }
        },
        startAngle: 0,
        data: [
          { value: 1048, name: '次要' },
          { value: 589, name: '主要' },

        ]
      }
    ]
  });


  echartsTarget2.setOption({
    series: [
      {
        name: '合计',
        type: 'pie',
        radius: ['45%', '60%'],
        center: ['40%', '50%'],
        label: {
          position: 'center',
          show: true,
          formatter: function () {
            let str = '总数37'
            return str
          },
          rich: {
            a: {
              color: '#333333',//a、b不设置颜色的话，字体颜色就会是饼图颜色的混合色
              fontSize: '18',
            },
            b: {
              fontSize: '18',
              color: '#333333',
            }
          }
        },
        startAngle: 0,
        data: [
          { value: 1048, name: '次要' },
          { value: 578, name: '主要' },
          { value: 285, name: 'ccc' },

        ]
      }
    ]
  });


  echartsTarget3.setOption({
    tooltip: false,
    grid: {
      top: '8%',
      left: '5%',
      right: '5%',
      bottom: '30%',
    },
    xAxis: {
      axisLine: { show: false }, // 隐藏X轴横线
      axisTick: { show: false },
      data: ['磁盘爆满故障自愈', '', 'vpn服务自动配置', '']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80],
        type: 'bar',
        barWidth: 20

      }
    ]
  });


  echartsTarget4.setOption({
    tooltip: false,
    grid: {
      top: '8%',
      left: '5%',
      right: '5%',
      bottom: '30%',
    },
    xAxis: {
      axisLine: { show: false },
      data: ['0-20', '20-40', '40-60', '60-80']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [100, 0, 180, 350],
        type: 'bar',
        barWidth: 20

      }
    ]
  });



  echartsTarget5.setOption({
    tooltip: false,
    grid: {
      top: '8%',
      left: '5%',
      right: '5%',
      bottom: '30%',
      containLabel: true
    },
    xAxis: {

      type: 'value'
    },
    yAxis: {
      axisLine: { show: false }, // 隐藏X轴横线
      axisTick: { show: false },
      data: ['华为交换机配置流量源度', '磁盘爆满故酒自重', 'VPN服务自动配置', '高可用服务监衡'],
    },
    series: [
      {
        data: [100, 0, 180, 350],
        type: 'bar',
        barWidth: 20

      }
    ]
  });






  window.onresize = function () {
    echartsTarget.resize();
    echartsTarget1.resize();
    echartsTarget2.resize();
    echartsTarget3.resize();
    echartsTarget4.resize();
    echartsTarget5.resize();
  };
}


</script>


<style lang="less" scoped>
.iconleft {
	width: 4px;
	height: 20px;
	background-color: #0069d2;
	float: left;
}
.box-warp {
	display: flex;
}
.box-text {
	display: flex;
	flex-direction: column;
	color: #00000073;
}
</style>