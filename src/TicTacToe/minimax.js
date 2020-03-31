import { AI, PLAYER, TIE } from "../common/constant";

/**
 * check if three elements are the same
 * @return {boolean}
 */
const is_same = (a, b, c) => {
    return a === b && b === c && a === c && a !== 0;
};


const is_full = (chessboard) => {
    for (let i = 0; i < 3; i ++)
        for (let j = 0; j < 3; j ++)
            if (chessboard[i][j] === 0)
                return false;
    return true;
};


const is_just_started = (chessboard) => {
    let AI_cnt = 0, player_cnt = 0;
    for (let i = 0; i < 3; i ++)
        for (let j = 0; j < 3; j ++) {
            if (chessboard[i][j] === AI)
                AI_cnt ++;
            else if (chessboard[i][j] === PLAYER)
                player_cnt ++;
        }

    return player_cnt === 0 && AI_cnt <= 1;
}


export const winCheck = (chessboard) => {
    for (let i = 0; i < 3; i ++) {
        // row
        if (is_same(chessboard[i][0], chessboard[i][1], chessboard[i][2]))
            return chessboard[i][0];
        // col
        if (is_same(chessboard[0][i], chessboard[1][i], chessboard[2][i]))
            return chessboard[0][i];
    }

    // diagonal
    if (is_same(chessboard[0][0], chessboard[1][1], chessboard[2][2]) ||
        is_same(chessboard[2][0], chessboard[1][1], chessboard[0][2]))
        return chessboard[1][1];

    // nobody wins
    return is_full(chessboard) ? 2 : 0;
};


const is_about_to_win = (chessboard, who) => {                                   // check if someone is one step from winning
    for (let i = 0; i < 3; i ++)
        for (let j = 0; j < 3; j ++)
            if (chessboard[i][j] === 0) {                                        // available place
                chessboard[i][j] = who;
                let winner = winCheck(chessboard);
                chessboard[i][j] = 0;                                            // roll back

                if (winner === who)
                    return { flag: true, best_move: [i, j] };
            }

    return { flag: false, best_move: [] };
};


export const aiMove = (chessboard, alpha, beta) => {                                   // predict AI move
    let ret = { score: alpha, best_move: [] }, temp_score;

    let win_state = is_about_to_win(chessboard, AI);
    if (win_state.flag === true)                                                 // if AI is about to win
        ret = { score: AI, best_move: win_state.best_move };
    else if (is_full(chessboard))                                                // if chessboard is full
        ret.score = TIE;
    else {
        for (let i = 0; i < 3; i ++)
            for (let j = 0; j < 3; j ++)
                if (chessboard[i][j] === 0) {                                    // available place
                    chessboard[i][j] = AI;                                       // place here
                    temp_score = playerMove(chessboard, ret.score, beta).score; // predict player move
                    chessboard[i][j] = 0;                                        // rollback

                    if (temp_score > ret.score) {                                // update score and best move
                        ret.score = temp_score;
                        ret.best_move = [i, j];
                    }
                }
    }

    return ret;
};


const playerMove = (chessboard, alpha, beta) => {                               // predict human move
    let ret = { score: beta, best_move: [] }, temp_score;

    let win_state = is_about_to_win(chessboard, PLAYER);
    if (win_state.flag === true)                                                 // if player is about to win
        ret = { score: PLAYER, best_move: win_state.best_move };
    else if (is_full(chessboard))                                                // if chessboard is full
        ret.score = TIE;
    else {
        for (let i = 0; i < 3; i ++)
            for (let j = 0; j < 3; j ++)
                if (chessboard[i][j] === 0) {                                    // available place
                    chessboard[i][j] = PLAYER;                                   // place here
                    temp_score = aiMove(chessboard, alpha, ret.score).score;    // predict AI move
                    chessboard[i][j] = 0;                                        // rollback

                    if (temp_score < ret.score) {                                // update score and best move
                        ret.score = temp_score;
                        ret.best_move = [i, j];
                    }
                }
    }

    return ret;
};

