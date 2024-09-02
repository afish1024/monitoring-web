import tp1 from '@/assets/images/gplot/tp (1).png';
import tp2 from '@/assets/images/gplot/tp (2).png';
import tp3 from '@/assets/images/gplot/tp (3).png';
import tp4 from '@/assets/images/gplot/tp (4).png';
import tp5 from '@/assets/images/gplot/tp (5).png';
import tp6 from '@/assets/images/gplot/tp (6).png';
import tp7 from '@/assets/images/gplot/tp (7).png';
import tp8 from '@/assets/images/gplot/tp (8).png';
import tp9 from '@/assets/images/gplot/tp (9).png';
import tp10 from '@/assets/images/gplot/tp (10).png';
import tp11 from '@/assets/images/gplot/tp (11).png';
import tp12 from '@/assets/images/gplot/tp (12).png';
import tp13 from '@/assets/images/gplot/tp (13).png';
import tp14 from '@/assets/images/gplot/tp (14).png';
import tp15 from '@/assets/images/gplot/tp (15).png';
import tp16 from '@/assets/images/gplot/tp (16).png';
import tp17 from '@/assets/images/gplot/tp (17).png';
import tp18 from '@/assets/images/gplot/tp (18).png';
import tp19 from '@/assets/images/gplot/tp (19).png';
import tp20 from '@/assets/images/gplot/tp (20).png';
import tp21 from '@/assets/images/gplot/tp (1).png';
import tp22 from '@/assets/images/gplot/tp (4).png';
import tp23 from '@/assets/images/gplot/tp (9).png';
import tp24 from '@/assets/images/gplot/tp (7).png';
import tp25 from '@/assets/images/gplot/tp (5).png';
import tp26 from '@/assets/images/gplot/tp (3).png';
import tp27 from '@/assets/images/gplot/tp (4).png';
import tp28 from '@/assets/images/gplot/tp (6).png';
import tp29 from '@/assets/images/gplot/tp (8).png';
import tp30 from '@/assets/images/gplot/tp (10).png';

let tpImg = {
  'tp1': tp1,
  'tp2':tp2,
  'tp3':tp3,
  'tp4':tp4,
  'tp5':tp5,
  'tp6':tp6,
  'tp7':tp7,
  'tp8':tp8,
  'tp9':tp9,
  'tp10':tp10,
  'tp11':tp11,
  'tp12':tp12,
  'tp13':tp13,
  'tp14':tp14,
  'tp15':tp15,
  'tp16':tp16,
  'tp17':tp17,
  'tp18':tp18,
  'tp19':tp19,
  'tp20':tp20,
  'tp21':tp21,
  'tp22':tp22,
  'tp23':tp23,
  'tp24':tp24,
  'tp25':tp25,
  'tp26':tp26,
  'tp27':tp27,
  'tp28':tp28,
  'tp29':tp29,
  'tp30':tp30,
  'tp31':tp26,
  'tp32':tp27,
  'tp33':tp28,
  'tp34':tp29,
  'tp35':tp30,
  'tp36':tp27,
  'tp37':tp28,
  'tp38':tp29,
  'tp39':tp30,
}


export const relation1 = [
    { source: 'image0', target: 'image1' },
    { source: 'image0', target: 'image2' },
    // { source: 'image2', target: 'image3' },
    // { source: 'image3', target: 'image4' },
    // { source: 'image4', target: 'image5' },
    // { source: 'image2', target: 'image6' },
    // { source: 'image4', target: 'image7' },
    // { source: 'image1', target: 'image8' },
    // { source: 'image8', target: 'image9' },
    // { source: 'image9', target: 'image10' },
    // { source: 'image9', target: 'image11' },
    // { source: 'image6', target: 'image11' },
    // { source: 'image6', target: 'image12' },
]


let node1 = []

for (let i = 0; i < 20; i++) {
  let j = Number(i) + 1
  if (i == 11 || i == 12 || i == 13 || i == 14) {
    node1.push({
      id: 'image' + i,
      label: '192.168.1.' + i,
      img: tpImg[`tp` + j],
      size: [90, 60],
      style: {
        shadowColor:'rgba(255,255,255,0.5)',
        shadowBlur: 10,
        shadowOffsetX: -10,
        shadowOffsetY:-5
      },
      labelCfg: {
        style: {
          fill: '#fff',
        }
      }
    });
  } else {
    node1.push({
      id: 'image' + i,
      label: '192.168.1.' + i,
      img: tpImg[`tp` + j],
      style: {
        shadowColor:'rgba(255,255,255,0.5)',
        shadowBlur: 10,
        shadowOffsetX: -10,
        shadowOffsetY:-5
      },
      labelCfg: {
        style: {
          fill:'#fff'
        }
      }
    });
  }
  
}


let node2 = []

for (let i = 0; i < 40; i++) {
  let j = Number(i) + 1
  
  if (i == 11 || i == 12 || i == 13 || i == 14) {
    node2.push({
      id: 'image' + i,
      label: '192.168.1.' + i,
      img: tpImg[`tp` + j],
      size: [90, 60],
      style: {
        shadowColor:'rgba(255,255,255,0.5)',
        shadowBlur: 10,
        shadowOffsetX: -10,
        shadowOffsetY:-5
      },
      labelCfg: {
        style: {
          fill: '#fff',
        }
      }
    });
  } else {
    node2.push({
      id: 'image' + i,
      label: '192.168.1.' + i,
      img: tpImg[`tp` + j],
      style: {
        shadowColor:'rgba(255,255,255,0.5)',
        shadowBlur: 10,
        shadowOffsetX: -10,
        shadowOffsetY:-5
      },
      labelCfg: {
        style: {
          fill:'#fff'
        }
      }
    });
  }
  
}

export const nodes1 = node1


export const nodes2 = node2

const width = 600
export const property1 = [
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
    radius: width / 10
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
    center: [700, 400],
    radius: width / 10
  },
  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image14',
    center: [850, 400],
    radius: width / 10
  },
  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image15',
    center: [1050, 400],
    radius: width / 10
  },
  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image16',
    center: [1200, 400],
    radius: width / 10
  },
  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image17',
    center: [1350, 400],
    radius: width / 10
  },
  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image18',
    center: [550, 550],
    radius: width / 10
  },
  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image19',
    center: [1350, 80],
    radius: width / 10
  },
]




export const relation2 = [
  {
    source: 'image0', target: 'image1'},
  { source: 'image0', target: 'image2'},
  { source: 'image0', target: 'image3' },
  { source: 'image0', target: 'image4'},
  { source: 'image0', target: 'image5' },
  { source: 'image0', target: 'image6' },
  { source: 'image0', target: 'image7' },
  { source: 'image0', target: 'image8' },
  { source: 'image0', target: 'image9' },
  { source: 'image1', target: 'image10' },
  { source: 'image1', target: 'image11' },
  { source: 'image1', target: 'image12' },
  { source: 'image2', target: 'image13' },
  { source: 'image2', target: 'image14' },
  { source: 'image3', target: 'image15' },
  { source: 'image4', target: 'image16' },
  { source: 'image5', target: 'image17' },
  { source: 'image5', target: 'image18' },
  { source: 'image5', target: 'image19' },
  { source: 'image5', target: 'image20' },
  { source: 'image5', target: 'image21' },
  { source: 'image5', target: 'image22' },
  
  { source: 'image6', target: 'image23' },
  { source: 'image6', target: 'image24' },
  { source: 'image6', target: 'image25' },
  { source: 'image6', target: 'image26' },
  { source: 'image6', target: 'image27' },


  { source: 'image7', target: 'image28' },
  { source: 'image7', target: 'image29' },
  { source: 'image7', target: 'image30' },
  { source: 'image7', target: 'image31' },
  { source: 'image7', target: 'image32' },
  { source: 'image7', target: 'image33' },
  { source: 'image7', target: 'image34' },
  { source: 'image7', target: 'image35' },
  { source: 'image7', target: 'image36' },

  { source: 'image8', target: 'image37' },
  { source: 'image8', target: 'image38' },

  { source: 'image9', target: 'image39' },
]


export const property2 = [
  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image0',
    center: [700, 400],
    radius: width / 10
  },
  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image1',
    center: [200, 200],
    radius: width / 10
  },
  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image2',
    center: [400, 40],
    radius: width / 10
  },
  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image3',
    center: [650, 20],
    radius: width / 10
  },
  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image4',
    center: [900, 40],
    radius: width / 10
  },

  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image5',
    center: [1150, 250],
    radius: width / 10
  },

  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image6',
    center: [250, 600],
    radius: width / 10
  },

  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image7',
    center: [680, 700],
    radius: width / 10
  },

  
  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image8',
    center: [1000, 630],
    radius: width / 10
  },

   
  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image9',
    center: [1150, 530],
    radius: width / 10
  },

 
  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image10',
    center: [-200, 250],
    radius: width / 10
  },

  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image11',
    center: [-150, 150],
    radius: width / 10
  },

  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image12',
    center: [-100, 50],
    radius: width / 10
  },

  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image13',
    center: [80, -80],
    radius: width / 10
  },
  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image14',
    center: [200, -120],
    radius: width / 10
  },
  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image15',
    center: [600, -200],
    radius: width / 10
  },
  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image16',
    center: [1000, -200],
    radius: width / 10
  },
  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image17',
    center: [1400, -100],
    radius: width / 10
  },

  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image18',
    center: [1500, 0],
    radius: width / 10
  },
  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image19',
    center: [1550, 100],
    radius: width / 10
  },
  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image20',
    center: [1600, 200],
    radius: width / 10
  },
  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image21',
    center: [1650, 300],
    radius: width / 10
  },
  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image22',
    center: [1650, 400],
    radius: width / 10
  },
  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image23',
    center: [-200, 500],
    radius: width / 10
  },
  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image24',
    center: [-210, 600],
    radius: width / 10
  },
  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image25',
    center: [-210, 700],
    radius: width / 10
  },
  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image26',
    center: [-160, 800],
    radius: width / 10
  },
  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image27',
    center: [-80, 900],
    radius: width / 10
  },


  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image28',
    center: [300, 1050],
    radius: width / 10
  },

  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image29',
    center: [400, 1100],
    radius: width / 10
  },

  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image30',
    center: [500, 1130],
    radius: width / 10
  },

  
  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image31',
    center: [600, 1140],
    radius: width / 10
  },

  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image32',
    center: [700, 1150],
    radius: width / 10
  },

  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image33',
    center: [800, 1150],
    radius: width / 10
  },

  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image34',
    center: [900, 1140],
    radius: width / 10
  },

  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image35',
    center: [1000, 1130],
    radius: width / 10
  },

  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image36',
    center: [1100, 1100],
    radius: width / 10
  },

  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image37',
    center: [1400, 1000],
    radius: width / 10
  },

  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image38',
    center: [1500, 900],
    radius: width / 10
  },

  {
    type: 'circular',
    nodesFilter: (node) => (node.id) == 'image39',
    center: [1600, 700],
    radius: width / 10
  },
  
]