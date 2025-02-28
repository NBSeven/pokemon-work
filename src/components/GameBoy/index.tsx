import React from "react";
import { useEffect } from "react";
import { Howl } from "howler";

import "./index.css";

export default function GameBoy({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const sound = new Howl({
      src: ["01 Title Screen.wav"],
      autoplay: true,
      loop: true,
      volume: 0.5,
      onend: function () {
        console.log("Finished!");
      },
    });
    sound.play();
  }, []);
  return (
    <>
      <div className="gameboy" id="GameBoy">
        <div className="screen-area">
          <div className="power">
            <div className="indicator">
              <div className="led"></div>
              <span className="arc" style={{ zIndex: "2" }}></span>
              <span className="arc" style={{ zIndex: "1" }}></span>
              <span className="arc" style={{ zIndex: "0" }}></span>
            </div>
            POWER
          </div>
          <div style={{ background: "#fff" }}>{children}</div>
          {/* <canvas className="display" id="mainCanvas"></canvas> */}
          <div className="label">
            <div className="title">GAME BOY</div>
            <div className="subtitle">
              <span className="c">C</span>
              <span className="o1">O</span>
              <span className="l">L</span>
              <span className="o2">O</span>
              <span className="r">R</span>
            </div>
          </div>
        </div>

        <div className="nintendo">Nintendo</div>

        <div className="controls">
          <div className="dpad">
            <div className="up">
              <i className="fa fa-caret-up"></i>
            </div>
            <div className="right">
              <i className="fa fa-caret-right"></i>
            </div>
            <div className="down">
              <i className="fa fa-caret-down"></i>
            </div>
            <div className="left">
              <i className="fa fa-caret-left"></i>
            </div>
            <div className="middle"></div>
          </div>
          <div className="a-b">
            <div className="b">B</div>
            <div className="a">A</div>
          </div>
        </div>

        <div className="start-select">
          <div className="select">SELECT</div>
          <div className="start">START</div>
        </div>

        <div className="speaker">
          <div className="dot placeholder"></div>
          <div className="dot open"></div>
          <div className="dot closed"></div>
          <div className="dot open"></div>
          <div className="dot closed"></div>
          <div className="dot open"></div>
          <div className="dot closed"></div>
          <div className="dot placeholder"></div>

          <div className="dot open"></div>
          <div className="dot closed"></div>
          <div className="dot open"></div>
          <div className="dot closed"></div>
          <div className="dot open"></div>
          <div className="dot closed"></div>
          <div className="dot open"></div>
          <div className="dot closed"></div>

          <div className="dot closed"></div>
          <div className="dot open"></div>
          <div className="dot closed"></div>
          <div className="dot open"></div>
          <div className="dot closed"></div>
          <div className="dot open"></div>
          <div className="dot closed"></div>
          <div className="dot open"></div>

          <div className="dot open"></div>
          <div className="dot closed"></div>
          <div className="dot open"></div>
          <div className="dot closed"></div>
          <div className="dot open"></div>
          <div className="dot closed"></div>
          <div className="dot open"></div>
          <div className="dot closed"></div>

          <div className="dot closed"></div>
          <div className="dot open"></div>
          <div className="dot closed"></div>
          <div className="dot open"></div>
          <div className="dot closed"></div>
          <div className="dot open"></div>
          <div className="dot closed"></div>
          <div className="dot open"></div>

          <div className="dot open"></div>
          <div className="dot closed"></div>
          <div className="dot open"></div>
          <div className="dot closed"></div>
          <div className="dot open"></div>
          <div className="dot closed"></div>
          <div className="dot open"></div>
          <div className="dot closed"></div>

          <div className="dot closed"></div>
          <div className="dot open"></div>
          <div className="dot closed"></div>
          <div className="dot open"></div>
          <div className="dot closed"></div>
          <div className="dot open"></div>
          <div className="dot closed"></div>
          <div className="dot open"></div>

          <div className="dot placeholder"></div>
          <div className="dot closed"></div>
          <div className="dot open"></div>
          <div className="dot closed"></div>
          <div className="dot open"></div>
          <div className="dot closed"></div>
          <div className="dot open"></div>
          <div className="dot placeholder"></div>
        </div>
      </div>
    </>
  );
}
