import fetch from "node-fetch";
const API = "https://hopto-scraper-1155c8982255.herokuapp.com";
export default class BeerService {
  static getBeers = (beerType) =>
    fetch(`${API}/beers?beer_type=${encodeURIComponent(beerType)}`).then(
      (res) => res.json()
    );
  static getDrafts = (beerType) =>
    fetch(`${API}/drafts?beer_type=${encodeURIComponent(beerType)}`).then(
      (res) => res.json()
    );
  static getCans = (beerType) =>
    fetch(`${API}/cans?beer_type=${encodeURIComponent(beerType)}`).then((res) =>
      res.json()
    );
}
