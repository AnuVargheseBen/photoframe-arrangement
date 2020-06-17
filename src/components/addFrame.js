import React, { Component } from "react";
import { Stage, Layer, Rect } from "react-konva";

import frameDatas from "../data/frameData";
import { generatePosition } from "../lib/pattern";

class AddEvent extends Component {
  constructor(props) {
    super(props);
    const frames = generatePosition(frameDatas);
    this.state = {
      frameDatas: frames,
    };
  }

  handleEventRefresh = (event) => {
    this.setState({ frameDatas: generatePosition(frameDatas) });
  };

  render() {
    const { frameDatas } = this.state;

    return (
      <div>
        <Stage x={500} y={500} width={1000} height={1000}>
          <Layer>
            {frameDatas.map((data) => {
              return (
                <Rect
                  key={data.id}
                  x={data.x}
                  y={data.y}
                  width={data.width}
                  height={data.height}
                  fill={data.color}
                  shadowBlur={10}
                />
              );
            })}
          </Layer>
        </Stage>

        <div>
          <button onClick={this.handleEventRefresh}>REFRESH</button>
        </div>
      </div>
    );
  }
}
export default AddEvent;
