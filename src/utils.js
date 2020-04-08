/**
 * Description: 
 * Main function runs all the heading, movement, instruction parse and grid functions
 * Acceptance:
 * - Should call parse instructions and set variable
 * - Should call build grid and set variable
 * - Should iterate over rovers
 * - Each rover should have initial heading and position set
 * - Each rover should accept movement instrucitons and move
 * 
 * Testing: 
 * - Check if parse instructions called and variable set
 * - Check - Should call build grid and set variable
 * - Check - Should iterate over rovers
 * - Check - Each rover should have initial heading and position set
 * - Check - Each rover should accept movement instrucitons and move
 */
export const init = (INPUT) => {
  const {gridSize, rovers} = parseInstructions(INPUT)
  const grid = buildGrid(gridSize[0], gridSize[1])

  let result = []
  
  rovers.forEach( (r, roverIndex) => {
    let position = r[0].split(' ')
    let heading = position.pop()
    position = {x: parseInt(position[0]), y: parseInt(position[1])}
    grid[position.y][position.x].roverId = roverIndex + 1
    const directions = r[1].split('')

    directions.forEach( (d, index) => {
      if(d === 'L' || d === 'R') {
        heading = updateHeading(heading, d)
      }

      if(d === 'M') {
        position = move(position, heading)
        grid[position.y][position.x].roverId = roverIndex + 1
      }

      if(directions.length - 1 === index) {
        position.heading = heading
        result.push(position)
      }
    })
  })
  
  return {
    output: convertResultsToStr(result),
    grid
  }
}

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
      arr[a][b] = {roverId: null}
    }
  }
  return arr
}

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

export const move = ({x, y}, newHeading) => {
  
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
  return {x,y}
}

export const convertResultsToStr = (result) => {

  /**
   * 
   * Issue:
   * Issue matching the line break with Jest,
   * Rather use array as output
   */
  
  let output = []

  for(let obj of result) {
    const arr = Object.values(obj)
    // arr.push('\n')
    output.push(arr.join(' '))
  }

  return output
}