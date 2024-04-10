import React from "react";
import '../css/theme.css';

export default class Themes extends React.Component {
  render() {
    const { active } = this.props;

    return (
      <div className="music">
        <h3>Theme Select</h3>

        <ul>
          {["Snow White", "Black", "USC Gold", "Space Gray", "Pearl"].map(
            (element, index) => {
              return active === index ? (
                <li key={index} className="active theme-li">
                  &nbsp; {element}
                </li>
              ) : (
                <li key={index} className="theme-li">&nbsp; {element}</li>
              );
            }
          )}
        </ul>
      </div>
    );
  }
}
