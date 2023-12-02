interface IServicoGetManyDTO {
    Querystring: {
      nome?: string;
      descricao?: string,
      tipoServico?: string;
    }
  }
  
export default IServicoGetManyDTO;