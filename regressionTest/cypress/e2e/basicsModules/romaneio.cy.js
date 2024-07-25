const urlAzapfy = "https://web.azapfy.com.br/#/app/pesquisa";

beforeEach(() => {
  cy.visit(urlAzapfy);

  cy.wait(3000);
  cy.get('input[name="login"]').type("super@azapfy.com");
  cy.get('input[name="senha"]').type("Ssa@Super266");

  cy.get(".MuiButtonBase-root").click();

  cy.wait(2000);
  cy.contains("span", "ESTOU DE ACORDO").click();
});

describe("Romaneios", () => {
  it("Pesquisa romaneio", () => {
    cy.wait(3000);

    cy.get(
      ".header-notifications > :nth-child(1) > div > .MuiButtonBase-root > .MuiButton-label"
    ).click();
    cy.get("#pesquisa").type("AZAPFY");
    cy.get(".MuiListItem-root > .MuiFormControlLabel-root").click();

    cy.wait(3000);

    cy.get(
      '.pro-menu-item[route="/romaneios"] .pro-icon-wrapper svg[data-icon="truck"]'
    ).click({ force: true });

    cy.get('button[aria-label="Limpar Datas"]').click();

    cy.get("#dashDataInicial").type("20/06/2024");
    cy.get("#dashDataFinal").type("28/06/2024");

    cy.contains("button", "Pesquisar").click();

    cy.get("table tbody tr").should("have.length.greaterThan", 0);

    // criando um romaneio

    cy.contains("span", "Criar romaneio").click();

    cy.get("#form-base .MuiFormControl-root .MuiInputBase-input")
      .scrollIntoView()
      .click({ force: true })
      .type("B2B{enter}");

    cy.wait(3000);
    cy.get("#form-motorista .MuiFormControl-root .MuiInputBase-input")
      .scrollIntoView()
      .click({ force: true })
      .type("Amana{enter}{enter}");

    cy.get("#bipe").type("24240402859542000140550010004036671284133096{enter}");

    cy.intercept(
      "POST",
      "https://api3.azapfy.com.br/secure/api/romaneios/criar"
    ).as("criarRomRequest");

    cy.get("#CriarRomComp > .MuiButton-label").click();

    // cy.wait("@criarRomRequest", { timeout: 10000 }).then((interception) => {
    //   const payload = interception.request.body;
    //   // Escrever o payload em um arquivo
    //   cy.writeFile(
    //     "../APItests/smokeTests/payloads/romaneioPayload.json",
    //     payload
    //   );
    // });

    cy.get(
      ".MuiDialog-paper > .MuiPaper-root > .MuiToolbar-root > .MuiButtonBase-root"
    ).click();

    cy.wait(3000);

    cy.get(
      '.pro-menu-item[route="/romaneios"] .pro-icon-wrapper svg[data-icon="truck"]'
    ).click({ force: true });

    //Realizar a exclusão
    cy.get('button[title="Realizar busca"]').click();

    cy.get(".actions button").first().click();

    cy.get("div ul li").contains("Deletar").click();

    cy.get("#password-required").type("Ssa@Super266");

    cy.get("div button span").contains("Confirmar").click();
  });
});
