import {parseInstructions, buildGrid, updateHeading, move} from '../lib'
import {PARSED_INSTRUCTIONS, GENERATED_GRID} from '../mocks/lib-data'
// const util = require('util')



const INPUT = 
`5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM
`

const grid = buildGrid(5,5)

test('Parsing instructions works', () => {
  const instructions = parseInstructions(INPUT)
  expect(instructions).toEqual(PARSED_INSTRUCTIONS)
})

test('Builds 2D array based on grid coordinates', () => {
  expect(grid).toEqual(GENERATED_GRID)
  // console.log(util.inspect(grid, {showHidden: false, depth: null}))
})

test('Updates heading according to given direction', () => {
  let heading = updateHeading('W', 'R')
  expect(heading).toEqual('N')

  heading = updateHeading('N', 'L')
  expect(heading).toEqual('W')

  heading = updateHeading('E', 'R')
  expect(heading).toEqual('S')

  heading = updateHeading('S', 'L')
  expect(heading).toEqual('E')
})

test('Move function returns the correct coordinates', () => {
  const START = {x: 1, y: 2}
  const position = move(grid, START, 'W')
  expect(position.points).toEqual(
    { pos: [ 0, 2 ], rover: true, heading:  'W'}
  )
})