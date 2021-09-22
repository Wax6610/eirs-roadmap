import { Users } from '../../users/users.entity';

export default interface IUser {
  domain: string;
  account: string;
  role: string;
  info: Users;
}
