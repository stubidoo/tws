

/**
 * Description: 
 * 
 * Acceptance:
 * - Should parse input string into array by line-break
 * - Should extract gridSize and rovers from string 
 * - Should extract rovers into a nested arrary containing position, heading and instructions for each one
 * - Should be able to accept commands for multiple rovers
 * 
 * Testing: 
 * - Check if the line-breaks are detected
 * - Check if grid size is correctly set
 * - Check if rovers are set
 */
export const parseInstructions = (input) => {
  const strInput = input.match(/[^\r\n]+/g);

  const gridSize = strInput.shift().split(' ')

  const rest = strInput

  const rovers = []
  let n = 0
  for(let a = 0; a < rest.length / 2; a++) {
    if(!rovers[a]) rovers[a] = []
    for(let b = 0; b < 2; b++) {
      rovers[a][b] = rest[n]
      n++
    }
  }

  return {gridSize, rovers}
}

// instructions = parseInstructions(INPUT)

/**
 * Description:
 * Generate grid from first line of instructions
 * 
 * Acceptance:
 * - Should use the first line of instrucitons to generate a nested array 
 *   to represent the mars plateau
 * 
 * Testing: 
 * - Check that the array matches the expected grid size
 */

export const buildGrid = (x, y) => {
  const arr = []
  for(let a = 0; a <= y; a++) {
    if(!arr[a]) arr[a] = []
    for(let b = 0; b <= x; b++) {
      arr[a][b] = {pos:[b, a], rover: false, heading: ''}
    }
  }
  return arr
}

// grid = buildGrid(5,5)

/**
 * Description:
 * Determine direction from movement inputs 
 * 
 * Acceptance:
 * - Should update heading variable after reading each instruction, either 'L' or 'R'
 * 
 * Testing: 
 * - Check that movement sequence mathces expected heading
 */

export const updateHeading = (currentHeading, direction) => {
  const points = ['N', 'E', 'S', 'W']

  const index = points.indexOf(currentHeading)
  let newHeading

  if(direction === 'L') {
    if(index === 0) {
      newHeading = points[3]
    } else {
      newHeading = points[index - 1]
    }
  }

  if(direction === 'R') {
    if(index === 3) {
      newHeading = points[0]
    } else {
      newHeading = points[index + 1]
    }
  }
  return newHeading
}

// heading = updateHeading('W', 'R')

/**
 * Description:
 * Traverse grid through movement inputs and update position
 * 
 * Acceptance:
 * - Should update the x,y position after being called
 * 
 * Testing: 
 * - Check that the movement inputs match the expected 
 */

export const move = (grid, {x, y}, newHeading) => {
    // grid[y][x].rover = false
  
    switch (newHeading) {
      case 'N':
        y = y + 1
        break;
      case 'S':
        y = y - 1
        break;
      case 'W':
        x = x - 1
        break;
      case 'E':
        x = x + 1
        break;
      default:
        break;
    }

    grid[y][x].rover = true
    grid[y][x].heading = newHeading


    return {
      points: grid[y][x],
      grid: grid
    }
  
}

// position = move({x: 1, y: 2}, 'W')