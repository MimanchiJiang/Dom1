//document.creatElement('div')
const div = dom.create("<td>niwDiv</td>");
console.log(div);

dom.wrap(test, div)

const nodes = dom.empty(window.empty)
console.log(nodes)

dom.attr(test, 'title', 'hi')
const title = dom.attr(test, 'title')
console.log(`title:${title}`)

dom.text(test, '你好，这是新的内容')
dom.text(test)

dom.style(test, { border: '1px solid red', color: 'red' })
console.log(dom.style(test, 'border'))
dom.style(test, 'border', '1px solid red')

dom.class.add(test, 'red')
dom.class.remove(test, 'red')
console.log(dom.class.has(test, 'blue'))

const fn = () => {
    console.log('点击了')
}
dom.on(test, 'click', fn)
dom.off(test, 'click', fn)

const testDiv = dom.find('#test')[0]
console.log(testDiv)
const test2 = dom.find('#test2')[0]
console.log(dom.find('.red', test2))
console.log(dom.parent(test))

console.log(dom.siblings(dom.find('#d2')[0]))
console.log(dom.next(dom.find('#d2')[0]))

console.log(dom.previous(dom.find('#d2')[0]))

const t = dom.find('#travel')[0]
dom.each(dom.children(t), (n) => dom.style(n, 'color', 'red'))

console.log(dom.index(t2))

//监听某个元素的事件  不局限于点击事件
dom.listener('click', '#button', 'button', () => {
    console.log('我被点击了')
})