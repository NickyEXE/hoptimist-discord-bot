import fetch from "node-fetch";
const API = "https://hopto-scraper-1155c8982255.herokuapp.com";
export default class HalService {
  static snarkyResponse = (message, guaranteeResponse = false) =>
  fetch(`${API}/messages/snark_gpt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({message, guarantee_response: guaranteeResponse}),
  }).then((res) => res.json());
}
