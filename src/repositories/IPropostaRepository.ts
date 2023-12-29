import Proposta from '@entities/Proposta';

interface IPropostaRepository {
  getByPedido(pedidoId: string): Promise<Proposta[]> | null;
  criar(proposta: Proposta): Promise<Proposta>;
}

export default IPropostaRepository;
