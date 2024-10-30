(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{361:function(n,e,s){"use strict";s.r(e);var t=s(4),a=Object(t.a)({},(function(){var n=this,e=n._self._c;return e("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[e("p",[n._v("vue diff算法新旧VNode比对不能像平常一样循环比对，要不然的话，当子节点过多的时候，算法的复杂度会很高，性能开销太大。")]),n._v(" "),e("p",[n._v("首先，我们弄懂几个概念：\nnewStart,(新前)，新VDOM的第一个\nnewEnd(新后)，新VDOM的最后一个\noldStart(旧前)，旧VDOM的第一个\noldEnd(旧后)，旧VDOM最后一个\n来看一张图，很明了\n"),e("img",{attrs:{src:"https://jsd.cdn.zzko.cn/gh/Alan0827/picx-images-hosting@master/20220907/diff.4w79iq3uhm20.jpg",alt:"diff"}})]),n._v(" "),e("blockquote",[e("p",[n._v("while循环不是简单的从一个方向，从前往后，或从后往前循环，而是要从两边往中间走")])]),n._v(" "),e("p",[e("img",{attrs:{src:"https://jsd.cdn.zzko.cn/gh/Alan0827/picx-images-hosting@master/20220907/diff5.5fr32cs3kwg0.jpg",alt:"diff5"}})]),n._v(" "),e("ul",[e("li",[n._v("newStartIdx:newChildren数组里开始位置的下标；")]),n._v(" "),e("li",[n._v("newEndIdx:newChildren数组里结束位置的下标；")]),n._v(" "),e("li",[n._v("oldStartIdx:oldChildren数组里开始位置的下标；")]),n._v(" "),e("li",[n._v("oldEndIdx:oldChildren数组里结束位置的下标；")])]),n._v(" "),e("p",[e("strong",[n._v("newStartIdx")]),n._v("和"),e("strong",[n._v("oldStartIdx")]),n._v("只能往后移动（只会加），"),e("strong",[n._v("newEndIdx")]),n._v("和"),e("strong",[n._v("oldEndIdx")]),n._v("只能往前移动（只会减）。")]),n._v(" "),e("p",[n._v("当开始位置大于结束位置时，表示所有节点都已经遍历过了。")]),n._v(" "),e("div",{staticClass:"language- line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[n._v('// 源码位置： /src/core/vdom/patch.js\n\n// 循环更新子节点\nfunction updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {\n  // 为oldCh和newCh分别建立索引，为之后遍历的依据\n  let oldStartIdx = 0               // oldChildren开始索引\n  let oldEndIdx = oldCh.length - 1   // oldChildren结束索引\n  let oldStartVnode = oldCh[0]        // oldChildren中所有未处理节点中的第一个\n  let oldEndVnode = oldCh[oldEndIdx]   // oldChildren中所有未处理节点中的最后一个\n\n  let newStartIdx = 0               // newChildren开始索引\n  let newEndIdx = newCh.length - 1   // newChildren结束索引\n  let newStartVnode = newCh[0]        // newChildren中所有未处理节点中的第一个\n  let newEndVnode = newCh[newEndIdx]  // newChildren中所有未处理节点中的最后一个\n\n  let oldKeyToIdx, idxInOld, vnodeToMove, refElm\n\n  // removeOnly is a special flag used only by <transition-group>\n  // to ensure removed elements stay in correct relative positions\n  // during leaving transitions\n  const canMove = !removeOnly\n\n  if (process.env.NODE_ENV !== \'production\') {\n    checkDuplicateKeys(newCh)\n  }\n\n  // 以"新前"、"新后"、"旧前"、"旧后"的方式开始比对节点\n  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {\n    // 如果oldStartVnode不存在，则直接跳过，比对下一个\n    if (isUndef(oldStartVnode)) {\n      oldStartVnode = oldCh[++oldStartIdx] \n\n    //如果oldEndVnode不存在，则直接跳过，将oldEndIdx减1，比对前一个\n    } else if (isUndef(oldEndVnode)) {\n      oldEndVnode = oldCh[--oldEndIdx]\n\n    // 如果新前与旧前节点相同，就把两个节点进行patch更新\n    } else if (sameVnode(oldStartVnode, newStartVnode)) {\n      patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue)\n      oldStartVnode = oldCh[++oldStartIdx]\n      newStartVnode = newCh[++newStartIdx]\n\n    // 如果新后与旧后节点相同，就把两个节点进行patch更新\n    } else if (sameVnode(oldEndVnode, newEndVnode)) {\n      patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue)\n      oldEndVnode = oldCh[--oldEndIdx]\n      newEndVnode = newCh[--newEndIdx]\n      \n    // 如果新后与旧前节点相同，先把两个节点进行patch更新，然后把旧前节点移动到oldChilren中所有未处理节点之后\n    } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right\n      patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue)\n      canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))\n      oldStartVnode = oldCh[++oldStartIdx]\n      newEndVnode = newCh[--newEndIdx]\n\n    // 如果新前与旧后节点相同，先把两个节点进行patch更新，然后把旧后节点移动到oldChilren中所有未处理节点之前\n    } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left\n      patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue)\n      canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)\n      oldEndVnode = oldCh[--oldEndIdx]\n      newStartVnode = newCh[++newStartIdx]\n\n    // 如果不属于以上四种情况，就进行常规的循环比对patch\n    } else {\n      if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)\n      idxInOld = isDef(newStartVnode.key)\n        ? oldKeyToIdx[newStartVnode.key]\n        : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)\n\n      // 如果在oldChildren里找不到当前循环的newChildren里的子节点\n      if (isUndef(idxInOld)) { // New element\n        // 新增节点并插入到合适位置\n        createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)\n\n        // 如果在oldChildren里找到了当前循环的newChildren里的子节点\n      } else {\n        vnodeToMove = oldCh[idxInOld]\n\n        // 如果两个节点相同\n        if (sameVnode(vnodeToMove, newStartVnode)) {\n\n          // 调用patchVnode更新节点\n          patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue)\n          oldCh[idxInOld] = undefined\n\n          // canmove表示是否需要移动节点，如果为true表示需要移动，则移动节点，如果为false则不用移动\n          canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)\n        } else {\n          // same key but different element. treat as new element\n          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)\n        }\n      }\n      newStartVnode = newCh[++newStartIdx]\n    }\n  }\n  if (oldStartIdx > oldEndIdx) {\n    /**\n      * 如果oldChildren比newChildren先循环完毕，\n      * 那么newChildren里面剩余的节点都是需要新增的节点，\n      * 把[newStartIdx, newEndIdx]之间的所有节点都插入到DOM中\n      */\n    refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm\n    addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)\n  } else if (newStartIdx > newEndIdx) {\n    /**\n      * 如果newChildren比oldChildren先循环完毕，\n      * 那么oldChildren里面剩余的节点都是需要删除的节点，\n      * 把[oldStartIdx, oldEndIdx]之间的所有节点都删除\n      */\n    removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)\n  }\n}\n')])]),n._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[n._v("1")]),e("br"),e("span",{staticClass:"line-number"},[n._v("2")]),e("br"),e("span",{staticClass:"line-number"},[n._v("3")]),e("br"),e("span",{staticClass:"line-number"},[n._v("4")]),e("br"),e("span",{staticClass:"line-number"},[n._v("5")]),e("br"),e("span",{staticClass:"line-number"},[n._v("6")]),e("br"),e("span",{staticClass:"line-number"},[n._v("7")]),e("br"),e("span",{staticClass:"line-number"},[n._v("8")]),e("br"),e("span",{staticClass:"line-number"},[n._v("9")]),e("br"),e("span",{staticClass:"line-number"},[n._v("10")]),e("br"),e("span",{staticClass:"line-number"},[n._v("11")]),e("br"),e("span",{staticClass:"line-number"},[n._v("12")]),e("br"),e("span",{staticClass:"line-number"},[n._v("13")]),e("br"),e("span",{staticClass:"line-number"},[n._v("14")]),e("br"),e("span",{staticClass:"line-number"},[n._v("15")]),e("br"),e("span",{staticClass:"line-number"},[n._v("16")]),e("br"),e("span",{staticClass:"line-number"},[n._v("17")]),e("br"),e("span",{staticClass:"line-number"},[n._v("18")]),e("br"),e("span",{staticClass:"line-number"},[n._v("19")]),e("br"),e("span",{staticClass:"line-number"},[n._v("20")]),e("br"),e("span",{staticClass:"line-number"},[n._v("21")]),e("br"),e("span",{staticClass:"line-number"},[n._v("22")]),e("br"),e("span",{staticClass:"line-number"},[n._v("23")]),e("br"),e("span",{staticClass:"line-number"},[n._v("24")]),e("br"),e("span",{staticClass:"line-number"},[n._v("25")]),e("br"),e("span",{staticClass:"line-number"},[n._v("26")]),e("br"),e("span",{staticClass:"line-number"},[n._v("27")]),e("br"),e("span",{staticClass:"line-number"},[n._v("28")]),e("br"),e("span",{staticClass:"line-number"},[n._v("29")]),e("br"),e("span",{staticClass:"line-number"},[n._v("30")]),e("br"),e("span",{staticClass:"line-number"},[n._v("31")]),e("br"),e("span",{staticClass:"line-number"},[n._v("32")]),e("br"),e("span",{staticClass:"line-number"},[n._v("33")]),e("br"),e("span",{staticClass:"line-number"},[n._v("34")]),e("br"),e("span",{staticClass:"line-number"},[n._v("35")]),e("br"),e("span",{staticClass:"line-number"},[n._v("36")]),e("br"),e("span",{staticClass:"line-number"},[n._v("37")]),e("br"),e("span",{staticClass:"line-number"},[n._v("38")]),e("br"),e("span",{staticClass:"line-number"},[n._v("39")]),e("br"),e("span",{staticClass:"line-number"},[n._v("40")]),e("br"),e("span",{staticClass:"line-number"},[n._v("41")]),e("br"),e("span",{staticClass:"line-number"},[n._v("42")]),e("br"),e("span",{staticClass:"line-number"},[n._v("43")]),e("br"),e("span",{staticClass:"line-number"},[n._v("44")]),e("br"),e("span",{staticClass:"line-number"},[n._v("45")]),e("br"),e("span",{staticClass:"line-number"},[n._v("46")]),e("br"),e("span",{staticClass:"line-number"},[n._v("47")]),e("br"),e("span",{staticClass:"line-number"},[n._v("48")]),e("br"),e("span",{staticClass:"line-number"},[n._v("49")]),e("br"),e("span",{staticClass:"line-number"},[n._v("50")]),e("br"),e("span",{staticClass:"line-number"},[n._v("51")]),e("br"),e("span",{staticClass:"line-number"},[n._v("52")]),e("br"),e("span",{staticClass:"line-number"},[n._v("53")]),e("br"),e("span",{staticClass:"line-number"},[n._v("54")]),e("br"),e("span",{staticClass:"line-number"},[n._v("55")]),e("br"),e("span",{staticClass:"line-number"},[n._v("56")]),e("br"),e("span",{staticClass:"line-number"},[n._v("57")]),e("br"),e("span",{staticClass:"line-number"},[n._v("58")]),e("br"),e("span",{staticClass:"line-number"},[n._v("59")]),e("br"),e("span",{staticClass:"line-number"},[n._v("60")]),e("br"),e("span",{staticClass:"line-number"},[n._v("61")]),e("br"),e("span",{staticClass:"line-number"},[n._v("62")]),e("br"),e("span",{staticClass:"line-number"},[n._v("63")]),e("br"),e("span",{staticClass:"line-number"},[n._v("64")]),e("br"),e("span",{staticClass:"line-number"},[n._v("65")]),e("br"),e("span",{staticClass:"line-number"},[n._v("66")]),e("br"),e("span",{staticClass:"line-number"},[n._v("67")]),e("br"),e("span",{staticClass:"line-number"},[n._v("68")]),e("br"),e("span",{staticClass:"line-number"},[n._v("69")]),e("br"),e("span",{staticClass:"line-number"},[n._v("70")]),e("br"),e("span",{staticClass:"line-number"},[n._v("71")]),e("br"),e("span",{staticClass:"line-number"},[n._v("72")]),e("br"),e("span",{staticClass:"line-number"},[n._v("73")]),e("br"),e("span",{staticClass:"line-number"},[n._v("74")]),e("br"),e("span",{staticClass:"line-number"},[n._v("75")]),e("br"),e("span",{staticClass:"line-number"},[n._v("76")]),e("br"),e("span",{staticClass:"line-number"},[n._v("77")]),e("br"),e("span",{staticClass:"line-number"},[n._v("78")]),e("br"),e("span",{staticClass:"line-number"},[n._v("79")]),e("br"),e("span",{staticClass:"line-number"},[n._v("80")]),e("br"),e("span",{staticClass:"line-number"},[n._v("81")]),e("br"),e("span",{staticClass:"line-number"},[n._v("82")]),e("br"),e("span",{staticClass:"line-number"},[n._v("83")]),e("br"),e("span",{staticClass:"line-number"},[n._v("84")]),e("br"),e("span",{staticClass:"line-number"},[n._v("85")]),e("br"),e("span",{staticClass:"line-number"},[n._v("86")]),e("br"),e("span",{staticClass:"line-number"},[n._v("87")]),e("br"),e("span",{staticClass:"line-number"},[n._v("88")]),e("br"),e("span",{staticClass:"line-number"},[n._v("89")]),e("br"),e("span",{staticClass:"line-number"},[n._v("90")]),e("br"),e("span",{staticClass:"line-number"},[n._v("91")]),e("br"),e("span",{staticClass:"line-number"},[n._v("92")]),e("br"),e("span",{staticClass:"line-number"},[n._v("93")]),e("br"),e("span",{staticClass:"line-number"},[n._v("94")]),e("br"),e("span",{staticClass:"line-number"},[n._v("95")]),e("br"),e("span",{staticClass:"line-number"},[n._v("96")]),e("br"),e("span",{staticClass:"line-number"},[n._v("97")]),e("br"),e("span",{staticClass:"line-number"},[n._v("98")]),e("br"),e("span",{staticClass:"line-number"},[n._v("99")]),e("br"),e("span",{staticClass:"line-number"},[n._v("100")]),e("br"),e("span",{staticClass:"line-number"},[n._v("101")]),e("br"),e("span",{staticClass:"line-number"},[n._v("102")]),e("br"),e("span",{staticClass:"line-number"},[n._v("103")]),e("br"),e("span",{staticClass:"line-number"},[n._v("104")]),e("br"),e("span",{staticClass:"line-number"},[n._v("105")]),e("br"),e("span",{staticClass:"line-number"},[n._v("106")]),e("br"),e("span",{staticClass:"line-number"},[n._v("107")]),e("br"),e("span",{staticClass:"line-number"},[n._v("108")]),e("br"),e("span",{staticClass:"line-number"},[n._v("109")]),e("br"),e("span",{staticClass:"line-number"},[n._v("110")]),e("br"),e("span",{staticClass:"line-number"},[n._v("111")]),e("br"),e("span",{staticClass:"line-number"},[n._v("112")]),e("br")])]),e("p",[e("strong",[n._v("1. 新前和旧前")]),n._v("\n把newChildren数组里的所有未处理子节点的第一个子节点和oldChildren数组里所有未处理子节点的第一个子节点做比对，如果相同，直接进入更新节点的操作并且由于新前与旧前两个节点的位置也相同，无需进行节点移动操作\n"),e("img",{attrs:{src:"https://jsd.cdn.zzko.cn/gh/Alan0827/picx-images-hosting@master/20220907/diff1.1fpa4qx80e74.jpg",alt:"diff1"}})]),n._v(" "),e("p",[e("strong",[n._v("2. 新后和旧后")]),n._v("\n把newChildren数组里所有未处理子节点的最后一个子节点和oldChildren数组里所有未处理子节点的最后一个子节点做比对，如果相同，那就直接进入更新节点的操作并且由于新后与旧后两个节点的位置也相同，无需进行节点移动操作\n"),e("img",{attrs:{src:"https://jsd.cdn.zzko.cn/gh/Alan0827/picx-images-hosting@master/20220907/diff2.7hhh773q8ro0.jpg",alt:"diff2"}})]),n._v(" "),e("p",[e("strong",[n._v("3. 新后和旧前")]),n._v("\n把newChildren数组里所有未处理子节点的最后一个子节点和oldChildren数组里所有未处理子节点的第一个子节点做比对，如果相同，那就直接进入更新节点的操作，更新完后再将oldChildren数组里的该节点移动到与newChildren数组里节点相同的位置；\n"),e("img",{attrs:{src:"https://jsd.cdn.zzko.cn/gh/Alan0827/picx-images-hosting@master/20220907/diff3.3w2r2frb14i0.jpg",alt:"diff3"}})]),n._v(" "),e("p",[n._v("注意，我们要把oldChildren数组里把第一个子节点移动到数组中"),e("strong",[n._v("所有未处理节点之后。")])]),n._v(" "),e("p",[e("strong",[n._v("4. 新前和旧后")]),n._v("\n把newChildren数组里所有未处理子节点的第一个子节点和oldChildren数组里所有未处理子节点的最后一个子节点做比对，如果相同，那就直接进入更新节点的操作，更新完后再将oldChildren数组里的该节点移动到与newChildren数组里节点相同的位置；\n"),e("img",{attrs:{src:"https://jsd.cdn.zzko.cn/gh/Alan0827/picx-images-hosting@master/20220907/diff4.1p097r61n280.jpg",alt:"diff4"}}),n._v("\n注意，我们要把oldChildren数组里把最后一个子节点移动到数组中"),e("strong",[n._v("所有未处理节点之前。")])]),n._v(" "),e("p",[n._v("Vue为了避免双重循环数据量大时间复杂度升高带来的性能问题，而选择了从子节点数组中的4个特殊位置互相比对。以上就是Vue中的patch过程，即DOM-Diff算法所有内容了，到这里相信你再读这部分源码的时候就有比较清晰的思路了。")]),n._v(" "),e("hr"),n._v(" "),e("p",[n._v("参考文档：")]),n._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://github.com/vuejs/vue/tree/dev/src/core",target:"_blank",rel:"noopener noreferrer"}},[n._v("https://github.com/vuejs/vue/tree/dev/src/core"),e("OutboundLink")],1)]),n._v(" "),e("li",[e("a",{attrs:{href:"https://cn.vuejs.org/v2/guide/reactivity.html",target:"_blank",rel:"noopener noreferrer"}},[n._v("https://cn.vuejs.org/v2/guide/reactivity.html"),e("OutboundLink")],1)]),n._v(" "),e("li",[e("a",{attrs:{href:"https://vue-js.com/learn-vue/start/",target:"_blank",rel:"noopener noreferrer"}},[n._v("https://vue-js.com/learn-vue/start/"),e("OutboundLink")],1)]),n._v(" "),e("li",[e("a",{attrs:{href:"https://blog.csdn.net/M6i37JK/article/details/78140159",target:"_blank",rel:"noopener noreferrer"}},[n._v("https://blog.csdn.net/M6i37JK/article/details/78140159"),e("OutboundLink")],1)]),n._v(" "),e("li",[e("a",{attrs:{href:"https://blog.csdn.net/u010692018/article/details/78799335",target:"_blank",rel:"noopener noreferrer"}},[n._v("https://blog.csdn.net/u010692018/article/details/78799335"),e("OutboundLink")],1)])])])}),[],!1,null,null,null);e.default=a.exports}}]);