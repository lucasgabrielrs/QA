import http from "k6/http";
import { check, sleep } from "k6";
import { baseURL, params } from "../config.js";

export const options = {
  vus: 2,
  iterations: 2,
};

const payload = JSON.parse(open("../payloads/pesquisaPayload.json"));

export default function () {
  const url = `${baseURL}/pesquisar`;

  const resp = http.post(url, JSON.stringify(payload), params);

  if (resp.status === 200) {
    let body;
    try {
      body = JSON.parse(resp.body);
    } catch (e) {
      console.error("Erro ao parsear a resposta JSON:", e);
      return;
    }

    let mensagem = body.mensagem;
    console.log("Mensagem:", mensagem);

    check(resp, {
      "Status should be 200": (r) => r.status === 200,
    });
  } else {
    console.error("Request failed. Status code:", resp.status);
  }

  sleep(1);
}
