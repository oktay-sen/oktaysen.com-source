import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FullPageScroller from './FullPageScroller';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FullPageScroller>
          <div style={{width:'100vw', height:'100vh', backgroundColor:'#00FFFF'}}>
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Welcome to React</h2>
            </div>
            <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
            </p>
          </div>
          <div style={{width:'100vw', height:'100vh', backgroundColor:'#FF00FF'}}>
            <h1 style={{margin:'auto'}}>Page 1</h1>
          </div>
          <div style={{width:'100vw', height:'100vh', backgroundColor:'#FFFF00'}}>
            <h1 style={{margin:'auto'}}>Page 2</h1>
          </div>
          <div style={{width:'100vw', height:'100vh', backgroundColor:'#00FF00'}}>
            <h1 style={{margin:'auto'}}>Page 3</h1>
          </div>
          <div style={{width:'100vw', height:'100vh', backgroundColor:'#FF0000'}}>
            <h1 style={{margin:'auto'}}>Page 4</h1>
          </div>
          <div style={{width:'100vw', height:'100vh', backgroundColor:'#0000FF'}}>
            <h1 style={{margin:'auto'}}>Page 5</h1>
          </div>
        </FullPageScroller>
      </div>
    );
  }
}

export default App;
