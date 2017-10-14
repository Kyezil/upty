#!/bin/bash
for i in `seq 0 50`;
	do
    	g++ gensensor.cc -o gensensor.exe
    	./gensensor.exe $i > sensor.json
    	bash post.sh
    	sleep 1
    done  




