import { Stage, Layer, Node, VERSION } from '@jtopo/core';
import tp2 from '@/assets/images/gplot/2.jpg';
import tp14 from '@/assets/images/gplot/tp (6).png';
import fwq from '@/assets/images/gplot/tp (13).png'
import jhj from '@/assets/images/gplot/tp (4).png'
import lyq from '@/assets/images/gplot/tp (5).png'
import fhq from '@/assets/images/gplot/fhq.png'
import dn from '@/assets/images/gplot/dn.png'
import sxt from '@/assets/images/gplot/tp (10).png'
import topologyApi from '@/api/topology/topologyApi';
let tpImg = {
  'equipment': tp2,
  'intranet': tp14,
  'surveillance_camera':sxt,
  'computer':dn,
  'firewall':fhq,
  'router':lyq,
  'switch':jhj,
  'server':fwq
}
import {
  jtopo,
  Link,
  FlexionalLink,
  AutoFoldLink,
  Shape,
  CircleNode, 
  randomColor,
  Tooltip, PopupMenu
} from '@jtopo/core';

// var CircleNode = CircleNode;
var FoldLink = jtopo.FoldLink;
var nodes = [];
var links = [];
var rightMenu = []
var showlist = []


// 直线
function linkNode (nodeA, nodeZ, text,ids) {
  var link =  new Link(text, nodeA, nodeZ,'', '')
  let label = link.getLabel();
    label.css({
      color: 'green',
      fontSize: '22px',
  });
  link.css({
      'lineWidth': 3,
      //'strokeStyle': randomColor()
  });
  link.setUserData({id: ids,type:'link',ptype:'fold'});
  links.push(link);
  return link;
}




// 折线
function FlexLink(nodeA, nodeZ, text,x,y,ids='') {
  var link = new FlexionalLink(text, nodeA, nodeZ, x, y);
  let label = link.getLabel();
    label.css({
      color: 'green',
      fontSize: '22px',
  });
  link.css({
      'lineWidth': 3,
      //'strokeStyle': randomColor()
  });
  link.setUserData({id: ids,type:'link',ptype:'straight'});
  link.Shape
  links.push(link);
  return link;
}


// 无副作用的布局函数，
function myLayout(node) {
  let points = node.userData.points;
  let nodes = node.children;
  points.forEach((p, i) => {
      let child = nodes[i];
      child.setXY(p.x * node.width, p.y * node.height);
  });
}

//双节点

function newMyNode(name,x, y,img,w,h,ids = '',type,num,children) {
  var node = new Node(name, num, null, w, h);
  node.setImage(img , true);
  node.resizeTo(130, 130);
  node.translate(x, y);
   // 网格布局
   const cols =2;
   const points = Shape.outerGrid(num, cols).points;
   // 坐标->Node对象
   function pointToNode(p, i) {
      let endpoint = new CircleNode('');
      // endpoint.setRadius(9);
      // endpoint.addClass('.endpoint');
      // endpoint.draggable = false;
      return endpoint;
  }
  const subNodes = points.map(pointToNode);
  node.addChilds(subNodes);
  node.setUserData({id: ids,type:'node',ptype:type, name:name,children:children,points: points });
  node.css({
    font: 'bold 30px arial',
  });
  node.draggable = true
  myLayout(node);
  return node;
}
//节点
function node(x, y, img, name,w,h,ids = '',type,num,children) {
  if(num >1){
    var node = new Node(name, num, null, w, h);
  node.setImage(img , true);
  node.resizeTo(130, 130);
  node.translate(x, y);
   // 网格布局
   const cols =2;
   const points = Shape.outerGrid(num, cols).points;
   // 坐标->Node对象
   function pointToNode(p, i) {
      let endpoint = new CircleNode('');
      // endpoint.setRadius(9);
      // endpoint.addClass('.endpoint');
      // endpoint.draggable = false;
      return endpoint;
  }
  const subNodes = points.map(pointToNode);
  node.addChilds(subNodes);
  node.setUserData({id: ids,type:'node',ptype:type, name:name,children:children,points: points });
  node.css({
    font: 'bold 30px arial',
  });
  node.draggable = true
  myLayout(node);
  return node;
  }else{
    var node = new Node(name, null, null, w, h);
    node.setImage(img , false);
    node.translate(x, y);
    node.resizeTo(130, 130);
    node.setUserData({id: ids,type:'node',ptype:type, name:name,num:num,children:children,x:x,y:y,img:img,w:w,h:h,dtype:type});
    node.css({
      font: 'bold 30px arial',
    });
    node.draggable = true
    return node;
  }
  
}

//节点索引
function nodeIndex (id,arr) {
  for (let i = 0; i < arr.length; i++){
    if (arr[i].id == id) {
      return i
    }
  }
}
//双线节点索引


class TopoManager{
    stage;
    layer;

    /**
     * 初始化，创建一个空画布
     * @param {*} divObj 
     */
  
    
  init (divObj, data, type) {
      
      
        topologyApi.commandList().then((res) => {
          console.log(res)
          rightMenu = res
        })
        const stage = new Stage('divId');
        const layer = new Layer('default');
        stage.toolbar.getDom().querySelector('[title="保存到本地"]').remove();
        stage.toolbar.getDom().querySelector('[title="打开本地文件"]').remove();
        stage.toolbar.getDom().querySelector('[title="查找"]').remove();
        stage.toolbar.getDom().querySelector('[iconid="search"]').remove();
        layer.zoom(0.5,0.5)
        stage.addChild(layer);
        stage.show();

        this.stage = stage;
        this.layer = layer;   
        this.initEvent();
        this.render(data,type);
    }

    // 事件处理初始化
    initEvent(){
        const stage = this.stage;
        const layer = this.layer;
        const inputSystem = stage.inputSystem;
         // 右键菜单
         var popupMenu = new PopupMenu(stage);
        
        
         // 菜单选择事件处理
         popupMenu.on('select',  (event)=> {
            
          let target = inputSystem.pickedObject;
           var item = event.item;
           //console.log(target.userData)
           //console.log(item)
           if (item == '综合信息') {
            window.bus.emit('infoVal', target.userData)
           }

           if (item == 'ping') {
            for (let i = 0; i < rightMenu.length; i++){
              if (rightMenu[i].strategyName == 'ping') {
                window.bus.emit('pingVal', {id: rightMenu[i].id, deviceId:target.userData.id })
             }
            }
           
           }
           
           if (item == '查看端口') {
            window.bus.emit('getExchange', target.userData)
          }

           
          if (item == '更换类型') {
            window.bus.emit('typeVal', target.userData)
          }
          
         });
      
    

      inputSystem.on('dblclick', function () {
        let target = inputSystem.pickedObject;
        console.log(target.userData)
        if (target!=null && target.userData && target.userData.ptype == "intranet") {
          window.bus.emit('getChild', target.userData)
        }

        if (target!=null && target.userData && target.userData.ptype == 'equipment') {
          window.bus.emit('getExchange', target.userData)
        }
          
      });
      
      
      inputSystem.on('mouseup', function () {
        let is = stage.inputSystem;
        let target = inputSystem.pickedObject;
        // console.log(target)

        if (target!=null && target.userData && target.userData.type == 'link') {
          popupMenu.setHtml(`
              <a>更换类型</a>
             
          `);
             // 取画布上的坐标x,y
          if (is.button == 2) { // right button
            popupMenu.showAt(is.x, is.y);
          }
        }

        if (target != null && target.userData && target.userData.ptype == 'equipment') {
          console.log(rightMenu)
          let str = `
            <a>综合信息</a>
           <a style="margin-top:10px">查看端口</a>
           `

          for (let i = 0; i < rightMenu.length; i++){
            str+= `<a  style="margin-top:10px">${rightMenu[i].strategyName}</a>`
          }
        
            popupMenu.setHtml(str);
          // 取画布上的坐标x,y
          if (is.button == 2) { // right button
            popupMenu.showAt(is.x, is.y);
          }
        }
      });

      inputSystem.on('mousedown', function () {
        popupMenu.hide();
    });
    }
  

  render (data, type) {
      
    // const fromNode = new Node('', -650, -200, 400, 200);
    // fromNode.draggable = false
    // fromNode.css({
    //   border: 'dotted 1px gray',
    //   zIndex: -1,
    // });
    
    //console.log(data)
    const stage = this.stage;
    const layer = this.layer;
    layer.removeAllChild()
    var x = -300
    var y = -300

    const point = {}
    if(data.length === 0){
      layer.addChilds([]);
      return
    }
    if (type == 'all') {
      nodes = []
      links = []
      let res = data[0].children
      for (let i = 0; i < res.length; i++){
        nodes.push(node(x + (i * 600), 0,tpImg[res[i].type], res[i].name, 150, 150,res[i].id,res[i].type));
        point[res[i].id] = node(x + (i * 600), 0, tpImg[res[i].type], res[i].name, 150, 150)
      }
      layer.addChilds(nodes);
    } else {
      let n_data = data.node
      let l_data = data.linkNode
      if(!n_data){
        layer.addChilds([]);
        return
      }
      nodes = []
      links = []
      showlist = []
      for (let i = 0; i < n_data.length; i++){

        x += 200
        if (i % 5 == 0) {
          x = -300
          y += 200
        }
        // if(n_data[i].id == "1762412674683600897" || n_data[i].id=="1762412878702936065"){
        //   n_data[i].num = 3
        //   n_data[i].children=['0/0/1','0/0/2']
        // }else{
        //   n_data[i].num = 1
        //   n_data[i].children=[]
        // }
        if (n_data[i].xcoordinate == null || n_data[i].ycoordinate == null) {
         
          if(!tpImg[n_data[i].deviceType]){
            tpImg[n_data[i].deviceType] = tp14
          }
          nodes.push(node(x , y, tpImg[n_data[i].deviceType], n_data[i].name, 80, 80,n_data[i].id,n_data[i].type));
          point[n_data[i].id] = node(x , y, tpImg[n_data[i].deviceType], n_data[i].name, 80, 80)
        } else {
          if(!tpImg[n_data[i].deviceType]){
            tpImg[n_data[i].deviceType] = tp14
          }
          //if(n_data[i].num > 1){
            //nodes.push(newMyNode(n_data[i].name,Number(n_data[i].xcoordinate),Number(n_data[i].ycoordinate),tpImg[n_data[i].deviceType], 100, 100,n_data[i].id,n_data[i].type,n_data[i].num,n_data[i].children))
            //var node1 = newMyNode(n_data[i].name,Number(n_data[i].xcoordinate),Number(n_data[i].ycoordinate),tpImg[n_data[i].deviceType], 100, 100,n_data[i].id,n_data[i].type,n_data[i].num,n_data[i].children)
            //var node2 = newMyNode(n_data[i].name,Number(n_data[i].xcoordinate),Number(n_data[i].ycoordinate),tpImg[n_data[i].deviceType], 100, 100,n_data[i].id,n_data[i].type,n_data[i].num,n_data[i].children)
            // showlist.push(newMyNode(n_data[i].name,Number(n_data[i].xcoordinate),Number(n_data[i].ycoordinate),tpImg[n_data[i].deviceType], 100, 100,n_data[i].id,n_data[i].type,n_data[i].num,n_data[i].children))
             
         // }else{
            nodes.push(node(Number(n_data[i].xcoordinate) , Number(n_data[i].ycoordinate), tpImg[n_data[i].deviceType], n_data[i].name, 80, 80,n_data[i].id,n_data[i].type,n_data[i].num,n_data[i].children));
          //}
          point[n_data[i].id] = node(Number(n_data[i].xcoordinate) , Number(n_data[i].ycoordinate), tpImg[n_data[i].deviceType], n_data[i].name, 80, 80)
        }
 

      }
      
      if(l_data){
        for (var i = 0; i < l_data.length; i++){
          if(l_data[i].num < 2){
            if(l_data[i].startPointPortName == null){
              l_data[i].startPointPortName = ''
            }
            if(l_data[i].endPointPortName == null){
              l_data[i].endPointPortName =''
            }
            if(l_data[i].upLinkRate == null){
              l_data[i].upLinkRate = ''
            }
            if (l_data[i].linkType == 'fold') {
              //if(nodeIndex(l_data[i].startPoint,n_data)){
                FlexLink(nodes[nodeIndex(l_data[i].startPoint,n_data)],  nodes[nodeIndex(l_data[i].endPoint,n_data)], l_data[i].startPointPortName+'  '+l_data[i].endPointPortName+'  '+l_data[i].upLinkRate, 'center', 'rm',l_data[i].id);
              //}
              
            }else{
              //if(nodeIndex(l_data[i].startPoint,n_data)){
               linkNode(nodes[nodeIndex(l_data[i].startPoint, n_data)], nodes[nodeIndex(l_data[i].endPoint, n_data)],l_data[i].startPointPortName+'  '+l_data[i].endPointPortName+'  '+l_data[i].upLinkRate,l_data[i].id)
             // }
            }
          }else{
            console.log(nodes[nodeIndex(l_data[i].startPoint, n_data)])
            console.log(nodes[nodeIndex(l_data[i].endPoint, n_data)])
            //drawLinks(l_data[i].startTopologyNode,l_data[i].endTopologyNode)
            drawLinks(nodes[nodeIndex(l_data[i].startPoint, n_data)], nodes[nodeIndex(l_data[i].endPoint, n_data)])
          }
         
        }
      }
      
    
      layer.addChilds(links);
      layer.addChilds(nodes)
    
     
    }
    
    function drawLinks(nodeA,nodeZ){
      var formName = ''
      var toName = ''
      let outputs = nodeA.children.filter((e, idx) => idx % 2 != 0);
      let inputs = nodeZ.children.filter((e, idx) => idx % 2 == 0);
      for (let i = 0; i < outputs.length; i++) {
        // let fromIndex = i * (outputs.length-2);
        // let toIndex = i * (inputs.length-2);
    
          //console.log(fromIndex)
          //console.log(toIndex)
          let from = outputs[i];
          let to = inputs[i];
          console.log(from.parent.data.children[i])
          console.log(to.parent.data.children[i])
          formName = typeof(from.parent.data.children) !='undefined' ? from.parent.data.children[i]['portName']:''
          toName = typeof(to.parent.data.children) !='undefined' ? to.parent.data.children[i]['portName']:''
          //console.log(to)
          let link = new Link(formName+'  '+toName, from, to);
          link.css({
              // 'strokeStyle': 'green',
              'lineWidth': 3,
          });
          let label = link.getLabel();
          label.css({
            color: 'green',
            fontSize: '22px',
        });
          layer.addChild(link);
      }
    }

  }

  saveData () {
    const layer = this.layer;
    // layer.getAllNodes()
    // console.log(layer.getAllNodes())
    // let imageToBase64 = true;
    // let json = layer.toFileJson(imageToBase64);
    return layer.getAllNodes()
  }
}

export const topoManager = new TopoManager();