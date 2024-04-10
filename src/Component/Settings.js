import React from "react";
import '../css/settings.css';

export default class Settings extends React.Component {
  render() {
    const { active } = this.props;

    return (
      <div className="settings">
        <h3>Settings</h3>

        <ul>
          {active === 0 ? <li className="active">Themes</li> : <li>Themes</li>}

          {active === 1 ? <li className="active">Wheel Color</li> : 
            <li>Wheel Color</li>}

          {active === 2 ? <li className="active">Wallpaper</li> : 
            <li>Wallpaper</li>}
            
        </ul>
      </div>
    );
  }
}
