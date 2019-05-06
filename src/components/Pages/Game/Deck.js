import React, { Component } from 'react'
import '../../../App.css';
export class Deck extends Component {

  render() {
    return (
    <div className="deck" style={deck}>
        {this.props.children}
        <button style={draw} className="btn btn-primary draw" onClick={this.props.drawCard.bind(this, this.props.cards, this.props.isPlayer)}>
        Draw</button>
        <button id={this.props.buttonId} className="btn btn-primary endTurn" onClick={this.props.endTurn.bind(this, this.props.cards, this.props.isPlayer)}>
        End Turn</button>
    </div>
    )
  }
}

const deck = {
    position: 'absolute',
    bottom: '0px',
    width: '20%',
    padding: '45px',
    height: '100%',
    right: '0px'
    }

const draw ={
    zIndex: 10,
    bottom: '0px',
    position: "absolute",
    opacity: 0,
    width: '1px',
    height: "1px,"

}

export default Deck
