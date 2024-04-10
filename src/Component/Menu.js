import React from "react";
import music from '../static/music.jpg';
import game from '../static/game.jpg';
import settings from '../static/settings.png';
import '../css/menu.css';

export default class Menu extends React.Component {
  render() {
    const { active, menuItems, songImgUrl } = this.props;

    return (
      <div className="menu-container">
        <div className="menu">
          <ul>
            {menuItems.map((element, index) => {
              return active === index ? (
                <li key={index} className="active">&nbsp; {element}</li>
              ) : (
                <li key={index}>&nbsp; {element}</li>
              );
            })}
          </ul>
        </div>

        <div className="leaf">
            {active === 0 && <img src={songImgUrl} alt="Song Image" className="leaf-img"/>}
            {active === 1 && <img src={music} alt="Music Image" className="leaf-img"/>}
            {active === 2 && <img src={game} alt="Game Image" className="leaf-img"/>}
            {active === 3 && <img src={settings} alt="Setting Image" className="leaf-img"/>}
        </div>
      </div>
    );
  }
}
