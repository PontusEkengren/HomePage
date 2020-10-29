import React, { useState, useEffect, useRef } from 'react';

// Scaling Constants for Canvas
const SCALE = 0.1;
const OFFSET = 200;
const LOCATION_MULTIPLIER = 1 / SCALE;
export const canvasWidth = window.innerWidth * 0.5;
export const canvasHeight = window.innerHeight * 0.5;

export function draw(ctx, location) {
  // console.log('attempting to draw', ctx, location);
  console.log('attempting to draw', ctx, location);
  ctx.fillStyle = 'red';
  ctx.save();
  ctx.scale(SCALE, SCALE);
  // ctx.translate(canvasWidth / 2, canvasHeight / 2);
  // ctx.translate(canvasWidth / 4, canvasHeight / 4);
  // ctx.translate(canvasWidth + 2000, canvasHeight + 2000);
  ctx.translate(location.x, location.y);
  // ctx.translate(location.x / SCALE - OFFSET, location.y / SCALE - OFFSET);
  ctx.fillRect(100, 100, 100, 100);
  ctx.restore();
}

export function useCanvas() {
  const canvasRef = useRef(null);
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    const canvasObj = canvasRef.current;
    const ctx = canvasObj.getContext('2d');
    // clear the canvas area before rendering the coordinates held in state
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // draw all coordinates held in state
    coordinates.forEach(coordinate => {
      console.log('coordinate', coordinate);
      coordinate && draw(ctx, coordinate);
    });
  });

  return [coordinates, setCoordinates, canvasRef, canvasWidth, canvasHeight];
}
