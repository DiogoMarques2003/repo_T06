interface IServicoGetManyDTO {
  Querystring: {
    nome?: string;
    descricao?: string,
    tiposServicoId?: string;
  }
}

export default IServicoGetManyDTO;
