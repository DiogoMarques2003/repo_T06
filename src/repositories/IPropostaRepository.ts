import Proposta from '@entities/Proposta';

interface IPropostaRepository {
  getByPedido(pedidoId: string): Promise<Proposta[]> | null;
}

export default IPropostaRepository;
