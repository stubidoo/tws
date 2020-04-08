## Coding Test

### Scripts

Run `yarn` to install dependancies

Run `yarn start` to run app

Run `yart test` to run unit tests

### Main files & folders
- /__tests__
- /mocks
- App.js
- utils.js

### Approach

From the instructions, I understood that I needed to plot the movements of a mars rover on a given grid.
The application is broken down into 4 main functions:

1. Parse the string input into a readable object.
2. Build a 2D array structure to represent the grid points from the first line of the input.
3. Update the heading from one of the directional strings, nameley 'L' or 'R'
4. When an 'M' is read from the instructions the move() function returns the new grid points