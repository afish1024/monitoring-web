<template>
    <div style="background-color: rgb(16, 11, 43);height: 100%;width: 100%;border: none;">
          <div id="mynetwork"></div>
    </div>
</template>
<script setup name="topomap">
import { useRouter } from 'vue-router'
import vis from 'vis'
onMounted(()=>{
      network()  
  })


const getImg = ()=>{
    return new URL('../../../assets/images/zhuji.png',import.meta.url).href;
}
const getErrorImg = ()=>{
    return new URL('../../../assets/images/error.png',import.meta.url).href;
}
const router = useRouter()
const controLlist = ref()
const network = ()=>{
         // 创建节点数据数组  new vis.DataSet(
        // console.log(window.location.href)
        controLlist.value = JSON.parse(decodeURIComponent(window.location.href.split('?')[1]))  
        // console.log(controLlist.value)
        var nodesList = []
        controLlist.value.map((item)=>{
          var image = getImg()
          if(item.imageAnormal!=''){
            var image = item.imageAnormal
          }else{
            if(item.imageNormal == ''){
              // if(item.healthScore < Number(90)){
              //   var image = getErrorImg()
              // }else{
              //   var image = getImg()
              // }
              var image = getImg()
            }else{
              var image = item.imageNormal
            }
            
          }
          nodesList.push({
              id:item.id,
              label:item.name,
              isTogether:true,
              shape: 'image',
              image:image,
              size:20,
              color:'#fff',
              isTrue:true,
              font: { multi: "html",color:'#fff',size:12 },
          })
        })
        var nodesFirst = [
            { 
                id: 0, 
                isTogether:true,
				        label: "",
                shape: 'image',
                image:getImg(),
                size:20,
                color:'#fff',
                
            }
          ]
        let newArray = nodesFirst.concat(nodesList)
        // console.log(newArray)
        var nodes = newArray;
        var edgesList = []
        newArray.map((item,index)=>{
          if(item.id > 0){
            edgesList.push({
            from: 0, 
            to: item.id
          })
          }
        })
        // 创建边数据数组
        var edges = edgesList;
        // 获取容器
        var container = document.getElementById('mynetwork');
 
        // 将数据赋值给vis 数据格式化器
        var data = {
            nodes: nodes,
            edges: edges
        };
        var options = {
            edges:{
                width: 1,
                // length:25,
                shadow: false,
                arrows: { 
                    to: {
                        enabled: false,
                        scaleFactor: 1,  
                        type: "arrow"
                    },
                }, 
                color: {
                    color: "#fff",
                    inherit: "from",
                    hover: '#fff',
                    opacity: 1.0
                },
                font: {
                    color: '#fff',
                    size: 14, 
                    face: 'arial',
                    ital: {
                        color: "#fff",
                    },
                },
            },
            physics: { //计算节点之前斥力，进行自动排列的属性

                enabled: true, //默认是true，设置为false后，节点将不会自动改变，拖动谁谁动。不影响其他的节点
                barnesHut: {

                    gravitationalConstant: -2000,

                    centralGravity: 0.3,

                    springLength: 120,

                    springConstant: 0.04,

                    damping: 0.09,

                    avoidOverlap: 0

                }
            },
            interaction: {
                dragNodes: false, //是否能拖动节点
                dragView: false, //是否能拖动画布
                hover: true, //鼠标移过后加粗该节点和连接线
                multiselect: false, //按 ctrl 多选
                selectable: true, //是否可以点击选择
                selectConnectedEdges: true, //选择节点后是否显示连接线
                hoverConnectedEdges: false, //鼠标滑动节点后是否显示连接线
                zoomView: false, //是否能缩放画布
                hoverConnectedEdges: true
            },
        };
        
        // console.log('悬停边',properties);
        // 初始化关系图
        var network = new vis.Network(container, data, options);
        network.on('click',function(event){
            console.log(event)
            var nodeId = event.nodes[0]; // 获取点击的节点的ID
            console.log('Clicked node ID:', nodeId);
            // router.push({
            //   path:'/businessmonitoring',
            //   query: {
            //       type: nodeId
            //   }
            // })
            if(typeof(nodeId) == 'undefined'){
              let routeData = router.resolve({ path: '/sys/resource', query: { type: nodeId} });
              window.open(routeData.href, '_blank');
            }else{
              if(nodeId == 0){
                let routeData = router.resolve({ path: '/sys/resource'});
                window.open(routeData.href, '_blank');
              }else{
                let routeData = router.resolve({ path: '/businessmonitoring', query: { type: nodeId} });
                window.open(routeData.href, '_blank');
              }
              
            }
            

        })
    }
</script>
<style lang="less">
 #mynetwork {
		width: 100%;
		height: 500px;
        position: absolute;
        right: 5%;
        // top:160px
        bottom: 15px;
	}
	canvas{
		cursor: pointer;
        
	}
</style>
<!-- <script>
import { DataSet } from 'vis-data';
import { Network } from 'vis-network';
import { Table } from 'ant-design-vue';
export default {
  data() {
    return {
      nodes: new DataSet([
        { id: 1, label: 'Node 1', info: 'Some info about Node 1' },
        { id: 2, label: 'Node 2', info: 'Some info about Node 2' },
        { id: 3, label: 'Node 3', info: 'Some info about Node 3' },
        { id: 4, label: 'Node 4', info: 'Some info about Node 4' },
      ]),
      edges: new DataSet([
        { from: 1, to: 2 },
        { from: 2, to: 3 },
        { from: 3, to: 4 },
        { from: 4, to: 1 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
      ]),
      network: null,
      selectedNodeId: null,
      search: '',
      dataSource: [],
      columns: [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Label', dataIndex: 'label', key: 'label' },
        { title: 'Info', dataIndex: 'info', key: 'info' },
      ],
    };
  },
  methods: {
    initNetwork() {
      const container = document.getElementById('mynetwork');
      const data = {
        nodes: this.nodes,
        edges: this.edges,
      };
      const options = {};
      this.network = new Network(container, data, options);
      this.network.on('click', (params) => {
        console.log(params)
        if (params.nodes.length === 1) {
          const nodeId = params.nodes[0];
          this.selectedNodeId = nodeId;
          const node = this.nodes.get(nodeId);
          this.dataSource = [node];
        } else {
          this.selectedNodeId = null;
          this.dataSource = [];
        }
      });
    },
    onSearch() {
      if (this.search) {
        const searchNode = this.nodes.get({
          filter: (node) => node.label.toLowerCase().includes(this.search.toLowerCase()),
        });
        this.network.selectNodes(searchNode.map((node) => node.id));
      } else {
        this.network.unselectAll();
      }
    },
  },
  mounted() {
    this.initNetwork();
  },
  
};
</script> -->