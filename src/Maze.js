import React, { useState, useEffect } from 'react';
import { useCanvas } from './hooks/useCanvas';
import { getPlayerRelativePosition } from './Game/player';

export default function Maze({ data, move }) {
  const [coordinates, setCoordinates, canvasRef, canvasWidth, canvasHeight] = useCanvas();
  const [currentCoord, setCurrentCoord] = useState();
  const TILE_SIZE = 10;
  console.log('canvasWidth', canvasWidth);
  console.log('canvasHeight', canvasHeight);
  // console.log('move', move);
  // console.log('getPlayerRelativePosition', getPlayerRelativePosition(data));
  useEffect(() => {
    const playerCoord = getPlayerRelativePosition(data);
    if (playerCoord) {
      setCurrentCoord({ x: playerCoord.x * TILE_SIZE, y: playerCoord.y * TILE_SIZE });
    }

    setCoordinates([currentCoord]);
  }, [data]);

  return (
    <main>
      <canvas className="App-canvas" ref={canvasRef} width={canvasWidth} height={canvasHeight} />
    </main>
  );
}
