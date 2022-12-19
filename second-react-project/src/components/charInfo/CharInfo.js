import { Component } from "react";
import PropTypes from "prop-types";

import MarvelService from "../../services/Marvel";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import Skeleton from "../skeleton/Skeleton";

import "./charInfo.scss";

class CharInfo extends Component {
  state = {
    char: null,
    spinner: false,
    error: false,
  };
  marvelService = new MarvelService();

  componentDidMount() {
    this.onCharUpdate();
  }
  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.onCharUpdate();
    }
  }

  onCharUpdate = () => {
    const { charId } = this.props;
    if (!charId) {
      return;
    }
    this.onCharLoading();
    this.marvelService
      .getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };
  onCharLoaded = (char) => {
    this.setState({ char, spinner: false });
  };
  onError = () => {
    this.setState({ spinner: false, error: true });
  };
  onCharLoading = () => {
    this.setState({
      spinner: true,
    });
  };
  render() {
    const { char, spinner, error } = this.state;

    const skeleton = char || spinner || error ? null : <Skeleton />;
    const errorMessage = error ? <Error /> : null;
    const loadingMessage = spinner ? <Spinner /> : null;
    const content = !(error || spinner || !char) ? <View char={char} /> : null;

    return (
      <div className="char__info">
        {skeleton}
        {errorMessage}
        {loadingMessage}
        {content}
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, wiki, homepage, comics } = char;

  let imgStyle = { objectFit: "cover" };
  if (
    thumbnail ===
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgStyle = { objectFit: "contain" };
  }

  const commicsList = comics.map((item, i) => {
    if (i < 9) {
      return (
        <li className="char__comics-item" key={i}>
          {item.name}
        </li>
      );
    }
  });
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length === 0 ? (
          <li className="char__comics-item">
            "Ohh, at the moment we haven`t any comics about this character"
          </li>
        ) : (
          commicsList
        )}
      </ul>
    </>
  );
};
CharInfo.propTypes = {
  charId: PropTypes.number,
};
export default CharInfo;
