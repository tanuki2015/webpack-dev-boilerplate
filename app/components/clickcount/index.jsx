import React, { Component } from 'react';

class ClickMe extends Component {
  state = {
    clickCount: 0,
  }

  handleClick = (e) => {
    this.setState({
      clickCount: this.state.clickCount + 1,
    });
    console.log(e);
  }

  render() {
    return (<div>
      <h1>请点击下面按钮</h1>
      <button onClick={ this.handleClick }> 点我 </button>
      <h2>已经点击: { this.state.clickCount } 次</h2>
      </div>)
  }
}

export default ClickMe
