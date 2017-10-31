#!/bin/bash
g++ gendata.cc -o gendata.exe
./gendata.exe $i > put.sh
bash put.sh