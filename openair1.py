import argparse
import re
import OpenAirParser

def main():
    parser = argparse.ArgumentParser(description='OpenAir Parser')
    parser.add_argument('--file', required=True, help='Path to OpenAir File')
    arguments = parser.parse_args()

    areas = OpenAirParser.parse(arguments.file)
    #for area in areas:
    #    print area 
    #    for entry in area.entries:
    #        print entry
    output = OpenAirParser.createHeader('06.01.2014',['CTR','R','P'])
    output += OpenAirParser.marshal(areas)
    print output

if __name__ == "__main__":
    main()
