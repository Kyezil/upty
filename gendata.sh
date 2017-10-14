#!/bin/bash
for i in `seq 0 50`;
	do
    	g++ gendata.cc -o gendata.exe
    	./gendata.exe $i > get.sh
    	bash get.sh
    	sleep 1
    done  