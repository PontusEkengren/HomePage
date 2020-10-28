import React from 'react';
import './arrows.css';
import Key from './Key';
import { ContainerCenterColumn, Dialog } from './Styled/default';

export default function DialogText({ data, move, onHandleClick }) {
  const anyNorth = data.exits.find(exit => exit === 'N');
  const anyWest = data.exits.find(exit => exit === 'W');
  const anySouth = data.exits.find(exit => exit === 'S');
  const anyEast = data.exits.find(exit => exit === 'E');
  return (
    <ContainerCenterColumn>
      <Dialog>{data.description}</Dialog>
      {data && !data.status !== 'finished' && data.exits && (
        <div>
          {
            <table>
              <tbody>
                <tr>
                  <td className={'hide'}></td>
                  <td className={anyNorth ? 'show' : 'hide'}>
                    {anyNorth && <Key key={0} arrow={'N'} handleClick={onHandleClick}></Key>}
                  </td>
                  <td style={{ border: '0px' }}></td>
                </tr>
                <tr>
                  <td className={anyWest ? 'show' : 'hide'}>
                    {anyWest && <Key key={0} arrow={'W'} handleClick={onHandleClick}></Key>}
                  </td>
                  <td className={anySouth ? 'show' : 'hide'}>
                    {anySouth && <Key key={0} arrow={'S'} handleClick={onHandleClick}></Key>}
                  </td>
                  <td className={anyEast ? 'show' : 'hide'}>
                    {anyEast && <Key key={0} arrow={'E'} handleClick={onHandleClick}></Key>}
                  </td>
                </tr>
              </tbody>
            </table>
          }
        </div>
      )}
    </ContainerCenterColumn>
  );
}
