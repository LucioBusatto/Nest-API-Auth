import {BadRequestException, Inject} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {LoginDTO, RegisterDTO} from "./dtos";
import {firstValueFrom} from "rxjs";

export class AuthService {
    constructor(@Inject('USER_SERVICE') private client:ClientProxy) {}

    async login(payload:LoginDTO) {
        try {
            const response = await firstValueFrom(this.client.send({ cmd: 'AUTH_LOGIN' }, payload));
            if(!this.validatePassword(payload.password, response.password)){
                throw new BadRequestException();
            }

            return response;
        }catch (e) {
            throw new BadRequestException('Invalid Credentials');
        }


    }

    async register(payload:RegisterDTO) {
        return this.client.send({cmd:'AUTH_REGISTER'}, payload)
    }

    private validatePassword(password: string, password2) {
        return password === password2;
    }
}
