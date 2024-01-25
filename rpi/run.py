import subprocess, os
import datetime
import sys
import os

def main(degree):
    while True:
        print(datetime.datetime.today())
        subprocess.call(f"parse.sh {degree}", shell=True)
        break
        #time.sleep(5)

if __name__ == "__main__":
    arguments = sys.argv[1:]
    if len(arguments) > 0:
        main(arguments[0])
