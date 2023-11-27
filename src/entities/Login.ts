import { v4 as uuid } from 'uuid';

class Login {
  public readonly id: string;

  public email: string;

  public username: string;

  public password: string;

  public type: string;

  constructor(props: Omit<Login, 'id'>, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}

export default Login;
