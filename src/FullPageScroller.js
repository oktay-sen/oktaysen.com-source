import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled, {css} from 'styled-components';
import px2vw from './px2vw';
import px2vh from './px2vh';

console.log(window)
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

// main function
function scrollToY(scrollTargetY, speed, easing) {
    // scrollTargetY: the target scrollY property of the window
    // speed: time in pixels per second
    // easing: easing equation to use

    var scrollY = window.scrollY || document.documentElement.scrollTop,
        scrollTargetY = scrollTargetY || 0,
        speed = speed || 2000,
        easing = easing || 'easeOutSine',
        currentTime = 0;

    // min time .1, max time .8 seconds
    var time = Math.abs(scrollY - scrollTargetY) / speed;

    // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
    var easingEquations = {
            easeOutSine: function (pos) {
                return Math.sin(pos * (Math.PI / 2));
            },
            easeInOutSine: function (pos) {
                return (-0.5 * (Math.cos(Math.PI * pos) - 1));
            },
            easeInOutQuint: function (pos) {
                if ((pos /= 0.5) < 1) {
                    return 0.5 * Math.pow(pos, 5);
                }
                return 0.5 * (Math.pow((pos - 2), 5) + 2);
            }
        };

    // add animation loop
    function tick() {
        currentTime += 1 / 60;

        var p = currentTime / time;
        var t = easingEquations[easing](p);

        if (p < 1) {
            window.requestAnimFrame(tick);

            window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
        } else {
            console.log('scroll done');
            window.scrollTo(0, scrollTargetY);
        }
    }

    // call it once to get started
    tick();
}

class FullPageScroller extends Component {

  ref = null;
  currentPage = 0;
  animationTimer = null;
  readyToChange = true;
  firstTouchCoords = null;
  lastTouchCoords = null;
  touchDeltaX
  node = null;

  state = {
    pageY:0,
    pageX:0,
    deltaX:0,
    deltaY:0,
    animation:true
  }

  componentDidMount() {
    this.node = ReactDOM.findDOMNode(this);
  }

  componentWillUnmount() {
    clearTimeout(this.animationTimer)
    this.node = null;
  }


  setPageY = (pageY) => {
    console.log(pageY)
    if (this.readyToChange) {
      let height = this.node.clientHeight;
      scrollToY(pageY * height, 1000, 'easeInOutQuint');
      this.readyToChange = false;
      console.log({node:this.node})
      this.animationTimer = setTimeout(
        () => this.readyToChange = true,
        this.props.animationDuration
      );
    }
  }

  getPageY = () => {
    return Math.floor((window.scrollY || document.documentElement.scrollTop) / this.node.clientHeight)
  }

  onWheel = (e) => {
    e.preventDefault();
    if (e.deltaY > 0 && this.getPageY() < this.props.children.length - 1)
      this.setPageY(this.getPageY() + 1);
    if (e.deltaY < 0 && this.getPageY() > 0)
      this.setPageY(this.getPageY() - 1);
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
    overflow: visible;
    ${'' /* ::-webkit-scrollbar-track
    {
    	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    	background-color: #F5F5F5;
    }

    ::-webkit-scrollbar
    {
    	width: 6px;
    	background-color: #F5F5F5;
    }

    ::-webkit-scrollbar-thumb
    {
    	background-color: #000000;
    } */}
  `

  Content = styled.div`
    ${props => props.animation&&css`
      -webkit-transition: ${this.props.animationDuration/1000}s ${this.props.animationType};
      -moz-transition: ${this.props.animationDuration/1000}s ${this.props.animationType};
      -o-transition: ${this.props.animationDuration/1000}s ${this.props.animationType};
      transition: ${this.props.animationDuration/1000}s ${this.props.animationType};
    `}

    ${'' /* -webkit-transform: translate(${props => props.offsetX}vh, ${props => -props.offsetY}vh);
    -moz-transform: translate(${props => props.offsetX}vh, ${props => -props.offsetY}vh);
    -o-transform: translate(${props => props.offsetX}vh, ${props => -props.offsetY}vh);
    -ms-transform: translate(${props => props.offsetX}vh, ${props => -props.offsetY}vh);
    transform: translate(${props => props.offsetX}vh, ${props => -props.offsetY}vh); */}
  `

  render() {

    return (
      <this.Wrapper
        onScroll={this.onScroll}
        onWheel={this.onWheel}
        onTouchStart={this.onTouchStart}
        onTouchEnd={this.onTouchEnd}
        ref={ref => this.ref=ref}
      >
        {this.props.children}
        {/* <this.Content
          offsetX={this.state.pageX * 100}
          offsetY={this.state.pageY * 100 - px2vh(this.state.deltaY)}
          //ref={ref => console.log('Content:',ref)}
          animation={this.state.animation}
          >
        </this.Content> */}
      </this.Wrapper>
    );
  }
}

FullPageScroller.defaultProps = {
  animationDuration: 1000,
  animationType: 'ease',
  onPageChange:page => {}
}

export default FullPageScroller;
