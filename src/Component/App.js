import React from "react";
import Case from "./Case"; // Import iPod body file

// Import songs
import song1 from "../static/songs/Post Malone - White Iverson.mp3";
import song2 from "../static/songs/John Denver - Country Roads.mp3";
import song3 from "../static/songs/Sigrid - High Five.mp3";
import song4 from "../static/songs/Khalid - Young Dumb Broke.mp3";
import song5 from "../static/songs/Rick Astley - Never Gonna Give You Up.mp3";
import Song6 from "../static/songs/Chali Re Chali Babul Ki Gali.mp3";
import Song7 from "../static/songs/Chura Liya Hai Tumne Jo Dil Ko.mp3";
import Song8 from "../static/songs/hum-katha-sunate-most-loved-song-instrument-53584.mp3";

// Import song cover images
import song1Img from "../static/Post Malone - White Iverson.png";
import song2Img from "../static/John Denver - Country Roads.jpg";
import song3Img from "../static/Sigrid - High Five.png";
import song4Img from "../static/Khalid - Young Dumb Broke.jpg";
import song5Img from "../static/Never Gonna Give You Up.png";

// Import wallpapers
import Wallpaper1 from "../static/wallpaper1.jpg";
import Wallpaper2 from "../static/wallpaper2.jpg";
import Wallpaper3 from "../static/wallpaper3.jpg";


export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      active: 0, //Active list items
      menuItems: ["Now Playing", "Music", "Games", "Settings"],
      musicItems: ["All Songs", "Artist", "Albums"], //Items in music
      songItemsUrl: [song1, song2, song3, song4, song5,Song6,Song7,Song8], //songs list
      songImgItemsUrl: [song1Img, song2Img, song3Img, song4Img, song5Img],
      wallpaperItems: [Wallpaper1, Wallpaper2, Wallpaper3],
      songItems: [
        "Post Malone - White Iverson",
        "John Denver - Country Roads",
        "Sigrid - High Five",
        "Khalid - Young Dumb Broke",
        "Rick Astley - Never Gonna Give You Up",
      ],
      songIndex: 0, //Current Song
      lengthMenuKey: { "-1": 3, 1: 2, 4: 4, 8: 4, 3: 2, 9: 3, 10: 2 }, //Length of particular menu
      menuMapping: {
        // It helps "menu" that can be rendered by key menu
        "-1": [0, 1, 2, 3], //"Now Playing" Option has 4 index value
        1: [4, 5, 6], //"Music" Option has 3 index value
        3: [8, 9, 10], //"Settings" Option has 3 index value
        // "Games" option does not have any child options thats why does not included here- 2: [7] which has a text.
      },
      currentMenu: -2, // Screen locked
      navigationStack: [], // used for forward and backward
      songUrl: song1, //current song URL
      playing: false, // it helps when the app loads for the first time, song will not play automatically
      theme: "rgb(210,210,210)", //current theme
      audio: new Audio(song1), //current song- song1
      songImgUrl: song1Img, //current song image
      wheelColor: "white",
      wallpaper: 0,
      noty: false, //initial notification
      notifyText: "Wallpaper Chnaged", //initial notification text
    };
  }

  // Function on long press of "forward" button tracks are seeked forward
  seekSongForward = (e) => {
    // Screen is locked, I dont have to move forward
    if (this.state.currentMenu === -2) {
      return;
    }

    // Current song is not playing, I dont have to move forward
    if (this.state.playing === false) {
      return;
    }

    // If screen is unlocked and song is playing then,
    // Using Zingtouch Lib for forwarding
    // checking if my wheel angle is less then 250 degree
    if (e.detail.interval < 250) {
      // Then pauses the current song and sets paused to TRUE.
      this.state.audio.pause();

      // Storing the current song index
      let songIndex = this.state.songIndex;

      // Checking if the current song index is at the end of the playlist,
      if (songIndex === this.state.songItemsUrl.length - 1) {
        songIndex = 0; // then code sets songIndex to 0.
      } else {
        songIndex++; // Otherwise, increments to move forward to the next song in the playlist.
      }

      // Storing the current song URL and image URL
      const songUrl = this.state.songItemsUrl[songIndex];
      const songImgUrl = this.state.songImgItemsUrl[songIndex];

      // setting the state of song's index, image, Url and audio with the callback function to play the song.
      this.setState(
        {
          songIndex: songIndex,
          songImgUrl: songImgUrl,
          songUrl: songUrl,
          audio: new Audio(songUrl),
        },
        () => {
          this.state.audio.play();
        }
      );
    }
    // Checking if the interval is greater than 250 but less than 10000. This range typically indicates a fast-forward action as it's presumed that rapid movement or a larger rotation of the seeking control (wheel, for instance) is being performed.
    else if (e.detail.interval > 250 && e.detail.interval < 10000) {
      // Calculates a time interval for fast-forwarding.
      const interval = e.detail.interval / 100;

      // updating the state
      this.setState((prevState) => {
        prevState.audio.currentTime += interval;
        return prevState;
      });
    }
  };


  // Function on long press of "backward" button tracks are seeked backward
  seekSongReverse = (e) => {
    // Screen is locked, I dont have to move backward
    if (this.state.currentMenu === -2) {
      return;
    }

    // Current song is not playing, I dont have to move backward
    if (this.state.playing === false) {
      return;
    }

    // If screen is unlocked and song is playing then,
    // Using Zingtouch Lib for backward
    // checking if my wheel angle is less then 250 degree
    if (e.detail.interval < 250) {
      // Then pauses the current song and sets paused to TRUE.
      this.state.audio.pause();

      // Storing the current song index
      let songIndex = this.state.songIndex;

      // Checking if the current song index is at the beginning,
      if (songIndex === 0) {
        songIndex = this.state.songItemsUrl.length - 1; // then code sets songIndex to last song of the list.
      } else {
        songIndex--; // Otherwise, decrements to move backward to the next song in the playlist.
      }

      // Storing the current song URL and image URL
      const songUrl = this.state.songItemsUrl[songIndex];
      const songImgUrl = this.state.songImgItemsUrl[songIndex];

      // setting the state of song's index, image, Url and audio with the callback function to play the song.
      this.setState(
        {
          songIndex: songIndex,
          songImgUrl: songImgUrl,
          songUrl: songUrl,
          audio: new Audio(songUrl),
        },
        () => {
          this.state.audio.play();
        }
      );
    }
    // Checking if the interval is greater than 250 but less than 10000. This range typically indicates a fast-backward action as it's presumed that rapid movement or a larger rotation of the seeking control (wheel, for instance) is being performed.
    else if (e.detail.interval > 250 && e.detail.interval < 10000) {
      // Calculates a time interval for fast-backwarding.
      const interval = e.detail.interval / 100;

      // updating the state
      this.setState((prevState) => {
        prevState.audio.currentTime -= interval;
        return prevState;
      });
    }
  };


  // Toggle function on Play and Pause button.
  togglePlayPause = () => {
    // Screen is locked, simply return
    if (this.state.currentMenu === -2) {
      return;
    }

    // If current song is playing then, updating the playing state to false then pausing the song
    if (this.state.playing === true) {
      this.setState({
        playing: false,
      });
      this.state.audio.pause();
    }

    // If current song is pasue then, updating the playing state to true then playing the song
    if (this.state.playing === false) {
      this.setState({
        playing: true,
      });
      this.state.audio.play();
    }
  };


  // Function for updating active menu when rotation is happening on the options.
  // menu here will act as an index
  updateActiveMenu = (direction, menu) => {
    if (
      menu !== -1 &&
      menu !== 1 &&
      menu !== 3 &&
      menu !== 4 &&
      menu !== 8 &&
      menu !== 9 &&
      menu !== 10
    ) {
      return;
    }

    let min = 0;
    let max = 0;

    // length of max is = to menu key length
    max = this.state.lengthMenuKey[menu];

    // The direction parameter essentially controls whether the active state should move forward or backward.

    // If the direction value is 1
    if(direction === 1){
      // "When wheel gets rotated to right side: (Now Playing->Music->Games->Settings)"
      // If it reaches the max limit, it resets to the min value. 
      if(this.state.active >= max){
        this.setState({ active: min });
      }
      else{ //Otherwise, it simply increases active by 1.
        this.setState({ active: this.state.active + 1 });
      }
    }

    // If the direction value is not 1
    else{
      // "When wheel gets rotated to left side: (Now Playing->Settings->Games->Music)"
      // If it goes below the min limit, it resets to the max value.
      if(this.state.active <= min){
        this.setState({ active: max });
      }
      else{ //Otherwise, it simply decreases active by 1.
        this.setState({ active: this.state.active - 1 });
      }
    }

  };


  // Function for changing the theme of iPod body
  setTheme = (id) => {
    let theme = "";

    // Setting the theme with the particular id
    if(id === 0){
      theme = "#f0f0f0"
    }
    else if(id === 1){
      theme = "#555d50"
    }
    else if(id === 2){
      theme = "#d1cdda"
    }
    else if(id === 3){
      theme = "#c4aead"
    }
    else if(id === 4){
      theme = "#ffcc00"
    }

    // Updating the state
    this.setState({
      theme: theme,
      noty: true,
      notifyText: "Theme Changed!"
    });

    return;
  }

  // Function for changing the wallpaper of iPod display
  setWallpaper = (id) => {

    // Updating the state
    this.setState({
      wallpaper: id,
      noty: true,
      notifyText: "Wallpaper Changed!"
    });

    return;
  }


  // Function for changing the wheel color
  setWheelColor = (id) => {
    let wheelColor = "";

    // Setting the theme with the particular id
    if(id === 0){
      wheelColor = "#212121"
    }
    else if(id === 1){
      wheelColor = "white"
    }
    else if(id === 2){
      wheelColor = "#3e2723"
    }
    else if(id === 3){
      wheelColor = "#3d5afe"
    }

    // Updating the state
    this.setState({
      wheelColor: wheelColor,
      noty: true,
      notifyText: "Wheel Color Changed!"
    });

    return;
  }


  // Function for updating the song.
  changePlayingSongFromMusicMenu = (id, navigationStack) => {
    const songUrl = this.state.songItemsUrl[id];
    const songImgUrl = this.state.songImgItemsUrl[id];

    // Pausing the current playing song
    this.state.audio.pause();

    // Pausing only happens when new song will be opened,
    // So setting the state with callback function
    this.setState({
      currentMenu: 7, // 7 options will apprear
      songUrl: songUrl,
      songImgUrl: songImgUrl,
      navigationStack: navigationStack,
      active: 0,
      playing: true,
      songIndex: id,
      audio: new Audio(songUrl)
    }, () => {
      this.state.audio.play();
    });

    return;
  }


  // Function for change menu backward on press of center button.
  // The "navigationStack" is used to keep track of the navigation history in the application. It stores the IDs of the menus/screens that the user has visited, allowing for backward navigation.
  changeMenuBackward = () => {
    const navigationStack = this.state.navigationStack.slice();

    // Screen is locked, simply return
    if (this.state.currentMenu === -2) {
      return;
    }
    else{
      // Get the previous menu ID from the navigation stack
      const prevId = navigationStack.pop();

      // Update the state
      this.setState({
        currentMenu: prevId,
        navigationStack: navigationStack,
        active: 0
      });

      return;
    }
  }


  // Function for change menu forward on press of center button.
  changeMenuForward = (id, fromMenu) => {
    const navigationStack = this.state.navigationStack.slice();

    // Check if the current index are not equal to current menu then simply return.
    if(
        fromMenu !== -2 &&
        fromMenu !== -1 &&
        fromMenu !== 1 &&
        fromMenu !== 4 &&
        fromMenu !== 3 &&
        fromMenu !== 8 &&
        fromMenu !== 9 &&
        fromMenu !== 0 &&
        fromMenu !== 7 &&
        fromMenu !== 10 
      ){
        return;
      }

    // Check if the current menu is equal to -1 index, then pushing the currentMenu into the navigation stack and updating the state.
    if(fromMenu === -1){
      navigationStack.push(this.state.currentMenu);

      this.setState({
        currentMenu: id,
        navigationStack: navigationStack,
        active: 0
      });

      return;
    }

    // Check if the current menu is equal to -2 index, then currentMenu will be -1 which is "Now Playing" option.
    if(fromMenu === -2){
      navigationStack.push(this.state.currentMenu);

      this.setState({
        currentMenu: -1, // "Now Playing"
        navigationStack: navigationStack,
        active: 0
      });

      return;
    }
    
    // Checking if the currentMenu is equal to 7 || 0, then togglePlayPause() will be called.
    if(fromMenu === 7 || fromMenu === 0){
      this.togglePlayPause();
      return;
    }

    // Checking if the currentMenu is equal to 8, then setTheme(id) will be called.
    if(fromMenu === 8){
      this.setTheme(id);
      return;
    }

    // Checking if the currentMenu is equal to 9, then setWheelColor(id) will be called.
    if(fromMenu === 9){
      this.setWheelColor(id);
      return;
    }

    // Checking if the currentMenu is equal to 10, then setWallpaper(id) will be called.
    if(fromMenu === 10){
      this.setWallpaper(id);
      return;
    }

    // Checking if the currentMenu is equal to 4, then changePlayingSongFromMusicMenu() will be called.
    if(fromMenu === 4){
      this.changePlayingSongFromMusicMenu(id, navigationStack, fromMenu);
      return;
    }

    // Pushing the currentMenu's true codintion into the navigationStack
    navigationStack.push(this.state.currentMenu);    

    // To illustrate with an example, suppose "fromMenu" is 1 (representing "Music") and "id" is 0. The line would be equivalent to accessing this.state.menuMapping[1][0], which retrieves the first submenu identifier associated with the "Music" menu.
    const currentMenuId = this.state.menuMapping[fromMenu][id];

    this.setState({
      currentMenu: currentMenuId,
      navigationStack: navigationStack, 
      active: 0
    });

    return;

  }


  // Function for set notification as false after sending notification
  setNoty = () => {
    this.setState({
      noty: false
    });

    return;
  } 


  render() {
    const {audio, active, currentMenu, menuItems, musicItems, songItems, playing, songIndex, theme, songUrl, songImgUrl, wheelColor, wallpaper, wallpaperItems, noty, notifyText} = this.state;

    return (
      <>
        <Case 
          songIndex={songIndex}
          active={active}
          menuItems={menuItems}
          musicItems={musicItems}
          currentMenu={currentMenu}
          songItems={songItems}
          playing={playing}
          theme={theme}
          audio={audio}
          songUrl={songUrl}
          songImgUrl={songImgUrl}
          wheelColor={wheelColor}
          wallpaper={wallpaper}
          wallpaperItems={wallpaperItems}
          noty={noty}
          notifyText={notifyText}
          changeMenuBackward={this.changeMenuBackward}
          changeMenuForward={this.changeMenuForward}
          updateActiveMenu={this.updateActiveMenu}
          togglePlayPause={this.togglePlayPause}
          seekSongForward={this.seekSongForward}
          seekSongReverse={this.seekSongReverse}
          setNoty={this.setNoty}
        />
      </>
    );
  }
}
