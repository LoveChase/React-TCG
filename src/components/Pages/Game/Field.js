import React, { Component } from 'react'

export class Field extends Component {

  fieldStyle = () =>{
    if(this.props.enemyField){return this.props.enemyField}
    else{return field}
  }

  render() {
    return (
      <div className="field" style={this.fieldStyle()}>
      {this.props.children}
      </div>
    )
  }
}

const field = {
    position: 'absolute',
    bottom: '100px',
    width: '100%',
    padding: '45px',
    transition: '1s',
    display: `flex`,
    justifyContent: `center`
    }

export default Field
