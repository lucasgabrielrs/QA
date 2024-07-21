import http from "k6/http";
import { check, sleep } from "k6";
import { baseURL, params } from "../config.js";

export const options = {
  vus: 1,
  iterations: 2,
};

const payload = JSON.parse(open("../payloads/romaneioPayload.json"));

export default function () {
  const url = `${baseURL}/romaneios/criar`;

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
    var numero = body.romaneio.numero;
    console.log("Mensagem:", mensagem);
    console.log("Numero: ", numero);

    check(resp, {
      "Status should be 200": (r) => r.status === 200,
    });
  } else {
    console.error("Request failed. Status code:", resp.status);
  }

  sleep(2);

  // Deletando
  const del = http.del(
    `${baseURL}/romaneios/excluir?grupo_emp=AZAPFY&timezone=America%2FSao_Paulo&numero=${numero}`
  );

  if (del.status === 200) {
    let delBody;
    try {
      delBody = JSON.parse(del.body);
    } catch (e) {
      console.error("Erro ao parsear a resposta JSON:", e);
      return;
    }

    check(del, {
      "Status delete should be 200": (r) => r.status === 200,
    });
  } else {
    console.error("Request failed. Status code:", del.status);
  }
}
