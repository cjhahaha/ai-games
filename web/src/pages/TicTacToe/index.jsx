import React, { useState, useMemo, useEffect } from 'react';
import { Wrapper } from '../../components/Wrapper';
import { ButtonSet } from '../../components/ButtonSet';
import { showResult } from '../../components/Result';
import { AI, PLAYER, EMPTY, PLAYING } from "../../common/constant";
import { Chessboard } from "./chessboard";
import { useAI } from "./useAI";

import './index.css';
import '../../common/common.css';

export function TicTacToe() {
    // moves
    const [moves, setMoves] = useState([]);
    // who play first, AI or PLAYER
    const [firstPlayer, setFirstPlayer] = useState(PLAYER);
    // game status, AI_WIN | PLAYER_WIN | TIE | PLAYING
    const [gameStatus, setGameStatus] = useState(PLAYING);

    const { utils, loading } = useAI();

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

    // check game status after each move
    useEffect(() => {
        let winStatus = loading ? PLAYING : utils.winCheck();
        if (winStatus === PLAYING) return;

        setGameStatus(winStatus);
        showResult(winStatus);
    }, [moves]);

    // let AI play after each move
    useEffect(() => {
        if (gameStatus !== PLAYING)
            return;

        let l = moves.length;
        if (!loading && l > 0 && l < 9 && moves[l - 1].player === PLAYER) {
            let res = utils.aiMove();
            setMoves([...moves, {row: res.x, col: res.y, player: AI}]);
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
                    utils.updateChessboard(row, col);
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
                            col: Math.round(Math.random() * 315) % 3,
                            player: AI
                        }]
                        : []
                    );
                    // init game status
                    setGameStatus(PLAYING);
                    utils.clearChessboard();
                }}
            />
        </Wrapper>
    );
}
