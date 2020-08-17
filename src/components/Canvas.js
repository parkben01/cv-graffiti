import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNewDoodle, extendLastDoodle, clearAllDoodles, updateIsDrawing } from '../actions';

class Canvas extends Component {
  getSVGCoordinates(e) {
    const svg = e.currentTarget;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;

    const svgPt = pt.matrixTransform(svg.getScreenCTM().inverse());

    return svgPt.x + " " + svgPt.y;
  }

  reportLastDoodle() {
    const doodles = this.props.doodles;
    if ( doodles.length > 0 ) {
      this.postDoodle(this.props.doodles[this.props.doodles.length - 1]);
    }
  }

  postDoodle(doodle) {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ doodle })
    };
    fetch('http://localhost:3001/doodles', req);
  }

  handleMouseDown = (e) => {
    e.stopPropagation();
    this.props.updateIsDrawing(true);
    this.props.createNewDoodle(this.getSVGCoordinates(e));
  }

  handleMouseMove = (e) => {
    if (!this.props.isDrawing) return;

    e.stopPropagation();
    this.props.extendLastDoodle(this.getSVGCoordinates(e));
  }

  handleMouseUp = (e) => {
    if (!this.props.isDrawing) return;

    e.stopPropagation();
    this.props.extendLastDoodle(this.getSVGCoordinates(e));
    this.props.updateIsDrawing(false);
    this.reportLastDoodle();
  }

  handleMouseLeave = (e) => {
    if (!this.props.isDrawing) return;

    e.stopPropagation();
    this.props.extendLastDoodle(this.getSVGCoordinates(e));
    this.props.updateIsDrawing(false);
    this.reportLastDoodle();
  }

  handleReset = (e) => {
    e.stopPropagation();
    this.props.clearAllDoodles();
    this.props.updateIsDrawing(false);
  }

  render() {
    return (
      <div className="canvas">
        <button onClick = {this.handleReset}>Reset Canvas</button>
        <svg className="svgArea" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 800"
          onMouseDown = {this.handleMouseDown}
          onMouseMove = {this.handleMouseMove}
          onMouseUp = {this.handleMouseUp}
          onMouseLeave = {this.handleMouseLeave}>
          {this.props.doodles.map((doodle, i) => {
            const dString = "M " + doodle.join(" L ");
            return <path key={i} stroke="black" fill="transparent" d={dString} />;
          })}
        </svg>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    doodles: state.doodles,
    isDrawing: state.isDrawing
  }
}

const mapDispatchToProps = {
  createNewDoodle,
  extendLastDoodle,
  clearAllDoodles,
  updateIsDrawing
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
