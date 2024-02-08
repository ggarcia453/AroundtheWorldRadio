#!/bin/bash
ALL='/c/Users/gg311/Documents/GitHub/AroundtheWorldRadio/rpi/all.txt'
if [ $# -eq 0 ];
then
  echo "$0: Missing arguments"
  exit 1
fi
python3 parse.py $ALL $1
rm $ALL
