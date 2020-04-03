#include <emscripten.h>

int cnt = 0;
int arr[10] = {0, 0, 0, 0, 0, 0, 0, 0, 0};

EMSCRIPTEN_KEEPALIVE
void update() {
	if (cnt > 10) return;
	arr[cnt] = cnt;
	cnt ++;
}

int sub(int a, int b) {return a - b;}

EMSCRIPTEN_KEEPALIVE
int sum(int n) {
	int sum = 0;
	for (int i = 0; i <n ;i ++)
		sum += arr[i];
	return sum;
}
