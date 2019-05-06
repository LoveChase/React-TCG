import React, { Component } from 'react'
import sheild from '../../../img/shield.png'
import redAvatar from '../../../img/fireAvatar.jpg'
import greenAvatar from '../../../img/grassAvatar.jpg'
import redMana from '../../../img/redMana.png'
import greenMana from '../../../img/greenMana.png'

export class Avatar extends Component {

    healthStyle = () =>{
        if(this.props.healthStyle){return this.props.healthStyle}
        else{        
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
            color: `${this.props.avatar}`,
            zIndex: '10',
        }}
      }
      
    manaStyle = () =>{
    if(this.props.manaStyle){return this.props.manaStyle}
    else{            
        return{
        backgroundImage: this.props.avatar === "green" ? `url(${greenMana})` : `url(${redMana})`,
        backgroundSize: '100px',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        bottom: '-30px',
        padding: '35px',
        height: '100%',
        right: '155px',
        fontSize: '30px',
        color: `${this.props.avatar}`,
        lineHeight: '.7',
        fontWeight: '700',
        zIndex: '10',
        backgroundPosition: `0px -5px`
    }}
      }

    avatarStyle = () =>{
    if(this.props.avatarStyle){return this.props.avatarStyle}
    else{            
        return{
            position: 'absolute',
            bottom: '0px',
            width: '20%',
            padding: '45px',
            height: '100%',
            right: '0px',
            backgroundSize: 'cover',
            backgroundImage: this.props.avatar === "green" ? `url(${greenAvatar})` : `url(${redAvatar})`,
            backgroundPosition: this.props.avatar === "green" ? `inherit` : `30%`,
            borderRadius: '40%',
            boxShadow: `0em 0em 43px 43px ${this.props.avatar}`
    }}
        }
    

    avatar = () =>{
        if(this.props.avatar === "green" && this.props.isPlayer){return "greenAvatar"}
        else if(this.props.avatar === "red" && this.props.isPlayer){return "redAvatar"}
        else if(this.props.avatar === "red" && !this.props.isPlayer){return "greenAvatar"}
        else {return "redAvatar"}
      }

  render() {
    return (
<div>
   <div style={this.avatarStyle()} className={this.avatar()}>
   </div>
   <div style={this.healthStyle()} className="avatar-health"> 
   <div style={{width:'33px', textAlign:"center"}}>{this.props.playerHealth} </div>
   </div>
   <div style={this.manaStyle()}> 
      <div style={{width:'33px', textAlign:"center"}}>{this.props.playerMana} </div>
   </div>
</div>
    )
  }
}


export default Avatar
