<!-- <template>
    <div id="data-view" ref="main">
        <topHeader   paramName="监督台" />
        <div class="ad">
            <div class="left">
                <div class="leftpic">
                    <img src="../../assets/images/tu.png"/>
                </div>
                <div>
                    <span style="padding-left: 10px;font-size: 18px;"> REAL-TIME</span><br/>
                    <span> ALARM  STATION</span> 
                </div>
                <div class="leftredtitle">
                    <span>实时告警平台</span>>
                </div>
            </div>
            <div class="right">
                <div class="dateinfo1">
                    <img src="../../assets/images/yellowalarm.png" />
                    <span>预警(<a style="color: #9c5808; cursor: none;">10</a>)</span>
                </div>
                <div class="dateinfo2">
                    <img src="../../assets/images/serious.png" />
                    <span>告警(<a style="color: #ff0011;cursor: none;">10</a>)</span>
                </div>
            </div>
        </div>
        <alarmTable/>
        <div style="display: flex;">
            <div style="width: 50%;margin-bottom: 5px;margin-right: 150px;">
                <div class="iconqs"> 
                    <icon-font type="icon-wujiaoxing" />
                    <span>当天告警趋势</span>
                </div>
                <flodLineChart style="height: 300px;"/>
            </div>
            <div style="width: 50%;margin-bottom: 5px;">
                <div class="iconqs"> 
                    <icon-font type="icon-wujiaoxing" />
                    <span>当天告警统计</span>
                </div>
                <pieChart style="height: 300px;right: 200px;bottom: 17px;right: 5%;"/>
            </div>
        </div>
        
    </div>
</template>
<script setup name="alarmbigscreen" >
import topHeader from './screen/topHeader.vue'
import alarmTable from './screen/alarmTable.vue'
import flodLineChart from './screen/flodLine.vue'
import pieChart from './screen/pie.vue'
import { createFromIconfontCN } from '@ant-design/icons-vue';
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3441767_jldrkrmerxg.js',
});
defineComponent(() => {
    IconFont
})
</script>

<style lang="less">
#data-view {
    width: 100%;
    height: 100%;
    background-color: #030409;
    color: #fff;
    background-image: url('../../assets/images/bg.110420cf.png');
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
    .ad{
        margin-top: -15px;
        display: flex;
        .left{
            padding-left: 35px;
            padding-right: 35px;
            display: flex;
            .leftpic{
                width: 50px;
                height: 75px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .leftredtitle{
                background: #ff0011;
                color: #fff;
                width: 150px;
                height: 30px;
                text-align: center;
                margin-left: 10px;
                margin-top: 12px;
                span{
                    height: 30px;
                    line-height: 29px;
                }
            }
        }
        .right{
            position: absolute;
            right: 70px;
            margin-top: 10px;
            display: flex;
            
            .dateinfo1{
                display: flex;
                img{
                    width: 30px;
                    height: 30px;
                }
                span:first-of-type{
                    margin-top: 11px;
                    padding-left: 5px;
                    font-size: 12px;
                }
            } 
            .dateinfo2{
                display: flex;
                padding-left: 60px;
                img{
                    width: 30px;
                    height: 30px;
                }
                span:first-of-type{
                    margin-top: 11px;
                    padding-left: 5px;
                    font-size: 12px;
                }
            }
        }
    }
    .iconqs{
        padding-left: 30px;
        margin-top: 30px;
        span{
            font-size: 12px;
            padding-left: 5px;
        }
    }  
}
</style> -->
<!-- import * as d3 from 'd3';
    const nodes= [
      {id: 1, name: ''},
      {id: 2, name: 'Node 2'},
      {id: 3, name: 'Node 3'},
      {id: 4, name: 'Node 4'},
      {id: 5, name: 'Node 5'},
      {id: 6, name: 'Node 6'},
      {id: 7, name: 'Node 7'},
      {id: 8, name: 'Node 8'},
      {id: 9, name: 'Node 9'},
      {id: 10, name: 'Node 10'}
    ]
    const links = [
      {source: 1, target: 2},
      {source: 1, target: 3},
      {source: 1, target: 4},
      {source: 1, target: 5},
      {source: 1, target: 6},
      {source: 1, target: 7},
      {source: 1, target: 8},
      {source: 1, target: 9},
      {source: 1, target: 10}
      
    ]
    onMounted(()=>{
        d3pic()
    })
    const getImg = ()=>{
        return new URL('../../assets/images/zhuji.png',import.meta.url).href;
    }
    const d3pic = ()=>{
        const svg = d3.select('#topology');
        const width = svg.attr('width');
        const height = svg.attr('height');
        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id(d => d.id).distance(260))
            .force('charge', d3.forceManyBody())
            .force('center', d3.forceCenter(width / 4, height / 2));
    
        const link = svg.selectAll('line')
            .data(links)
            .enter()
            .append('line')
            .attr('stroke', '#ccc')
            .attr('stroke-width', 2);
    
        const node = svg.selectAll('image')
            .data(nodes)
            .enter()
            .append('image')
            // .append('circle')
            // .attr('r', 10)
            // .attr('fill', 'red')
            .attr('xlink:href', getImg())
            .attr('width', 30)
            .attr('height', 30)
            .call(d3.drag()
                .on('start', dragstarted)
                .on('drag', dragged)
                .on('end', dragended));
    
        const label = svg.selectAll('.label')
            .data(nodes)
            .enter()
            .append('text')
            .attr('class', "label")
            .text(function (d) {return d.name;})
            .attr("dx", -80)
            .attr('stroke', '#fff')
            .style("font-size","16px")
            .attr("dy", 12);
            
    
        node.append('title')
            .text(d => d.name);
    
        simulation.on('tick', () => {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);
    
        node
            .attr('x', d => d.x)
            .attr('y', d => d.y);
        label
            .attr('x', function (d) {return d.x;})
            .attr('y', function (d) {return d.y;});
        });
    }  
    const dragstarted = (event, d)=>{
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    const dragged = (event, d)=>{
        d.fx = event.x;
        d.fy = event.y;
    }
    const dragended = (event, d)=>{
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    } -->