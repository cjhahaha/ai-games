import React, { useState, useMemo, useEffect } from 'react';
import { Wrapper } from '../components/Wrapper';
import { ButtonSet } from '../components/ButtonSet';
import { showResult } from '../components/Result';
import { AI, PLAYER, EMPTY, PLAYING, TIE, AI_WIN, PLAYER_WIN } from "../common/constant";
import { Chessboard } from "./chessboard";
import { winCheck, aiMove } from "./minimax";

import './index.css';
import '../common/common.css';


export function TicTacToe() {
    // record moves
    const [moves, setMoves] = useState([]);
    // who play first, AI or PLAYER
    const [firstPlayer, setFirstPlayer] = useState(AI);
    // game status, AI_WIN | PLAYER_WIN | TIE | PLAYING
    const [gameStatus, setGameStatus]= useState(PLAYING);

    // calculate chessboard after each moves
    const chessboard = useMemo(() => {
        let _chessboard = new Array(3)
            .fill(EMPTY)
            .map(() => new Array(3).fill(EMPTY));
        moves.forEach((move) => {
            _chessboard[move.row][move.col] = move.player;
        });
        return _chessboard;
    }, [moves]);


    // check game status
    useEffect(() => {
        let winStatus = winCheck(chessboard);
        if (winStatus === PLAYING) return;

        setGameStatus(winStatus);
        showResult(winStatus);
    }, [moves]);


    // let AI play
    useEffect(() => {
        if (gameStatus !== PLAYING)
            return;

        let l = moves.length;
        if (l > 0 && l < 9 && moves[l - 1].player === PLAYER) {
            let res = aiMove(chessboard, PLAYER, AI).best_move;
            setMoves([...moves, {row: res[0], col: res[1], player: AI}]);
        }
    }, [moves, gameStatus]);


    return (
        <Wrapper>
            <Chessboard
                chessboard={chessboard}
                onClick={(row, col) => {
                    // check availability
                    if (chessboard[row][col] !== EMPTY || gameStatus !== PLAYING)
                        return;

                    // update chessboard
                    setMoves([...moves, {row, col, player: PLAYER}]);
                }}
            />

            <ButtonSet
                firstPlayer={firstPlayer}
                handleChangeFirstPlayer={() => setFirstPlayer(-firstPlayer)}
                handleReplay={() => {
                    // init moves
                    setMoves(firstPlayer === AI
                        ? [{
                            row: Math.round(Math.random() * 123) % 3,
                            col:  Math.round(Math.random() * 315) % 3,
                            player: AI
                        }]
                        : []
                    );
                    // init game status
                    setGameStatus(PLAYING);
                }}
            />
        </Wrapper>
    );
}
