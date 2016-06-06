## 根据这个文档学习的一些问题

props 是组件中的一个对象，由主render方法传入的参数作为他的key value. 设置初始值必须用static defaultProps方法：
```
//  wrong

props = {
  title: 'this is the default value!',
}
```
文档有错，在es6中，定义默认props要写在类的外面：
```
class Counter extends Component {
  ......
}

Counter.defaultProps = { abc: 0 };
```
如果要写在类里面，需要加上static关键字，而且名字是defaultProps.
```
static defaultProps = {
  abc: 'aaaaaa'
}
```
属性校验器估计也是一样。果然：
```
static propTypes = {
    abc: React.PropTypes.string
  }
```
注意写法,是： `abc: React.PropTypes.string`
而不是 `abc.string.isRequired`

这篇文档好多坑啊！

## 原来是这样的：
es6规范中，类的静态方法可以直接写在类中
`abc() {...}`

但没有静态属性,es7的提案加入了静态属性,用关键字static写在类中：
```
static propTypes = {
    abc: React.PropTypes.string
}
```

### 另外还有state
可以直接写在类里面，因为他本来是写在类的constructor中的，在es6中，constructor中定义的实例属性，
可以在类中直接写。
```
class *** extends React.Component{
   constructor(props) {
    super(props);
    this.state = {liked: false};
  }

  // 因为有上面es6的写法，所以下面可以直接写。
  state = {
    isVisable: true,
    titleMessage: 'hello, react!',
  }

}
```
今天掉坑里了，组件中的render 要 返回组合组件，必须这样写：
```
return (<div>
  <h1 style={styleObj} onClick={this.handleClick}> { this.state.titleMessage } </h1>
  <h1> 组件2 </h1>
</div>);

// 下面这样就完蛋了，会报错返回值不对

return
  (<div>
    <h1 style={styleObj} onClick={this.handleClick}> { this.state.titleMessage } </h1>
    <h1> 组件2 </h1>
  </div>);
```
// 但是组件的嵌套有问题，必须用export导入后才行，而写在同一个js中的不同组件却不能用
```
render() {
  const styleObj = {
    backgroundColor: this.state.backColor,
  }
  return <div>
    <h1 style={styleObj} onClick={this.handleClick}> { this.state.titleMessage } </h1>
    <MyTimer/>
  </div>
}
}
```

// 还有个坑，组件名字首字母必须大写，否则不灵。

// 设置state必须用setState方法，而且前面必须指定this
// 另外 count++ 不能用， 要用 count + 1
```
handleClick = (e) => {
  this.setState({
    clickCount: this.state.clickCount + 1,
  });
}
```

-------
### 我去，今天这个坑大呀，表单form写成from，然后点击submit没有效果:sweat:

## event

```
import React, { Component } from 'react'

import './index.css'

class MyComponent extends Component {
  state = {
    inputValue: 'input value',
    selectValue: 'A',
    radioValue: 'B',
    textareValue: 'some text here...',
  }

  handleSubmit = (e) => {
    e.preventDefault(); // 停掉默认提交表单的动作
    console.log('form submitting...');
    console.log(e);
  }

  handleInput = (e) => {
    this.setState({
      inputValue: e.target.value,
      // 真他妈的见鬼了，这里报错 value undefined，搞了一个小时， 刷新后莫名其妙的又好了！
    })
  }

  handleSelect = (e) => {
    this.setState({
      selectValue: e.target.value,
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" value={this.state.inputValue} onChange={this.handleInput}/>
        <br/>
        <select value={this.state.selectValue} onChange={this.handleSelect}>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
        </select>
        <br/>
        <p>radio button</p>
        <input name="goodRadio" type="radio" value="A"/>
        <input name="goodRadio" type="radio" value="B"/>
        <input name="goodRadio" type="radio" value="C"/>
        <br/>
          <input name="goodRadio" type="checkbox" value="A"/>
          <input name="goodRadio" type="checkbox" value="B"/>
          <input name="goodRadio" type="checkbox" value="C"/>
        <br/>
        <textarea value={this.state.textareValue}></textarea>
        <button type="submit">确认提交</button>
      </form>
    )
  }
}

export default MyComponent

```

关于事件的代码，可以发现，当元素中使用了value时，就必须使用onChange方法。那多个元素设置了value，
就得有多个onChange事件，这显然太笨了，于是，就有了下面的用ref获取元素节点的方法，可以一次直接
得到这个元素及他的所有属性。

## ref 用于获取真实的dom节点，虚拟dom拿不到的，而且必须在dom上设置ref属性
比如上面表单中有一个input`<input type="text" ref="goodInput" defaultValue={this.state.inputValue} />`

那么可以用`this.refs.goodInput` 来得到这个dom元素，用 `this.refs.goodInput.value`来得到这个dom的属性，
不需要用findDOMNode()方法。

### 注意： radio button 和 checkbox 还是使用onChange比较好

这样可以得到所有的表单数据：
```
handleSubmit = (e) => {
  e.preventDefault(); // 停掉默认提交表单的动作
  console.log('form submitting...');
  const formData = {
    input: this.refs.goodInput.value,
    select: this.refs.goodSelect.value,
    textarea: this.refs.goodTextarea.value,
  }
  console.log(formData);
}
```

### 还需要注意，这个脚手架会热更新代码，但是，需要手动刷新才能重新应用，刚才提交的表单数据出不来，也是因为没有刷新的缘故。
