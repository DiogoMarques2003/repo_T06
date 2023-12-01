import TiposServico from '@entities/TiposServico';

interface ITiposServicoRepository {
  getByID(id: string): Promise<TiposServico>;
}

export default ITiposServicoRepository;
