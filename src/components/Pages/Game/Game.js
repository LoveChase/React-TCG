import React, { Component } from 'react'
import Card from './Card'
import Hand from './Hand'
import Player from './Player'
import Deck from './Deck'
import Avatar from "./Avatar"
import Field from "./Field"
import './Styles/game.css'
import sheild from '../../../img/shield.png'
import redAvatar from '../../../img/fireAvatar.jpg'
import greenAvatar from '../../../img/grassAvatar.jpg'
import redMana from '../../../img/redMana.png'
import greenMana from '../../../img/greenMana.png'
import draw from "../../../audio/Draw.mp3"
import destroy from "../../../audio/Destroyed.mp3"
import summon from "../../../audio/Summon.mp3"
import endTurn from "../../../audio/EndTurn.mp3"
import playerDamage from "../../../audio/PlayerDamage.mp3"
import attack from "../../../audio/Attack.mp3"
import defend from "../../../audio/Defend.mp3"
import $ from 'jquery';
require('jquery-ui-bundle');


export class Game extends Component {
    state ={
      cards:[],
      playerCards: this.props.playerCards,
      enemyCards: this.props.enemyCards,
      playerCreated: false,
      enemyCreated: false,
      playerTurn: true,
      enemyTurn: false,
      currentAttack: 0,
      currentDefense: 0,
      playerDeck:[],
      playerHand:[],
      enemyHand:[],
      playerField:[],
      enemyField:[],
      playerHealth: 10,
      playerMana: 5,
      enemyHealth: 15,
      enemyMana: 5,
      playingCard: false,
      avatar: this.props.avatar,
      drawAudio: new Audio(draw),
      destroyAudio: new Audio(destroy),
      summonAudio: new Audio(summon),
      endTurn: new Audio(endTurn),
      playerDamage: new Audio(playerDamage),
      attack: new Audio(attack),
      defend: new Audio(defend)
    }
    
    currentAttacker = {}
    currentDefender = {}


    drawCard = (cards, isPlayer)=>{
      //Player Draw
      if(isPlayer && this.state.playerTurn && cards.length > 0){
        this.state.drawAudio.play();
        setTimeout(()=>{ 
          let random = Math.floor((Math.random() * cards.length) + 0)
          this.state.playerHand.push(cards[random])
          this.props.playerCards.splice(random, 1)
          this.setState({ playerHand: this.state.playerHand })
         }, 1500);
      }
      //Enemy Draw
      else if(!isPlayer && cards.length > 0){
        this.state.drawAudio.play();
        setTimeout(()=>{ 
          let random = Math.floor((Math.random() * cards.length) + 0)
          this.state.enemyHand.push(cards[random])
          this.props.enemyCards.splice(random, 1)
          this.setState({ enemyHand: this.state.enemyHand })
        }, 1500);
      }
    }

    endTurn = (isPlayer)=>{
      $(`#playerTurn`).fadeOut()
      //Player End turn
      if(isPlayer){
        //End turn audio
        this.state.endTurn.play();
        setTimeout(()=>{
          //Draw Audio
          this.state.drawAudio.play();
          setTimeout(()=>{
          //Set Turn State
          this.setState({ playerTurn: false })
          this.setState({ enemyTurn: true })

          //Push card to Hand
          if(this.props.enemyCards.length > 0){
          let random = Math.floor((Math.random() * this.props.enemyCards.length) + 0)
          this.state.enemyHand.push(this.props.enemyCards[random])
          this.props.enemyCards.splice(random, 1)
          this.setState({ enemyHand: this.state.enemyHand })
          //Reset Player monsters canAttack and add mana
          this.setState({ enemyMana: this.state.enemyMana + 2})
          this.setState({ enemyField: this.state.enemyField.map((card)=> {card.canAttack = true; return card}) })
          }
          }, 1500);
        }, 1500);
        this.enemyTurn()
      }
      //Enemy End turn
      else if(!isPlayer){
        //End turn audio
        this.state.endTurn.play();
        setTimeout(()=>{
          //Draw Audio
          this.state.drawAudio.play();
          setTimeout(()=>{
          //Set turn state
          this.setState({ playerTurn: true })
          this.setState({ enemyTurn: false })

          //Push card to Hand
          if(this.props.playerCards.length > 0){
            let random = Math.floor((Math.random() * this.props.playerCards.length) + 0)
            this.state.playerHand.push(this.props.playerCards[random])
            this.props.playerCards.splice(random, 1)
            this.setState({ playerHand: this.state.playerHand })
            //Reset Player monsters canAttack and add mana
            this.setState({ playerMana: this.state.playerMana + 2})
            this.setState({ playerField: this.state.playerField.map((card)=> {card.canAttack = true; return card}) })
            // Show text for player turn
            $(".turn-text").fadeIn()
            setTimeout(()=>{ 
              $(".turn-text").fadeOut()
              $(`#playerTurn`).fadeIn()
          }, 1000);
          }
          }, 1500);
        }, 1500);
      }
      //remove selected card yellow indicator
      $(".card-container").removeClass("active-card")
    }

    enemyTurn = ()=>{
      setTimeout(()=>{
        //Check Mana
        if (this.state.enemyMana > 0){
          //Enemy Summon card
          this.state.summonAudio.play();
          let random = Math.floor((Math.random() * this.state.enemyHand.length) + 0)
          this.state.enemyField.push(this.state.enemyHand[random])

          //Adjust state based on playing card
          let manaCost  = this.state.enemyHand[random].manaCost
          this.state.enemyHand.splice(random, 1)
          this.setState({ enemyHand: this.state.enemyHand })
          this.setState({ enemyField: this.state.enemyField })
          this.setState({ enemyMana: this.state.enemyMana - manaCost })
        }
        setTimeout(()=>{ this.enemyAttack()}, 2500);
        }, 5000);

    }

    enemyAttack = ()=>{

        //Check Mana
        if (this.state.enemyField.length > 0){
          //Enemy Summon card
          for (let i = 0; i< this.state.enemyField.length; i++){
            setTimeout(()=>{ 

            let attack = this.state.enemyField[i].attack
            if(this.state.playerField.length > 0){
              //Attack Effects
              $(`#${this.state.enemyField[i].id}`).parent().effect( "bounce", "slow");
              this.state.attack.play()
              //Defend Effects
              setTimeout(()=>{ $(`#${this.currentDefender.id}`).parent().effect( "shake", "slow"); 
              this.state.defend.play()
              }, 1000);

              let random = Math.floor((Math.random() * this.state.playerField.length) + 0)
              this.currentDefender = this.state.playerField[random]
              this.currentDefender.defense = this.currentDefender.defense - attack;

              //Destroy card if Defense <= 0
              if(this.currentDefender.defense <= 0){
                this.state.destroyAudio.play();
                setTimeout(()=>{ $(`#${this.currentDefender.id}`).parent().effect( "explode", "slow")}, 2000);
                setTimeout(()=>{ this.state.playerField.splice(random, 1)}, 2500);
              }
              //Set Player Field 
              this.setState({ playerField: this.state.playerField })
      
            }
            //Attack Player if no Monsters on Field
            else{
              this.setState({ playerHealth: this.state.playerHealth - attack })
              this.state.playerDamage.play();
              $(`#${this.state.enemyField[i].id}`).parent().effect( "bounce", "slow");
              let player;
              (this.props.avatar === "red") ? player = "red" : player = "green"
              this.state.playerDamage.play();
              $(`.${player}Avatar`).effect( "pulsate", "slow");
            }
          }, i*5000);}

        }
        //End Turn
        setTimeout(()=>{ this.endTurn(false)}, 6000);
    }

    playCard = (currentCard, canPlay, isPlayer)=>{
      if(isPlayer && canPlay && this.state.playerTurn && this.state.playerMana >= currentCard.manaCost && !this.playingCard){
        //Card Audio and Visula summon
        this.state.summonAudio.play();
        $(`#${currentCard.id}`).parent().effect( "clip", 1500)
        //Push Card to Field
        this.setState({ playingCard: false })
        setTimeout(()=>{
        let newHand = this.state.playerHand.filter((card)=>card.id !== currentCard.id )
        this.state.playerField.push(currentCard)
        this.setState({ playerHand: newHand })
        this.setState({ playerField: this.state.playerField })
        this.setState({ playerMana: this.state.playerMana - currentCard.manaCost })
        this.setState({ playingCard: true })
      }, 1500);
      }
      else if(!isPlayer && canPlay && this.state.enemyTurn && this.state.enemyMana >= currentCard.manaCost){
        let newHand = this.state.enemyHand.filter((card)=>card.id !== currentCard.id )
        this.state.enemyField.push(currentCard)
        this.setState({ enemyHand: newHand })
        this.setState({ enemyField: this.state.enemyField })
        this.setState({ enemyMana: this.state.enemyMana - currentCard.manaCost })
      }
    }

    cardAttack = (currentCard, isPlayer, onField)=>{
      if(isPlayer && this.state.playerTurn && onField){
        this.setState({ currentAttack: currentCard.attack })
        this.currentAttacker = currentCard
        if(this.state.enemyField.length === 0){
          $(".card-container").removeClass("active-card")
          $(`#${currentCard.id}`).parent().effect( "bounce", "slow");
          let enemy;
          (this.props.avatar === "red") ? enemy = "green" : enemy = "red"
          this.state.playerDamage.play();
          $(`.${enemy}Avatar`).effect( "pulsate", "slow");
          this.setState({ enemyHealth: this.state.enemyHealth - currentCard.attack})
          this.currentAttacker.canAttack = false
        }
      }
    }

    cardDefend = (currentCard, isPlayer, onField)=>{
      console.log(currentCard)
      if(!isPlayer && this.state.playerTurn && onField && this.state.playerTurn && this.currentAttacker.canAttack){
      
        //Set Monster can Attacj this turn to false
        this.currentAttacker.canAttack = false

        //Att and Def animations
        let attackerId = this.currentAttacker.id
        let defenderId = currentCard.id
        $(`#${attackerId}`).parent().effect( "bounce", "slow");
        this.state.attack.play()
        setTimeout(()=>{ $(`#${defenderId}`).parent().effect( "shake", "slow");
        this.state.defend.play()
      }, 1000);
    
        //Update State and Values of Defender
        this.setState({ currentDefense: currentCard.defense })
        currentCard.defense = currentCard.defense - this.state.currentAttack
        this.currentAttacker.canAttack = false

        //remove selected card yellow indicator
        $(".card-container").removeClass("active-card")
        if(currentCard.defense <= 0){
          this.state.destroyAudio.play();
          setTimeout(()=>{ $(`#${defenderId}`).parent().effect( "explode", "slow");}, 1500);
          setTimeout(()=>{ 
            let enemyField = this.state.enemyField.filter((card)=> card.id !== currentCard.id)
            this.setState({ enemyField: enemyField })
      }, 2000);
        }
      }
    }


    healthStyle = ()=> {
      return{
        background: `url(${sheild})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        bottom: '-35px',
        padding: '15px',
        height: '100%',
        right: '95px',
        fontSize: '30px',
        fontWeight: '700',
        color: this.props.avatar === "red" ? `green` : `red`,
        zIndex: '10',
        transform: `rotateY(180deg)`,
      }
      }

      manaStyle = ()=> {
        return{
            backgroundImage: this.props.avatar === "red" ? `url(${greenMana})` : `url(${redMana})`,
            backgroundSize: '100px',
            backgroundRepeat: 'no-repeat',
            position: 'absolute',
            bottom: '-30px',
            padding: '35px',
            height: '100%',
            right: '155px',
            fontSize: '30px',
            color: this.props.avatar === "red" ? `green` : `red`,
            lineHeight: '.7',
            fontWeight: '700',
            zIndex: '10',
            backgroundPosition: `0px -5px`,
            transform: `rotateY(180deg)`,
        }
        }

        avatarStyle = ()=> {
          return{
              position: 'absolute',
              bottom: '0px',
              width: '20%',
              padding: '45px',
              height: '100%',
              right: '0px',
              backgroundSize: 'cover',
              backgroundImage: this.props.avatar === "red" ? `url(${greenAvatar})` : `url(${redAvatar})`,
              backgroundPosition: `25%`,
              borderRadius: '40%',
              boxShadow: this.props.avatar === "green" ? `0em 0em 43px 43px red` : `0em 0em 43px 43px green`
          }
          }

          battle = () =>{
            if(this.state.playerHealth && this.state.enemyHealth > 0 && this.state.playerHealth > 0 ){return {
              display: "block",
              transition: "2s",
              opacity: 1
            }}
            else{return {
              display: "none",
              transition: "2s",
              opacity: 0
            }}
          }

          win = () =>{
            if(this.props.avatar === "green" && this.state.enemyHealth <= 0){
              $('body').css("background", `url(${greenAvatar})`)
              $('body').css("background-size", `cover`)}
              else if(this.state.enemyHealth <= 0)
              { $('body').css("background", `url(${redAvatar})`)
              $('body').css("background-size", `cover`)}

            if(this.state.enemyHealth <= 0)
            {return {
              display: "block",
              transition: "2s",
              opacity: 1
            }}
            else{return {
            display: "none",
            transition: "2s",
            opacity: 0
          }}
          }

          lose = () =>{
            if(this.props.avatar === "green" && this.state.playerHealth <= 0){
              $('body').css("background", `url(${redAvatar})`)
              $('body').css("background-size", `cover`)}
              else if(this.state.playerHealth <= 0)
              { $('body').css("background", `url(${greenAvatar})`)
              $('body').css("background-size", `cover`)}

            if(this.state.playerHealth <= 0){return {
              display: "block",
              transition: "2s",
              opacity: 1
            }}
            else{return {
              display: "none",
              transition: "2s",
              opacity: 0
            }}
          }

    render() {
      return( 
        <React.Fragment>
          <div id="battle" style={this.battle()}>
          {/* Player */}
          <Player>
            <Field>
              {this.state.playerField.map(card => <Card cardDefend={this.cardDefend} cardAttack={this.cardAttack} onField={true} playerTurn={this.state.playerTurn} cardSelect={this.cardSelect} canPlay={false} isPlayer={true} playCard={this.playCard} key={card.id} card={card}/>)}  
            </Field>
            <Hand>
              {this.state.playerHand.map(card => <Card cardDefend={this.cardDefend} cardAttack={this.cardAttack} onField={false} cardSelect={this.cardSelect} canPlay={true} isPlayer={true} playCard={this.playCard} key={card.id} card={card}/>)}
            </Hand>
            <Avatar isPlayer={true} playerHealth={this.state.playerHealth} playerMana={this.state.playerMana} avatar={this.props.avatar}>
            </Avatar>
            <Deck avatar={this.props.avatar} buttonId={"playerTurn"} endTurn={this.endTurn} drawCard={this.drawCard} isPlayer={true} cards={this.props.playerCards}>
            {this.props.playerCards.map(card => <Card cardDefend={this.cardDefend} cardAttack={this.cardAttack} onField={false} cardSelect={this.cardSelect} canPlay={true} playCard={this.playCard} key={card.id} card={card}/>)}
            </Deck>
          </Player>

         {/* Enemy */}
          <Player enemyPlayer={enemyPlayer}>
            <Field enemyField={enemyField}>
              {this.state.enemyField.map(card => <Card cardDefend={this.cardDefend} isPlayer={false} onField={true} cardSelect={this.cardSelect} canPlay={false} playCard={this.playCard} key={card.id} card={card}/>)}  
            </Field>
            <Hand enemyHand={enemyHand}>
              {this.state.enemyHand.map(card => <Card cardDefend={this.cardDefend} isPlayer={false} cardSelect={this.cardSelect} enemyCard={enemyCard} canPlay={true} playCard={this.playCard} key={card.id} card={card}/>)}
            </Hand>
            <Avatar isPlayer={false} avatarStyle={this.avatarStyle()} healthStyle={this.healthStyle()} manaStyle={this.manaStyle()} playerHealth={this.state.enemyHealth} playerMana={this.state.enemyMana} avatar={this.props.avatar}>
            </Avatar>
            <Deck avatar={this.props.avatar} buttonId={"enemyTurn"} endTurn={this.endTurn} drawCard={this.drawCard} isPlayer={false} cards={this.props.enemyCards}>
            {this.props.enemyCards.map(card => <Card cardDefend={this.cardDefend} cardSelect={this.cardSelect} canPlay={true} playCard={this.playCard} key={card.id} card={card}/>)}
            </Deck>
          </Player>
          </div>

          <div className="end-game-container" style={this.win()}>
          <div className="end-game"><h2>&nbsp; You Win &nbsp;</h2></div>
          <button className="end-button" onClick={()=>window.location.reload()} >Play Again</button>
          </div>

          <div className="end-game-container" style={this.lose()}>
          <div className="end-game"><h2>&nbsp; You Lose &nbsp;</h2></div>
          <button className="end-button" onClick={()=>window.location.reload()}>Play Again</button>
          </div>

        </React.Fragment>
      )
    }
}

const enemyPlayer = {
  transform: `rotateY(180deg)`,
  top: `0px`,
  position: 'absolute',
  width: '100%',
  height: '50%',
  }

  const enemyField  = {
    position: 'absolute',
    top: '100px',
    width: '100%',
    padding: '45px',
    transition: '1s',
    display: `flex`,
    justifyContent: `center`,
    transform: `rotateY(180deg)`,
    zIndex: 10
    }

const enemyHand = {
  position: 'absolute',
  top: '-100px',
  width: '80%',
  padding: '45px',
  transition: '1s',
  transform: `rotateY(180deg)`,
  display: `flex`,
  justifyContent: `center`
  }

  const enemyCard = {
    transform: `rotateY(180deg)`,
    float: 'right'
    }

export default Game
