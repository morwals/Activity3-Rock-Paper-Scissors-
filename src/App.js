import React, { useEffect, useState } from "react";
import Player from "./components/players";
import CloseIcon from "@mui/icons-material/Close";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import SportsScoreIcon from "@mui/icons-material/SportsScore";

const options = ["✊", "🖐️", "✌️"];

export default function Fun() {
  const [state, setState] = useState({
    player: options[0],
    computer: options[0],
    result: "",
    showResult: false,
  });

  const [score, setScore] = useState(0);
  const [rules, setRules] = useState(false);

  const showScore = () => {
    if (state.player === state.computer) {
      console.log("draw");
    } else if (
      (state.player === "✊" && state.computer === "✌️") ||
      (state.player === "✌️" && state.computer === "🖐️") ||
      (state.player === "🖐️" && state.computer === "✊")
    ) {
      setScore(score + 1);
    } else {
      setScore(score - 1);
    }
  };

  useEffect(() => {
    showScore();
  }, [state.showResult]);

  function selectWinner() {
    if (state.player === state.computer) {
      return "Draw 📍";
    } else if (
      (state.player === "✊" && state.computer === "✌️") ||
      (state.player === "✌️" && state.computer === "🖐️") ||
      (state.player === "🖐️" && state.computer === "✊")
    ) {
      return "You Won! 🎉";
    } else {
      return "You Lose! 💔";
    }
  }

  function setShowResult() {
    setState(() => {
      return {
        player: options[0],
        computer: options[0],
        result: "",
        showResult: false,
      };
    });
  }

  function selectOption(move) {
    console.log("move: " + move);
    setState((pre) => {
      return {
        ...pre,
        player: move,
        computer: options[Math.floor(Math.random() * options.length)],
        result: selectWinner(),
        showResult: true,
      };
    });
  }

  function showrules() {
    setRules(true);
  }

  function closeRules() {
    setRules(false);
  }

  return (
    <>
      <div className="header">
        <div className="tag">
          <SmartToyIcon></SmartToyIcon> Rock Paper Scissors
        </div>
        <div>Score: {score} </div>
      </div>

      {state.showResult ? (
        <div className="players">
          <Player option={state.player} name="You" />
          <Player option={state.computer} name="Opponent" />
        </div>
      ) : null}
      <div className="result">{state.result ? selectWinner() : null}</div>

      <div className="container">
        {rules ? (
          <div className="rules">
            <div>
              <button onClick={closeRules}>
                <CloseIcon></CloseIcon>
              </button>
            </div>
            <img src="./rule.png"></img>
          </div>
        ) : null}

        {!state.showResult ? (
          !rules ? (
            <div className="btns">
              <button
                className="rockBtn btn"
                onClick={() => selectOption("✊")}
              >
                ✊
              </button>
              <div>
                <button
                  className="paperBtn btn"
                  onClick={() => selectOption("🖐️")}
                >
                  🖐️
                </button>
                <button
                  className="scissorsBtn btn"
                  onClick={() => selectOption("✌️")}
                >
                  ✌️
                </button>
              </div>
            </div>
          ) : null
        ) : (
          <button onClick={setShowResult} className="playagain">
            Play Again
          </button>
        )}
      </div>

      {!state.showResult ? (
        <div className="footer">
          <button onClick={showrules}>
            Rules<SportsScoreIcon></SportsScoreIcon>
          </button>
        </div>
      ) : null}
    </>
  );
}
