interface IPedidoCriarPropostaDTO {
  Params: {
    pedidoID: string;
  }
  Body: {
    valor: number;
    descricao: string;
    aceito: boolean;
  }
}

export default IPedidoCriarPropostaDTO;
