import React, { Component } from 'react'

export class Player extends Component {
    playerStyle = () =>{
        if(this.props.enemyPlayer){return this.props.enemyPlayer}
        else{return player}
      }
  
    render() {
    return (
    <div style={this.playerStyle()}>
        {this.props.children}
    </div>
    )
  }
}

const player = {
    position: 'absolute',
    bottom: '0px',
    width: '100%',
    height: '50%',
    }
  

export default Player
