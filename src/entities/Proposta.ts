import { v4 as uuid } from 'uuid';

import Pedidos from './Pedidos';

class Proposta {
  public readonly id: string;

  public readonly pedidoID: string;

  public descricao: string;

  public valor: number;

  public status: string;

  public readonly pedido?: Pedidos;

  constructor(props: Omit<Proposta, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}

export default Proposta;
