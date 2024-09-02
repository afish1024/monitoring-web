import { EventTarget as ue, Theme as ve, Node as j, Position as _, PositionInvertMap as ke, CircleNode as _e, Cursor as T, DefaultZIndexs as ee, Link as k, AutoFoldLink as x0, isHorizontal as te, CurveLink as Pe, BezierLink as Le, Style as Te, EndpointSegment as be, EndpointFixedName as pe, Point as p0, setProto as re, Shape as ge, getNearestPointOnObjectsOBB as Ee, getNearestAnchorOnObjects as He, DisplayObject as Ae, PopupMenu as De, LinkHelper as Ie, Rectangle as ye, ResourceLoader as oe, EventNames as b0, StageMode as Me, NodeHelper as Oe, getClass as ce, InputTextfield as Ne, Tooltip as Be } from "@jtopo/core";
function g0() {
  const r = ["754481LrIwdv", "7115XUPlKe", "jtopo_iconsPanel", "114612WUVnen", "hide", "21cYGhUY", "display", "ondragstart", "getDragItem", "setAttribute", "classList", "add", "setConfig", "forEach", "item", "draggable", "2420fqtvgH", "4092966GfbBqc", "none", "layersContainer", "initDom", "show", "4313136abMDhO", "315214wukvgd", "1192AmuIbY", "18NPYMhz", "div", "createElement", "dargItem", "7pmOfws", "domElement", "iconHtml", "style", "appendChild", "block", "stage", "3525950jAbeNe"];
  return g0 = function() {
    return r;
  }, g0();
}
const G = t0;
(function(r, x) {
  const e = t0, t = r();
  for (; []; )
    try {
      if (-parseInt(e(243)) / 1 + parseInt(e(229)) / 2 * (-parseInt(e(248)) / 3) + parseInt(e(230)) / 4 * (-parseInt(e(244)) / 5) + -parseInt(e(223)) / 6 * (parseInt(e(235)) / 7) + parseInt(e(228)) / 8 * (parseInt(e(231)) / 9) + parseInt(e(242)) / 10 + parseInt(e(222)) / 11 * (parseInt(e(246)) / 12) === x)
        break;
      t.push(t.shift());
    } catch {
      t.push(t.shift());
    }
})(g0, 568154);
function t0(r, x) {
  const e = g0();
  return t0 = function(t, n) {
    return t = t - 220, e[t];
  }, t0(r, x);
}
class _x extends ue {
  constructor(x) {
    const e = t0;
    super(), this[e(241)] = x, this.domElement, this[e(226)](), this[e(247)]();
  }
  [G(226)]() {
    const x = G;
    let e = document[x(233)](x(232));
    return e.classList[x(254)](x(245)), this[x(241)][x(225)][x(239)](e), this[x(236)] = e, this;
  }
  hide() {
    const x = G;
    return this[x(236)][x(238)][x(249)] = x(224), this;
  }
  [G(227)]() {
    const x = G;
    return this[x(236)][x(238)][x(249)] = x(240), this;
  }
  [G(251)]() {
    return this[G(234)];
  }
  [G(255)](x) {
    const e = G;
    let t = this;
    return x.items[e(256)](function(n) {
      const s = e;
      let a = document[s(233)]("div");
      a[s(253)][s(254)](s(220)), a.innerHTML = n[s(237)], a[s(252)](s(221), !![]), a[s(250)] = function(i) {
        const o = s;
        t[o(234)] = n;
      }, t[s(236)][s(239)](a);
    }), this;
  }
}
function I0() {
  const r = ["0px", "nodeCtrlBox", "1397880EoBocU", "fontWeight", "7,3", "attachTo", "2,2", "节点属性", "dat", "fontFamily", "基础属性", "addFolder", "516020gZPRno", "fontSize", "setFolderValues", "403319dNHqpy", "className", "6trDYcM", "fillStyle", "inputSystem", "add", "block", "stage", "find", "styleSystem", "11fQQtAe", "basic", "showProperty", "property", "54qIcaCD", "backgroundColor", "close", "appendChild", "height", "lineCap", "GUI", "3,7", "__folders", "absolute", "setValue", "selectedGroup", "target", "remove", "getCtroller", "borderWidth", "lineDash", "10,1", "removeAll", "serif", "globalAlpha", "butt", "update", "isLink", "split", "1736050RSZbLm", "setCurrentObject", "gray", "display", "连线属性", "strokeStyle", "style", "name", "object", "themeName", "getCtrollerValue", "lineWidth", "none", "onChange", "middle", "gui", "__controllers", "editor", "getValue", "width", "zIndex", "填充颜色", "open", "domElement", "4rsIjta", "getFolder", "3,3", "folders", "top", "onFinishChange", "hide", "12px", "Arial", "140862XsEIut", "isNode", "imageSrc", "init", "线条粗细", "string", "整体透明度", "sans-serif", "color", "position", "线条颜色", "layersContainer", "arial", "230176BNwIoX", "text", "show", "newFolder", "square", "textAlign", "边框粗细", "forEach", "4995170sLlVHJ"];
  return I0 = function() {
    return r;
  }, I0();
}
const m = n0;
(function(r, x) {
  const e = n0, t = r();
  for (; []; )
    try {
      if (-parseInt(e(276)) / 1 * (-parseInt(e(176)) / 2) + parseInt(e(200)) / 3 + -parseInt(e(210)) / 4 + -parseInt(e(252)) / 5 * (-parseInt(e(215)) / 6) + -parseInt(e(213)) / 7 + parseInt(e(189)) / 8 * (-parseInt(e(227)) / 9) + -parseInt(e(197)) / 10 * (parseInt(e(223)) / 11) === x)
        break;
      t.push(t.shift());
    } catch {
      t.push(t.shift());
    }
})(I0, 236123);
function n0(r, x) {
  const e = I0();
  return n0 = function(t, n) {
    return t = t - 173, e[t];
  }, n0(r, x);
}
class bx {
  constructor(x, e) {
    const t = n0;
    this[t(269)] = x, this[t(206)] = e, this[t(267)] = new e[t(233)](), this.object, this[t(279)] = {};
  }
  [m(253)](x) {
    const e = m, t = this[e(269)], n = this[e(269)][e(220)];
    n[e(217)][e(239)] = x, n[e(238)][e(245)]()[e(218)](x), x[e(250)] ? t.linkCtrlBox[e(203)](x) : x[e(177)] && t[e(199)][e(203)](x), t.update(), this[e(225)](x);
  }
  [m(225)](x) {
    const e = m;
    if (x == null)
      return;
    this.basic = { id: x.id, name: "", x: 1, y: 1, imageSrc: "", width: 1, height: 1, text: "", rotation: 0 };
    const t = this[e(269)][e(220)], n = ve[t[e(222)][e(261)]], s = n[x[e(214)]];
    this[e(258)] = { lineDash: null, backgroundColor: "", textAlign: s[e(194)] || "center", textBaseline: s[e(194)] || e(266), strokeStyle: s[e(257)] || e(254), fillStyle: "", color: s[e(184)] || "", borderWidth: 0, fontSize: e(174), fontFamily: e(188), lineWidth: s[e(263)] || 1, lineCap: e(248), globalAlpha: 1 };
    const a = this[e(224)], i = this[e(258)];
    Object.keys(a)[e(196)](function(c) {
      if (x[c] != null) {
        let l = x[c];
        a[c] = l;
      }
    }), Object.keys(i).forEach(function(c) {
      const l = e;
      let d = x[l(258)][c];
      x[l(258)][c] != null && (i[c] = d);
    }), this[e(260)] == null && (this[e(260)] = x, this.init()), this.object = x;
    let o = x[e(258)][e(242)] || 0;
    i[e(242)] = o, i[e(201)] = x[e(258)][e(201)], i.fontSize = x.style[e(211)], i[e(207)] = x[e(258)].fontFamily, this[e(212)](a, i), x[e(177)] && this[e(277)](e(205)) != null ? (this.getFolder(e(205))[e(191)](), this[e(277)](e(256))[e(173)]()) : this[e(277)](e(256)) != null && (this[e(277)](e(256)).show(), this[e(277)](e(205))[e(173)]());
  }
  [m(192)](x) {
    const e = m, t = this.gui[e(209)](x);
    return this[e(279)][x] = t, t;
  }
  [m(277)](x) {
    return this[m(279)][x];
  }
  [m(262)](x, e) {
    return this[m(241)](x, e).getValue();
  }
  [m(241)](x, e) {
    const t = m;
    return this[t(277)](x)[t(268)][t(221)]((s) => s[t(226)] == e);
  }
  [m(212)](x, e) {
    const t = m;
    Object.keys(this[t(267)][t(235)])[t(196)]((s) => {
      const a = t;
      this[a(267)][a(235)][s][a(268)][a(196)](function(c) {
        const l = a;
        let d = c[l(226)];
        x[d] != null ? c[l(237)](x[d]) : e[d] != null && c[l(237)](e[d]);
      });
    });
  }
  [m(179)]() {
    const x = m, e = this, t = this[x(269)], n = t[x(220)], s = this.basic, a = this[x(258)];
    let i = { 实线: "", "虚线1,1": "1,1", "虚线2,2": x(204), "虚线3,3": x(278), "虚线7,3": x(202), "虚线3,7": x(234), "虚线10,1": x(244), "虚线1,10": "1,10" }, o = [x(175), x(246), x(183)], c = { 默认: x(248), 圆形: "round", 矩形: x(193) };
    function l() {
      const p = x;
      let M = this.property, L = this.getValue(), O = e[p(260)];
      O[p(178)] != null && (O[p(258)][p(228)] = null), O[M] = L, t[p(249)]();
    }
    function d() {
      const p = x;
      let M = this[p(226)], L = this[p(270)](), O = e[p(260)];
      O[p(258)], M == p(243) ? L == null || L == "" ? L = null : typeof L == p(181) && (L = L[p(251)](",")) : M == p(228) && e[p(260)][p(250)] && (L = null), O[p(178)] != null && (O[p(258)][p(228)] = null), O.css(M, L), t[p(249)]();
    }
    const f = this[x(192)](x(208));
    f[x(218)](s, x(259)).onFinishChange(l)[x(259)](x(259)), f[x(218)](s, x(190))[x(281)](l)[x(259)]("文字"), f[x(218)](a, x(247), 0, 1, 0.1)[x(265)](d)[x(259)](x(182)), f[x(218)](a, x(257))[x(281)](d)[x(259)](x(186)), f[x(274)]();
    const h = this[x(192)]("节点属性");
    h.add(s, "x")[x(281)](l), h[x(218)](s, "y")[x(281)](l), h[x(218)](s, x(271), 1)[x(281)](l)[x(259)]("宽度"), h[x(218)](s, x(231), 1)[x(281)](l)[x(259)]("高度"), h[x(218)](a, "borderWidth", 0, 10).onChange(d)[x(259)](x(195)), h[x(218)](a, x(263), 0, 10)[x(265)](d)[x(259)](x(180)), h[x(218)](a, x(243), i)[x(265)](d).name("虚实"), h[x(218)](a, x(216))[x(281)](d).name(x(273)), h[x(218)](s, "imageSrc")[x(281)](l)[x(259)]("图片路径"), h[x(274)]();
    const g = this.newFolder("连线属性");
    g[x(218)](a, x(263), 0, 100)[x(265)](d)[x(259)](x(180)), g[x(218)](a, x(243), i)[x(265)](d)[x(259)]("虚实"), g[x(218)](a, x(232), c)[x(265)](d)[x(259)]("末端样式"), g[x(274)]();
    const D = this[x(192)]("文本");
    D[x(218)](a, x(207), o)[x(265)](d)[x(259)]("字体名称"), D.add(a, "fontSize", 1, 1e3)[x(265)](d)[x(259)]("大小"), D[x(218)](a, "color")[x(265)](d).name("颜色"), D[x(274)]();
    let E = this[x(267)][x(275)];
    E[x(240)](), n[x(187)][x(230)](E), E[x(258)][x(185)] = x(236), E[x(258)].right = "-15px", E[x(258)][x(280)] = x(198), E[x(258)][x(272)] = 1e3;
  }
  [m(274)]() {
    const x = m;
    this[x(267)][x(274)]();
  }
  [m(229)]() {
    this.gui.close();
  }
  [m(173)]() {
    const x = m;
    this.gui[x(275)][x(258)][x(255)] = x(264);
  }
  [m(191)]() {
    const x = m;
    this[x(267)][x(275)][x(258)][x(255)] = x(219);
  }
}
const P = y0;
(function(r, x) {
  const e = y0, t = r();
  for (; []; )
    try {
      if (parseInt(e(475)) / 1 + parseInt(e(492)) / 2 + -parseInt(e(491)) / 3 * (-parseInt(e(488)) / 4) + -parseInt(e(484)) / 5 * (parseInt(e(476)) / 6) + parseInt(e(483)) / 7 + parseInt(e(489)) / 8 + -parseInt(e(490)) / 9 * (parseInt(e(485)) / 10) === x)
        break;
      t.push(t.shift());
    } catch {
      t.push(t.shift());
    }
})(m0, 620059);
function y0(r, x) {
  const e = m0();
  return y0 = function(t, n) {
    return t = t - 474, e[t];
  }, y0(r, x);
}
const ne = 11;
function m0() {
  const r = ["3046725UItgrD", "3wHtWYq", "1368408fHcZdk", "#c8c8c8", "orange", "205559oToWxR", "24UYpNMq", "rgba(255,255,255,0.6)", "gray", "black", "rgba(0,0,0,0.1)", "topo_last_doc", "pink", "4306211vzaaQJ", "680720CcSigV", "40rqpvpb", "1px solid black", "rgba(0,0,0,0.9)", "3672932WqQGTk", "764528nkEHKA"];
  return m0 = function() {
    return r;
  }, m0();
}
const b = { data: { localLastDocName: P(481) }, anchorPoint: { size: ne, style: { strokeStyle: P(478), fillStyle: P(477), lineWidth: 1 }, activeStyle: { fillStyle: "red" }, unActiveStyle: { fillStyle: P(477) }, drawStartMinDistance: ne, drawStartDelay: 200 }, anchorBox: { anchorDist: ne / 2, nodeDist: 12 }, nodeResizePoint: { width: 12, height: 12, style: { border: P(486), backgroundColor: P(474) } }, nodeRotatePoint: { width: 14, height: 14, style: { lineWidth: 1, strokeStyle: P(479), fillStyle: P(474) }, rotateLineStyle: { strokeStyle: "gray" }, rotateLineLength: 30 }, guildLine: { styleW: { strokeStyle: P(493), lineDash: [1, 1] }, styleS: { strokeStyle: "#c8c8c8", lineDash: [1, 1] } }, linkCtrlPoint: { size: 7, style: { lineWidth: 1, strokeStyle: P(478), fillStyle: P(482) }, activeStyle: { strokeStyle: P(480), fillStyle: P(480) }, unactiveStyle: { strokeStyle: P(487), fillStyle: "pink" }, adjustStyle: { strokeStyle: "gray", fillStyle: P(474) }, ctrlLinkStyle: { lineDash: [2, 2] } }, dropBox: { style: { border: "3px solid orange", lineDash: [5, 3] } }, align: { minDistance: 10, alignLineStyle: { strokeStyle: P(474), lineDash: [5, 3] } }, operationTip: { enable: !![] } }, A = w0;
(function(r, x) {
  const e = w0, t = r();
  for (; []; )
    try {
      if (parseInt(e(361)) / 1 + -parseInt(e(364)) / 2 * (-parseInt(e(376)) / 3) + parseInt(e(373)) / 4 * (-parseInt(e(372)) / 5) + -parseInt(e(367)) / 6 * (parseInt(e(366)) / 7) + -parseInt(e(369)) / 8 + -parseInt(e(370)) / 9 * (-parseInt(e(379)) / 10) + parseInt(e(382)) / 11 === x)
        break;
      t.push(t.shift());
    } catch {
      t.push(t.shift());
    }
})(C0, 278230);
const je = navigator.userAgent[A(380)]()[A(374)](A(378)) != -1, N = A(je ? 377 : 368);
function w0(r, x) {
  const e = C0();
  return w0 = function(t, n) {
    return t = t - 361, e[t];
  }, w0(r, x);
}
function C0() {
  const r = ["ArrowUp", "8152ecjYMu", "Shift+v", "273UtuBnQ", "24018rgZOXt", "Control", "3282592ABxKUD", "445437JTEPmO", "Alt", "535NOnAqo", "4556kzeqwd", "indexOf", "ArrowRight", "231WHfrRP", "Meta", "MAC OS", "70yQcDVN", "toUpperCase", "Delete", "1632279QfFhMS", "Shift+c", "157852pAGWSf", "Meta+Backspace"];
  return C0 = function() {
    return r;
  }, C0();
}
const xe = { CtrlOrCmd: N, CreateGroup: N, DropTo_leader: "Shift", Delete: [A(381), A(362)], Select_all: [N + "+a"], Select_invert: [N + "+i"], Cut: [N + "+x"], Copy: [N + "+c"], Paste: [N + "+v"], Save: [N + "+s"], Open: [N + "+o"], Undo: [N + "+z"], Redo: [N + "+shift+z"], Copy_style: [A(383)], paste_Style: [A(365)], Move_up: [A(363)], Move_down: ["ArrowDown"], Move_left: ["ArrowLeft"], Move_right: [A(375)], Layout_tree: ["t"], Layout_grid: ["g"], LocalView: ["/"], ResizeKeepAspectRatio: "shift", DrawLine: ["l"], Cancel: ["Escape"], DiableNodeAlign: A(371) }, J = s0;
(function(r, x) {
  const e = s0, t = r();
  for (; []; )
    try {
      if (-parseInt(e(279)) / 1 * (-parseInt(e(274)) / 2) + parseInt(e(253)) / 3 * (-parseInt(e(254)) / 4) + -parseInt(e(261)) / 5 + parseInt(e(275)) / 6 + parseInt(e(250)) / 7 * (-parseInt(e(269)) / 8) + parseInt(e(258)) / 9 * (parseInt(e(276)) / 10) + parseInt(e(278)) / 11 * (parseInt(e(271)) / 12) === x)
        break;
      t.push(t.shift());
    } catch {
      t.push(t.shift());
    }
})(S0, 201383);
function s0(r, x) {
  const e = S0();
  return s0 = function(t, n) {
    return t = t - 241, e[t];
  }, s0(r, x);
}
class ze extends j {
  constructor(x, e) {
    const t = s0;
    super(), this[t(252)] = !![], this.dragBegin = ![], this[t(268)] = x, this[t(282)] = x[t(282)], this[t(260)] = this[t(282)][t(260)], this.selectedGroup = this[t(260)].selectedGroup, this.resizeTo(b[t(247)][t(264)], b[t(247)][t(265)]), this[t(281)](b[t(247)].style), this[t(245)] = e;
  }
  [J(259)]() {
  }
  [J(246)]() {
    const x = J;
    let e, t = this.name;
    t == _.lt ? e = x(262) : t == _.ct ? e = x(263) : t == _.rt ? e = x(255) : t == _.lm ? e = "w-resize" : t == _.rm ? e = x(267) : t == _.lb ? e = "sw-resize" : t == _.cb ? e = "s-resize" : t == _.rb && (e = x(248)), this.editor[x(260)][x(273)](e);
  }
  mouseoutHandler(x) {
  }
  [J(251)](x) {
    x.preventDefault();
  }
  mouseupHandler(x) {
    x.preventDefault();
  }
  dragHandler(x) {
    const e = J;
    let t = this[e(268)], n = t.editor, s = n.stage, a = this[e(245)];
    if (this[e(277)].getNoChildrensObjects()[e(249)] == 0)
      throw new Error(e(266));
    let c = s[e(256)].target, l = c.stageToLocalXY(x.x, x.y), d = c[e(243)](a), f = l.x - d.x, h = l.y - d.y;
    if (a == _.lt ? (f = -f, h = -h) : a == _.ct ? (f = 0, h = -h) : a == _.rt ? h = -h : a == _.lm ? (f = -f, h = 0) : a == _.rm ? h = 0 : a == _.lb ? f = -f : a == _.cb ? f = 0 : a == _.rb, n[e(272)][e(280)](xe[e(242)])) {
      let g = c.height / (c[e(264)] || 1);
      h = f * g;
    }
    this[e(270)](c, { dx: f, dy: h }, a);
  }
  adjustFixedDirection(x, e, t) {
    const n = J;
    let s = ke[t], a = x[n(243)](s);
    a = x[n(244)](a), x[n(241)](e.dx, e.dy);
    let i = x[n(243)](s);
    i = x.transformPoint(i);
    let o = a.x - i.x, c = a.y - i.y;
    x[n(257)](o, c), this[n(268)].updateSize();
  }
}
function S0() {
  const r = ["transformPoint", "name", "mousemoveHandler", "nodeResizePoint", "se-resize", "length", "2439129QUzYjR", "mousedownHandler", "isNodeResizePoint", "6IfdajA", "581592VVXdXF", "ne-resize", "inputSystem", "translateWith", "126dEqZfI", "mouseenterHandler", "stage", "1488275EVxDjB", "nw-resize", "n-resize", "width", "height", "selectedGroup.length is 0!", "e-resize", "nodeCtrlBox", "8EPkyeG", "adjustFixedDirection", "228tAkELR", "keyboard", "setCursor", "628VIPQNG", "1010232uUehpQ", "28760MfkrPA", "selectedGroup", "509311GScPte", "159DkGOoH", "isKeydown", "css", "editor", "resizeWith", "ResizeKeepAspectRatio", "positionToLocalPoint"];
  return S0 = function() {
    return r;
  }, S0();
}
function Z(r, x) {
  const e = v0();
  return Z = function(t, n) {
    return t = t - 232, e[t];
  }, Z(r, x);
}
const W = Z;
(function(r, x) {
  const e = Z, t = r();
  for (; []; )
    try {
      if (parseInt(e(257)) / 1 + -parseInt(e(262)) / 2 * (parseInt(e(261)) / 3) + parseInt(e(250)) / 4 + -parseInt(e(232)) / 5 + parseInt(e(245)) / 6 + parseInt(e(239)) / 7 + parseInt(e(264)) / 8 * (parseInt(e(248)) / 9) === x)
        break;
      t.push(t.shift());
    } catch {
      t.push(t.shift());
    }
})(v0, 757293);
function de(r, x) {
  const e = Z;
  let t = x[e(266)], n = r.positionToLocalPoint(e(259));
  return n = r.getStageTransform()[e(253)](n), Math.atan2(t.y - n.y, t.x - n.x);
}
class Ge extends _e {
  constructor(x, e) {
    const t = Z;
    super(), this.isNodeRotatePoint = !![], this[t(234)] = x, this[t(268)] = x[t(268)], this[t(267)] = this[t(268)][t(267)], this[t(244)] = this[t(267)][t(244)], this.css(b[t(254)][t(238)]), this.resizeTo(b[t(254)].width, b[t(254)].height), this[t(251)] = e;
  }
  [W(247)]() {
    const x = W;
    this[x(267)][x(246)](T[x(256)]);
  }
  [W(255)](x) {
    const e = W;
    x[e(260)]();
    let t = this[e(267)];
    if (this[e(244)][e(265)]().length == 0)
      throw new Error(e(236));
    let s = t.inputSystem[e(252)];
    this[e(240)] = s[e(249)], this[e(241)] = de(s, t);
  }
  [W(237)](x) {
    const e = W;
    this[e(267)][e(246)](e(242)), x.preventDefault();
  }
  [W(243)](x) {
    const e = W;
    x[e(260)]();
    let t = this[e(233)], n = t.editor, s = n.stage;
    if (n[e(267)][e(244)][e(265)]()[e(235)] == 0)
      throw new Error("selectedGroup.length is 0!");
    let o = s[e(266)][e(252)], c = de(o, s) - this.mouseInitAngle;
    o[e(258)](this[e(240)] + c), t[e(263)]();
  }
}
function v0() {
  const r = ["length", "selectedGroup.length is 0!", "mouseupHandler", "style", "5178103HmPEKc", "elementInitAngle", "mouseInitAngle", "auto", "dragHandler", "selectedGroup", "1207446DsMxqV", "setCursor", "mousemoveHandler", "9tNJMlk", "rotation", "1336444lHXsJV", "name", "target", "point", "nodeRotatePoint", "mousedownHandler", "move", "584560myEjrx", "rotate", "center", "preventDefault", "11409iDqxnU", "640YbXqmi", "updateSize", "1629976cgKmzH", "getNoChildrensObjects", "inputSystem", "stage", "editor", "445675WJkNNS", "parent", "nodeCtrlBox"];
  return v0 = function() {
    return r;
  }, v0();
}
const v = a0;
(function(r, x) {
  const e = a0, t = r();
  for (; []; )
    try {
      if (parseInt(e(424)) / 1 * (-parseInt(e(450)) / 2) + -parseInt(e(461)) / 3 + parseInt(e(427)) / 4 * (parseInt(e(431)) / 5) + parseInt(e(417)) / 6 + -parseInt(e(423)) / 7 + parseInt(e(451)) / 8 * (-parseInt(e(458)) / 9) + parseInt(e(463)) / 10 === x)
        break;
      t.push(t.shift());
    } catch {
      t.push(t.shift());
    }
})(k0, 470242);
function k0() {
  const r = ["5ZFeNft", "css", "rotateLineStyle", "update", "attach not Node or not editable", "mouseEnabled", "NodeCtrlBox", "length", "parent", "name", "addChild", "removeAllChild", "initCtrlPoint", "positionToLocalPoint", "forEach", "viewClone", "point", "hide", "nodeRotatePoint", "2EKdSzV", "248LySIQq", "clearTarget", "mouseoutStageHandler", "rotate", "currNode", "atan2", "editor", "156663zQNeOL", "getChildren", "translateTo", "2423976MEJZTr", "attachTo", "23875440mpDism", "createCtrlPoint", "2048832ZdjmWF", "isSelected", "resizeTo", "visible", "getStageTransform", "zIndex", "5598901RSyGuF", "245045eEdlHU", "mouseenterStageHandler", "initPoints", "534892HyCfhg", "show", "updateSize", "editable"];
  return k0 = function() {
    return r;
  }, k0();
}
function a0(r, x) {
  const e = k0();
  return a0 = function(t, n) {
    return t = t - 416, e[t];
  }, a0(r, x);
}
function Fe(r) {
  let x = r.parent;
  return x instanceof k && (x.beginArrow === r || x.endArrow === r);
}
class Re extends j {
  constructor(x, e = 0, t = 0, n = 1, s = 1) {
    const a = a0;
    super(null, e, t, n, s), this[a(422)] = ee[a(437)], this[a(457)] = x, this[a(436)] = ![], this[a(448)]();
  }
  [v(434)]() {
    const x = v;
    this[x(420)] && this[x(429)]();
  }
  [v(453)]() {
  }
  [v(425)]() {
  }
  [v(443)](x) {
    const e = v;
    this[e(442)]();
    let t = x.getCtrlPoints(), n = this;
    t[e(445)]((s) => {
      const a = e;
      if (n[a(416)](s), s == a(454)) {
        let i = function() {
          return n.positionToLocalPoint(_.ct);
        }, o = n[a(416)](a(454)), c = new k(null, o, i);
        c[a(432)](b[a(449)][a(433)]), c[a(436)] = ![], n[a(441)](c);
      }
    });
  }
  [v(416)](x) {
    const e = v;
    let t;
    return x == e(454) ? t = new Ge(this, x) : t = new ze(this, x), this.addChild(t), t;
  }
  [v(452)]() {
    const x = v;
    this[x(455)] = null, this[x(448)]();
  }
  [v(462)](x) {
    const e = v;
    if (!Fe(x)) {
      if (x[e(430)] != !![])
        throw new Error(e(435));
      this[e(455)] !== null && this.initCtrlPoint(x), this.currNode = x, this.updateSize(), this[e(428)]();
    }
  }
  [v(429)]() {
    const x = v;
    let e = this[x(455)];
    if (e == null || e[x(418)] == ![] || e[x(439)] == null) {
      this[x(455)] = null, this[x(448)]();
      return;
    }
    this[x(446)](e), this[x(426)]();
  }
  initPoints() {
    const x = v;
    let e = this[x(459)]();
    for (var t = 0; t < e[x(438)]; t++) {
      let n = e[t];
      if (n instanceof k)
        continue;
      let s;
      n.name == "rotate" ? (s = this[x(444)](_.ct), s.y -= b.nodeRotatePoint.rotateLineLength) : s = this[x(444)](n[x(440)]), n instanceof j && n[x(460)](s.x, s.y);
    }
  }
  [v(446)](x) {
    const e = v;
    let t = x[e(421)](), n = t[e(447)](x[e(444)](_.center)), s = t[e(447)](x[e(444)](_.rm)), a = Math[e(456)](s.y - n.y, s.x - n.x);
    t[e(454)](-a);
    let i = t[e(447)](x[e(444)](_.center)), o = t[e(447)](x.positionToLocalPoint(_.rb)), c = (o.x - i.x) * 2, l = (o.y - i.y) * 2;
    this[e(419)](c, l), this[e(454)](a), this[e(460)](n.x, n.y);
  }
}
const F = Q;
function P0() {
  const r = ["size", "auto", "editor", "setCtrlPoint1", "n_resize", "unActive", "active", "256KTIenr", "ctrlPoint2", "upgradeParent", "begin", "isLink", "linkCtrlBox", "end", "setCursor", "attachedLink", "fold1", "center", "w_resize", "mousemoveHandler", "points", "6575094OrjxJI", "getK", "canConnectEndpoint", "18enFKfB", "updateMatrix", "ctrlPoint", "3147108XvuPUG", "e_resize", "s_resize", "setFold2Offset", "1329900IdDSZr", "anchorBox", "mousedownHandler", "inputSystem", "resetOffset", "9008wXFmlu", "12565lzmMPG", "unactiveStyle", "isConnectPoint", "findConnectableEndpoint", "stageToLocalXY", "fold2", "parent", "event", "stage", "13sDaUnr", "linkCtrlPoint", "setCtrlPoint2", "2318592IqHOSp", "preventDefault", "positionToLocalPoint", "setCtrlPoint", "setEnd", "mouseupHandler", "ctrlPoint1", "crosshair", "isDragStart", "name", "target", "1420300WpHsiw", "isActive", "setBegin", "css", "style"];
  return P0 = function() {
    return r;
  }, P0();
}
(function(r, x) {
  const e = Q, t = r();
  for (; []; )
    try {
      if (parseInt(e(228)) / 1 * (parseInt(e(218)) / 2) + parseInt(e(231)) / 3 + parseInt(e(209)) / 4 + -parseInt(e(177)) / 5 + -parseInt(e(203)) / 6 + -parseInt(e(219)) / 7 * (-parseInt(e(189)) / 8) + parseInt(e(206)) / 9 * (parseInt(e(213)) / 10) === x)
        break;
      t.push(t.shift());
    } catch {
      t.push(t.shift());
    }
})(P0, 561704);
function Q(r, x) {
  const e = P0();
  return Q = function(t, n) {
    return t = t - 170, e[t];
  }, Q(r, x);
}
class We extends _e {
  constructor(x) {
    const e = Q;
    super(), this[e(221)] = !![], this[e(178)] = ![], this.setRadius(b.linkCtrlPoint[e(182)]), this[e(194)] = x, this[e(184)] = this[e(194)].editor, this.css(b[e(229)][e(181)]);
  }
  active() {
    this[Q(180)](b.linkCtrlPoint.activeStyle), this.isActive = !![];
  }
  [F(187)]() {
    const x = F;
    this.css(b[x(229)][x(220)]), this.isActive = ![];
  }
  [F(201)]() {
    const x = F;
    this.editor.anchorBox.hide(), this[x(184)].stage[x(196)](T.move);
    let e = this[x(225)], t = this[x(184)][x(227)], n = e[x(197)];
    if (n instanceof x0) {
      let s = null, a = n[x(202)][0], i = n[x(202)][1], o = n[x(202)][4], c = n.points[5];
      this.name == _[x(198)] ? te(n[x(204)](0, 0.5)) ? s = i.x > a.x ? T[x(200)] : T[x(210)] : s = i.y > a.y ? T.s_resize : T[x(186)] : this[x(175)] == _[x(224)] ? te(n[x(204)](4, 0.5)) ? s = o.x > c.x ? T[x(200)] : T[x(210)] : s = o.y > c.y ? T[x(211)] : T[x(186)] : this.name == _[x(199)] && (te(n.getK(2, 0.5)) ? s = T[x(211)] : s = T.e_resize), s && t[x(196)](s);
    }
  }
  [F(215)](x) {
    const e = F;
    this[e(184)][e(227)][e(196)](e(173)), this[e(205)] = null;
  }
  dragHandler(x) {
    const e = F;
    let t = this.parent, n = t[e(225)], s = n[e(227)];
    const a = this[e(184)];
    let i = t[e(197)];
    a.anchorBox.hide();
    const o = this[e(175)];
    this[e(184)].stage.setCursor(T[e(173)]);
    let c = i.parent[e(223)](s[e(216)].x, s[e(216)].y);
    if (x[e(174)] && (o === _.begin || o === _[e(195)]) && this[e(188)](), o == _.begin) {
      i instanceof x0 && i[e(217)](), i[e(179)]({ x: c.x, y: c.y }), i[e(207)](), this[e(205)] = a.anchorBox[e(222)]([i]);
      return;
    }
    if (o == _[e(195)]) {
      i instanceof x0 && i.resetOffset(), i.setEnd({ x: c.x, y: c.y }), i.updateMatrix(), this[e(205)] = a[e(214)].findConnectableEndpoint([i]);
      return;
    }
    if (i instanceof Pe)
      this[e(175)] == _.ctrlPoint && (i[e(208)] == null ? i.setCtrlPoint(i[e(233)](o)) : (i[e(208)].x += c.x - i[e(208)].x, i.ctrlPoint.y += c.y - i.ctrlPoint.y, i[e(234)](i[e(208)])));
    else if (i instanceof Le)
      o == _[e(172)] ? i.ctrlPoint1 == null ? i.setCtrlPoint1(i[e(233)](o)) : (i[e(172)].x += c.x - i[e(172)].x, i[e(172)].y += c.y - i[e(172)].y, i[e(185)](i.ctrlPoint1)) : o == _.ctrlPoint2 && (i[e(190)] == null ? i[e(230)](i.positionToLocalPoint(o)) : (i.ctrlPoint2.x += c.x - i[e(190)].x, i[e(190)].y += c.y - i[e(190)].y, i[e(230)](i[e(190)])));
    else if (i instanceof x0) {
      if (o == _[e(198)]) {
        let l = i[e(233)](_[e(198)]);
        const d = c.x - l.x, f = c.y - l.y;
        i.setFold1Offset(d, f), i[e(207)]();
      } else if (o == _[e(199)]) {
        let l = i[e(233)](_[e(199)]);
        const d = c.x - l.x, f = c.y - l.y;
        i.setCenterOffset(d, f), i[e(207)]();
      } else if (o == _[e(224)]) {
        let l = i[e(233)](_[e(224)]);
        const d = c.x - l.x, f = c.y - l.y;
        i[e(212)](d, f), i.updateMatrix();
      }
    }
  }
  [F(171)](x) {
    const e = F;
    this[e(184)][e(227)][e(196)](T[e(183)]), x[e(226)][e(232)](), this[e(178)] && this[e(187)]();
    let t = this[e(225)], n = t.attachedLink;
    if (this[e(205)] != null) {
      let s = this[e(205)], a = s[e(176)];
      if (a[e(193)]) {
        let i = a;
        i[e(195)].target !== n && i[e(192)][e(176)] !== n && (this.name == _[e(192)] ? n[e(179)](i, s) : this[e(175)] == _[e(195)] && n[e(170)](i, s), n.upgradeParent(), n[e(207)]());
      } else
        this[e(175)] == _.begin ? n[e(179)](a, s) : this[e(175)] == _[e(195)] && n[e(170)](a, s), n[e(191)](), n[e(207)]();
      this.canConnectEndpoint = null;
    }
  }
}
function i0(r, x) {
  const e = L0();
  return i0 = function(t, n) {
    return t = t - 127, e[t];
  }, i0(r, x);
}
const S = i0;
(function(r, x) {
  const e = i0, t = r();
  for (; []; )
    try {
      if (parseInt(e(143)) / 1 + parseInt(e(148)) / 2 * (-parseInt(e(151)) / 3) + -parseInt(e(168)) / 4 * (parseInt(e(153)) / 5) + parseInt(e(128)) / 6 + -parseInt(e(150)) / 7 + -parseInt(e(165)) / 8 * (parseInt(e(161)) / 9) + -parseInt(e(166)) / 10 * (-parseInt(e(170)) / 11) === x)
        break;
      t.push(t.shift());
    } catch {
      t.push(t.shift());
    }
})(L0, 575910);
function L0() {
  const r = ["LinkCtrlBox", "getCtrlPoints", "point", "show", "begin", "stage", "adjustStyle", "translateTo", "length", "fillColor", "parent", "end", "removeAllChild", "setEnd", "ctrlPoint", "isConnectPoint", "5723928SUJpUW", "linkCtrlPoint", "createNodeResizePoint", "setBegin", "anchorNameStr", "getStageTransform", "updateFllow", "init", "zIndex", "ctrlPoint2", "addChild", "hide", "center", "mouseenterStageHandler", "css", "489799HkopZu", "ctrlPointStyle", "ctrlLinkStyle", "hideAllPoint", "Link", "38KGIgtx", "positionToLocalPoint", "7034293YIKhjB", "156999idtMuQ", "matrixDirty", "25TEfqTg", "ctrlPointInfo", "updateCtrlPoints", "ctrlPoint1", "name", "clearTarget", "draw", "inputSystem", "9LUWxXv", "updateSize", "join", "visible", "7516168RWAtfN", "4199590gTXWdR", "editor", "23140ndIbFt", "attachedLink", "55KgQQKW"];
  return L0 = function() {
    return r;
  }, L0();
}
class Ke extends j {
  constructor(x) {
    const e = i0;
    super(), this[e(154)] = {}, this[e(136)] = ee[e(171)], this[e(167)] = x, this[e(144)] = new Te({}), this[e(135)]();
  }
  mouseoutStageHandler() {
  }
  [S(141)]() {
  }
  [S(130)](x) {
    const e = S;
    let t = new We(this);
    return t[e(157)] = x, this[e(138)](t), t;
  }
  [S(135)]() {
    const x = S;
    this[x(154)] = {}, this[x(139)]();
  }
  [S(159)](x) {
    const e = S;
    this[e(164)] != ![] && this[e(162)]();
  }
  [S(162)]() {
    const x = S, e = this[x(167)][x(176)][x(160)].target;
    this[x(169)] ? this.attachedLink[x(181)] == null || e == null || this.attachedLink != e ? (this[x(169)] = null, this.hide()) : this.attachTo(this.attachedLink) : this[x(139)]();
  }
  [S(155)](x) {
    const e = S;
    this[e(169)] = x;
    let t = x[e(172)]();
    this[e(132)] = t.join(",");
    for (let n = 0; n < t[e(179)]; n++) {
      let s = t[n], a = this[e(154)][s];
      if (a == null) {
        if (a = this[e(130)](s), s != _[e(175)] && s != _.end && (a[e(180)] = this[e(144)].background, a[e(142)](b[e(129)][e(177)]), a[e(127)] = ![]), s == e(156)) {
          let i = new k();
          i[e(142)](b.linkCtrlPoint.ctrlLinkStyle), i.setBegin(a, e(140));
          let o = this.ctrlPointInfo[e(175)];
          i.setEnd(o, e(140)), this[e(138)](i), this.ctrlPointInfo[s + e(147)] = i;
        } else if (s == e(137)) {
          let i = new k();
          i[e(142)](b.linkCtrlPoint.ctrlLinkStyle), i[e(131)](a, e(140));
          let o = this.ctrlPointInfo[e(182)];
          i[e(184)](o, e(140)), this.addChild(i), this.ctrlPointInfo[s + e(147)] = i;
        } else if (s == e(185)) {
          let i = new k();
          i[e(142)](b.linkCtrlPoint[e(145)]), i[e(131)](a, e(140));
          let o = this.ctrlPointInfo.begin;
          i[e(184)](o, e(140)), this.addChild(i), this[e(154)][s + e(147)] = i;
        }
        this.ctrlPointInfo[s] = a;
      }
    }
  }
  [S(146)]() {
    let e = this[S(154)];
    for (var t in e)
      e[t].hide();
  }
  [S(134)]() {
    const x = S, e = this[x(169)];
    let t = e[x(133)](), n = e[x(172)]();
    this[x(146)]();
    for (let s = 0; s < n[x(179)]; s++) {
      const a = n[s];
      let i = this[x(154)][a];
      if (i == null)
        continue;
      let o = e[x(149)](a), c = t[x(173)](o);
      i[x(178)](c.x, c.y), i.show();
      let l = this[x(154)][a + "Link"];
      l && l[x(174)]();
    }
  }
  attachTo(x) {
    const e = S;
    if (this[e(152)] = !![], x[e(181)] != null) {
      if (this[e(169)] === x) {
        x instanceof x0 && x[e(172)]()[e(163)](",") != this[e(132)] && this[e(155)](x), this.updateFllow(), this[e(174)]();
        return;
      }
      this.ctrlPointInfo = {}, this[e(183)](), this[e(155)](x), this[e(134)](), this.show();
    }
  }
  [S(158)]() {
    const x = S;
    this[x(169)] = null, this[x(154)] = {}, this[x(183)](), this[x(139)]();
  }
}
const w = T0;
(function(r, x) {
  const e = T0, t = r();
  for (; []; )
    try {
      if (parseInt(e(221)) / 1 * (parseInt(e(267)) / 2) + parseInt(e(220)) / 3 * (-parseInt(e(223)) / 4) + -parseInt(e(230)) / 5 + parseInt(e(218)) / 6 + -parseInt(e(250)) / 7 + parseInt(e(236)) / 8 + -parseInt(e(234)) / 9 === x)
        break;
      t.push(t.shift());
    } catch {
      t.push(t.shift());
    }
})(E0, 930449);
function T0(r, x) {
  const e = E0();
  return T0 = function(t, n) {
    return t = t - 214, e[t];
  }, T0(r, x);
}
var Ve = Object[w(247)], Ue = Object.getOwnPropertyDescriptor, le = (r, x, e, t) => {
  const n = w;
  for (var s = t > 1 ? void 0 : t ? Ue(x, e) : x, a = r[n(252)] - 1, i; a >= 0; a--)
    (i = r[a]) && (s = (t ? i(x, e, s) : i(s)) || s);
  return t && s && Ve(x, e, s), s;
};
const Xe = "intersectNode";
class r0 extends j {
  constructor(x, e = 0, t = 0, n = 1, s = 1) {
    const a = w;
    super(null, e, t, n, s), this[a(268)] = ![], this[a(219)] = ![], this[a(241)] = x, this[a(244)] = x.editor, this[a(258)] = this[a(244)][a(258)], this[a(260)](b[a(216)][a(233)], b[a(216)].size), this[a(222)](b[a(216)].style), this[a(228)]();
  }
  [w(246)](x) {
    const e = w;
    this[e(262)] = x;
  }
  [w(248)]() {
    this[w(254)]();
  }
  [w(256)]() {
    const x = w;
    this[x(258)][x(266)]("auto"), this.unactive();
  }
  mousemoveHandler() {
  }
  [w(270)](x) {
    const e = w;
    x[e(231)](), this[e(244)].stage[e(266)](e(243)), this[e(240)] = null;
  }
  [w(227)](x) {
    const e = w;
    if (x[e(255)] == 2)
      return;
    const t = this[e(244)], n = t[e(258)];
    this[e(241)][e(264)] && this[e(241)][e(264)].unactive();
    const s = this[e(241)][e(272)];
    if (x[e(232)]) {
      let a;
      if (this[e(219)]) {
        let i = this[e(241)].intersect;
        a = new be(s, i[e(237)], i[e(265)]);
      } else
        a = new pe(s, this.name);
      this.drawStartInfo = { x: x.x, y: x.y, beginEndpoint: a, timeStamp: Date[e(263)]() };
      return;
    }
    if (this[e(229)] != null) {
      let a = p0[e(274)](this[e(229)], x);
      if (Date[e(263)]() - this.drawStartInfo[e(245)] > b.anchorPoint[e(239)] && a > b[e(216)][e(261)]) {
        this[e(244)].showTip(e(224)), console.assert(this[e(240)] == null, this[e(240)]), this.editor.record("划线");
        const c = t[e(253)][e(271)](null, s, null, this[e(229)].beginEndpoint);
        this.link = c;
        let l = c[e(259)].stageToLocalXY(n[e(251)].x, n[e(251)].y);
        c[e(215)](l), this[e(229)] = null;
      }
    }
    if (this[e(240)] != null && this[e(240)].end != null) {
      let a = this[e(240)][e(259)][e(214)](n[e(251)].x, n[e(251)].y);
      this[e(240)][e(215)](a), this[e(226)] = this[e(241)][e(249)]([this[e(240)], this[e(240)][e(242)].target]);
    }
  }
  mouseupHandler(x) {
    const e = w;
    this[e(269)](), this[e(244)][e(257)](), this[e(244)][e(258)][e(266)]("auto"), this.link != null && (this[e(226)] && (this[e(240)].setEnd(this[e(226)]), this[e(240)][e(273)](), this.link.updateMatrix()), this.editor[e(253)].lineDrawingFinished(this[e(240)]), this[e(241)].findConnectableEndpoint([]), this[e(244)][e(225)]("划线")), this.link = null;
  }
  [w(254)]() {
    const x = w;
    this.isActive = !![], this[x(222)](b[x(216)][x(217)]);
  }
  [w(228)]() {
    const x = w;
    this[x(268)] = ![], this[x(222)](b[x(216)].unActiveStyle);
  }
}
le([re(ge.Circle)], r0[w(235)], w(238), 2), le([re(w(238))], r0[w(235)], "pickType", 2);
function E0() {
  const r = ["inputSystem", "length", "instanceManager", "active", "buttons", "mouseoutHandler", "update", "stage", "parent", "resizeTo", "drawStartMinDistance", "intersect", "now", "activedPoint", "segIndex", "setCursor", "2844874HKjDNo", "isActive", "show", "mousedownHandler", "lineDrawn", "target", "upgradeParent", "distancePoint", "stageToLocalXY", "setEnd", "anchorPoint", "activeStyle", "5515170FgiWiv", "isIntersectPoint", "24MpuHZw", "1VcKhkG", "css", "132224VlIcNb", "画线开始", "recordEnd", "endpoint", "dragHandler", "unactive", "drawStartInfo", "2909035ZFgxSY", "preventDefault", "isDragStart", "size", "16901352QEqBjl", "prototype", "14652816YpOriZ", "rate", "shape", "drawStartDelay", "link", "anchorBox", "end", "crosshair", "editor", "timeStamp", "setIntersect", "defineProperty", "mouseenterHandler", "findConnectableEndpoint", "3630214TFPUXo"];
  return E0 = function() {
    return r;
  }, E0();
}
const y = Y;
(function(r, x) {
  const e = Y, t = r();
  for (; []; )
    try {
      if (-parseInt(e(363)) / 1 * (-parseInt(e(366)) / 2) + parseInt(e(381)) / 3 * (-parseInt(e(327)) / 4) + -parseInt(e(320)) / 5 + parseInt(e(330)) / 6 + parseInt(e(358)) / 7 * (parseInt(e(354)) / 8) + -parseInt(e(362)) / 9 + parseInt(e(373)) / 10 * (parseInt(e(321)) / 11) === x)
        break;
      t.push(t.shift());
    } catch {
      t.push(t.shift());
    }
})(H0, 429161);
function Y(r, x) {
  const e = H0();
  return Y = function(t, n) {
    return t = t - 310, e[t];
  }, Y(r, x);
}
function me(r) {
  const x = Y;
  let e = r[x(339)];
  return e instanceof k && (e.beginArrow === r || e[x(384)] === r);
}
function fe(r) {
  const x = Y;
  return me(r) ? ![] : r[x(351)] && r[x(349)] && r[x(365)] && r[x(310)];
}
class Ye extends j {
  constructor(x, e = 0, t = 0, n = 1, s = 1) {
    const a = Y;
    super(null, e, t, n, s), this[a(344)] = x, this.ctrlIntersectPoint = this[a(316)](Xe), this[a(348)][a(317)] = !![], this.ctrlIntersectPoint.hide();
  }
  [y(371)]() {
  }
  [y(379)]() {
  }
  [y(323)]() {
  }
  [y(376)]() {
    const x = y;
    this.target = null, this[x(377)]();
  }
  [y(322)](x) {
    const e = y;
    if (me(x))
      return;
    if (this.target !== x) {
      if (this.target = x, x != null && (x instanceof j || x instanceof k)) {
        let s = x[e(325)]();
        if (this[e(313)][e(337)] - 1 != s.length) {
          this[e(313)].length = 1;
          for (var t = 0; t < s[e(337)]; t++) {
            let a = s[t];
            this[e(316)](a);
          }
        }
      }
      this[e(329)]();
    }
    this.children[e(355)]((s) => s[e(333)]()), this.ctrlIntersectPoint[e(377)](), this[e(340)]();
  }
  setTargetWithName(x, e) {
    const t = y;
    if (e == null)
      throw new Error(t(357));
    this[t(322)](x), this[t(385)](e), this[t(340)]();
  }
  [y(382)]() {
    const x = y;
    this[x(345)] && this.activedPoint[x(333)](), this[x(348)][x(377)]();
  }
  [y(385)](x) {
    const e = y;
    this[e(345)] && this.activedPoint[e(333)]();
    let t = this[e(313)], n = t[e(370)]((s) => s.name == x)[0];
    this[e(345)] = n, n.active(), this[e(348)].hide();
  }
  [y(318)](x) {
    const e = y;
    if (this[e(332)] = x, x == null) {
      this[e(348)].hide();
      return;
    }
    let t = x.rate, n = x[e(372)];
    const s = this[e(341)];
    let a = s[e(386)](t, n), o = s[e(375)]()[e(335)](a);
    this[e(348)][e(326)](o.x, o.y), this[e(348)][e(328)](b[e(343)][e(378)]), this[e(348)][e(340)]();
  }
  calcAnchorPointsPosition() {
    const x = y;
    if (this.target == null || this.target[x(339)] == null) {
      this[x(376)]();
      return;
    }
    const e = this[x(341)], t = e[x(375)](), n = this.children;
    for (let s = 0; s < n[x(337)]; s++) {
      const a = n[s], i = a.name;
      if (!a[x(317)]) {
        let o = e[x(359)](i), c = t[x(335)](o);
        a.translateTo(c.x, c.y);
      }
    }
  }
  [y(316)](x) {
    const e = y, t = new r0(this);
    return t[e(342)] = x, t[e(353)] = this, this[e(367)](t), t;
  }
  [y(312)](x) {
    const e = y;
    let t = this.editor[e(380)], n = this[e(344)][e(315)](), s = { x: t[e(368)].x, y: t.inputSystem.y };
    return Ee(n, s, x, b[e(353)][e(314)]);
  }
  [y(311)](x) {
    const e = y, t = this.editor, n = this, s = t[e(380)], a = s[e(368)], i = { x: a.x, y: a.y }, o = He(i, x, b.anchorPoint[e(331)] / 2), c = t[e(336)].isControlDown();
    if (o.length == 0 && !c) {
      let d = Je(s, 100);
      return d != null && fe(d) && n[e(322)](d), null;
    }
    if (o[e(337)] > 0) {
      o[e(319)]((D, E) => {
        let p = D.object, M = E.object;
        if (c) {
          let Ce = p instanceof k ? 0 : 1, Se = M instanceof k ? 0 : 1;
          return Ce - Se;
        }
        let L = p instanceof j ? 0 : 1, O = M instanceof j ? 0 : 1;
        return L - O;
      });
      const d = o[0], f = d[e(334)];
      let h = d[e(346)];
      const g = new pe(f, h);
      return n[e(338)](f, h), g;
    }
    const l = this[e(312)](x);
    if (l != null) {
      const d = l[e(334)];
      n[e(322)](d);
      const f = new be(d, l.rate, l.segIndex);
      return this.showIntersectAnchor(l), f;
    }
    return n.clearTarget(), null;
  }
  [y(364)](x) {
    const e = y, t = this[e(344)], n = t[e(380)][e(383)][e(324)]();
    function s(o) {
      return x.indexOf(o) == -1 && fe(o);
    }
    const a = n._findChildren(null, s, !![]);
    return this.getConnectableEndpointFromObjects(a);
  }
}
function Je(r, x) {
  const e = y, t = r[e(315)](), n = { x: t.mouseX, y: t[e(374)] };
  let s = t[e(361)][e(370)]((o) => o[e(356)]), a = s[e(350)]((o, c) => {
    const l = e;
    let d = o[l(352)][l(387)][l(347)]();
    return { index: c, dist: p0[l(369)](n, d) };
  });
  if (a = a[e(370)]((o) => o[e(360)] <= x), a[e(337)] == 0)
    return null;
  a.sort((o, c) => o[e(360)] - c[e(360)]);
  let i = a[0].index;
  return s[i];
}
function H0() {
  const r = ["findConnectableEndpoint", "connectable", "9778lpPAkp", "addChild", "inputSystem", "distancePoint", "filter", "cancel", "segIndex", "20SRteUq", "mouseY", "getStageTransform", "clearTarget", "hide", "activeStyle", "mouseoutStageHandler", "stage", "3561JnGiYE", "clearActived", "localView", "endArrow", "activePointByName", "getLocalPoint", "aabb", "painted", "getConnectableEndpointFromObjects", "getObjectsIntersect", "children", "nodeDist", "getCurrentLayer", "createAnchorPoint", "isIntersectPoint", "showIntersectAnchor", "sort", "2541700UmydGb", "2250336yoLQvk", "setTarget", "mouseenterStageHandler", "getObject", "getAnchorPoints", "translateTo", "1476agOYAA", "css", "calcAnchorPointsPosition", "3384912EBVkdm", "size", "intersect", "unactive", "object", "point", "keyboard", "length", "setTargetWithName", "parent", "show", "target", "name", "anchorPoint", "editor", "activedPoint", "anchorName", "getCenter", "ctrlIntersectPoint", "mouseEnabled", "map", "visible", "_obb", "anchorBox", "5736824FaXvNm", "forEach", "isNode", "activeNameOrPoint is null", "7WlIXNR", "positionToLocalPoint", "dist", "displayList", "3406140yelhwG", "13TbUvcU"];
  return H0 = function() {
    return r;
  }, H0();
}
const C = $;
function $(r, x) {
  const e = A0();
  return $ = function(t, n) {
    return t = t - 314, e[t];
  }, $(r, x);
}
(function(r, x) {
  const e = $, t = r();
  for (; []; )
    try {
      if (parseInt(e(329)) / 1 + parseInt(e(340)) / 2 * (parseInt(e(328)) / 3) + parseInt(e(325)) / 4 * (-parseInt(e(344)) / 5) + parseInt(e(330)) / 6 * (-parseInt(e(341)) / 7) + parseInt(e(316)) / 8 * (-parseInt(e(324)) / 9) + parseInt(e(336)) / 10 + parseInt(e(321)) / 11 * (parseInt(e(314)) / 12) === x)
        break;
      t.push(t.shift());
    } catch {
      t.push(t.shift());
    }
})(A0, 899498);
function A0() {
  const r = ["28gmBxaW", "剪切粘贴", "undoFn", "2243215KuTdFU", "undoHistory", "8570580PLkeOo", "update", "9244976CYeUcj", "辅助粘贴", "添加图元", "连线调整", "push", "11xOQmoS", "redoAll", "redo", "9DUzAdy", "4TLjrVJ", "length", "undo", "15IhzliR", "1542683XvTXHd", "2537172ukbObH", "editor", "undoAll", "copy", "位置改变", "redoFn", "10328880wKbJqk", "redoHistory", "尺寸修改", "pop", "362170HuxeWC"];
  return A0 = function() {
    return r;
  }, A0();
}
const qe = { cut: "cut", copy: C(333), delete: "删除", modify: "修改", addChild: C(318), pasteCopy: C(317), pasteCut: C(342), resize: C(338), rotate: "旋转", dragNodeOrLink: C(334), modifyLink: C(319) };
class Ze {
  constructor(x, e, t) {
    const n = C;
    this.type = x, this[n(343)] = t, this[n(335)] = e;
  }
  [C(323)]() {
    this.redoFn();
  }
  [C(327)]() {
    this[C(343)]();
  }
}
class Qe extends EventTarget {
  constructor(x) {
    const e = C;
    super(), this.editor = x, this[e(345)] = [], this.redoHistory = [];
  }
  [C(320)](x, e, t) {
    const n = C;
    let s = new Ze(x, e, t);
    return s.editor = this.editor, this[n(337)][n(326)] = 0, this[n(345)].push(s), s;
  }
  [C(327)]() {
    const x = C;
    if (this.undoHistory[x(326)] == 0)
      return null;
    let e = this[x(345)][x(339)]();
    return e[x(327)](), this[x(337)][x(320)](e), e;
  }
  [C(323)]() {
    const x = C;
    if (this[x(337)].length == 0)
      return null;
    let e = this[x(337)][x(339)]();
    return e.redo(), this[x(345)][x(320)](e), e;
  }
  [C(332)](x = 500) {
    let e = this;
    function t() {
      const n = $;
      let s = e.undo();
      e[n(331)][n(315)](), s != null && setTimeout(t, x);
    }
    t();
  }
  [C(322)](x = 500) {
    let e = this;
    function t() {
      const n = $;
      e[n(331)][n(315)](), e.redo() != null && setTimeout(t, x);
    }
    t();
  }
}
function U(r, x) {
  const e = D0();
  return U = function(t, n) {
    return t = t - 289, e[t];
  }, U(r, x);
}
(function(r, x) {
  const e = U, t = r();
  for (; []; )
    try {
      if (parseInt(e(294)) / 1 * (-parseInt(e(291)) / 2) + -parseInt(e(290)) / 3 * (-parseInt(e(300)) / 4) + parseInt(e(306)) / 5 + -parseInt(e(299)) / 6 + parseInt(e(293)) / 7 + parseInt(e(307)) / 8 + parseInt(e(304)) / 9 * (-parseInt(e(289)) / 10) === x)
        break;
      t.push(t.shift());
    } catch {
      t.push(t.shift());
    }
})(D0, 524320);
function D0() {
  const r = ["1220OjWNbn", "2748171oIMNty", "396784OCbeBz", "length", "3140550eBuagf", "1JQKvmF", "setItem", "getAllVersions", "sort", "now", "1980498rfxZCV", "4ajnXkK", "reverse", "filter", "getItem", "104967FgQxdU", "startsWith", "1488540sUtwXT", "6506128OUxEuC"];
  return D0 = function() {
    return r;
  }, D0();
}
const $e = { getItem: function(r) {
  const x = U;
  return localStorage[x(303)](r);
}, setItem: function(r, x) {
  const e = U;
  localStorage[e(295)](r, x);
}, saveWithVersion(r, x) {
  const e = U;
  r += Date[e(298)](), this[e(295)](r, x);
}, getAllVersions(r) {
  const x = U;
  return Object.keys(localStorage)[x(302)]((t) => t[x(305)](r))[x(297)]();
}, getLastVersion(r, x) {
  const e = U;
  let t = this[e(296)](r)[e(301)]();
  if (t[e(292)] == 0)
    return;
  x == null && (x = 0), x + 1 >= t[e(292)] && (x = t[e(292)] - 1);
  let n = t[x];
  return this.getItem(n);
} };
function M0(r, x) {
  const e = O0();
  return M0 = function(t, n) {
    return t = t - 304, e[t];
  }, M0(r, x);
}
(function(r, x) {
  const e = M0, t = r();
  for (; []; )
    try {
      if (parseInt(e(316)) / 1 + parseInt(e(306)) / 2 + -parseInt(e(328)) / 3 + parseInt(e(325)) / 4 + parseInt(e(307)) / 5 + -parseInt(e(322)) / 6 * (parseInt(e(321)) / 7) + parseInt(e(308)) / 8 === x)
        break;
      t.push(t.shift());
    } catch {
      t.push(t.shift());
    }
})(O0, 100276);
function O0() {
  const r = ["14241YfnjKQ", "stage", "slice", "127490ifKDXQ", "246550EfGkhj", "58296XfxXct", "CreateGroup", "KeysConfig", "inputSystem", "bindKey", "filter", "addAll", "centerBy", "18949jPKFgq", "selectedGroup", "选编组-", "objects", "编组-", "1403241pKfymJ", "6cbAwPE", "preventDefault", "parent", "664780SzAQSM", "showOpTooltip", "keyboard"];
  return O0 = function() {
    return r;
  }, O0();
}
function ex(r, x, e) {
  const t = M0, n = r[t(327)], s = r[t(310)][t(309)];
  let a = {};
  function i(l) {
    const d = t;
    a[l] = r[d(304)][d(317)][d(319)][d(305)](), r.showOpTooltip(d(320) + l);
  }
  function o(l) {
    const d = t;
    let f = a[l];
    if (f)
      return f = f[d(313)]((h) => h[d(324)] !== null), f.length > 0 && (r[d(326)](d(318) + l), r[d(304)][d(317)].removeAll()[d(314)](f), r.stage[d(311)].target = f[0]), f;
  }
  function c(l) {
    const d = t;
    o(l) && e[d(315)](x[d(317)].objects);
  }
  for (let l = 0; l <= 9; l++)
    n[t(312)](s + "+" + l, function(d) {
      d[t(323)](), i(l);
    }), n.bindKey("" + l, function(d) {
      d[t(323)](), o(l);
    }), n[t(312)]("" + l + "+" + l, function(d) {
      d[t(323)](), c(l);
    });
}
function N0() {
  const r = ["redoUndoSys", "1603FLPmbV", "visible", "update", "Move_up", "onEsc", "74391pcXdUp", "Cut", "isNode", "localView", "stylePasteHandler", "keyboard", "stage", "Select_invert", "children", "editor", "paste_Style", "undo", "keydown", "init", "saveHandler", "notContains", "Copy_style", "Paste", "displayList", "getObject", "Select_all", "Open", "Move_left", "layoutManager", "clipboardManager", "showOpTooltip", "171KlNkqm", "Move_right", "filter", "getNoChildrensObjects", "select", "styleCopyHandler", "111530hMWnVI", "Move_down", "4apIByW", "Save", "keyup", "doGridLayout", "371180SNxxQE", "3269845fGFWBO", "editorEventManager", "2122356fAyBht", "toogleLocalView", "KeysConfig", "26689nTmYoL", "Shift", "Redo", "selectedGroup", "pasteHandler", "23512JIVKhD", "Cancel", "粘贴样式", "forEach", "bindKey"];
  return N0 = function() {
    return r;
  }, N0();
}
const ae = o0;
(function(r, x) {
  const e = o0, t = r();
  for (; []; )
    try {
      if (parseInt(e(341)) / 1 + parseInt(e(335)) / 2 + -parseInt(e(357)) / 3 + -parseInt(e(331)) / 4 * (parseInt(e(336)) / 5) + parseInt(e(338)) / 6 + parseInt(e(352)) / 7 * (parseInt(e(346)) / 8) + parseInt(e(323)) / 9 * (-parseInt(e(329)) / 10) === x)
        break;
      t.push(t.shift());
    } catch {
      t.push(t.shift());
    }
})(N0, 348363);
function o0(r, x) {
  const e = N0();
  return o0 = function(t, n) {
    return t = t - 298, e[t];
  }, o0(r, x);
}
ae(342);
class xx {
  constructor(x) {
    const e = ae;
    this[e(306)] = x, this[e(310)]();
  }
  init() {
    const x = ae, e = this[x(306)], t = e[x(303)], n = e.currentLayer;
    let s = e[x(303)][x(302)];
    const a = e[x(340)];
    function i(o, c, l) {
      o.forEach((d) => {
        s[o0(350)](d, function(h) {
          c(h);
        }, l);
      });
    }
    s.on(x(309), function() {
      e[x(354)]();
    }), s.on(x(333), function(o) {
      e[x(354)]();
    }), i(a.Delete, (o) => e[x(337)].deleteHandler(o)), i(a[x(298)], (o) => e[x(321)].cutHandler(o)), i(a.Copy, (o) => {
      const c = x;
      e.showOpTooltip("复制"), e[c(321)].copyHandler(o);
    }), i(a[x(314)], (o) => e[x(321)][x(345)](o)), i(a.Undo, (o) => {
      const c = x;
      e[c(322)]("撤销"), e.redoUndoSys[c(308)]();
    }), i(a[x(343)], (o) => {
      const c = x;
      e[c(322)]("重做"), e[c(351)].redo(o);
    }), i(a[x(317)], (o) => {
      const c = x;
      e[c(322)]("全选");
      let l = t[c(300)][c(316)](), d = Ae.flatten(l[c(305)], (f) => f[c(353)] == !![]);
      t[c(327)](d);
    }), i(a[x(304)], (o) => {
      const c = x;
      e[c(322)]("反选");
      let l = t[c(344)][c(326)]();
      t[c(327)](n[c(315)][c(325)]((d) => l[c(312)](d)));
    }), i(a[x(332)], (o) => {
      const c = x;
      e[c(322)]("保存"), e[c(311)](o, e.imageToBase64);
    }, ![]), i(a[x(318)], (o) => {
      e[x(322)]("打开"), e.openLasted(o);
    }, ![]), i(a.LocalView, (o) => {
      e[x(339)]();
    }), i(a[x(313)], (o) => {
      const c = x;
      e.showOpTooltip("复制样式"), e[c(321)][c(328)](o);
    }, ![]), i(a[x(307)], (o) => {
      const c = x;
      e.showOpTooltip(c(348)), e[c(321)][c(301)](o);
    }, ![]), i(a[x(319)], (o) => {
      const c = x;
      t[c(344)][c(326)]()[c(325)]((d) => d.isNode).forEach((d) => {
        d.x -= 1;
      });
    }), i(a[x(324)], (o) => {
      const c = x;
      t[c(344)][c(326)]()[c(325)]((d) => d[c(299)]).forEach((d) => {
        d.x += 1;
      });
    }), i(a[x(355)], (o) => {
      const c = x;
      t.selectedGroup.getNoChildrensObjects()[c(325)]((d) => d[c(299)])[c(349)]((d) => {
        d.y -= 1;
      });
    }), i(a[x(330)], (o) => {
      const c = x;
      t[c(344)][c(326)]()[c(325)]((d) => d.isNode)[c(349)]((d) => {
        d.y += 1;
      });
    }), i(a.Layout_grid, (o) => {
      const c = x;
      e[c(320)][c(334)]();
    }), ex(e, t, n), i(a[x(347)], (o) => {
      e[x(356)](o);
    });
  }
}
const we = B0;
(function(r, x) {
  const e = B0, t = r();
  for (; []; )
    try {
      if (parseInt(e(259)) / 1 * (parseInt(e(262)) / 2) + -parseInt(e(256)) / 3 * (-parseInt(e(258)) / 4) + -parseInt(e(252)) / 5 * (parseInt(e(260)) / 6) + -parseInt(e(255)) / 7 * (-parseInt(e(251)) / 8) + parseInt(e(261)) / 9 * (parseInt(e(288)) / 10) + parseInt(e(282)) / 11 + parseInt(e(264)) / 12 * (-parseInt(e(283)) / 13) === x)
        break;
      t.push(t.shift());
    } catch {
      t.push(t.shift());
    }
})(j0, 108795);
function B0(r, x) {
  const e = j0();
  return B0 = function(t, n) {
    return t = t - 250, e[t];
  }, B0(r, x);
}
let tx = we(272);
function nx(r) {
  const x = we, e = r[x(276)];
  let t = new De(e, tx);
  return t.addEventListener(x(289), function(n) {
    const s = x, a = n.item;
    let i = e[s(250)][s(257)];
    a == "剪切" ? r[s(266)][s(279)]() : a == "复制" ? r[s(266)][s(254)]() : a == "粘贴" ? r[s(266)][s(284)]() : a == "删除" && r[s(267)][s(271)](), i != null && (a == "上移一层" ? r[s(270)][s(277)](i, a) : a == s(269) || a == "移至顶部" ? r.layoutManager[s(277)](i, a) : a == s(265) ? r[s(270)][s(277)](i, a) : a == "左对齐" ? r.layoutManager.align("左对齐") : a == s(286) ? r[s(270)][s(287)](s(286)) : a == s(275) ? r.layoutManager[s(287)](s(275)) : a == s(278) ? r[s(270)].align(s(278)) : a == s(253) ? r[s(270)][s(287)](s(253)) : a == s(273) ? r[s(270)][s(287)](s(273)) : a == s(263) ? r[s(270)][s(281)](s(263)) : a == "上下等距" && r.layoutManager[s(281)](s(274)), i.zIndex < 0 ? i.zIndex = 0 : i.zIndex > 1e3 && (i[s(285)] = 1e3), i[s(268)] != null && i.parent[s(280)](), r.update());
  }), t;
}
function j0() {
  const r = ["垂直中心对齐", "上下等距", "顶部对齐", "stage", "setZIndex", "底部对齐", "cutHandler", "updateZIndex", "evenSpacing", "1414413JvwVAE", "340366aSSOTM", "pasteHandler", "zIndex", "右对齐", "align", "210queCAl", "select", "inputSystem", "16680cbjfkz", "55mTtasg", "水平中心对齐", "copyHandler", "329Nikohv", "3qjiKSQ", "target", "194652WTwIyM", "161940bxXXVy", "48066WBXRTN", "76563SAFjMQ", "2YfHhBc", "左右等距", "192iPNfWd", "移至底部", "clipboardManager", "editorEventManager", "parent", "下移一层", "layoutManager", "deleteHandler", `
<div class="header">编辑</div>
<a>剪切</a>
<a>复制</a>
<a>粘贴</a>
<a>删除</a> 
<hr></hr>
<div class="header">前后</div>
<a>上移一层</a>
<a>下移一层</a>
<a>移至顶部</a>
<a>移至底部</a>
<div class="header">对齐</div>
<a>左对齐</a>
<a>右对齐</a>
<a>顶部对齐</a>
<a>底部对齐</a>
<a>水平中心对齐</a>
<a>垂直中心对齐</a>
`];
  return j0 = function() {
    return r;
  }, j0();
}
const R = c0;
(function(r, x) {
  const e = c0, t = r();
  for (; []; )
    try {
      if (-parseInt(e(195)) / 1 * (-parseInt(e(213)) / 2) + -parseInt(e(209)) / 3 + parseInt(e(194)) / 4 * (-parseInt(e(214)) / 5) + -parseInt(e(210)) / 6 + parseInt(e(189)) / 7 + -parseInt(e(202)) / 8 + -parseInt(e(216)) / 9 * (-parseInt(e(188)) / 10) === x)
        break;
      t.push(t.shift());
    } catch {
      t.push(t.shift());
    }
})(z0, 752492);
function c0(r, x) {
  const e = z0();
  return c0 = function(t, n) {
    return t = t - 188, e[t];
  }, c0(r, x);
}
function z0() {
  const r = ["showGuildLine", "stage", "12190BoZTOo", "2104620gRQvYR", "hide", "styleS", "show", "guildLine", "81828siFNYO", "3kOpVxb", "addChild", "handlerLayer", "setBegin", "setEnd", "enable", "mouseEnabled", "11128824lefaKB", "height", "guildlineW", "styleW", "width", "init", "css", "3720189iHdSgn", "7406988lrooZz", "_disabled", "hideGuidLine", "604710pptZTm", "200YlcDRx", "editor", "31221uTwZGu", "guildlineS"];
  return z0 = function() {
    return r;
  }, z0();
}
class sx {
  constructor(x) {
    const e = c0;
    this[e(211)] = !![], this.editor = x, this.init();
  }
  [R(207)]() {
    const x = R, e = this.editor, t = new k();
    t[x(201)] = ![], t[x(208)](b[x(193)][x(205)]), t[x(190)](), this[x(204)] = t, e[x(197)][x(196)](this[x(204)]);
    const n = new k();
    t.mouseEnabled = ![], n[x(208)](b[x(193)][x(191)]), n[x(190)](), this[x(217)] = n, e[x(197)][x(196)](this.guildlineS);
  }
  disable() {
    const x = R;
    this[x(211)] = !![], this[x(212)]();
  }
  [R(200)]() {
    const x = R;
    this[x(211)] = ![];
  }
  [R(218)](x) {
    const e = R;
    if (this._disabled)
      return;
    const t = this[e(215)], n = t[e(219)], s = this[e(204)], a = this[e(217)];
    s[e(198)]({ x: 0, y: x.y }), s[e(199)]({ x: n[e(206)], y: x.y }), s[e(192)](), a[e(198)]({ x: x.x, y: 0 }), a[e(199)]({ x: x.x, y: n[e(203)] }), a[e(192)]();
  }
  [R(212)]() {
    const x = R;
    this.guildlineW[x(190)](), this[x(217)][x(190)]();
  }
}
var q = d0;
(function(r, x) {
  for (var e = d0, t = r(); []; )
    try {
      var n = parseInt(e(284)) / 1 * (-parseInt(e(281)) / 2) + -parseInt(e(286)) / 3 * (parseInt(e(290)) / 4) + -parseInt(e(287)) / 5 * (-parseInt(e(293)) / 6) + parseInt(e(289)) / 7 + -parseInt(e(279)) / 8 + -parseInt(e(282)) / 9 + parseInt(e(291)) / 10;
      if (n === x)
        break;
      t.push(t.shift());
    } catch {
      t.push(t.shift());
    }
})(G0, 548997);
function d0(r, x) {
  var e = G0();
  return d0 = function(t, n) {
    t = t - 277;
    var s = e[t];
    return s;
  }, d0(r, x);
}
function G0() {
  var r = ["254979PnLfkZ", "copy", "384182KFBklR", "copyPut", "2871777DmGNcF", "4778265MsimbA", "cut", "3489381ZnKhPb", "4LGafal", "12433650kqwsWt", "source", "6zRpmHT", "take", "takeSource", "3156400JKmbTG", "type", "4qVOIjU"];
  return G0 = function() {
    return r;
  }, G0();
}
class se {
  constructor() {
    var x = d0;
    this[x(277)] = 0;
  }
  [q(285)](x) {
    var e = q;
    this.take = 0, this[e(280)] = e(283), this[e(292)] = x;
  }
  cutPut(x) {
    var e = q;
    this[e(277)] = -1, this[e(280)] = e(288), this.source = x;
  }
  [q(278)]() {
    var x = q;
    return this[x(277)]++, this[x(292)];
  }
  isFirstCutPaste() {
    var x = q;
    return this[x(280)] == qe[x(288)] && this.take == 0;
  }
}
function F0() {
  var r = ["type", "212583HVITzB", "2228114DXyiNC", "4685384dlDsPh", "2615615tgPeEp", "3698640YXluFY", "14NtipBm", "24KHzsej", "6584751VPJBAH", "34663WTdxzy"];
  return F0 = function() {
    return r;
  }, F0();
}
(function(r, x) {
  for (var e = R0, t = r(); []; )
    try {
      var n = parseInt(e(354)) / 1 * (-parseInt(e(351)) / 2) + -parseInt(e(346)) / 3 * (-parseInt(e(352)) / 4) + parseInt(e(349)) / 5 + parseInt(e(350)) / 6 + parseInt(e(347)) / 7 + -parseInt(e(348)) / 8 + -parseInt(e(353)) / 9;
      if (n === x)
        break;
      t.push(t.shift());
    } catch {
      t.push(t.shift());
    }
})(F0, 323078);
function R0(r, x) {
  var e = F0();
  return R0 = function(t, n) {
    t = t - 346;
    var s = e[t];
    return s;
  }, R0(r, x);
}
class B {
  constructor(x) {
    var e = R0;
    this[e(355)] = x;
  }
}
function l0(r, x) {
  const e = W0();
  return l0 = function(t, n) {
    return t = t - 394, e[t];
  }, l0(r, x);
}
const z = l0;
(function(r, x) {
  const e = l0, t = r();
  for (; []; )
    try {
      if (parseInt(e(426)) / 1 + parseInt(e(441)) / 2 * (parseInt(e(406)) / 3) + -parseInt(e(440)) / 4 + -parseInt(e(421)) / 5 * (-parseInt(e(422)) / 6) + -parseInt(e(413)) / 7 * (-parseInt(e(405)) / 8) + -parseInt(e(394)) / 9 * (parseInt(e(427)) / 10) + -parseInt(e(435)) / 11 === x)
        break;
      t.push(t.shift());
    } catch {
      t.push(t.shift());
    }
})(W0, 228402);
function W0() {
  const r = ["copySetStyle", "stage", "67770WIUidG", "copyPut", "concat", "styleCopyHandler", "cssClipBoard", "copyAndToJSON", "translateWith", "inputSystem", "object", "getNoChildrensObjects", "cutPut", "35784tpFPiM", "16437BGDDMB", "aabb", "className", "forEach", "paste", "takeSource", "currentLayer", "196YGQyPp", "target", "record", "serializerSystem", "_obb", "粘贴样式", "addChild", "editor", "550150gQeYUu", "24JipSxR", "copyHandler", "isEmpty", "copy", "312345WZQxNC", "350mzMLle", "selectedGroup", "parent", "style", "jsonToObjects", "unionRects", "objects", "cut", "2479653GHJHsC", "stylePasteHandler", "pasteHandler", "map", "clipboard", "1474144uRyGak", "76vpipyE", "dispatchEvent", "disconnect", "recordEnd", "anchorBox"];
  return W0 = function() {
    return r;
  }, W0();
}
class ax {
  constructor(x) {
    const e = l0;
    this[e(398)] = new se(), this.clipboard = new se(), this[e(398)] = new se(), this.editor = x;
  }
  [z(423)]() {
    const x = z;
    let e = this.editor[x(447)], t = [][x(396)](e[x(428)][x(403)]());
    if (t.length == 0)
      return;
    let n = t[x(438)]((a) => a.parent);
    this.clipboard.copyPut([t, n]);
    let s = new B(x(425));
    s.object = t, this[x(420)].dispatchEvent(s);
  }
  cutHandler() {
    const x = z;
    let e = this[x(420)], t = e[x(447)], n = [].concat(t[x(428)][x(403)]());
    if (n.length == 0)
      return;
    let s = n[x(438)]((i) => i[x(429)]);
    this[x(439)][x(404)]([n, s]), e[x(415)]("剪切"), n[x(409)]((i, o) => {
      const c = x;
      s[o].removeChild(i), Ie[c(443)](i, n);
    }), e.recordEnd("剪切"), t[x(401)][x(414)] = null, e[x(445)].clearTarget();
    let a = new B(x(434));
    a[x(402)] = n, this[x(420)].dispatchEvent(a);
  }
  [z(437)]() {
    const x = z;
    let e = this.editor, t = this[x(439)][x(411)]();
    if (t == null)
      return;
    let n = e[x(412)], s = e[x(447)], a = t[0], i = t[1], o = a.map((p) => p[x(417)][x(407)]), c = ye[x(432)](o), l = c.getCenter(), d = n.stageToLocalXY(s[x(401)].x, s[x(401)].y), f = d.x - l.x, h = d.y - l.y;
    e.record("粘贴");
    let g = a, D = s[x(416)][x(399)](a);
    g = s[x(416)][x(431)](D), g[x(409)]((p, M) => {
      p[x(400)](f, h);
    }), g[x(409)]((p, M) => {
      const L = x;
      i[M][L(419)](p);
    }), e[x(444)]("粘贴");
    let E = new B(x(410));
    E[x(402)] = g, this[x(420)][x(442)](E);
  }
  [z(397)]() {
    const x = z;
    let e = this[x(420)], t = e[x(447)], n = t[x(401)][x(414)];
    n == null && (!t[x(428)][x(424)]() && (n = t.selectedGroup[x(433)][0]), n == null) || this.cssClipBoard[x(395)](n);
  }
  [z(436)]() {
    const x = z;
    let e = this[x(420)], t = this[x(398)].takeSource();
    if (t == null)
      return;
    let n = e.stage[x(428)].objects, s = this;
    e[x(415)]("粘贴样式"), n.forEach((a) => {
      s[x(446)](a, t);
    }), e[x(444)](x(418));
  }
  copySetStyle(x, e) {
    const t = z;
    x !== e && x[t(408)] === e[t(408)] && x.css(e[t(430)]);
  }
}
const X = f0;
function f0(r, x) {
  const e = K0();
  return f0 = function(t, n) {
    return t = t - 500, e[t];
  }, f0(r, x);
}
(function(r, x) {
  const e = f0, t = r();
  for (; []; )
    try {
      if (-parseInt(e(515)) / 1 + -parseInt(e(525)) / 2 * (-parseInt(e(524)) / 3) + -parseInt(e(506)) / 4 + parseInt(e(510)) / 5 + -parseInt(e(528)) / 6 + parseInt(e(518)) / 7 * (parseInt(e(514)) / 8) + parseInt(e(504)) / 9 === x)
        break;
      t.push(t.shift());
    } catch {
      t.push(t.shift());
    }
})(K0, 639891);
function K0() {
  const r = ["NodeCtrlBox", "updateSize", "update", "1149ADYgBS", "1742sBOxmi", "visible", "translateTo", "1215948nDfpqE", "css", "rotate", "resizeTo", "show", "9256815GkaVmC", "viewClone", "2425668OFSFGq", "editable", "currObject", "mouseEnabled", "877790iIfeXN", "hide", "point", "center", "828032DaCJdb", "1227264bZqkKB", "editor", "getStageTransform", "77dqkrTj", "positionToLocalPoint", "zIndex"];
  return K0 = function() {
    return r;
  }, K0();
}
class ix extends j {
  constructor(x, e = 0, t = 0, n = 1, s = 1) {
    const a = f0;
    super(null, e, t, n, s), this[a(520)] = ee[a(521)], this[a(516)] = x, this[a(500)](b.dropBox.style), this[a(509)] = ![], this[a(508)], this[a(511)]();
  }
  [X(523)]() {
    this[X(526)] && this.updateSize();
  }
  attachTo(x) {
    const e = X;
    if (x == null || x[e(507)] != !![]) {
      this[e(508)] = null, this[e(511)]();
      return;
    }
    if (x.isLink)
      throw new Error("attach not Node");
    this[e(508)] = x, this[e(522)](), this[e(503)]();
  }
  [X(522)]() {
    const x = X;
    this.currObject != null && this[x(505)](this.currObject);
  }
  [X(505)](x) {
    const e = X;
    let t = x[e(517)](), n = t.point(x.positionToLocalPoint(_[e(513)])), s = t.point(x[e(519)](_.rm)), a = Math.atan2(s.y - n.y, s.x - n.x);
    t.rotate(-a);
    let i = t[e(512)](x[e(519)](_[e(513)])), o = t[e(512)](x[e(519)](_.rb)), c = (o.x - i.x) * 2, l = (o.y - i.y) * 2, d = 4;
    this[e(502)](c + d * 2, l + d * 2), this[e(501)](a), this[e(527)](n.x, n.y);
  }
}
(function(r, x) {
  const e = h0, t = r();
  for (; []; )
    try {
      if (-parseInt(e(238)) / 1 + parseInt(e(247)) / 2 * (-parseInt(e(246)) / 3) + -parseInt(e(256)) / 4 + -parseInt(e(250)) / 5 + -parseInt(e(233)) / 6 * (-parseInt(e(243)) / 7) + -parseInt(e(236)) / 8 * (parseInt(e(255)) / 9) + parseInt(e(252)) / 10 * (parseInt(e(244)) / 11) === x)
        break;
      t.push(t.shift());
    } catch {
      t.push(t.shift());
    }
})(V0, 183510);
function he(r, x) {
  const e = h0;
  let t = r[e(241)], n = r.currentLayer[e(232)]()[e(254)]((i) => {
    const o = e;
    return i[o(237)] && i.isNode && i[o(235)] != !![] && i.mouseEnabled && i[o(245)] != !![];
  }), s = x.filter((i) => {
    const o = e;
    return i[o(240)]() || i[o(249)] === t;
  }), a;
  for (let i = 0; i < s[e(239)]; i++) {
    let o = s[i];
    if (a = rx(o, n), a != null)
      break;
  }
  return a == null && (a = t, s = s[e(254)]((i) => i.parent !== t)), console[e(234)](a[e(242)] != !![], !![], a), { parent: a, objects: s };
}
function rx(r, x) {
  const e = h0, t = r[e(248)](), n = x.filter((s) => s === r[e(249)] || s === r ? ![] : r.isAncestors(s) ? ![] : !![]);
  for (let s = n[e(239)] - 1; s >= 0; s--) {
    const a = n[s];
    if (a.getAABB()[e(253)](t))
      return a;
  }
  return null;
}
function h0(r, x) {
  const e = V0();
  return h0 = function(t, n) {
    return t = t - 232, e[t];
  }, h0(r, x);
}
function V0() {
  const r = ["skipPaint", "159VVMJFN", "12638WErpBX", "getAABB", "parent", "722890NNdmtI", "addChild", "1905070nJvXtJ", "isIntersectRect", "filter", "31203gaqvSu", "324892wEUOgN", "getAllVisiable", "1806oxCrrB", "assert", "isSelected", "56zxFAZU", "visible", "348695JiWssU", "length", "isOutOfParent", "currentLayer", "isLink", "3829gletDS", "55WqpfxI"];
  return V0 = function() {
    return r;
  }, V0();
}
const I = U0;
(function(r, x) {
  const e = U0, t = r();
  for (; []; )
    try {
      if (parseInt(e(470)) / 1 + parseInt(e(502)) / 2 * (-parseInt(e(533)) / 3) + -parseInt(e(540)) / 4 + parseInt(e(444)) / 5 + -parseInt(e(451)) / 6 * (parseInt(e(488)) / 7) + -parseInt(e(439)) / 8 + parseInt(e(539)) / 9 * (parseInt(e(446)) / 10) === x)
        break;
      t.push(t.shift());
    } catch {
      t.push(t.shift());
    }
})(X0, 255219);
function U0(r, x) {
  const e = X0();
  return U0 = function(t, n) {
    return t = t - 439, e[t];
  }, U0(r, x);
}
function X0() {
  const r = ["hide", "changeParent", "anchorBox", "dblclickHandler", "showGuildLine", "currObject", "recordEnd", "30BvFBOP", "auto", "editor", "init", "removeChild", "controlTarget", "9587133MtpcSc", "1841360mJJCci", "isNode", "delete", "findConnectableEndpoint", "crosshair", "alignManager", "237040RACDeG", "groupdragend", "mousewheelHandler", "inputSystem", "editable", "441465aIgUvc", "mousemove", "10kluziA", "KeysConfig", "isKeydown", "button", "defaultPrevented", "6oTeKLa", "drop", "setCursor", "object", "groupdrag", "1727712000000", "Control", "getObject", "now", "控制点", "dragHandler", "addChild", "popupMenu", "nodeCtrlBox", "zoomAfter", "guidlineManager", "record", "mouseoutHandler", "event", "384900piclpO", "mousedown", "stage", "hideGuidLine", "mousemoveHandler", "Shift", "clearTarget", "mouseoutStageHandler", "isDragEnd", "preventDefault", "setTarget", "localView", "drawLineStart", "pickUpChild", "selectedGroupDragHandler", "forEach", "length", "dragover", "3265297CtehCu", "mouseOverTarget", "linkCtrlBox", "对象拖拽", "connectable", "isDragStart", "charAt", "keyboard", "mousedragHandler", "deleteHandler", "getCenter", "mouseupHandler", "isMouseOn", "parent", "65354uitvVw", "onLinkCreate", "upgradeLinks", "update", "showAt", "attachTo", "selectedGroupDragEndHandler", "mouseenterStageHandler", "handlerLayer", "move", "target", "dispatchEvent", "getNoChildrensObjects", "dropToBox", "mousedownHandler", "round", "mouseenterHandler", "lineDrawn", "lineDrawingFinished", "selectedGroup", "toStageRect", "aabb", "instanceManager", "newMode"];
  return X0 = function() {
    return r;
  }, X0();
}
const ox = oe.w != null ? oe.w[I(494)](3) : "1";
class cx {
  constructor(x) {
    const e = I;
    this[e(535)] = x, this.init();
  }
  [I(536)]() {
    const x = I;
    let e = this.editor, t = e[x(472)], n = t[x(442)], s = e[x(510)], a = parseInt(x(456));
    Date[x(459)]() > a || (t.on(b0[x(465)], function() {
      e.update();
    }), t.on(b0.modeChange, function(i) {
      const o = x;
      let c = i[o(525)], l = e[o(464)], d = e[o(490)], f = e[o(515)], h = e[o(528)];
      c == Me.edit ? (s[o(462)](l), s[o(462)](d), s.addChild(h), s[o(462)](f)) : (s[o(537)](l), s.removeChild(d), s[o(537)](h), s.removeChild(f)), e[o(505)]();
    }), n.on(x(487), function(i) {
      const o = x;
      i[o(479)](), e[o(513)](n);
    }), n.on(x(452), function() {
      const i = x;
      n[i(469)].defaultPrevented || e[i(513)](n);
    }), n.on(x(471), function(i) {
      const o = x;
      n[o(469)][o(450)] || e[o(463)][o(526)]();
    }), n.on("mouseup", function(i) {
      const o = x;
      n.button == 2 ? !n[o(478)] && e[o(463)][o(506)](n.x, n.y) : e[o(463)][o(526)]();
    }), n.on(x(445), function() {
    }), t[x(521)].on(b0[x(455)], function(i) {
      const o = x;
      e[o(484)](i, t[o(521)][o(514)]());
    }), t[x(521)].on(b0[x(440)], function(i) {
      const o = x;
      e[o(508)](i, t.selectedGroup[o(514)]());
    }));
  }
  [I(497)]() {
    const x = I;
    let e = this[x(535)], t = e[x(472)], n = t.selectedGroup;
    if (ox != "1")
      return null;
    let s = n[x(514)]();
    n.removeAll(), e[x(524)][x(542)](s);
    let a = new B(x(542));
    a[x(454)] = s, e[x(513)](a);
  }
  [I(516)](x) {
    const e = I, t = this[e(535)], n = t[e(472)].inputSystem;
    let s = t[e(510)], a = t.nodeCtrlBox, i = t[e(490)];
    if (t[e(545)][e(516)](n), t[e(538)] = s[e(483)](), t[e(528)][e(526)](), t[e(538)] != null) {
      let o = t[e(538)][e(501)];
      o !== a ? a.hide() : o !== i && i[e(526)](), t[e(538)][e(516)](n), n[e(469)][e(479)]();
      return;
    }
    i[e(526)](), a.hide();
  }
  [I(441)](x) {
  }
  [I(529)](x) {
  }
  [I(499)](x) {
    const e = I, t = this.editor, n = t.stage[e(442)];
    t[e(466)][e(473)](), t[e(545)][e(499)](n);
    let s = t[e(472)], a = t[e(464)], i = t.linkCtrlBox, o = t[e(538)];
    if (o != null) {
      n[e(478)] && !(o instanceof r0) && t[e(532)]("控制点"), o[e(499)](n), n[e(469)][e(479)](), t[e(505)]();
      return;
    }
    if (n[e(449)] == 2)
      return;
    let c = s[e(442)][e(512)];
    c != null ? c[e(443)] && (c instanceof k ? i[e(507)](c) : (t[e(528)][e(480)](c), a.attachTo(c))) : (t.anchorBox[e(476)](), a[e(476)](), i[e(476)]());
    {
      if (t[e(515)][e(531)] != null) {
        let d = t.selectedGroup.getNoChildrensObjects(), f = he(t, d), h = f.parent;
        f.objects[e(485)]((D) => {
          const E = e;
          D[E(527)](h), D[E(504)]();
        });
      }
      t.dropToBox[e(507)](null);
    }
  }
  [I(496)](x) {
    const e = I, t = this[e(535)], n = t[e(472)].inputSystem;
    if (n.buttons == 2)
      return;
    t.keyboard[e(448)](e(475)) && t[e(472)][e(453)](T[e(544)]), t.guidlineManager[e(530)](n);
    let s = t.controlTarget;
    if (s != null) {
      if (n.isDragStart && !(s instanceof r0) && t[e(467)](e(460)), s[e(461)](n), n.event instanceof MouseEvent && n[e(469)][e(450)] == !![])
        return;
      n.event[e(479)]();
      return;
    }
    t[e(545)][e(496)](n), t.dropToBox[e(526)]();
    const a = t[e(447)].DropTo_leader;
    if (t.stage.inputSystem[e(512)] && t[e(495)].isKeydown(a)) {
      let o = t.selectedGroup[e(514)](), c = he(t, o), l = c[e(501)];
      l != null && l.editable && t[e(515)][e(507)](l);
    }
  }
  [I(474)](x) {
    const e = I, t = this.editor;
    let n = t[e(472)];
    const s = n[e(510)];
    if (n[e(481)][e(458)](), n[e(453)](e(534)), t.keyboard[e(448)](e(457)) && t[e(528)][e(543)]([]))
      return;
    let a = s.pickUpChild();
    if (a !== t.mouseOverTarget && (t[e(489)] != null && t.mouseOverTarget[e(468)](x), a != null && a[e(518)](x)), t[e(489)] = a, a != null) {
      a[e(474)](x);
      return;
    }
    let i = n.getCurrentLayer().pickUpChild();
    i != null && (t[e(472)].setCursor(e(511)), i[e(541)] && i[e(492)] && t.anchorBox.setTarget(i));
  }
  [I(518)](x) {
    const e = I, t = this[e(535)];
    t[e(490)].mouseenterStageHandler(), t[e(464)][e(509)](), t[e(528)][e(509)]();
  }
  mouseoutHandler(x) {
    const e = I, t = this.editor;
    t[e(490)][e(477)](), t[e(464)][e(477)](), t[e(528)].mouseoutStageHandler();
  }
  onLineDrawnHandler(x) {
    const e = I, t = this.editor;
    if (t[e(503)])
      t[e(503)](x);
    else {
      let n = new B(e(519));
      n[e(454)] = x, t[e(513)](n), n = new B(e(482)), n[e(454)] = x, t[e(513)](n);
    }
  }
  onlineDrawingFinishedHandler(x) {
    const e = I, t = this[e(535)];
    let n = new B(e(520));
    n.object = x, t[e(513)](n), n = new B("drawLineEnd"), n.object = x, t[e(513)](n);
  }
  [I(484)](x, e) {
    const t = I, n = this.editor;
    if (n[t(472)][t(442)][t(493)] && n[t(467)](t(491)), e[t(486)] == 1) {
      const a = e[0], i = n.getCurrentLayer()[t(522)](a._obb[t(523)]), o = i[t(498)]();
      n[t(466)][t(530)](o);
    }
  }
  [I(508)](x, e) {
    const t = I, n = this[t(535)];
    if (!n[t(472)][t(442)][t(500)]) {
      n.recordInterrupt();
      return;
    }
    e[t(485)]((a) => {
      const i = t;
      a.isNode && (a.x = Math[i(517)](a.x), a.y = Math[i(517)](a.y));
    }), n[t(532)](t(491));
  }
}
const K = Y0;
(function(r, x) {
  const e = Y0, t = r();
  for (; []; )
    try {
      if (parseInt(e(438)) / 1 + parseInt(e(426)) / 2 * (parseInt(e(420)) / 3) + parseInt(e(416)) / 4 * (-parseInt(e(418)) / 5) + parseInt(e(459)) / 6 * (-parseInt(e(425)) / 7) + parseInt(e(439)) / 8 + -parseInt(e(417)) / 9 + -parseInt(e(413)) / 10 === x)
        break;
      t.push(t.shift());
    } catch {
      t.push(t.shift());
    }
})(J0, 862349);
function Y0(r, x) {
  const e = J0();
  return Y0 = function(t, n) {
    return t = t - 407, e[t];
  }, Y0(r, x);
}
function J0() {
  const r = ["_obb", "resizeTo", "filter", "isNode", "getUnionRect", "移至顶部", "length", "setZIndex", "update", "1314209WtrzOy", "13761376jzkVVu", "updatezIndex", "顶部对齐", "getRight", "垂直中心对齐", "getNoChildrensObjects", "unionRects", "shapeLayout", "getBottom", "doLayout", "上移一层", "左对齐", "translateWith", "layoutSystem", "doGridLayout", "parent", "水平中心对齐", "evenSpacing", "getCenter", "移至底部", "24ppnCYc", "align", "aabb", "zIndex", "easeInQuart", "selectedGroup", "sqrt", "19589950HOCyGQ", "底部对齐", "isAlone", "19196chdGOL", "14036517ZdKmKq", "230zfEJAZ", "translate", "5040222mHVvnB", "width", "右对齐", "outerGrid", "stage", "197302JhxTJT", "2sBocHX", "下移一层", "editor"];
  return J0 = function() {
    return r;
  }, J0();
}
class dx {
  constructor(x) {
    this.editor = x;
  }
  [K(436)](x, e) {
    const t = K;
    e == t(449) ? x.zIndex++ : e == t(427) ? x[t(409)]-- : e == t(434) ? x.zIndex = 1e3 : e == t(458) && (x[t(409)] = 0), x[t(454)][t(440)]();
  }
  [K(456)](x) {
    const e = K;
    let n = this[e(428)][e(424)][e(411)].getNoChildrensObjects();
    n = n.filter((s) => s[e(432)] || s instanceof k && s[e(415)]()), n[e(435)] != 0;
  }
  [K(407)](x) {
    const e = K, t = this[e(428)];
    let n = t[e(424)].selectedGroup[e(444)]();
    if (n = n[e(431)]((i) => i[e(432)] || i instanceof k && i[e(415)]()), n.length == 0)
      return;
    let s = n.map((i) => i[e(429)][e(408)]), a = ye[e(445)](s);
    for (let i = 0; i < n[e(435)]; i++) {
      let o = n[i], c = o[e(429)][e(408)];
      x == e(450) ? o[e(451)](a.x - c.x, 0) : x == e(422) ? o[e(451)](a[e(442)]() - c[e(442)](), 0) : x == e(441) ? o.translateWith(0, a.y - c.y) : x == e(414) ? o.translateWith(0, a[e(447)]() - c.getBottom()) : x == e(455) ? o[e(451)](0, a[e(457)]().y - c.getCenter().y) : x == e(443) && o[e(451)](a[e(457)]().x - c.getCenter().x, 0);
    }
    t[e(437)]();
  }
  [K(453)]() {
    const x = K;
    let e = this.editor, t = e[x(424)], n = t[x(411)][x(444)]()[x(431)]((d) => d instanceof j);
    if (n[x(435)] < 2)
      return;
    let s = Math.ceil(Math[x(412)](n.length)), a = Oe[x(433)](n), i = a[x(457)](), o = ge[x(423)](s, s), c = t[x(452)][x(446)](n, o), l = n[0][x(421)] * s;
    c[x(430)](l, l), c[x(419)](i.x, i.y), c[x(448)]({ effect: x(410), duration: 300 }), e.showOpTooltip("网格布局");
  }
}
function e0(r, x) {
  const e = q0();
  return e0 = function(t, n) {
    return t = t - 144, e[t];
  }, e0(r, x);
}
const V = e0;
(function(r, x) {
  const e = e0, t = r();
  for (; []; )
    try {
      if (-parseInt(e(170)) / 1 * (parseInt(e(157)) / 2) + parseInt(e(151)) / 3 * (-parseInt(e(160)) / 4) + parseInt(e(162)) / 5 * (parseInt(e(147)) / 6) + parseInt(e(176)) / 7 * (-parseInt(e(163)) / 8) + parseInt(e(175)) / 9 + -parseInt(e(173)) / 10 + -parseInt(e(174)) / 11 * (-parseInt(e(149)) / 12) === x)
        break;
      t.push(t.shift());
    } catch {
      t.push(t.shift());
    }
})(q0, 847155);
function q0() {
  const r = ["indexOf", "36dCvWSU", "getObject", "5aSUPRt", "200jPVxeD", "isNode", "getMouseXY", "onLineDrawnHandler", "function", "editor", "setMode", "1305569mXhClS", "Node", "parent", "2563940ivrLeA", "1627197fsnEbp", "2361636XdyRVy", "226597xpumwM", "showOpTooltip", "create", "addNewInstance", "record", "lineDrawingFinished", "mousedragHandler", "onlineDrawingFinishedHandler", "css", "LinkClassName", "editorEventManager", "localView", "dispatchEvent", "view", "addChild", "keys", "removeFromParent", "9254226nMXPYT", "lineDrawn", "204TKXwNy", "zIndex", "367047cDtgkS", "assign", "stage", "disconnect", "object", "recordEnd", "2FbggPi", "unknow classname:"];
  return q0 = function() {
    return r;
  }, q0();
}
class lx {
  constructor(x) {
    const e = e0;
    this[e(168)] = x;
  }
  delete(x) {
    const e = e0;
    let t = this[e(168)];
    t[e(180)]("删除"), x.forEach(function(n) {
      const s = e;
      Ie[s(154)](n), n[s(146)]();
    }), t[e(177)]("删除"), t[e(156)]("删除");
  }
  [V(179)](x) {
    const e = V, t = this[e(168)];
    this[e(168)][e(153)][e(187)][e(161)]().addChild(x);
    let s = new B(e(178));
    s[e(155)] = x, t[e(188)](s);
  }
  [V(178)](x) {
    const e = V, t = this.editor, n = t.stage;
    let s = n[e(187)][e(165)](), a = s.x, i = s.y, o = ce(x);
    if (x[e(159)](e(171)) != -1) {
      let c = new o(null, a, i, 64, 64);
      return this[e(179)](c), c;
    }
    if (x[e(159)]("Link") != -1) {
      n[e(182)].mode && n[e(169)](e(189));
      let c = new o(null, { x: a - 40, y: i }, { x: a + 40, y: i + (x == "Link" ? 0 : 80) });
      return this[e(179)](c), c;
    }
    throw new Error(e(158) + x);
  }
  [V(148)](x, e, t, n) {
    const s = V;
    let a = this[s(168)], i = ce(a[s(185)]);
    const o = new i(x, e, t, n), c = Object[s(152)]({}, a.newLinkProperties);
    c[s(184)] && (o[s(184)](c[s(184)]), delete c[s(184)]), Object[s(145)](c).forEach((f) => {
      const h = s;
      let g = c[f];
      typeof g == h(167) ? o[f] = g() : o[f] = g;
    });
    let d = e[s(164)] || e.isLink ? e[s(172)] : a.currentLayer;
    return o[s(150)] = ee.EditorNewLink, d[s(144)](o), a[s(186)][s(166)](o), o;
  }
  [V(181)](x) {
    const e = V;
    this.editor[e(186)][e(183)](x);
  }
}
const H = u0;
(function(r, x) {
  const e = u0, t = r();
  for (; []; )
    try {
      if (parseInt(e(285)) / 1 * (-parseInt(e(284)) / 2) + parseInt(e(296)) / 3 + -parseInt(e(280)) / 4 * (-parseInt(e(324)) / 5) + -parseInt(e(311)) / 6 + parseInt(e(325)) / 7 + -parseInt(e(261)) / 8 * (-parseInt(e(276)) / 9) + -parseInt(e(268)) / 10 * (-parseInt(e(287)) / 11) === x)
        break;
      t.push(t.shift());
    } catch {
      t.push(t.shift());
    }
})(Z0, 119525);
function u0(r, x) {
  const e = Z0();
  return u0 = function(t, n) {
    return t = t - 258, e[t];
  }, u0(r, x);
}
class fx {
  constructor(x) {
    const e = u0;
    this[e(302)] = b[e(313)].minDistance, this[e(310)] = ![], this.editor = x, this[e(274)](x);
  }
  [H(274)](x) {
    const e = H;
    let t = new k(null, { x: 0, y: 0 }, { x: 100, y: 100 });
    t.css(b[e(313)][e(281)]), t[e(271)] = ![], this[e(290)] = t;
    let n = new k(null, { x: 0, y: 0 }, { x: 100, y: 100 });
    n[e(298)](b[e(313)].alignLineStyle), n[e(271)] = ![], this[e(283)] = n, t[e(305)](), n[e(305)](), x[e(269)][e(278)](t), x[e(269)][e(278)](n);
  }
  [H(303)]() {
    const x = H;
    this[x(310)] = !![], this[x(290)][x(305)](), this[x(283)][x(305)]();
  }
  [H(258)]() {
    const x = H;
    this[x(310)] = ![];
  }
  [H(308)](x, e) {
    const t = H, n = this[t(291)], s = n[t(315)];
    let a = x[t(309)];
    if (s[t(264)][t(288)].length > 1)
      return null;
    let i = this.editor[t(320)](), o = (f) => f[t(316)] && f !== a && f !== f[t(263)][t(323)] && f !== f[t(263)].endArrow && f !== f[t(263)].label;
    const c = s[t(320)]().displayList.filter(o), l = c[t(304)]((f) => i[t(259)](f[t(299)][t(321)]));
    return this.findAlignRectInfo(i[t(259)](a._obb[t(321)]), l, e);
  }
  mousedownHandler(x) {
  }
  [H(300)](x) {
    const e = H;
    if (this[e(310)])
      return;
    this[e(290)][e(305)](), this[e(283)][e(305)]();
    let t = x[e(309)], n = this[e(294)];
    if (t && t[e(316)] && n != null) {
      if (this.editor.getCurrentLayer(), n[e(282)] != null) {
        let s = n[e(262)], a = n.xType, i = s[n.xType];
        i = t[e(263)][e(318)](i, 0).x, a == e(293) ? t[e(293)] = i : a == e(266) ? t.x = i : a == e(297) && (t[e(297)] = i);
      }
      if (n[e(289)] != null) {
        let s = n.yRect, a = n[e(289)], i = s[n[e(289)]];
        i = t[e(263)][e(318)](0, i).y, a == e(295) ? t[e(295)] = i : a == e(286) ? t.y = i : a == "bottom" && (t.bottom = i);
      }
      this[e(291)][e(260)](), this[e(294)] = null;
    }
  }
  [H(292)](x) {
    const e = H;
    if (this[e(310)])
      return;
    let t = x[e(309)];
    if (t == null || !t[e(316)] || this.editor[e(265)][e(272)](xe[e(267)]))
      return;
    let n = this[e(290)], s = this[e(283)];
    this[e(290)][e(305)](), this[e(283)][e(305)]();
    const a = this[e(308)](x, this[e(302)]);
    if (this[e(294)] = a, a == null)
      return;
    let i = a[e(322)];
    if (a.xType != null) {
      let o = a[e(262)], c = o[a[e(282)]], l = (i[e(286)] + o[e(286)]) / 2, d = Math.abs(i[e(286)] - o.middle);
      n[e(277)]({ x: c, y: l - d / 2 }), n[e(270)]({ x: c, y: l + d / 2 }), n[e(312)]();
    }
    if (a[e(289)] != null) {
      let o = a[e(319)], c = (i[e(266)] + o.center) / 2, l = o[a[e(289)]], d = Math[e(275)](i.center - o[e(266)]);
      s[e(277)]({ x: c - d / 2, y: l }), s[e(270)]({ x: c + d / 2, y: l }), s[e(312)]();
    }
  }
  [H(306)](x, e, t) {
    const n = H;
    let s = Number[n(273)], a = Number[n(273)], i, o, c, l;
    e[n(314)]((f, h) => {
      const g = n;
      return p0[g(307)](x[g(266)], x.middle, h[g(266)], h[g(286)]) - p0[g(307)](x[g(266)], x.middle, f[g(266)], f[g(286)]);
    });
    let d;
    for (let f = 0; f < e[n(317)]; f++) {
      let h = e[f];
      h[n(301)](x) || (d = Math.abs(x[n(295)] - h.top), d <= a && d <= t && (o = n(295), a = d, l = h), d = Math[n(275)](x.bottom - h[n(279)]), d <= a && d <= t && (o = n(279), a = d, l = h), d = Math[n(275)](x[n(286)] - h.middle), d <= a && d <= t && (o = n(286), a = d, l = h), d = Math[n(275)](x.left - h[n(293)]), d <= s && d < t && (i = n(293), s = d, c = h), d = Math.abs(x[n(297)] - h[n(297)]), d <= s && d < t && (i = n(297), s = d, c = h), d = Math[n(275)](x.center - h[n(266)]), d <= s && d < t && (i = n(266), s = d, c = h));
    }
    return { x: s, y: a, rect: x, xRect: c, yRect: l, xType: i, yType: o };
  }
}
function Z0() {
  const r = ["disable", "map", "hide", "findAlignRectInfo", "distance", "getAlignInfo", "target", "_disabled", "868824gJqFBN", "show", "align", "sort", "stage", "isNode", "length", "stageToLocalXY", "yRect", "getCurrentLayer", "aabb", "rect", "beginArrow", "424295cIVnQt", "78792chdwyf", "enable", "toStageRect", "update", "240eALtnW", "xRect", "parent", "selectedGroup", "keyboard", "center", "DiableNodeAlign", "12340gCGboL", "handlerLayer", "setEnd", "mouseEnabled", "isKeydown", "MAX_VALUE", "init", "abs", "63198dexnau", "setBegin", "addChild", "bottom", "4iojYkS", "alignLineStyle", "xType", "dyLine", "2SRsriw", "138499APDGmB", "middle", "121GZKIbi", "objects", "yType", "dxLine", "editor", "mousedragHandler", "left", "alignInfo", "top", "247437FYqNTw", "right", "css", "_obb", "mouseupHandler", "isIntersectRect", "minDistance"];
  return Z0 = function() {
    return r;
  }, Z0();
}
const u = _0;
(function(r, x) {
  const e = _0, t = r();
  for (; []; )
    try {
      if (parseInt(e(501)) / 1 * (-parseInt(e(525)) / 2) + -parseInt(e(516)) / 3 * (-parseInt(e(533)) / 4) + parseInt(e(504)) / 5 + parseInt(e(574)) / 6 + -parseInt(e(576)) / 7 + -parseInt(e(500)) / 8 + parseInt(e(508)) / 9 * (parseInt(e(571)) / 10) === x)
        break;
      t.push(t.shift());
    } catch {
      t.push(t.shift());
    }
})(Q0, 116364);
function Q0() {
  const r = ["instanceManager", "mousewheelHandler", "openLasted", "save", "handlerLayer", "imageToBase64", "recordEnd", "serializerSystem", "clearTarget", "toFileJson", "keyboard", "operationTip", "mousemoveHandler", "187760pVtJCr", "restoreToJson", "target", "127404fMWvqI", "toJson", "1356355BPInDZ", "layoutManager", "isDraging", "height", "recordName", "mouseupHandler", "editorEventManager", "recordInterrupt", "selectedGroupDragEndHandler", "KeysConfig", "showTip", "setHtml", "showAt", "AutoFoldLink", "domElement", "guidlineManager", "20px", "mouseOverTarget", "900720EGWnSw", "93413rrHGfW", "update", "selectedGroup", "460740cDZact", "dblclickHandler", "lastLayerState", "create", "180UAMECL", "alignManager", "toogleLocalView", "mousedragHandler", "stage", "calcAnchorPointsPosition", "enable", "warn", "42zNrBly", "localLastDocName", "data", "DataCenter", "dispatchEvent", "mousedownHandler", "newLink", "object", "mouseoutHandler", "2vXbQOy", "cancel", "setLinkClassName", "LinkClassName", "showOpTooltip", "newLinkProperties", "selectedGroupDragHandler", "msg", "7780YZCPCJ", "saveHandler", "anchorBox", "opTooltip", "openJson", "defineKeys", "getCurrentLayer", "redoUndoSys", "currentLayer", "black", "lineDrawn", "push", "inputSystem", "linkCtrlBox", "assign", "controlTarget", "record和recordEnd没有成对出现", "dropToBox", "enterLocalView", "editor", "setItem", "nodeCtrlBox", "fadeOut", "getState", "width"];
  return Q0 = function() {
    return r;
  }, Q0();
}
function _0(r, x) {
  const e = Q0();
  return _0 = function(t, n) {
    return t = t - 484, e[t];
  }, _0(r, x);
}
class hx extends ue {
  constructor(x) {
    const e = _0;
    super(), this[e(491)] = xe, this.EditorConfig = b, this[e(528)] = e(495), this[e(530)] = {}, this.DataCenter = $e, this[e(563)] = ![], this.stage = x, x[e(552)] = this, this[e(541)] = this.getCurrentLayer(), this.handlerLayer = x[e(562)], this[e(503)] = this[e(512)][e(503)], this[e(568)] = x.keyboard, this.clipboardManager = new ax(this), this[e(558)] = new lx(this), this[e(488)] = new cx(this), this.keyManager = new xx(this), this[e(554)] = new Re(this), this[e(546)] = new Ke(this), this[e(535)] = new Ye(this), this[e(550)] = new ix(this), this.popupMenu = nx(this), this[e(512)][e(545)].target = null, this[e(548)] = null, this[e(499)] = null, this.inputTextfield = new Ne(this), this[e(540)] = new Qe(this), this[e(577)] = new dx(this), this[e(497)] = new sx(this), this[e(509)] = new fx(this), this[e(536)] = new Be(x), Object[e(547)](this.opTooltip[e(496)].style, { paddingLeft: e(498), paddingRight: e(498), color: e(542) });
  }
  [u(527)](x) {
    const e = u;
    this[e(528)] = x;
  }
  [u(539)]() {
    return this[u(512)].getCurrentLayer();
  }
  [u(538)](x) {
    const e = u;
    Object[e(547)](this[e(491)], x);
  }
  [u(529)](x) {
    const e = u;
    b[e(569)][e(514)] && (this[e(536)][e(493)](x), this[e(536)][e(494)](this.stage[e(557)] * 0.5, this[e(512)][e(485)] * 0.5), this.opTooltip[e(555)](80));
  }
  [u(534)](x, e = ![]) {
    const t = u;
    let n = this[t(539)](), s = n[t(567)]({ imageToBase64: e });
    this[t(519)][t(553)](b[t(518)][t(517)], s);
    const a = new B(t(561));
    a.object = s, a[t(563)] = e, this.dispatchEvent(a);
  }
  [u(560)]() {
    const x = u, e = this[x(539)](), t = this.DataCenter.getItem(b[x(518)][x(517)]);
    t != null && e[x(537)](t);
  }
  [u(505)](x) {
    const e = u;
    this.editorEventManager[e(505)](x), this.update();
  }
  [u(559)](x) {
    const e = u;
    this[e(488)][e(559)](x), this[e(502)]();
  }
  [u(521)](x) {
    const e = u;
    this[e(488)][e(521)](x), this[e(502)]();
  }
  [u(487)](x) {
    const e = u;
    this[e(488)].mouseupHandler(x), this[e(502)]();
  }
  [u(511)](x) {
    const e = u;
    this[e(488)][e(511)](x), this[e(502)]();
  }
  mousemoveHandler(x) {
    const e = u;
    if (this[e(512)][e(545)][e(484)])
      return this.mousedragHandler(x);
    this[e(488)][e(570)](x), this[e(502)]();
  }
  mouseenterHandler(x) {
    const e = u;
    this[e(488)].mouseenterHandler(x), this[e(502)]();
  }
  [u(524)](x) {
    const e = u;
    this[e(488)][e(524)](x), this[e(502)]();
  }
  selectedGroupDragHandler(x, e) {
    const t = u;
    this[t(488)][t(531)](x, e);
  }
  selectedGroupDragEndHandler(x, e) {
    const t = u;
    this[t(488)][t(490)](x, e);
  }
  [u(489)]() {
    const x = u;
    this.recordName = null, this[x(506)] = null;
  }
  record(x) {
    const e = u;
    let t = this[e(541)], n = t[e(512)][e(565)];
    this.recordName != null && console[e(515)](e(549), this[e(486)] + ":" + x), this[e(486)] = x, this[e(506)] = n[e(556)](this[e(541)]);
  }
  [u(564)](x) {
    const e = u;
    x != this[e(486)] && console[e(515)](this[e(486)], x), this[e(486)] = null;
    let t = this[e(541)], n = t[e(512)][e(565)], s = this.lastLayerState, a = n[e(556)](t);
    this[e(540)][e(544)](x, function() {
      n[e(572)](t, a);
    }, function() {
      n[e(572)](t, s);
    });
  }
  [u(522)](x, e, t, n) {
    const s = u;
    return this[s(558)][s(543)](x, e, t, n);
  }
  [u(502)]() {
    const x = u;
    this[x(550)][x(502)](), this[x(554)][x(502)](), this[x(535)][x(513)](), this.stage[x(502)]();
  }
  [u(575)](x = ![]) {
    const e = u;
    return this[e(539)]()[e(567)](x);
  }
  [u(537)](x) {
    const e = u;
    this[e(539)]()[e(537)](x);
    let t = new B("open");
    t[e(523)] = x, this[e(520)](t);
  }
  [u(492)](x, e = "") {
    const t = u;
    let n = new Event("log");
    n[t(532)] = x + e, this.dispatchEvent(n);
  }
  [u(507)](x) {
    const e = u;
    return this.instanceManager[e(507)](x);
  }
  [u(510)]() {
    const x = u;
    let e = this[x(512)].inputSystem[x(573)];
    this[x(512)][x(551)](e), this[x(535)].clearTarget(), this.nodeCtrlBox[x(566)](), this[x(546)][x(566)](), this.update();
  }
  sendKey(x, e) {
    this[u(568)].sendKey(x, e);
  }
  onEsc() {
    const x = u;
    this[x(535)][x(526)]();
  }
}
hx.KeysConfig = xe;
(function(r, x) {
  for (var e = ie, t = r(); []; )
    try {
      var n = -parseInt(e(310)) / 1 * (-parseInt(e(313)) / 2) + -parseInt(e(309)) / 3 + parseInt(e(319)) / 4 * (-parseInt(e(318)) / 5) + -parseInt(e(317)) / 6 * (-parseInt(e(314)) / 7) + -parseInt(e(316)) / 8 * (-parseInt(e(311)) / 9) + parseInt(e(315)) / 10 * (parseInt(e(312)) / 11) + -parseInt(e(320)) / 12;
      if (n === x)
        break;
      t.push(t.shift());
    } catch {
      t.push(t.shift());
    }
})($0, 538698);
function ie(r, x) {
  var e = $0();
  return ie = function(t, n) {
    t = t - 309;
    var s = e[t];
    return s;
  }, ie(r, x);
}
function $0() {
  var r = ["762060FjBIAB", "3164043lToJSf", "33643ZnlTsi", "4077657AXHant", "1037201UgslEz", "16lNErzZ", "7GakTRG", "110EPdywT", "8LxTwht", "1573974vuSlYb", "1824315blJird", "4BRDpee"];
  return $0 = function() {
    return r;
  }, $0();
}
export {
  hx as Editor,
  _x as IconsPanel,
  bx as PropertiesPanel
};
