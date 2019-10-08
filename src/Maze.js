import React from 'react';

export default function Maze({ data, move }) {
  const maze = [['+', '---', '+', '---', '+'], ['|', '0', ' ', ' ', '|']];

  console.log('move', move);

  return (
    <table>
      <tbody>
        {maze.map((row, rIndex) => (
          <tr key={`${rIndex}`}>
            {row.map((cell, cIndex) => (
              <td style={{ textAlign: 'center' }} key={`${rIndex}_${cIndex}`}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
