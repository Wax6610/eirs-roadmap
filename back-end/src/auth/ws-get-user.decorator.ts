import { Inject } from '@nestjs/common';
import { UsersService } from '../users/users.service';

export async function WsGetUser(): Promise<any> {
  const injectYourService = Inject(UsersService);

  return (
      target: any,
      propertyKey: string,
      propertyDescriptor: PropertyDescriptor,
  ) => {
    // this is equivalent to have a constructor like constructor(yourservice: YourServiceClass)
    // note that this will injected to the instance, while your decorator runs for the class constructor
   // injectYourService(target, 'UsersService');

    // do something in you decorator

    // we use a ref here so we can type it
    //const usersService: UsersService = this.yourservice;
   // console.log(usersService.findByUserDomain('1233212'));
    return {
      username: '121221',
    };
  };
}
