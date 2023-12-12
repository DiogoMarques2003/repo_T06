import { v4 as uuid } from 'uuid';

import Servico from './Servico';
import Pedidos from './Pedidos';

class Login {
  public readonly id: string;

  public email: string;

  public username: string;

  public password: string;

  public type: string;

  public readonly servicos?: Servico[];

  public readonly pedidos?: Pedidos[];

  constructor(props: Omit<Login, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}

export default Login;
