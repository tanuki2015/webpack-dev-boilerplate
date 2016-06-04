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
