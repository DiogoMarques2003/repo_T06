import Servico from '@entities/Servico';

interface IServicoRepository {
  getByID(id: string): Promise<Servico>;
  getAll(): Promise<Servico[]>;
  create(servico: Servico): Promise<Servico>;
  update(servico: Servico): Promise<Servico>;
  delete(id: string): Promise<boolean>;
  getByTipoServicoAndOwner(tiposServicoId: string, donoId: string): Promise<Servico>;
  getByFilter(filtros: GetServicosWithFilters): Promise<Servico[]> | null;
}

export default IServicoRepository;
