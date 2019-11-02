import React from 'react';
import './arrows.css';
import Key from './Key';

export default function DialogText({ data, move, onHandleClick }) {
  const anyNorth = data.exits.find(exit => exit === 'N');
  const anyWest = data.exits.find(exit => exit === 'W');
  const anySouth = data.exits.find(exit => exit === 'S');
  const anyEast = data.exits.find(exit => exit === 'E');
  return (
    <div className="center">
      <div className="dialog">{data.description}</div>
      {data && data.exits && (
        <div className="arrowKeyNorthSouth">
          {
            <table>
              <tr>
                <td className={'hide'}></td>
                <td className={anyNorth ? 'show' : 'hide'}>
                  {anyNorth && (
                    <Key key={0} arrow={'N'} handleClick={onHandleClick}></Key>
                  )}
                </td>
                <td style={{ border: '0px' }}></td>
              </tr>
              <tr>
                <td className={anyWest ? 'show' : 'hide'}>
                  {anyWest && (
                    <Key key={0} arrow={'W'} handleClick={onHandleClick}></Key>
                  )}
                </td>
                <td className={anySouth ? 'show' : 'hide'}>
                  {anySouth && (
                    <Key key={0} arrow={'S'} handleClick={onHandleClick}></Key>
                  )}
                </td>
                <td className={anyEast ? 'show' : 'hide'}>
                  {anyEast && (
                    <Key key={0} arrow={'E'} handleClick={onHandleClick}></Key>
                  )}
                </td>
              </tr>
            </table>
          }
        </div>
      )}
    </div>
  );
}
