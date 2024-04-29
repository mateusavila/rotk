export default defineEventHandler(async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*'
  }
  setHeaders(event, headers)
  const query = getQuery(event)
  const { term, _type, q } = query

  const list = [
    {
      id: 1,
      text: 'Administração das Solicitações de Exportação'
    },
    {
      id: 2,
      text: 'Alteração  X Docto - Manutenção'
    },
    {
      id: 3,
      text: 'Alteração de CNPJ entre outros Estabelecimentos'
    },
    {
      id: 4,
      text: 'Auditoria - Cadastramento de informações da Operação'
    },
    {
      id: 5,
      text: 'Auditoria - Comentários sobre a Arrecadação'
    },
    {
      id: 6,
      text: 'Auditoria - Consulta de Operações'
    },
    {
      id: 7,
      text: 'Auditoria - Dashboard Administrativo'
    },
    {
      id: 8,
      text: 'Auditoria - Exportação Completa'
    },
    {
      id: 9,
      text: 'Auditoria - Exportação da Visão Geral por Grupo de Interesse'
    },
    {
      id: 10,
      text: 'Auditoria - Exportação de Documentos Fiscais (EFD e NFe)'
    },
    {
      id: 11,
      text: 'Cadastro - REGIN - Inscrição Estadual - Vistoria Fiscal'
    },
    {
      id: 12,
      text: 'Consulta de Atividades Econômicas Obrigadas aos Documentos Fiscais Eletrônicos'
    },
    {
      id: 13,
      text: 'Malhas Fiscais'
    },
    {
      id: 14,
      text: 'Malhas Fiscais - Acompanhamento'
    },
    {
      id: 15,
      text: 'Malhas Fiscais - Administração de Listas de Suspeitas'
    },
    {
      id: 16,
      text: 'Malhas Fiscais - Configuração do PREFISMalhas Fiscais - Consulta de DAF'
    },
    {
      id: 17,
      text: 'Malhas Fiscais - Dashboard'
    },
    {
      id: 18,
      text: 'Malhas Fiscais - Dashboard de Empresas Noteiras'
    }
  ]

  if (!term) {
    return { results: [] }
  }

  const results = list.filter((item) => item.text.toLowerCase().includes(`${term}`.toLowerCase()))


  return { results }

})
