import subprocess
import time, datetime
import sys

def main():
    while True:
        print(datetime.datetime.now())
        subprocess.call('parse.sh')
        time.sleep(5)

if __name__ == "__main__":
    arguments = sys.argv[1:]
    if len(arguments) > 0:
        main()