export default class BeerService {
    static beers = () => fetch("https://hopto-scraper-1155c8982255.herokuapp.com/beers")
    .then(res => res.json())
}