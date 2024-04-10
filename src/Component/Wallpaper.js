import React from "react";

export default class Wallpaper extends React.Component {
  render() {
    const { active } = this.props;

    return (
      <div className="music">
        <h3>Select Wallpaper</h3>

        <ul>
          {["Wallpaper 1", "Wallpaper 2", "Wallpaper 3"].map(
            (element, index) => {
              return active === index ? (
                <li key={index} className="active theme-li">
                  &nbsp; {element}
                </li>
              ) : (
                <li key={index} className="theme-li">
                  &nbsp; {element}
                </li>
              );
            }
          )}
        </ul>
      </div>
    );
  }
}
