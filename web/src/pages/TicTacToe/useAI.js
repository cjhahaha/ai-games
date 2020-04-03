import React, { useEffect, useMemo } from 'react';
import { useWasm } from "../../hooks/useWasm";
import { PLAYER } from "../../common/constant";

export function useAI() {
    /*
    const memory = useMemo(() =>
            new window.WebAssembly.Memory({
                initial: 256,
                maximum: 256
            })
        , []);
    */
    const { loading, data } = useWasm({
        url: require('../../assets/wasm/TicTacToe.wasm'),
        config: {
            env: {
                /*
                memory: memory,
                memoryBase: 0,
                tableBase: 0,
                table: new window.WebAssembly.Table({
                    initial: 0,
                    element: 'anyfunc',
                }),
                */
            },
        }
    }, []);

    if (loading) return {loading: true, utils: {}};

    return {
        loading: false,
        utils: {
            winCheck: () => data.instance.exports.win_check(),
            aiMove: () => {
                data.instance.exports.let_ai_think();
                return {
                    x: data.instance.exports.get_ai_move_x(),
                    y: data.instance.exports.get_ai_move_y(),
                    score: data.instance.exports.get_ai_move_score()
                };
            },
            updateChessboard: (x, y) => {
                data.instance.exports.update_chessboard(x, y, PLAYER);
            },
            clearChessboard: () => data.instance.exports.clear_chessboard(),
        }
    }
}