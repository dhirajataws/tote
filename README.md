# Tote application

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


