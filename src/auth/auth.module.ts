import {AuthController} from "./auth.controller";
import {Module} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {ClientsModule, Transport} from "@nestjs/microservices";

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
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}