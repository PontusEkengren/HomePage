import React, { useState, useEffect, useRef } from 'react';
import { Canvas, colours } from './Styled/default';

export default function Maze({ data, playerMove }) {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const mapArraySize = 40;
  const arraySizeFactor = 10;
  const width = mapArraySize * arraySizeFactor;
  const height = mapArraySize * arraySizeFactor;

  useEffect(() => {
    if (canvasRef && !ctx) {
      const ctxToSet = canvasRef.current.getContext('2d');
      setCtx(ctxToSet);
    }
  }, [ctx, canvasRef]);

  useEffect(() => {
    const updateMap = (location, color) => {
      ctx.fillStyle = color ? colours[color] : '#e60000';
      ctx.fillRect(location.x, location.y, arraySizeFactor, arraySizeFactor);
    };

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      for (let j = 0; j < data.length; j++) {
        if (row[j]) {
          const update = {
            y: i * arraySizeFactor,
            x: j * arraySizeFactor,
            // y: i * (mapArraySize / arraySizeFactor),
            // x: j * (mapArraySize / arraySizeFactor),
          };
          let color = 'black';
          switch (row[j]) {
            case 'A':
              color = 'red';
              break;
            case 'V':
              color = 'grey';
              break;
            case 'G':
              color = 'green';
              break;
            default:
              color = 'black';
              break;
          }
          updateMap(update, color);
        }
      }
    }
  }, [ctx, data]);

  return <Canvas ref={canvasRef} width={width} height={height} tabIndex="0" />;
}
