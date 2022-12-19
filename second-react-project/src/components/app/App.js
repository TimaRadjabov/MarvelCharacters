import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBaundary";

import decoration from "../../resources/img/vision.png";
import Hello from "../Hello/Hello";

class App extends Component {
  state = {
    selectedId: null,
  };
  onSelectedId = (id) => {
    this.setState({
      selectedId: id,
    });
  };
  render() {
    return (
      <div className="app">
        <AppHeader />
        <Hello>
          <h2>Hello World!</h2>
          <h2>Hello React!</h2>
          <h2>I will be Senior!</h2>
        </Hello>
        <main>
          <ErrorBoundary>
            <RandomChar />
          </ErrorBoundary>
          <div className="char__content">
            <ErrorBoundary>
              <CharList onSelectedId={this.onSelectedId} />
            </ErrorBoundary>

            <ErrorBoundary>
              <CharInfo charId={this.state.selectedId} />
            </ErrorBoundary>
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    );
  }
}

export default App;
