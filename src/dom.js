window.dom = {
    // 增
    // 创建一个节点
    create(string) {
        const container = document.createElement("template");
        //template可以兼容所有的标签
        container.innerHTML = string.trim();
        // trim()  表示把字符串两边的空格去掉。
        return container.content.firstChild;
    },
    // 将node2插入到node的后面
    after(node, node2) {
        node.parentNode.insertBefore(node2, node.nextSibling);
    },
    // 将node2插入到node的前面
    before(node, node2) {
        node.parentNode.insertBefore(node2, node)
    },
    // 创建一个子节点
    append(parent, node) {
        parent.appendChild(node)
    },
    // 给node创建一个parent节点
    wrap(node, parent) {
        dom.before(node, parent)
        dom.append(parent, node)
    },
    // 删
    // 删除节点
    remove(node) {
        node.parentNode.removeChild(node)
        return node
    },
    // 删除后代
    empty(node) {
        const { childNodes } = node // 等于 const childNodes = node.childNodes
        const array = []
        let x = node.firstChild
        while (x) {
            array.push(dom.remove(node.firstChild))
            x = node.firstChild
        }
        return array
    },
    // 写属性
    attr(node, name, value) {// 重载
        // 如果参数个数为3，就改写
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        }
        // 如果参数个数为2，就读
        else if (arguments.length === 2) {
            return node.getAttribute(name)
        }
    },
    // 修改文本内容，会将原有的标签删除
    text(node, string) {   // 适配
        // 这个判断用来兼容所有的浏览器
        if (arguments.length === 2) {
            if ('innerText' in node) {
                node.innerHTML = string// ie
            } else {
                node.textContent = string // firefox chrome
            }
        } else if (arguments.length === 1) {
            if ('innerText' in node) {
                return node.innerHTML // ie
            } else {
                return node.textContent  // firefox chrome
            }
        }
    },
    //修改html
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string
        }
        else if (arguments.length === 1) {
            return node.innerHTML
        }
    },
    // 修改style
    style(node, name, value) {
        if (arguments.length === 3) {
            // dom.style(div,'color','red') 设置
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === 'string') {
                // dom.style(div,'color') 获取
                return node.style[name]
            } else if (name instanceof Object) {
                // dom.style(div,{color:'red'}) 设置
                const object = name
                for (let key in object) {
                    node.style[key] = object[key]
                }
            }
        }
    },
    //添加class
    class: {
        add(node, className) {
            node.classList.add(className)
        },
        //删除class
        remove(node, className) {
            node.classList.remove(className)
        },
        //查询是否存在
        has(node, className) {
            return node.classList.contains(className)
        }
    },
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },
    //查找标签或者标签们
    find(selector, scope) {
        //scope 范围
        //如果又scope 则在scope里找，没有 则在document里找
        return (scope || document).querySelectorAll(selector)
    },
    // 查找父元素
    parent(node) {
        return node.parentNode
    },
    //查找子元素
    children(node) {
        return node.children
    },
    //查找兄弟节点
    siblings(node) {
        return Array.from(node.parentNode.children)
            .filter(n => n !== node)
    },
    //找到元素的下一个节点
    next(node) {
        let x = node.nextSibling
        while (x && x.nodeType === 3) {
            x = x.nextSibling
        }
        return x
    },
    // 找到元素的上一个节点
    previous(node) {
        let x = node.previousSibling
        while (x && x.nodeType === 3) {
            x = x.previousSibling
        }
        return x
    },
    // 用于遍历所有节点
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    // 用于获取元素排行老几
    index(node) {
        const list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i
    }


};

