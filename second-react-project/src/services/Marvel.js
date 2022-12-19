class MarvelService {
  _apiKey = "34f66b4e159593e93dabac2bd2f9d717";
  _baseOffset = 100;
  
  getResources = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }
    return await res.json();
  };
  getAllCharacters = async (offset = this._baseOffset) => {
    const res = await this.getResources(
      `https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=${offset}&apikey=${this._apiKey}`
    );
    return res.data.results.map(this._transformCharacter);
  };
  getCharacter = async (id) => {
    const res = await this.getResources(
      `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=${this._apiKey}`
    );
    return this._transformCharacter(res.data.results[0]);
  };
  _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[0].url,
      comics: char.comics.items
    };
  };
}
export default MarvelService;
