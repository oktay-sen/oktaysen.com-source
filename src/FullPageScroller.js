import React, { Component } from 'react';
import styled from 'styled-components';


class FullPageScroller extends Component {

  ref = null;
  currentPage = 0;
  animationTimer = null;
  readyToChange = true;
  node = () => this.ref._reactInternalInstance._renderedComponent._hostNode;

  state = {
    pageY:0,
    pageX:0
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
    -webkit-transition: ${this.props.animationDuration/1000}s ${this.props.animationType};
    -moz-transition: ${this.props.animationDuration/1000}s ${this.props.animationType};
    -o-transition: ${this.props.animationDuration/1000}s ${this.props.animationType};
    transition: ${this.props.animationDuration/1000}s ${this.props.animationType};

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
  animationDuration: 1000,
  animationType: 'ease'
}

export default FullPageScroller;
