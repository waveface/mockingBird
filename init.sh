#!/bin/bash

rm -rf dummy.json images

bash get-files.sh
python gen-mockdata.py > dummy.json
