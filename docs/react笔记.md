## 根据这个文档学习的一些问题

props 是组件中的一个对象，由主render方法传入的参数作为他的key value.不可以在组件中设置初始值：
```
//  wrong

props = {
  title: 'this is the default value!',
}
```
气死我了，文档有错，在es6中，定义默认props要写在类的外面：
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
