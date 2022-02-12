import React from "react";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      first: 0,
      second: 10,
      attempt: 3,
      guessNum: undefined,
      clues: false,
      random: null,
      guess: true,
      ifWon: false,
      hints: "",
    };
  }
  handleInput = (e) => {
    // if target is checkbox change to ischecked, else get value;
    let target =
      e.target.type === "checkbox" ? e.target.checked : +e.target.value;
    //change state of the particular elements value
    this.setState({ [e.target.name]: target });
  };
  generateRandomNum = () => {
    const { first, second } = this.state;
    if (first < second) {
      //generate random number between first and second nums
      let randomNum = Math.floor(Math.random() * (second - first + 1) + first);
      // save it on state;
      this.setState({ random: randomNum });
    }
  };
  guessHandler = () => {
    //destructuring vars from state
    const { guessNum, random, attempt, clues } = this.state;
    //if user guesses right
    if (guessNum === random) {
      console.log("You gotcha", random);
      setTimeout(() => {
        this.setState({ guess: true, ifWon: true });
        setTimeout(() => {
          // this.setState({ ifWon: false });
          let play = window.confirm("Do you want to play again?");
          if (play === true) {
            // re-renders page if user wants again
            window.location.reload(true);
          } else {
            // if user doesn't want to play again web page closes
            window.close();
          }
        }, 2000);
      }, 100);
    } else if (attempt <= 1) {
      this.setState({ attempt: 0 });
      setTimeout(() => {
        window.confirm(`Sorry, you lost! It was **${random}**`);
        window.location.reload(true);
      }, 500);
    } else {
      this.setState({ attempt: this.state.attempt - 1, ifWon: false });
      setTimeout(() => {
        this.setState({ guess: false });
        setTimeout(() => {
          this.setState({ guess: true });
        }, 2000);
      }, 100);
      if (this.state.clues && this.state.guessNum !== undefined) {
        guessNum > random
          ? this.setState({ hints: "Smaller" })
          : this.setState({ hints: "Bigger" });
      }

      console.log("false");
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
          <div
            className="modal"
            style={
              !this.state.guess ? { display: "block" } : { display: "none" }
            }
          >
            <p style={{ color: "red" }}>
              Sorry your guess didn't match! Try again
            </p>
          </div>

          <div
            className="winModal"
            style={
              this.state.ifWon ? { display: "block" } : { display: "none" }
            }
          >
            <p>You won ! ! ! Yeeeeey</p>
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
            <div
              className="hintParagraph"
              style={
                this.state.clues ? { display: "block" } : { display: "none" }
              }
            >
              <p id="clue">{this.state.hints}</p>
            </div>
            <input
              type="number"
              onChange={this.handleInput}
              name="guessNum"
              id="guessInput"
            />
            <button className="submit" onClick={this.guessHandler}>
              submit
            </button>
          </div>
        </div>
        <div className="hintClick">
          <input
            type="checkbox"
            name="clues"
            id="hint"
            onChange={this.handleInput}
          />
          <label htmlFor="hint"> With clues</label>
        </div>
      </div>
    );
  }
}
export default App;
