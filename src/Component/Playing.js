import React from "react";
import "../css/playing.css";

export default class Playing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: 0,
    };

    this.intervalID = "";
  }

  // Logic for updating the current time of played song.
  componentDidMount() {
    const { audio } = this.props;

    this.setState({
      currentTime: audio.currentTime,
    });

    this.intervalID = setInterval(() => {
      this.setState(
      {
        currentTime: this.props.audio.currentTime,
      });
    },100);
  }

  // Clearing the interval
  componentWillUnmount(){
    clearInterval(this.intervalID);
  }

  render() {
    const { songItems, playing, songIndex, audio, songImgUrl } = this.props;

    // Current time of the song (0:01)
    var currentTimeRender = Math.floor(this.state.currentTime / 60) + ":" + Math.floor(this.state.currentTime % 60);

    // Total Duration of the song (3:40)
    var durationRender = Math.floor(audio.duration / 60) + ":" + Math.floor(audio.duration % 60);

    // Percentage of song has been played
    const percentageRender = {width: (this.state.currentTime/audio.duration * 100) + "%"};

    if(durationRender === "NaN:NaN"){
      durationRender = "0:00";
    } 

    // If second hand is less than 10, then showing (:01) 
    if(Math.floor(this.state.currentTime % 60 < 10)){
      currentTimeRender = Math.floor(this.state.currentTime / 60) + ":0" + Math.floor(this.state.currentTime % 60);
    }

    return (
      <div className="now-playing-container">
        <div className="song-details">
          <img src={songImgUrl} alt=""/>
          <div>
            {/* Song Name */}
            <h6>{songItems[songIndex]}</h6>

            {/* When Song is Paused then Playing will be displayed */}
            {playing && <h4 className="play-pause-nav">Playing</h4>}

            {/* When Song is Playing then Paused will be displayed */}
            {!playing && <h4 style={{color: "red"}} className="play-pause-nav">Paused</h4>}
          </div>
        </div>

        {/* Progress of the song */}
        <div className="status">
          {currentTimeRender}

          {/* Progress bar */}
          <div id="progress">
            <div style={percentageRender} id="progress-bar"></div>
          </div>

          {durationRender}
        </div>
      </div>
    );
  }
}
