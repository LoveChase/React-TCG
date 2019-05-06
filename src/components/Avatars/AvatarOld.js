import React, { Component } from 'react'

export class AvatarOld extends Component {
  render() {
    const { id, name, img, description } = this.props.avatar;
    return (
        <div id={id} className="interface" onClick={this.props.selectAvatar.bind(this, id)}>
        <button
          type="button"
          className="link-button" 
            style={{padding:"10px"}}>
            <img src={img} alt={name}></img>
            <div>
                <h3>{name}</h3>
                <p>{description}</p>
            </div>
        </button>
    </div>
    )
  }
}

export default AvatarOld
