import { v4 as uuid } from 'uuid';

import Login from './Login';
import TiposServico from './TiposServico';

class Servico {
  public readonly id: string;

  public readonly donoId: string;

  public readonly tiposServicoId: string;

  public nome: string;

  public descricao: string;

  public readonly dono?: Login;

  public readonly tiposServico?: TiposServico;

  constructor(props: Omit<Servico, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}

export default Servico;
