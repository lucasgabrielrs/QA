import http from "k6/http";
import { check, sleep, fail } from "k6";
import { baseURL, params } from "../config.js";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import gerarPayload from "../../payloads/romaneioPayload.js";

export function handleSummary(data) {
  const timestamp = new Date().toISOString().replace(/[:.-]/g, "_");
  const fileName = `Smoke-Romaneio_${timestamp}.html`;
  const directory = "C:\\QA\\APItests\\reports\\smokeTests"; // Especifique o caminho desejado aqui
  const filePath = `${directory}\\${fileName}`; // Forma o caminho manualmente para Windows

  return {
    [filePath]: htmlReport(data),
  };
}

export const options = {
  vus: 2,
  iterations: 3,
};

const payload = gerarPayload();

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
      console.log(numero);
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
