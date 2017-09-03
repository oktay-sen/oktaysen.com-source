import React, { Component } from 'react';
import styled, {css} from 'styled-components';
import px2vw from './px2vw';
import px2vh from './px2vh';


class FullPageScroller extends Component {

  ref = null;
  currentPage = 0;
  animationTimer = null;
  readyToChange = true;
  firstTouchCoords = null;
  lastTouchCoords = null;
  touchDeltaX
  node = () => this.ref._reactInternalInstance._renderedComponent._hostNode;

  state = {
    pageY:0,
    pageX:0,
    deltaX:0,
    deltaY:0,
    animation:true
  }

  componentWillUnmount() {
    clearTimeout(this.animationTimer)
  }


  setPageY = (pageY) => {
    if (this.readyToChange) {
      this.setState({pageY}, () => {
        this.readyToChange = false;
        this.animationTimer = setTimeout(
          () => this.readyToChange = true,
          this.props.animationDuration
        );
      })
    }
  }

  onWheel = (e) => {
    if (e.deltaY > 0 && this.state.pageY < this.props.children.length-1)
      this.setPageY(this.state.pageY + 1);
    if (e.deltaY < 0 && this.state.pageY > 0)
      this.setPageY(this.state.pageY - 1);
  }

  onTouchStart = (e) => {
    this.firstTouchCoords = [
      e.touches[0].clientX,
      e.touches[0].clientY
    ]
    console.log('touchStart',this.firstTouchCoords)
  }

  onTouchEnd = (e) => {
    this.firstTouchCoords = null;
    this.lastTouchCoords = null;
    this.setState({
      deltaX:0,
      deltaY:0,
      pageX:this.state.pageX + Math.round(px2vw(this.state.deltaX)/100),
      pageY:this.state.pageY - Math.round(px2vh(this.state.deltaY)/100),
      animation:true
    })
  }

  onTouchMove = (e) => {
    this.lastTouchCoords = [
      e.touches[0].clientX,
      e.touches[0].clientY
    ]
    this.setState({
      deltaX:this.lastTouchCoords[0] - this.firstTouchCoords[0],
      deltaY:this.lastTouchCoords[1] - this.firstTouchCoords[1],
      animation:false
    })
    //console.log('touchMove','dx:',this.lastTouchCoords[0] - this.firstTouchCoords[0],'dy:',this.lastTouchCoords[1] - this.firstTouchCoords[1])
  }

  Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  `

  Content = styled.div`
    ${props => props.animation&&css`
      -webkit-transition: ${this.props.animationDuration/1000}s ${this.props.animationType};
      -moz-transition: ${this.props.animationDuration/1000}s ${this.props.animationType};
      -o-transition: ${this.props.animationDuration/1000}s ${this.props.animationType};
      transition: ${this.props.animationDuration/1000}s ${this.props.animationType};
    `}

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
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
        ref={ref => this.ref=ref}
      >
        <this.Content
          offsetX={this.state.pageX * 100}
          offsetY={this.state.pageY * 100 - px2vh(this.state.deltaY)}
          //ref={ref => console.log('Content:',ref)}
          animation={this.state.animation}
        >
          {this.props.children}
        </this.Content>
      </this.Wrapper>
    );
  }
}

FullPageScroller.defaultProps = {
  animationDuration: 1000,
  animationType: 'ease'
}

export default FullPageScroller;
