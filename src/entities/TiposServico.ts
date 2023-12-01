import { v4 as uuid } from 'uuid';

import Servico from './Servico';

class TiposServico {
  public readonly id: string;

  public nome: string;

  public readonly servicos?: Servico[];

  constructor(props: Omit<TiposServico, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}

export default TiposServico;
