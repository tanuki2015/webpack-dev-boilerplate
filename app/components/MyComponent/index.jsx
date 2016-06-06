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
    const formData = {
      input: this.refs.goodInput.value,
      select: this.refs.goodSelect.value,
      textarea: this.refs.goodTextarea.value,
      radioValue: this.state.radioValue,
    }
    console.log(formData);
    this.refs.goodRadio.saySomething();
  }
  handleRadio = (e) => {
    this.setState({
      radioValue: e.target.value,
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" ref="goodInput" defaultValue={this.state.inputValue} />
        <br/>
        <select defaultValue={this.state.selectValue} ref="goodSelect">
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
        </select>
        <br/>
        <textarea defaultValue={this.state.textareValue} ref="goodTextarea"></textarea>
        <RadioBtn ref="goodRadio" handleRadio={this.handleRadio}/>
        <button type="submit">确认提交</button>
      </form>
    )
  }
}

class RadioBtn extends Component {
  saySomething() {
    alert("yo yo, what's up man!");
  }
  render() {
    return (
      <div>
      <p>radio button</p>
      <input name="goodRadio" type="radio" value="A" onChange={this.props.handleRadio} />
      <input name="goodRadio" type="radio" value="B" onChange={this.props.handleRadio} />
      <input name="goodRadio" type="radio" value="C" onChange={this.props.handleRadio} />
      <br />
      </div>
    )
  }
}

export { MyComponent, RadioBtn }
