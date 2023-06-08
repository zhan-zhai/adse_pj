#! /bin/bash

for dir in $(ls /root/lab4/images/)
do
	docker build -t zfhub/lab4_$dir	-f /root/lab4/images/$dir/Dockerfile .
done
