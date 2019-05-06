import React, { Component } from 'react'
/* import Avatar from '../../Avatars/Avatar.js' */
import './main.css'

export class Main extends Component {
  render() {
    return (
      <div>
      <div className="split left" onClick={this.props.selectAvatar.bind(this, "green")}>
        <div className="inside-left"></div>
        </div>
        <div className="choose"><h2>&nbsp; Choose a Side &nbsp;</h2></div>
        <div className="split right">
        <div className="inside-right" onClick={this.props.selectAvatar.bind(this, "red")}></div>
      </div>
      </div>
    )
  }
}

/* this.props.avatars.map((avatar) => (
  <Avatar selectAvatar={this.props.selectAvatar} key={avatar.id} avatar={avatar} />
)); */

export default Main
