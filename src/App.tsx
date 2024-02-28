import React from 'react'
import logo from './logo.svg'
import './App.css'
import ParentComponent from './components/ParentComponent'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>こんにちは</p>
        <a href="https://resas.go.jp/#/13/13101">
          <p>出典 : RESAS（地域経済分析システム）</p>
        </a>
      </header>
      <ParentComponent />
    </div>
  )
}

export default App
