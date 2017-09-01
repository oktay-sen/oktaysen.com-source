import React, { Component } from 'react';
import styled from 'styled-components';


class FullPageScroller extends Component {

  ref = null;
  currentPage = 0;
  maxSteps = 200;
  duration = 500; //ms
  steps = 200;
  animationTimer = null;
  readyToChange = true;
  node = () => this.ref._reactInternalInstance._renderedComponent._hostNode;

  state = {
    pageY:0,
    pageX:0
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
    clearTimeout(this.animationTimer)
  }


  setPageY = (pageY) => {
    if (this.readyToChange) {
      this.setState({pageY}, () => {
        this.readyToChange = false;
        setTimeout(() => this.readyToChange = true, 500)
      })
    }
  }

  onWheel = (e) => {
    if (e.deltaY > 0 && this.state.pageY < this.props.children.length-1) this.setPageY(this.state.pageY + 1);
    if (e.deltaY < 0 && this.state.pageY > 0) this.setPageY(this.state.pageY - 1);
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
    console.log(e)
  }

  Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  `

  Content = styled.div`
    -webkit-transition: 0.5s ease-out;
    -moz-transition: 0.5s ease-out;
    -o-transition: 0.5s ease-out;
    transition: 0.5s ease-out;

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
          offsetX={this.state.pageX * 100}
          offsetY={this.state.pageY * 100}
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
