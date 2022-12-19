import { Component } from "react";
import PropTypes from 'prop-types';

import MarvelService from "../../services/Marvel";
import Error from "../error/Error";
import Spinner from "../spinner/Spinner";

import "./charList.scss";

class CharList extends Component {
  marvelService = new MarvelService();

  state = {
    char: [],
    error: false,
    spinner: true,
    newItemLoading: false,
    offset: 100,
    charEnded: false,
  };

  componentDidMount() {
    this.loadingCharList();
  }
  onCharLoaded = (newChar) => {
    let ended = false;
    if (newChar.length < 9) {
      ended = true;
    }
    this.setState(({ char, offset }) => ({
      char: [...char, ...newChar],
      spinner: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  };
  onCharLoading = () => {
    this.setState({
      newItemLoading: true,
    });
  };
  onError = () => {
    this.setState({
      error: true,
    });
  };
  loadingCharList = () => {
    this.onRequest();
  };
  onRequest = (offset) => {
    this.onCharLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  render() {
    const { char, error, spinner, offset, newItemLoading, charEnded } =
      this.state;

    const errorMessage = error ? <Error /> : null;
    const loadingMessage = spinner ? <Spinner /> : null;
    const content = !(error || spinner) ? (
      <View char={char} onSelectedId={this.props.onSelectedId} />
    ) : null;

    return (
      <div className="char__list">
        {errorMessage}
        {loadingMessage}
        {content}
        <button
          className="button button__main button__long"
          disabled={newItemLoading}
          onClick={() => this.onRequest(offset)}
          style={{ display: charEnded ? "none" : "block" }}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

const View = ({ char, onSelectedId }) => {
  const notImage =
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

  const characters = char.map((item) => {
    return (
      <li
        className="char__item"
        key={item.id}
        onClick={() => onSelectedId(item.id)}
      >
        {notImage === item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt="abyss"
            style={{ objectFit: "contain" }}
          />
        ) : (
          <img src={item.thumbnail} alt="abyss" />
        )}
        <div className="char__name">{item.name}</div>
      </li>
    );
  });
  return <ul className="char__grid"> {characters}</ul>;
};
CharList.propTypes = {
  onSelectedId: PropTypes.func,
};
export default CharList;
