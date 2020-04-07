import React, { Component, Fragment } from 'react'
import './App.css'
import {parseInstructions, buildGrid, updateHeading, move} from './lib'

const INPUT = 
`5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM
`

const Point = ({item}) => {
  const c = item.rover ? 'rover' : 'item'
  const {pos, heading} = item
  return (
    <div className={c} data-testid={`${pos[0]} ${pos[1]} ${heading}`}></div>
  )
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      grid: [],
      instructions: null,
      rovers: []
    }
  }

  async componentDidMount(){
    const {gridSize, rovers} = parseInstructions(INPUT)
    const grid = buildGrid(gridSize[0], gridSize[1])
    this.setState({
      grid, rovers
    }, this.init)
  }

  init() {
    const {grid, rovers} = this.state
    // console.log(grid, rovers)
    
    for(let r of rovers) {
      let position = r[0].split(' ')
      let heading = position.pop()

      const temp = [...grid]
      temp[parseInt(position[1])][parseInt(position[0])].rover = true
      this.setState({
        grid: temp
      })
  
      const directions = r[1].split('')

      for(let d of directions) {
        if(d === 'L' || d === 'R') {
          heading = updateHeading(heading, d)
        }
        if(d === 'M') {
          const moveRes = move(
            temp,
            {x: parseInt(position[0]), y: parseInt(position[1])}, 
            heading
          )
          
          position = moveRes.points.pos
          
            this.setState({
              grid: moveRes.grid
            })
        }
      }
    }
  }

  render() {
    return (
      <div className="container">
      {
        this.state.grid.reverse().map( (row, index) => (
          <Fragment key={index}>
            <div className="row-group">
              <span className='numY'>{(row.length -1) - index}</span>
              <div className='row'>
              {
                row.map( (i, index) => (
                  <Point item={i} key={index} />
                ))
              }
              </div>
            </div>
            {
              index === row.length - 1 && (
                <div className="row bottom-numbers">
                  {
                    row.map( (i, index) => (
                      <span className='numX' key={index}>{index} </span>
                    ))
                  }
                </div>
              )
            }
          </Fragment>
        ))
      }
      <br/><br/>

      Notes: <br/>

      - Red dots indicate paths of the rovers
    </div>
    )
  }
}
