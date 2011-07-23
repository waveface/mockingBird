#!/bin/bash
set -x

avatars[0]="c6f539874bcd98210c786b4314488753"
avatars[1]="ffb623edef4ff4597e125ddc8bad928e"
avatars[2]="f45143c409f3deed51a65a238654f7f4"
avatars[3]="767fc9c115a1b989744c755db47feb60"
avatars[4]="c5c64af9b7505777b53e05857616d39f"
avatars[5]="75fb365927cb3f5f7b677682d6249406"
avatars[6]="0939030c354e4efefe655fa5107fd888"
avatars[7]="7fda1da9c34e978d5990afd7f58ca0f4"
avatars[8]="ca021af91df7c161d5586fdd6a46834d"
avatars[9]="c63392ca320086522cf4d55cbf1d3808"

mkdir -p static/images/original static/images/thumbnails static/images/avatars

for i in {1480..1450}
do 
    wget http://220.133.12.74/Share/Large/$i.jpeg -O static/images/original/$i.jpeg
    wget http://220.133.12.74/Share/Small/$i.jpeg -O static/images/thumbnails/$i.jpeg
done

for i in {0..9}
do
    wget "http://0.gravatar.com/avatar/${avatars[$i]}?s=69&d=monsterid" \
         -O static/images/avatars/${avatars[$i]}.jpg
done
