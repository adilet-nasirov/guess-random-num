import React from "react";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      first: 0,
      second: 0,
      attempt: 3,
      guess: 0,
      random: 0,
    };
  }
  handleInput = (e) => {
    let target = e.target;
    this.setState({ [target.name]: +target.value });
  };
  generateRandomNum = () => {
    const { first, second, random } = this.state;
    if (first < second) {
      let randomNum = Math.floor(Math.random() * (second - first + 1) + first);
      console.log(randomNum);
      this.setState({ random: randomNum });
    }
  };
  guessHandler = () => {
    const { guess, random } = this.state;
    if (guess === random) {
      console.log("You gotcha", random);
    }
  };
  render() {
    console.log(this.state);
    return (
      <div className="App">
        <div className="attempts">
          <p>{this.state.attempt} attempts left</p>
        </div>
        <div className="container">
          <div className="modal" style={{ display: "none" }}>
            <p>Sorry your guess didn't match! Try again</p>
          </div>
          <div className="inputDiv">
            <label>From</label>
            <input
              type="number"
              onChange={this.handleInput}
              name="first"
              className="inputs"
            />
            <label>To</label>
            <input
              type="number"
              onChange={this.handleInput}
              name="second"
              className="inputs"
            />
            <div className="btn">
              <button className="submit" onClick={this.generateRandomNum}>
                Generate
              </button>
            </div>
          </div>
          <div className="guess">
            <p className="pForGuess">Guess the number</p>
            <div className="hintParagraph" style={{ display: "none" }}>
              <p id="clue">upper</p>
            </div>
            <input
              type="number"
              onChange={this.handleInput}
              name="guess"
              id="guessInput"
            />
            <button className="submit" onClick={this.guessHandler}>
              submit
            </button>
          </div>
        </div>
        <div className="hintClick">
          <input type="checkbox" id="hint" />
          <label htmlFor="hint"> With clues</label>
        </div>
      </div>
    );
  }
}
export default App;
