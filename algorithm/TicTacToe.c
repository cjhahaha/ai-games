#ifndef EM_PORT_API
#    if defined(__EMSCRIPTEN__)
#        include <emscripten.h>
#        if defined(__cplusplus)
#            define EM_PORT_API(rettype) extern "C" rettype EMSCRIPTEN_KEEPALIVE
#        else
#            define EM_PORT_API(rettype) rettype EMSCRIPTEN_KEEPALIVE
#        endif
#    else
#        if defined(__cplusplus)
#            define EM_PORT_API(rettype) extern "C" rettype
#        else
#            define EM_PORT_API(rettype) rettype
#        endif
#    endif
#endif

const int EMPTY = 0;
const int AI = 1;
const int PLAYER = -1;
const int PLAYING = 2;
const int TIE = 0;

int chessboard[3][3] = {
	{EMPTY, EMPTY, EMPTY},
	{EMPTY, EMPTY, EMPTY},
	{EMPTY, EMPTY, EMPTY}
};


int is_the_same(int a, int b, int c) {
	return (int)(a == b && b == c && a != EMPTY);
}


int is_full() {
	for (int i = 0; i < 3; i ++)
		for (int j = 0; j < 3; j ++)
			if (chessboard[i][j] == EMPTY)
				return 0;

	return 1;
}


EM_PORT_API(int) win_check() {
	for (int i = 0; i < 3; i ++) {
		// check row
		if (is_the_same(chessboard[i][0], chessboard[i][1], chessboard[i][2]))
			return chessboard[i][0];

		// check column
		if (is_the_same(chessboard[0][i], chessboard[1][i], chessboard[2][i]))
			return chessboard[0][i];
	}

	// check diagnoal
	if (is_the_same(chessboard[0][0], chessboard[1][1], chessboard[2][2])
			|| is_the_same(chessboard[0][2], chessboard[1][1], chessboard[2][0]))
		return chessboard[1][1];

	return is_full() ? TIE : PLAYING;
}


int one_step_from_winning(int who) {
	int backup, winner;
	for (int i = 0; i < 3; i ++)
		for (int j = 0; j < 3; j ++) {
			if (chessboard[i][j] == EMPTY) {
				backup = chessboard[i][j];
				chessboard[i][j] = who;
				winner = win_check(); 
				chessboard[i][j] = backup;

				if (winner == who) 
					return i * 3 + j + 1;
			}
		}
	return 0;
}


struct Move {
	int x;
	int y;
	int score;
};


struct Move fisrt_available_move() {
	struct Move res;
	for (int i = 0; i < 3; i ++)
		for (int j = 0; j < 3; j ++)
			if (chessboard[i][j] == EMPTY) {
				res.x = i;
				res.y = j;
				return res;
			}
	return res;
}

// define here for recursive usage
struct Move player_move(int alpha, int beta);

struct Move ai_move(int alpha, int beta) {
	struct Move res = fisrt_available_move(), temp_res;
	res.score = alpha;

	int pos = one_step_from_winning(AI);
	if (pos != 0) {
		res.x = (pos - 1) / 3;
		res.y = (pos - 1) % 3;
		res.score = AI;
	}
	else if (is_full()) {
		res.score = TIE;
	}
	else {
		for (int i = 0; i < 3; i ++) 
			for (int j = 0; j < 3; j ++) {
				if (chessboard[i][j] == EMPTY) {
					chessboard[i][j] = AI;
					temp_res = player_move(res.score, beta);
					chessboard[i][j] = EMPTY;

					if (temp_res.score > res.score) {
						res.score = temp_res.score;
						res.x = i;
						res.y = j;
					}
				}
			}
	}

	return res;
}


struct Move player_move(int alpha, int beta) {
	struct Move res = fisrt_available_move(), temp_res;
	res.score = beta;

	int pos = one_step_from_winning(PLAYER);
	if (pos != 0) {
		res.x = (pos - 1) / 3;
		res.y = (pos - 1) % 3;
		res.score = PLAYER;
	}
	else if (is_full()) {
		res.score = TIE;
	}
	else {
		for (int i = 0; i < 3; i ++)
			for (int j = 0; j < 3; j ++) {
				if (chessboard[i][j] == EMPTY) {
					chessboard[i][j] = PLAYER;
					temp_res = ai_move(alpha, res.score);
					chessboard[i][j] = EMPTY;

					if (temp_res.score < res.score) {
						res.score = temp_res.score;
						res.x = i;
						res.y = j;
					}
				}
			}
	}

	return res;
}

struct Move global_move;

EM_PORT_API(void) update_chessboard(int x, int y, int who) {
	if (chessboard[x][y] == EMPTY)
		chessboard[x][y] = who;
}


EM_PORT_API(void) clear_chessboard(int x, int y, int who) {
	for (int i = 0; i < 3; i ++)
		for (int j = 0; j < 3; j ++)
			chessboard[i][j] = EMPTY;
}


EM_PORT_API(void) let_ai_think() {
	global_move = ai_move(PLAYER, AI);
	chessboard[global_move.x][global_move.y] = AI;
}

EM_PORT_API(int) get_ai_move_x() {
	return global_move.x;
}

EM_PORT_API(int) get_ai_move_y() {
	return global_move.y;
}

EM_PORT_API(int) get_ai_move_score() {
	return global_move.score;
}

