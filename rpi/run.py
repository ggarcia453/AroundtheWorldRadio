import subprocess, os
import datetime
import sys

def main():
    while True:
        print(datetime.datetime.today())
        subprocess.call("parse.sh", shell=True)
        break
        #time.sleep(5)

if __name__ == "__main__":
    arguments = sys.argv[1:]
    if len(arguments) > 0:
        main()