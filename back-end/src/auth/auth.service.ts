import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    valudateUser(username: string, password: string): { user: string, role: string } {

        if (username && password) {
            return { user: 'Tesst', role: 'megaadmin' }
        }
        return null;
    }
}
