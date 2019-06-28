import React, { Component } from 'react';
import OrbitSpinnerCore from './core';

import './index.scss';

export default class OrbitSpinner extends Component {
  componentDidMount = () => {
    this.spinner = new OrbitSpinnerCore(this.container);
  };

  render() {
    return (
      <div
        key='spinner-container'
        className='spinner-container'
        // onMouseDown={this.startDragging}
        // onTouchStart={this.startDragging}
        // onMouseUp={this.stopDragging}
        // onTouchEnd={this.stopDragging}
        // onMouseMove={this.handleMove}
        ref={container => {
          this.container = container;
        }}
      />
    );
  }
}
