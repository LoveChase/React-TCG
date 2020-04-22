import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Main from './components/Pages/Main/Main';
import Game from './components/Pages/Game/Game';
import $ from 'jquery';
import axios from 'axios';
import './App.css';
import backgroundAudio from "./audio/Background.mp3"
import redAudio from "./audio/FireAvatar.mp3"
import allCards from "./components/Pages/Game/json/cards.json"
require('jquery-ui-bundle');

class App extends Component {
  state = {
    todos: [],
    avatar: "",
    redCards:[],
    greenCards:[],
    playerCards:[],
    playerCreated: false,
    enemyCreated: false,
    enemyCards:[],
    mainView: true,
    gameView: false,      
    avatarAudio: new Audio(redAudio),
  }

  //Get Cards
  componentDidMount() {
    setTimeout(()=>{ 
      let audio = new Audio(backgroundAudio)
      audio.volume = 0.2
      audio.play()
     }, 1000);
    //Removed API, site is no longer available
    // axios.get(`https://api.myjson.com/bins/ftfz8`)
    //   .then(res => {this.setState({ cards: res.data })
      this.setState({ cards: allCards })
      // Set Green Cards
      let redCards = allCards.filter((card)=> card.element === 'red')
      this.setState({ redCards: redCards})

      //Set Red Cards
      let greenCards = allCards.filter((card)=> card.element === 'green')
      this.setState({ greenCards: greenCards})

    // })
  }

  playerCards = (avatar)=>{
    if(avatar === "green"){
        //Set State 
          this.setState({ playerCards: this.state.greenCards})
          this.setState({ enemyCards: this.state.redCards})
          this.setState({ playerCreated: true})
      }
      else if(avatar === "red"){
        //Set State 
        this.setState({ playerCards: this.state.redCards})
        this.setState({ enemyCards: this.state.greenCards})
        this.setState({ playerCreated: true})
  }
}

  // Toggle Complete
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    }) });
  }


  ////////////////////////////////////////////////////////////////////////
  selectAvatar = (avatar) =>{
    this.state.avatarAudio.play()
    this.setState({mainView: false});
    this.setState({gameView: true});
    this.setState({avatar: avatar});
    this.playerCards(avatar);
    setTimeout(()=>{ 
      $('.main').hide()
      //Draw initial hands
      for(let i = 0; i < 4; i++){
        setTimeout(()=>{ $(`.draw`).click()}, i*2500);
      }
      // Show Turn text
      setTimeout(()=>{ 
        $("#battle").append(`<div class="turn-text"><h2> Your Turn </h2></div>`)
        $(".turn-text").hide()
        $(".turn-text").fadeIn()
        setTimeout(()=>{ 
          $(".turn-text").fadeOut()
          $(`.draw`).hide()
          $(`#playerTurn`).fadeIn()
        }, 1000);
      }, 10000);
    }, 2500);
}

mainView = () => {
  return {
    opacity: this.state.mainView ? '1' : '0'
  }
}

gameView = () => {
  return {
    opacity: this.state.gameView ? '1' : '0'
  }
}

avatarCursor = () =>{
  if(this.state.avatar === "green"){return "green"}
  else{return "red"}
}

  render() {
    return (
      <Router>
        <div className="App">
          <div className={this.avatarCursor()}>
            <Header />
            <Route exact path="/play" render={props => (
              <React.Fragment >
              <div className="transition main" style={this.mainView()}>
              <Main avatars={this.state.avatars} selectAvatar={this.selectAvatar}/>
              </div>
              <div className="transition game" style={this.gameView()}>
              <Game avatar={this.state.avatar} playerCards={this.state.playerCards} enemyCards={this.state.enemyCards} style={this.gameView()}/>
              </div>
              </React.Fragment>
              )} 
            />
          </div>  
        </div>
      </Router>
    );
  }
}

export default App;
