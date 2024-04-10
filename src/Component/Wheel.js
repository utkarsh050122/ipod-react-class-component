import React from "react";
import "../css/wheel.css";
import { AiOutlineForward } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import { BiPause } from "react-icons/bi";
import { AiOutlineBackward } from "react-icons/ai";
import { FaApple } from "react-icons/fa";
import ZingTouch from "zingtouch";

export default class Wheel extends React.Component {
  constructor() {
    super();

    this.angle = 0;
  }

  render() {
    const { changeMenuForward, active, currentMenu, theme, wheelColor } =
      this.props;

    return (
      <div className="wheel-container" id="wheel-container">
        <div
          className="wheel"
          id="wheel"
          style={{ backgroundColor: wheelColor }}
        >
          <div className="control" id="menu">
            <div style={{ color: theme }}>MENU</div>
          </div>
          <div className="control" id="forward">
            <AiOutlineForward style={{ color: theme }} />
          </div>
          <div className="control" id="play-pause">
            <div>
              <BsFillPlayFill style={{ color: theme }} />
              <BiPause style={{ color: theme }} />
            </div>
          </div>
          <div className="control" id="reverse">
            <AiOutlineBackward style={{ color: theme }} />
          </div>
        </div>

        <div
          style={{ backgroundColor: theme }}
          className="control"
          id="blank"
          onClick={() => {
            changeMenuForward(active, currentMenu);
          }}
        ><FaApple style={{ color: wheelColor }}/></div>
      </div>
    );
  }

  // Control the wheel roatation action and also check direction of rotation
  wheelControl = (e) => {
    const { updateActiveMenu, currentMenu } = this.props;

    if (e.detail.distanceFromOrigin === 0) {
      this.angle = e.detail.angle;
    }
    if (Math.abs(this.angle - e.detail.angle) > 300) {
      this.angle = Math.abs(e.detail.angle);
      if (e.detail.distanceFromLast === 0) {
        return;
      } else if (e.detail.distanceFromLast < 0) {
        updateActiveMenu(1, currentMenu);
      } else {
        updateActiveMenu(0, currentMenu);
      }
    } else if (Math.abs(this.angle - e.detail.angle) > 15) {
      this.angle = Math.abs(e.detail.angle);
      if (e.detail.distanceFromLast === 0) {
        return;
      } else if (e.detail.distanceFromLast > 0) {
        updateActiveMenu(1, currentMenu);
      } else {
        updateActiveMenu(0, currentMenu);
      }
    }
  };

  // Bind components with zingtouch logic
  componentDidMount() {
    const {
      changeMenuBackward,
      togglePlayPause,
      seekSongForward,
      seekSongReverse,
    } = this.props;

    // Function for wheel controll
    const wheelControl = this.wheelControl;

    // Applying the region to used by zingtouch lib
    const wheel = document.getElementById("wheel");
    const activeRegion = ZingTouch.Region(wheel);

    const menuIcon = document.getElementById("menu");
    const playpause = document.getElementById("play-pause");
    const reverse = document.getElementById("reverse");
    const forward = document.getElementById("forward");

    const longTapGesture = new ZingTouch.Tap({
      maxDelay: 10000,
      numInput: 1,
      tolerance: 1,
    });

    activeRegion.bind(menuIcon, "tap", function (e) {
      changeMenuBackward();
    });

    activeRegion.bind(wheel, "rotate", function (e) {
      wheelControl(e);
    });

    activeRegion.bind(playpause, "tap", function (e) {
      togglePlayPause();
    });

    activeRegion.bind(reverse, longTapGesture, function (e) {
      seekSongReverse(e);
    });

    activeRegion.bind(forward, longTapGesture, function (e) {
      seekSongForward(e);
    });
  }
}
