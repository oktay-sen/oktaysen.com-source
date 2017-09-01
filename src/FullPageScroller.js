import React, { Component } from 'react';
import styled from 'styled-components';

class FullPageScroller extends Component {

  ref = null;
  currentPage = 0;
  offsetY = 0;
  maxSteps = 200;
  duration = 500; //ms
  steps = 200;
  node = () => this.ref._reactInternalInstance._renderedComponent._hostNode;

  state = {
    offsetY:0,
    offsetX:0
  }

  onScroll = (e) => {
    //event.preventDefault();
    //event.stopPropagation();
    //console.log(event)
  }

  componentDidMount() {
    // this.animator = setInterval(() => {
    //   let dist =
    //   console.log(dist)
    //   if (dist < 1) {
    //     this.node().scrollTop = (this.currentPage-1) * this.node().clientHeight + this.node().clientHeight * this.props.interpolator(dist + 0.010)
    //   }
    // },this.maxSteps / this.duration)
  }

  componentWillUnmount() {
    // clearInterval(this.animator)
  }

  onWheel = (e) => {
    if (e.deltaY > 0) this.setState({offsetY:this.state.offsetY + 100});
    if (e.deltaY < 0) this.setState({offsetY:this.state.offsetY - 100});
    //this.currentPage = Math.ceil(this.node().scrollTop / this.node().clientHeight)
    // if (e.deltaY > 0) {
    //   let dist = (this.currentPage * this.node().clientHeight) - this.node().scrollTop
    //   if (dist < 1) {
    //     this.currentPage++
    //   }
    // } else if (e.deltaY < 0) {
    //   let dist = this.node().scrollTop - (this.currentPage * this.node().clientHeight)
    //   if (dist < 1) {
    //     this.currentPage--
    //   }
    // }
  }

  onTouchMove = (e) => {
    //e.preventDefault();
  }

  Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  `

  Content = styled.div`
    -webkit-transition: 1s ease-in-out;
    -moz-transition: 1s ease-in-out;
    -o-transition: 1s ease-in-out;
    transition: 1s ease-in-out;

    -webkit-transform: translate(${props => props.offsetX}vh, ${props => -props.offsetY}vh);
    -moz-transform: translate(${props => props.offsetX}vh, ${props => -props.offsetY}vh);
    -o-transform: translate(${props => props.offsetX}vh, ${props => -props.offsetY}vh);
    -ms-transform: translate(${props => props.offsetX}vh, ${props => -props.offsetY}vh);
    transform: translate(${props => props.offsetX}vh, ${props => -props.offsetY}vh);
  `

  render() {

    return (
      <this.Wrapper
        onScroll={this.onScroll}
        onWheel={this.onWheel}
        onTouchMove={this.onTouchMove}
        ref={ref => this.ref=ref}
      >
        <this.Content
          offsetX={this.state.offsetX}
          offsetY={this.state.offsetY}
          ref={ref => console.log('Content:',ref)}
        >
          {this.props.children}
        </this.Content>
      </this.Wrapper>
    );
  }
}

FullPageScroller.defaultProps = {
  interpolator: ratio => ratio
}

export default FullPageScroller;
