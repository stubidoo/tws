import React, { Component, Fragment } from 'react'
import './App.css'
import {init} from './util'

const INPUT = 
`5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM
`

const Point = ({item}) => {
  const c = item.roverId ? 'rover' : 'item'
  return (
    <div className={c}></div>
  )
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      grid: [],
    }
  }

  componentDidMount(){
    this.setState({grid: init(INPUT).grid})
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
