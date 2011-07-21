#!/bin/bash
set -x

mkdir -p images/original images/thumbnails

for i in {1480..1450}
do 
    wget http://220.133.12.74/Share/Large/$i.jpeg -O images/original/$i.jpeg
    wget http://220.133.12.74/Share/Small/$i.jpeg -O images/thumbnails/$i.jpeg
done
