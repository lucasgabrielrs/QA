import http from "k6/http";
import { check, sleep } from "k6";
import { baseURL, params } from "../config.js";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

// export function handleSummary(data) {
//   const timestamp = new Date().toISOString().replace(/[:.-]/g, "_");
//   const fileName = `Smoke-Pesquisa${timestamp}.html`;
//   const directory = "C:\\QA\\APItests\\reports\\smokeTests"; // Especifique o caminho desejado aqui
//   const filePath = `${directory}\\${fileName}`; // Forma o caminho manualmente para Windows

//   return {
//     [filePath]: htmlReport(data),
//   };
// }

export const options = {
  vus: 2,
  iterations: 2,
};

const payload = JSON.parse(open("../../payloads/pesquisaPayload.json"));

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
