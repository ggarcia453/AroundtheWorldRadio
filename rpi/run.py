import subprocess
import time, datetime
import sys
import os

def main():
    while True:
        print(datetime.datetime.now())
        subprocess.call(['sh','./parse.sh'])
        print("Finished...")
        time.sleep(3600)

if __name__ == "__main__":
    #arguments = sys.argv[1:]
    #if len(arguments) > 0:
        main()
