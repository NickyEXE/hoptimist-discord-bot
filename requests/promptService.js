import fetch from "node-fetch";
// const API = "https://hopto-scraper-1155c8982255.herokuapp.com";
const API = "http://localhost:3000/"
export default class PromptService {
  static createPrompt = (name, prompt) =>
    fetch(`${API}/prompts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, prompt }),
    }).then((res) => res.json());

  static setPrompt = (name) =>
    fetch(`${API}/prompts/set_prompt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    }).then((res) => res.json());

  static getPrompts = () => fetch(`${API}/prompts`).then(res => res.json())
}
