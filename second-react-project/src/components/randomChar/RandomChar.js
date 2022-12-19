import { Component } from "react";

import MarvelService from "../../services/Marvel";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import Button from "../button/Button";

class RandomChar extends Component {
  state = {
    char: {},
    spinner: true,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }

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
  updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.onCharLoading();
    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  render() {
    const { char, spinner, error } = this.state;
    const errorMessage = error ? <Error /> : null;
    const loadingMessage = spinner ? <Spinner /> : null;
    const content = !(error || spinner) ? <View char={char} /> : null;
    return (
      <div className="randomchar">
        {errorMessage}
        {loadingMessage}
        {content}
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <Button updateChar={this.updateChar}>try it</Button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}
const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;
  const notImage =
    "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";

  return (
    <div className="randomchar__block">
      {notImage === thumbnail ? (
        <img
          src={thumbnail}
          alt="Random character"
          className="randomchar__img"
          style={{ objectFit: "contain" }}
        />
      ) : (
        <img
          src={thumbnail}
          alt="Random character"
          className="randomchar__img"
        />
      )}
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">
          {description?.length === 0
            ? "описание на данный момент отсутствует"
            : description?.length > 50
            ? description.slice(0, 180) + "..."
            : description}
        </p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};
export default RandomChar;
