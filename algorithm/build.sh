#!/bin/bash

echo building $1.c
#emcc $1.c -s WASM=1 -o $1.wasm
emcc $1.c -Os -s WASM=1 -o $1.wasm
#em++ --bind $1.cpp -Os -s WASM=1 -o $1.js
echo built $1.wasm successufully 

cp $1.wasm ../web/public/$1.wasm
echo copid $1.wasm to /web/pulic/ 

