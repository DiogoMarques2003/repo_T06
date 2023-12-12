import Pedidos from '@entities/Pedidos';

interface IPedidoRepository {
  getByID(id: string): Promise<Pedidos>;
  getAll(): Promise<Pedidos[]>;
  create(servico: Pedidos): Promise<Pedidos>;
  update(servico: Pedidos): Promise<Pedidos>;
  delete(id: string): Promise<boolean>;
  getByClienteAndServico(clienteId: string, servicoId: string): Promise<Pedidos | null>;
}

export default IPedidoRepository;
