const urlAzapfy = "https://web.azapfy.com.br/#/app/pesquisa";

beforeEach(() => {
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
  cy.visit(urlAzapfy);

  cy.wait(3000);
  cy.get('input[name="login"]').type("super@azapfy.com");
  cy.get('input[name="senha"]').type("Ssa@Super266");

  cy.get(".MuiButtonBase-root").click();

  cy.wait(2000);
  cy.contains("span", "ESTOU DE ACORDO").click();
});

describe("Modulo Pesquisa", () => {
  it("Pesquisa por DATA e NUMERO", () => {
    cy.wait(3000);

    cy.get(
      ".header-notifications > :nth-child(1) > div > .MuiButtonBase-root > .MuiButton-label"
    ).click();
    cy.get("#pesquisa").type("JOBSON");
    cy.get(".MuiListItem-root > .MuiFormControlLabel-root").click();

    cy.wait(3000);

    cy.get(
      '.pro-menu-item[route="/pesquisa"] .pro-icon-wrapper svg[data-icon="magnifying-glass"]'
    ).click({ force: true });

    cy.wait(3000);
    cy.get("#dashDataInicial").type("25/04/2024");
    cy.get("#dashDataFinal").type("30/04/2024");

    cy.get("div#tutorialPesquisaBtn button").click();

    cy.get("table tbody tr").should("have.length.above", 0);

    cy.get("div#notas").click().type("000403665"); // 000403665

    cy.get('button[aria-label="Limpar Datas"]').click();

    cy.get("div#tutorialPesquisaBtn button").click();

    cy.get("table tbody tr").should("have.length.greaterThan", 0);

    // filtro tipo doc
    cy.wait(3000);

    cy.reload();

    cy.get("#dashDataInicial").type("25/04/2024");
    cy.get("#dashDataFinal").type("30/04/2024");

    cy.get("#tipo_doc #list").click();
    cy.get("#item-1").click();
    cy.wait(2000);

    cy.intercept("POST", "https://api3.azapfy.com.br/secure/api/pesquisar").as(
      "pesquisaRequest"
    );

    cy.get(
      "#tutorialPesquisaBtn > .d-flex > :nth-child(1) > :nth-child(1) > .MuiButtonBase-root > .MuiButton-label"
    ).click();

    // cy.wait("@pesquisaRequest", { timeout: 30000 }).then((interception) => {
    //   const payload = interception.request.body;
    //   // Escrever o payload em um arquivo
    //   cy.writeFile("cypress/fixtures/pesquisaPayload.json", payload);
    // });

    cy.get('button[aria-label="Mostrar colunas"]', { timeout: 20000 })
      .find("span.material-icons")
      .contains("view_column")
      .click();

    cy.get("li label span").contains("Tipo Documento").click();

    cy.get("table tbody tr td").eq(1).should("contain.text", "CTE");
    //cy.get('table tbody tr td[value="NOTA"]').should('contain.text', 'NOTA');

    // filtro romaneio
    cy.reload();

    cy.get(
      "#form-romaneios > .MuiFormControl-root > .jss83 > .MuiInputBase-root > .MuiInputBase-input"
    )
      .click()
      .type("PRM-012189{enter}"); //PRM-012189 // mudar o seletor

    cy.get(
      "#tutorialPesquisaBtn > .d-flex > :nth-child(1) > :nth-child(1) > .MuiButtonBase-root > .MuiButton-label"
    ).click();

    cy.get("table tbody tr").should("have.length.greaterThan", 0);

    // filtro embarcadores
    cy.reload();

    cy.get(".ml-3 > .MuiButtonBase-root").click();

    // Localizar o elemento usando uma combinação de classes únicas
    cy.get(
      "li.MuiButtonBase-root.MuiListItem-root.MuiMenuItem-root.MuiMenuItem-gutters"
    )
      .contains("Embarcadores")
      .click();

    cy.wait(1000);
    cy.get("body").click(0, 0); // Clica no canto superior esquerdo do body
    cy.wait(1000);

    cy.get("#clientes div #list").click({ force: true });
    cy.get("#clientes div #list #item-1").click();

    cy.wait(1000);
    cy.get("body").click(0, 0); // Clica no canto superior esquerdo do body
    cy.wait(1000);

    cy.get("div#tutorialPesquisaBtn button").click();

    cy.get("table tbody tr").should("have.length.greaterThan", 0);
  });
});
