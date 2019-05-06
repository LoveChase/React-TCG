import React, { Component } from 'react'

export class Hand extends Component {
  handStyle = () =>{
    if(this.props.enemyHand){return this.props.enemyHand}
    else{return hand}
  }

  render() {
    return (
      <div className="hand" style={this.handStyle()}>
        {this.props.children}
      </div>
    )
  }
}
const hand = {
  position: 'absolute',
  bottom: '-100px',
  width: '80%',
  padding: '45px',
  transition: '1s',
  display: `flex`,
  justifyContent: `center`
  }

export default Hand
