import http from "k6/http";
import { check, sleep, fail } from "k6";
import { baseURL, params } from "../config.js";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export function handleSummary(data) {
  const timestamp = new Date().toISOString().replace(/[:.-]/g, "_");
  const fileName = `Spike-Romaneio_${timestamp}.html`;
  const directory = "C:\\QA\\APItests\\K6tests\\reports\\spikeTests";
  const filePath = `${directory}\\${fileName}`;

  return {
    [filePath]: htmlReport(data),
  };
}

export const options = {
  stages: [
    { duration: "30s", target: 200 },
    { duration: "20s", target: 250 },
    { duration: "30s", target: 0 },
  ],
  thresholds: {
    http_req_failed: [{ threshold: "rate<0.01", abortOnFail: true }],
  },
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
    }

    let mensagem = body.mensagem;

    if (body.romaneio && body.romaneio.numero) {
      var numero = body.romaneio.numero;
    } //else {

    //console.error(
    //"A resposta não contém a propriedade 'romaneio' ou 'romaneio.numero'."
    //);
    //console.error("Resposta completa:", body);
    //}

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
    }

    check(del, {
      "Status delete should be 200": (r) => r.status === 200,
    });
  } else {
    console.error("Request failed. Status code:", del.status);
  }

  sleep(2);
}
