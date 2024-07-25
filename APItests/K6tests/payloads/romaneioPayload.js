export default function gerarPayload() {
  let numeroAleatorioMoto = Math.floor(Math.random() * 4);

  let numeroAleatorioBase = Math.floor(Math.random() * 5);

  let numeroAleatorioChave = Math.floor(Math.random() * 2);

  const motorista = [
    {
      nome: "K6TESTES01",
      cpf: "17826763096",
    },
    {
      nome: "K6TESTES02",
      cpf: "82953375058",
    },
    {
      nome: "K6TESTES03",
      cpf: "39545347031",
    },
    {
      nome: "K6TESTES04",
      cpf: "91501898086",
    },
  ];

  const bases = [
    {
      nome: "POLSKA",
      cidade: "PELOTAS",
    },
    {
      nome: "PEDRABRANCA",
      cidade: "RIBEIRÃO DAS NEVES",
    },
    {
      nome: "TESTE",
      cidade: "IBIRITÉ",
    },
    {
      nome: "MANTIQUEIRA",
      cidade: "BELO HORIZONTE",
    },
    {
      nome: "BOSQUEDAPAZ",
      cidade: "RIBEIRÃO DAS NEVES",
    },
  ];

  // const chaves = [
  //   {
  //     chave: "25200712584617000180550010000654121427756477",
  //     cnpj_embarcador: "12584617000180",
  //     cnpj_remete: "12584617000180",
  //   },
  //   {
  //     chave: "31200506040998000134550010000324181004066930",
  //     cnpj_embarcador: "06040998000134",
  //     cnpj_remete: "37501290000167",
  //   },
  //   {
  //     chave: "24240402859542000140550010004036671284133096",
  //     cnpj_embarcador: "02859542000140",
  //     cnpj_remete: "37501290000167",
  //   },
  //   {
  //     chave: "25200712305387000254550010000513111586621416",
  //     cnpj_embarcador: "12305387000254",
  //     cnpj_remete: "37501290000167",
  //   },
  // ];

  const chaves = [
    {
      chave: "31240701173123000197550010003771481479404122",
      cnpj_embarcador: "01173123000197",
      cnpj_remete: "01173123000197",
    },
    {
      chave: "31240701173123000197550010003771471479373190",
      cnpj_embarcador: "01173123000197",
      cnpj_remete: "01173123000197",
    },
  ];

  const payload = {
    grupo_emp: "AZAPFY",
    timezone: "America/Sao_Paulo",
    nome_empresa: "AZAPFY",
    cnpj_empresa: "32202021000186",
    tipo: "entrega",
    criador: {
      nome: "SUPER AZAPFY",
      cpf: "SUPERAZAPFY",
    },
    base: `${bases[numeroAleatorioBase].nome}`,
    cidade_base: `${bases[numeroAleatorioBase].cidade}`,
    motorista: {
      nome: `${motorista[numeroAleatorioMoto].nome}`,
      cpf: `${motorista[numeroAleatorioMoto].cpf}`,
    },
    cnpj_base: "32202021000186",
    docs: [
      {
        chave: `${chaves[numeroAleatorioChave].chave}`,
        tipo_doc: "NOTA",
        remetente: {
          cnpj: `${chaves[numeroAleatorioChave].cnpj_remete}`,
        },
        embarcador: {
          cnpj_empresa: `${chaves[numeroAleatorioChave].cnpj_embarcador}`,
        },
      },
    ],
  };
  return payload;
}
