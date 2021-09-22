import { Users } from '../../users/users.entity';

export interface UserListDto {
  socketId: string;
  user: Users | undefined;
}