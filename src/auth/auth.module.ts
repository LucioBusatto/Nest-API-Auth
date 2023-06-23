import {AuthController} from "./auth.controller";
import {Module} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {ClientsModule, Transport} from "@nestjs/microservices";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'USER_SERVICE',
                transport: Transport.TCP,
                options: {
                    host: 'localhost',
                    port: 4200
                }
            }
        ]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'secret',
            signOptions: {
                expiresIn: '2h'
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: []
})
export class AuthModule {}