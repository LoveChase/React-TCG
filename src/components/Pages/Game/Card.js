import React, { Component } from 'react'
import './Styles/card.css'
import './Styles/cardFlip.css'
import greenBackground from '../../../img/green_background.jpg'
import redBackground from '../../../img/red_background.png'
import $ from 'jquery';

export class Card extends Component {
   state ={
      actionsOpen: "actions-open",
      actionsClosed: "actions-closed",
      attackText: "Attack"
    }

  getBackground =(element)=>{
    return{
      backgroundImage: element ==='green' ? `url(${greenBackground})` : `url(${redBackground})`
    }
  }

  getFrame =(element)=>{
   return{
     boxShadow: element ==='green' ? `0 0 0 2px #171314, 0 0 0 5px #26714A, -3px 3px 2px 5px #171314` : `0 0 0 2px #171314, 0 0 0 5px #941e1e, -3px 3px 2px 5px #171314`
   }
 }

  cardStyle = () =>{
    if(this.props.enemyCard){return this.props.enemyCard}
  }

  cardActions = (isPlayer, playerTurn)=>{
   if(isPlayer && playerTurn && this.state.actionsOpen === "actions-open"){
      this.setState({ actionsOpen: "actions-closed", actionsClosed: "actions-open"  })
   }
/*    else if(!isPlayer){
      this.props.cardDefend(this.props.card, this.props.isPlayer, this.props.onField)
   } */
 }

 closeCardActions = (isPlayer, playerTurn)=>{
   if(isPlayer && playerTurn && this.state.actionsOpen === "actions-closed"){
      this.setState({ actionsOpen: "actions-open", actionsClosed: "actions-closed"  })
   }
   this.setState(
      attackText({
        type: "Attack"
      })
    );
 }

 attack = (e)=>{
    let card = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
    $(".card-container").removeClass("active-card")
   $(card).addClass(`active-card`)
   this.props.cardAttack(this.props.card, this.props.isPlayer, this.props.onField)
   this.setState(
      attackText({
        type: "Choose a Target"
      })
    );
}

cancel = (e)=>{
   let card = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
   $(card).removeClass(`active-card`)
   this.setState(
      attackText({
        type: "Attack"
      })
    );
}

canAttack = (canAttack) =>{
   if(!canAttack){return {display: "none"}}
 }


  
  render() {
    const { id, element, name, manaCost, img, type, power, description, caption, attack, defense, canAttack } = this.props.card;
    return (
<div className="card-field-hover" onMouseOver={this.cardActions.bind(this, this.props.isPlayer, this.props.playerTurn)}
onMouseLeave={this.closeCardActions.bind(this, this.props.isPlayer, this.props.playerTurn)}
onClick={this.props.cardDefend.bind(this, this.props.card, this.props.isPlayer, this.props.onField)}>
<div id={id} className="card-container" style={this.cardStyle()}
onClick={this.props.playCard.bind(this, this.props.card, this.props.canPlay, this.props.isPlayer)}>

   <div className="front face">

      <div className="card-background" style={this.getBackground(element)} >

         <div className="card-frame">
            <div className="frame-header" style={this.getFrame(element)}>
               <h1 className="name">{name}</h1>
               <i className="ms ms-g" id="mana-icon">{manaCost}</i>
            </div>
            <img className="frame-art" style={this.getFrame(element)} src={img} alt="nissa art"></img>
            <div className="frame-type-line" style={this.getFrame(element)}>
               <h1 className="type">{type}</h1>
            </div>
            
            {/* Visible Card Info // Toggle*/}
            <div className={this.state.actionsClosed}>
            <div className="frame-text-box" style={this.getFrame(element)}>
               <p className="description ftb-inner-margin">{power}
               </p>
               <p className="description">
                  {description}
               </p>
               <p className="flavour-text">{caption}
               </p>
            </div>
            </div>
            
            {/* Hidden Actions //Toggle */}
            <div className={this.state.actionsOpen}>
            <div className="frame-text-box" style={this.getFrame(element)}>
            <button style={this.canAttack(canAttack)} className="btn btn-primary half-btn attack-text" onClick={this.attack.bind(this)}>{this.state.attackText}</button>
            <button className="btn btn-primary half-btn" onClick={this.cancel.bind(this)}>Cancel</button>
            </div>
            </div>

            <div className="stats">{attack} / {defense}</div>
         </div>
      </div>
   </div>
   <div className="back face"></div>
</div>
</div>
    )
  }
}

const attackText = action => (state, props) => {
   switch (action.type) {
     case "Choose a Target":
       return {
         attackText: 'Choose a Target',
       };
       case "Attack":
       return {
         attackText: 'Attack',
       };
     default:
       return null;
   }
 };

export default Card
