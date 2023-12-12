import { v4 as uuid } from 'uuid';

import Servico from './Servico';
import Login from './Login';

class Pedidos {
  public readonly id: string;

  public readonly servicoId: string;

  public readonly clienteId: string;

  public status: string;

  public descricao: string;

  public readonly servico?: Servico;

  public readonly cliente?: Login;

  constructor(props: Omit<Pedidos, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}

export default Pedidos;
