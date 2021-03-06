/*
Visualization of A(2)
http://www.nilesjohnson.net/Aof2/

A web application using Raphael.js to organize A(2) and show 
it's structure by the coset decomposition A(2)//A(1)

Version 1.0

Copyright 2013 Robert Bruner and Niles Johnson
Licensed under GNU General Public License version 3 or later.
See README.txt

This file defines the data for displaying the Sq^i operations.
*/
var operationData = {
'sq1': {
  '0-0': ['0-1'],
  '0-1': ['z-1'],
  '0-2': ['0-3'],
  '0-3': ['z-1'],
  '0-4': ['0-5'],
  '0-5': ['z-1'],
  '0-6': ['0-7'],
  '0-7': ['z-1'],
  '12-0': ['14-0'],
  '12-1': ['14-1'],
  '12-2': ['14-2'],
  '12-3': ['14-3'],
  '12-4': ['14-4'],
  '12-5': ['14-5'],
  '12-6': ['14-6'],
  '12-7': ['14-7'],
  '14-0': ['z-1'],
  '14-1': ['z-1'],
  '14-2': ['z-1'],
  '14-3': ['z-1'],
  '14-4': ['z-1'],
  '14-5': ['z-1'],
  '14-6': ['z-1'],
  '14-7': ['z-1'],
  '20-0': ['22-0'],
  '20-1': ['22-1'],
  '20-2': ['22-2'],
  '20-3': ['22-3'],
  '20-4': ['22-4'],
  '20-5': ['22-5'],
  '20-6': ['22-6'],
  '20-7': ['22-7'],
  '22-0': ['z-1'],
  '22-1': ['z-1'],
  '22-2': ['z-1'],
  '22-3': ['z-1'],
  '22-4': ['z-1'],
  '22-5': ['z-1'],
  '22-6': ['z-1'],
  '22-7': ['z-1'],
  '26-0': ['20-5', '22-3', '26-1'],
  '26-1': ['22-5'],
  '26-2': ['20-7', '26-3'],
  '26-3': ['22-7'],
  '26-4': ['26-5'],
  '26-5': ['z-1'],
  '26-6': ['26-7'],
  '26-7': ['z-1'],
  '34-0': ['26-6', '34-1'],
  '34-1': ['26-7'],
  '34-2': ['34-3'],
  '34-3': ['z-1'],
  '34-4': ['34-5'],
  '34-5': ['z-1'],
  '34-6': ['34-7'],
  '34-7': ['z-1'],
  '8-0': ['0-6', '8-1'],
  '8-1': ['0-7'],
  '8-2': ['8-3'],
  '8-3': ['z-1'],
  '8-4': ['8-5'],
  '8-5': ['z-1'],
  '8-6': ['8-7'],
  '8-7': ['z-1']
},
'sq2': {
  '0-0': ['0-2'],
  '0-1': ['0-4'],
  '0-2': ['0-5'],
  '0-3': ['0-6'],
  '0-4': ['z-2'],
  '0-5': ['0-7'],
  '0-6': ['z-2'],
  '0-7': ['z-2'],
  '12-0': ['14-1'],
  '12-1': ['z-2'],
  '12-2': ['14-3'],
  '12-3': ['z-2'],
  '12-4': ['14-5'],
  '12-5': ['z-2'],
  '12-6': ['14-7'],
  '12-7': ['z-2'],
  '14-0': ['8-6', '12-4', '14-2'],
  '14-1': ['8-7', '14-4'],
  '14-2': ['12-6', '14-5'],
  '14-3': ['14-6'],
  '14-4': ['12-7'],
  '14-5': ['14-7'],
  '14-6': ['z-2'],
  '14-7': ['z-2'],
  '20-0': ['14-6', '20-2', '22-1'],
  '20-1': ['14-7', '20-4'],
  '20-2': ['20-5', '22-3'],
  '20-3': ['20-6'],
  '20-4': ['22-5'],
  '20-5': ['20-7'],
  '20-6': ['22-7'],
  '20-7': ['z-2'],
  '22-0': ['26-0'],
  '22-1': ['26-1'],
  '22-2': ['26-2'],
  '22-3': ['26-3'],
  '22-4': ['26-4'],
  '22-5': ['26-5'],
  '22-6': ['26-6'],
  '22-7': ['26-7'],
  '26-0': ['z-2'],
  '26-1': ['z-2'],
  '26-2': ['z-2'],
  '26-3': ['z-2'],
  '26-4': ['z-2'],
  '26-5': ['z-2'],
  '26-6': ['z-2'],
  '26-7': ['z-2'],
  '34-0': ['26-7', '34-2'],
  '34-1': ['34-4'],
  '34-2': ['34-5'],
  '34-3': ['34-6'],
  '34-4': ['z-2'],
  '34-5': ['34-7'],
  '34-6': ['z-2'],
  '34-7': ['z-2'],
  '8-0': ['12-0'],
  '8-1': ['12-1'],
  '8-2': ['12-2'],
  '8-3': ['12-3'],
  '8-4': ['12-4'],
  '8-5': ['12-5'],
  '8-6': ['12-6'],
  '8-7': ['12-7']
},
'sq4': {
  '0-0': ['8-0'],
  '0-1': ['8-1'],
  '0-2': ['8-2'],
  '0-3': ['8-3'],
  '0-4': ['8-4'],
  '0-5': ['8-5'],
  '0-6': ['8-6'],
  '0-7': ['8-7'],
  '12-0': ['20-0'],
  '12-1': ['20-1'],
  '12-2': ['20-2'],
  '12-3': ['20-3'],
  '12-4': ['20-4'],
  '12-5': ['20-5'],
  '12-6': ['20-6'],
  '12-7': ['20-7'],
  '14-0': ['22-0'],
  '14-1': ['22-1'],
  '14-2': ['22-2'],
  '14-3': ['22-3'],
  '14-4': ['22-4'],
  '14-5': ['22-5'],
  '14-6': ['22-6'],
  '14-7': ['22-7'],
  '20-0': ['20-5', '22-3'],
  '20-1': ['22-5'],
  '20-2': ['20-7'],
  '20-3': ['22-7'],
  '20-4': ['z-4'],
  '20-5': ['z-4'],
  '20-6': ['z-4'],
  '20-7': ['z-4'],
  '22-0': ['22-5', '26-2'],
  '22-1': ['26-4'],
  '22-2': ['22-7', '26-5'],
  '22-3': ['26-6'],
  '22-4': ['z-4'],
  '22-5': ['26-7'],
  '22-6': ['z-4'],
  '22-7': ['z-4'],
  '26-0': ['34-0'],
  '26-1': ['34-1'],
  '26-2': ['34-2'],
  '26-3': ['34-3'],
  '26-4': ['34-4'],
  '26-5': ['34-5'],
  '26-6': ['34-6'],
  '26-7': ['34-7'],
  '34-0': ['34-5'],
  '34-1': ['z-4'],
  '34-2': ['34-7'],
  '34-3': ['z-4'],
  '34-4': ['z-4'],
  '34-5': ['z-4'],
  '34-6': ['z-4'],
  '34-7': ['z-4'],
  '8-0': ['12-2', '14-1'],
  '8-1': ['12-4'],
  '8-2': ['12-5', '14-3'],
  '8-3': ['12-6'],
  '8-4': ['14-5'],
  '8-5': ['12-7'],
  '8-6': ['14-7'],
  '8-7': ['z-4']
}
}
