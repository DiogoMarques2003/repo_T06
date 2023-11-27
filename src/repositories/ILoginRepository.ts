import Login from '@entities/Login';

interface ILoginRepository {
  getByID(id: string): Promise<Login>;
}

export default ILoginRepository;
