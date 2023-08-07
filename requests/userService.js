import fetch from "node-fetch";
const API = "http://localhost:3000";

export default class UserService {
  static cancelUser = (payload) =>
    fetch(`${API}/users/cancel_user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());

  static getCancelStatus = (id) =>
    fetch(`${API}/users/${id}/cancels`).then((res) => res.json());
}
