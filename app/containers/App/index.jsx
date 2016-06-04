import React, { Component } from 'react'
import { ClickMe, MyComponent} from '../../components'


import './index.css'

class App extends Component {
  render() {
    return (
      <div>
        <MyComponent />
        <p>
          欢迎在github上一起维护这个脚手架项目<br />
          https://github.com/GuoYongfeng
        </p>
      </div>
    )
  }
}

export default App
