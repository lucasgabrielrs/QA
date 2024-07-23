export default function gerarPayload() {
  let numeroAleatorio = Math.floor(Math.random() * 2);

  const motorista = [
    {
      nome: "AMANA ZANELLA",
      cpf: "13637790017",
    },
    {
      nome: "RENATO SILVA",
      cpf: "06474822660",
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
    base: "B2B",
    cidade_base: "BELO HORIZONTE",
    motorista: {
      nome: `${motorista[numeroAleatorio].nome}`,
      cpf: `${motorista[numeroAleatorio].cpf}`,
    },
    cnpj_base: "37501290000167",
    docs: [
      {
        chave: "24240402859542000140550010004036671284133096",
        tipo_doc: "NOTA",
        remetente: {
          cnpj: "02859542000140",
        },
        embarcador: {
          cnpj_empresa: "02859542000140",
        },
      },
    ],
  };
  return payload;
}
