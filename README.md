# Tote application
# Functional Requirement: 
Simulate Tote gaming app

# Technical Requirements:
## Interface Components:
1. Components to handle input and output. Currently supported are stdin and stdout. This should parse input and update input array.
## Core Components:
This should be  engine of the betting game which is running all the time and waiting for input. It should start of a game, do calculations and create output as a result array.

Approach is to start with core component. Test with unit test cases and then create Interface components.

## Core Component design:
Data Structure: To support three products, WIN, PLACE, EXACTA three category of array needs to be created.
Initial Data structure: Object storing first level of data as name value pair in a object.This is to give easy access to data for each product. 
store : {
[win]:{},
[place]:{},
[exacta]:{}  
}

# Assumption:
1. The exacta numbers are not pre fixed with zero. The exacta order is being created a key for a name value pair. so the rules to define numbers must be clear. like 5,6 should not be entered as 05,06. 

#Technical Debts:
1. Missing config value through an error and stops application to start. Better logging can be done.
2. Better modularity can be done. As of now main.ts has a lot of code which can be modularised.

# Steps to run:
1. config entry as per test.json file in dev.json or local.json
2. npm install in the director of package.json.
3. npm run build and then npm run start or
 npm run start:dev

# Steps to test:
1. config setting into test.json
2. npm install
3. npm run test

# sample input:
Bet:W:2:200
Bet:P:2:200
Bet:P:3:300
Bet:P:4:400
Bet:E:2,3:900
Result:2:3:4

# sample output
Win:2:$0.85
Place:2:$1.32
Place:3:$1.32
Place:4:$1.32
Exacta:2,3:$0.82


