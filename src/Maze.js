import React, { useState, useEffect, useRef } from 'react';
// import { Canvas } from './Styled/defaults';
import { Canvas, colours } from './Styled/default';

export default function Maze({ data, playerMove }) {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const mapArraySize = 80;
  const arraySizeFactor = 10;

  const width = mapArraySize * arraySizeFactor;
  const height = mapArraySize * arraySizeFactor;
  const arrayPixelFactor = width / mapArraySize;
  const playerSize = arrayPixelFactor;
  const toMapFactor = mapArraySize / arraySizeFactor;

  // const [playerLocation, setPlayerLocation] = useState({ x: width / 2, y: height / 2 });

  useEffect(() => {
    if (canvasRef && !ctx) {
      const ctxToSet = canvasRef.current.getContext('2d');
      setCtx(ctxToSet);
      // ctxToSet.fillRect(width / 2, height / 2, playerSize, playerSize);
    }
  }, [ctx, canvasRef]);

  useEffect(() => {
    // if (data[50]) console.log('playerMoveData', data[50][50]);

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      for (let j = 0; j < data.length; j++) {
        if (row[j]) {
          const update = { y: i * arraySizeFactor, x: j * arraySizeFactor };
          console.log('UpdateMap', update);
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
  }, [data]);

  const updateMap = (location, color) => {
    ctx.fillStyle = color ? colours[color] : '#e60000';
    ctx.fillRect(location.x, location.y, arraySizeFactor, arraySizeFactor);
  };

  return <Canvas ref={canvasRef} width={width} height={height} tabIndex="0" />;
}
