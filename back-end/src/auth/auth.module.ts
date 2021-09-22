import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import {UsersModule} from "../users/users.module";

@Module({
    imports: [
        UsersModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: "aWe6xFWnnaAZWfKO9vgowUffvnwPs2N2s11vvoli"
        })
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService, JwtStrategy, PassportModule]
})
export class AuthModule { }
