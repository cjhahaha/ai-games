import React, { useMemo } from 'react';
import { EMPTY, PLAYER } from "../common/constant";

function display(ch) {
    return ch !== EMPTY
        ? ch === PLAYER
            ? '⭕'
            : '❌'
        : ''

}

export function Chessboard(props) {
    const { chessboard, onClick } = props;
    const ROW = useMemo(() => [0, 1, 2], []);
    const COL = useMemo(() => [0, 1, 2], []);
    const BORDER_CSS = useMemo(() => 'solid 2.5vmin #fff', []);

    return (
        <table className='chessboard tic-tac-toe'>
            <tbody>
            {
                ROW.map((row) => (
                    <tr
                        key={`row-${row}`}
                        style={{ height: row !== 2 ? '25vmin' : '22.5vmin'}}
                    >
                        {
                            COL.map((col) => (
                                <td
                                    key={`row-${row}-col-${col}`}
                                    className="gird chess"
                                    style={{
                                        width: col !== 2 ? '25vmin' : '22.5vmin',
                                        borderBottom: row !== 2 ? BORDER_CSS : 'none',
                                        borderRight: col !== 2 ? BORDER_CSS : 'none',
                                    }}
                                    onClick={() => { onClick(row, col) }}
                                >
                                    {display(chessboard[row][col])}
                                </td>
                            ))
                        }
                    </tr>
                ))
            }
            </tbody>
        </table>
    );
}


