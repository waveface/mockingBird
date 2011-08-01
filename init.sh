#!/bin/bash

rm -rf dummy.json static

bash get-files.sh
python gen-mockdata.py > dummy.json
