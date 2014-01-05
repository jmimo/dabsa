import argparse
import re

def main():
    parser = argparse.ArgumentParser(description='OpenAir Parser')
    parser.add_argument('--file', required=True, help='Path to OpenAir File')
    arguments = parser.parse_args()

    file = open(arguments.file,'r')
    rows = file.readlines()
    identifiers = []
    classes = []
    airspaces = []
    for line in rows:
        identifier = line[:2]
        if re.match("^[A-Za-z]",identifier):
            identifiers.append(identifier)
            if identifier == 'AC':
                classes.append(line[3:].replace('\r\n',''))
            if identifier == 'AN':
                airspaces.append(line[3:].replace('\r\n',''))
    print "identifers: ", list(set(identifiers))
    print "classes: ", list(set(classes))
    for airspace in airspaces:
        print airspace

if __name__ == "__main__":
    main()
