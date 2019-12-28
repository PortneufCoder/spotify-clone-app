import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import SongsList from './components/SongsList';
import SongDetails from './components/SongDetails';
import './App.css';
import axios from 'axios';


class App extends Component {

  constructor() {
    super();
    this.state = {
      songs: [{ source: "", title: "", description: "", id: "" }],
      songPosition: 0,
      pausePlay: 'Play Me',
      playing: false
    }
    this.playSong = this.playSong.bind(this);
    this.previousButton = this.previousButton.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.startPlaying = this.startPlaying.bind(this);
    this.jams = React.createRef();
    this.handleClick = this.handleClick.bind(this)
    this.handlePause = this.handlePause.bind(this)

  }


  handleClick = () => {
    this.jams.current.play();

  }

  handlePause = () => {
    this.jams.current.pause();
  }

  componentDidMount() {
    axios.get('http://localhost:8081/songs') // Had to set the full url to the backend server
      .then(res => {
        console.log(res.data)
        this.setState({

          songs: res.data
        })
      })
      .catch(err => {
        console.log(err)
      });
  }

  componentDidUpdate() {
    if (this.state.playing === true) {
      return this.audioRef.play(); // This ref targets the audio tag and applies appropriate method
    } else {
      return this.audioRef.pause();
    }

  }

  startPlaying = (list) => {
    if (this.state.pausePlay === 'Play Me') {
      this.setState({
        pausePlay: 'On Hold',
        playing: true,
        songPosition: list // 'list' this represents one song in the array
      })
    } else {
      this.setState({
        pausePlay: 'Play Me',
        songPosition: list,
        playing: false
      })
    }
  }

  playSong = (list) => {
    let songPosition = list;
    console.log('Attempting to play!')
    this.startPlaying(songPosition)

  }

  nextButton = () => {
    let useID = this.state.songPosition
    if (useID === this.state.songs.length - 1) {
      useID = 0
      this.setState({
        songPosition: 0
      })
    } else {
      useID++;
      this.setState({
        songPosition: useID
      })
    }
  }

  previousButton = () => {
    let useID = this.state.songPosition;
    if (useID === 0) {
      useID = this.state.songs.length - 1
      this.setState({
        songPosition: useID
      })
    } else {
      useID--;
      this.setState({
        songPosition: useID
      })
    }
  }

  render() {


    return (
      <div className="site-wrapper">
        <Router>
          <div>
            <Link to='/'>
              <h1 className="header">Synthify</h1>
            </Link>

            <Switch>

              <Route exact path="/" render={({ match }) => <SongsList songs={this.state.songs}
                playSong={this.playSong} match={match} songPosition={this.state.songPosition}

              />} />
              <Route path='/:songId' render={({ match }) => <SongDetails match={(match)} songs={this.state.songs}
                playSong={this.playSong} currentSong={this.state.songPosition}

              />} />

            </Switch>
            <div ref={this.jams}>
              <audio ref={(input) => { this.audioRef = input }} id="jams" src={this.state.songs[this.state.songPosition].source}></audio>
            </div>
            <div className="buttons" >
              <button className="btn btn-dark" onClick={() => this.previousButton('jams')}>Go Back</button>
              <button className="btn btn-dark" onClick={() => this.playSong(this.state.songPosition)}>{this.state.pausePlay}</button>
              <button className="btn btn-dark" onClick={() => this.nextButton()}>Advance</button>
              <div className="page-info ">
              </div>

            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
