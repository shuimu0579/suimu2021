import React, { Fragment } from 'react'
import './demo.css'

class HelloMessage extends React.Component {
  jumpTo() {
    // const obj = { a: 1, b: 2 }
    // console.log({ ...obj, a: 3 })

    const arr = [1, 2, 3]
    console.log([...arr, 4])
  }
  render() {
    return (
      <Fragment>
        <div className="text" style={{ color: 'green' }}>
          Hello {this.props.name}
        </div>
        <button onClick={() => this.jumpTo()}>{this.props.name}</button>
      </Fragment>
    )
  }
}

export default HelloMessage
