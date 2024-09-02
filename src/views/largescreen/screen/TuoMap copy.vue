<template>
    <div id="con"></div>
    
  </template>
  <script setup name="topologyList">
  import G6 from '@antv/g6';
  import insertCss from 'insert-css'
  insertCss(`
    .g6-component-contextmenu {
      padding: 0
    }
    .g6-component-contextmenu ul {
      margin: 0;
      text-align: center;
    }
    .g6-component-contextmenu ul li {
      padding: 6px 20px;
      list-style:none;
      cursor: pointer;
    }
    .g6-component-contextmenu ul li:hover {
      background: #b4b4b4;
    }
  `)
  
  import { useRouter } from "vue-router";
  import jhj0 from '@/assets/images/jhj0.svg';
  import jhj1 from '@/assets/images/jhj1.svg';
  import jhj2 from '@/assets/images/jhj2.svg';
  import jhj3 from '@/assets/images/jhj3.svg';
  import server from '@/assets/images/server.svg';
  import zhuyao from '@/assets/images/zhuyao.svg';
  import ciyao from '@/assets/images/ciyao.svg';
  import yanzhong from '@/assets/images/yanzhong.svg';
  onMounted(() => {
    loadG6Data()
  })
  
  
  const loadG6Data = () => {
    const data = { nodes: [], edges: [] };
    for (let i = 0; i < 20; i++) {
      if (i != 19) {
        if (i % 4 == 0) {
          data.nodes.push({
            id: 'image' + i,
            label: '192.168.1.' + i+'\n'+'主要',
            img:ciyao,
          });
        }
        if (i % 4 == 1) {
          data.nodes.push({
            id: 'image' + i,
            label: '192.168.1.' + i+'\n'+'次要',
            img: zhuyao,
          });
        }
        if (i % 4 == 2) {
          data.nodes.push({
            id: 'image' + i,
            label: '192.168.1.' + i+'\n'+'严重',
            img: yanzhong,
          });
        }
        if (i % 4 == 3) {
          data.nodes.push({
            id: 'image' + i,
            label: '192.168.1.' + i+'\n'+'严重',
            img: yanzhong,
          });
        }
      }
  
      if (i == 19) {
        data.nodes.push({
          id: 'image' + i,
          label: '服务器监控',
          img: server,
          
        });
      }
  
    }
    data.edges = [
      { source: 'image0', target: 'image1' },
      { source: 'image1', target: 'image2' ,style: {
            stroke: '#1890ff', //节点之间连线的样式
          },},
      { source: 'image2', target: 'image3' ,style: {
            stroke: '#1890ff', //节点之间连线的样式
          },},
      { source: 'image3', target: 'image4',style: {
            stroke: 'red', //节点之间连线的样式
          }, },
      { source: 'image4', target: 'image5',style: {
            stroke: 'red', //节点之间连线的样式
          }, },
      { source: 'image2', target: 'image6' ,style: {
            stroke: '#1890ff', //节点之间连线的样式
          },},
      { source: 'image4', target: 'image7',style: {
            stroke: 'red', //节点之间连线的样式
          }, },
  
      { source: 'image1', target: 'image8' },
      { source: 'image8', target: 'image9' ,style: {
            stroke: '#ff7d18', //节点之间连线的样式
          },},
      { source: 'image9', target: 'image10' },
      { source: 'image9', target: 'image11' },
      { source: 'image6', target: 'image11' },
      { source: 'image6', target: 'image12',style: {
            stroke: 'red', //节点之间连线的样式
          }, },
    ];
    const COLORS = [ '#fe5e6b','#fcc640', '#fe945e']
    const container = document.getElementById('con');
    const width = container.scrollWidth;
    const height = container.scrollHeight || 500;
    const graph = new G6.Graph({
      container: 'con',
      width,
      height,
      fitView: true,
      defaultNode: { // 节点样式修改
        type: 'image', // 设置节点为图片
        size: [60, 60], // 节点大小
        labelCfg: {
          style: {
            fill: '#fff',
            fontSize: 16, // 文字大小
          },
          
        }
      },
      modes: {
        default: ['drag-canvas', 'zoom-canvas',] // 允许拖拽画布、放缩画布、拖拽节点
      },
  
      plugins: [],
      // plugins: [legend],
      animate: true,
      nodeStateStyles: {
        activeByLegend: {
          lineWidth: 5,
          strokeOpacity: 0.5,
          stroke: '#fff'
        },
        inactiveByLegend: {
          opacity: 0.5
        }
      },
      layout: {
        pipes: [
          {
            type: 'circular',
            nodesFilter: (node) => (node.id) == 'image0',
            center: [80, 80],
            radius: width / 10
          },
          {
            type: 'circular',
            nodesFilter: (node) => (node.id) == 'image1',
            center: [250, 200],
            radius: width / 10,
          },
          {
            type: 'circular',
            nodesFilter: (node) => (node.id) == 'image2',
            center: [400, 80],
            radius: width / 10
          },
          {
            type: 'circular',
            nodesFilter: (node) => (node.id) == 'image3',
            center: [600, 200],
            radius: width / 10
          },
          {
            type: 'circular',
            nodesFilter: (node) => (node.id) == 'image4',
            center: [800, 80],
            radius: width / 10
          },
          {
            type: 'circular',
            nodesFilter: (node) => (node.id) == 'image5',
            center: [1000, 200],
            radius: width / 10
          }, {
            type: 'circular',
            nodesFilter: (node) => (node.id) == 'image6',
            center: [400, 200],
            radius: width / 10
          }, {
            type: 'circular',
            nodesFilter: (node) => (node.id) == 'image7',
            center: [800, 200],
            radius: width / 10
          }, {
            type: 'circular',
            nodesFilter: (node) => (node.id) == 'image8',
            center: [40, 200],
            radius: width / 10
          }, {
            type: 'circular',
            nodesFilter: (node) => (node.id) == 'image9',
            center: [40, 400],
            radius: width / 10
          }, {
            type: 'circular',
            nodesFilter: (node) => (node.id) == 'image10',
            center: [150, 300],
            radius: width / 10
          }, {
            type: 'circular',
            nodesFilter: (node) => (node.id) == 'image11',
            center: [400, 400],
            radius: width / 10
          }, {
            type: 'circular',
            nodesFilter: (node) => (node.id) == 'image12',
            center: [550, 400],
            radius: width / 10
          },
          {
            type: 'circular',
            nodesFilter: (node) => (node.id) == 'image13',
            center: [650, 400],
            radius: width / 10
          },
          {
            type: 'circular',
            nodesFilter: (node) => (node.id) == 'image14',
            center: [750, 400],
            radius: width / 10
          },
          {
            type: 'circular',
            nodesFilter: (node) => (node.id) == 'image15',
            center: [850, 400],
            radius: width / 10
          },
          {
            type: 'circular',
            nodesFilter: (node) => (node.id) == 'image16',
            center: [950, 400],
            radius: width / 10
          },
          {
            type: 'circular',
            nodesFilter: (node) => (node.id) == 'image17',
            center: [1050, 400],
            radius: width / 10
          },
          {
            type: 'circular',
            nodesFilter: (node) => (node.id) == 'image18',
            center: [650, 500],
            radius: width / 10
          },
          {
            type: 'circular',
            nodesFilter: (node) => (node.id) == 'image19',
            center: [1050, 80],
            radius: width / 10
          },
          // {
          //   type: 'circular',
          //   nodesFilter: (node) => ((+node.id) >= 7 && (+node.id) <= 10),
          //   center: [width / 20 + 30, height / 3 * 2],
          //   radius: width / 20
          // },
          // {
          //   type: 'circular',
          //   nodesFilter: (node) => ((+node.id) >= 11 && (+node.id) <= 16),
          //   center: [width / 20 + 30, height / 3],
          //   radius: width / 20
          // },
          // {
          //   type: 'grid',
          //   nodesFilter: (node) => (+node.id) > 16,
          //   begin: [width / 10 + 50, 20],
          //   width: width / 5 * 3 - 100,
          //   height: height - 40,
          // }
        ],
      },
    });
    console.log(data)
    graph.data(data);
    graph.render();
  
    graph.on('node:click', (item) => {
      console.log(item)
    })
  
  
    if (typeof window !== 'undefined')
      window.onresize = () => {
        if (!graph || graph.get('destroyed')) return;
        if (!container || !container.scrollWidth || !container.scrollHeight) return;
        graph.changeSize(container.scrollWidth, container.scrollHeight);
      };
  
  }
  
  </script>
  <style lang="less" scoped>
  .cardImp {
      margin-right: 10px;
  }
  
  
  </style>