import argparse
import re
import OpenAirParser

def main():
    parser = argparse.ArgumentParser(description='OpenAir Parser')
    parser.add_argument('--file', required=True, help='Path to OpenAir File')
    arguments = parser.parse_args()

    file = open(arguments.file,'r')
    areas = OpenAirParser.parse(file)
    print areas


if __name__ == "__main__":
    main()
