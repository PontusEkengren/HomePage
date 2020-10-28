import React from 'react';

export default function Maze({ data, move }) {
  const maze = [
    ['+', '---', '+', '---', '+'],
    ['|', '0', ' ', ' ', '|'],
  ];

  return (
    <table>
      <tbody>
        {data.map((row, rIndex) => (
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
