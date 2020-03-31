import React from 'react';
import { AI_WIN, PLAYER_WIN, TIE} from "../../common/constant";

export function showResult(gameStatus) {
    // TODO: use modal or sth else
    if (gameStatus === TIE) {
        setTimeout(() => alert('tie'), 200);
    } else if (gameStatus === PLAYER_WIN) {
        setTimeout(() => alert('you win'), 200);
    } else if (gameStatus === AI_WIN) {
        setTimeout(() => alert('you lose'), 200);
    }

}


