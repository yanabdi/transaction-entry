# Transaction Entry

## Details
Date: 25/7/2026  
Authors: 
- Yan Abdi
- Sean Sun

## Description
Application that interacts with a google spreadsheet for easy transaction record keeping.
*Note: Google spreadsheet interaction is by script and thus not well protected.

## Considerations
- Bare bones folders
- Other features
    - Budget amounts?
    - Goals?
    - AI Categorization
- Data node -> what is needed
    - Date
    - Category
    - Amount
    - (OPTIONAL) Name
    - (OPTIONAL) Description
    - (OPTIONAL) Notes
- What data structure to store information 
- Consider Data node to manage
- Extendibles
    - AI recommendation of sorts
    - API interaction with actual banking apps?
    - Ship as an application

## Instructions
1. Open terminal
2. Run 'npm install --save-dev typescript'
3. Run 'npx tsc ./src/App.ts'
4. Run 'node ./src/app.js'