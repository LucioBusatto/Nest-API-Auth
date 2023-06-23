import {BadRequestException, Inject, UnauthorizedException} from "@nestjs/common";
import {ClientProxy} from "@nestjs/microservices";
import {LoginDTO, RegisterDTO} from "./dtos";
import {firstValueFrom} from "rxjs";
import {JwtService} from "@nestjs/jwt";

export class AuthService {
    constructor(
        @Inject('USER_SERVICE') private client:ClientProxy,
        private readonly jwtService: JwtService
    ) {}

    async login(payload:LoginDTO) {
        try {
            const response = await firstValueFrom(this.client.send({ cmd: 'AUTH_LOGIN' }, payload));
            if(!this.validatePassword(payload.password, response.password)){
                throw new BadRequestException();
            }

            return JSON.stringify(this.jwtService.sign({email: response.email}));
        }catch (e) {
            throw new BadRequestException('Invalid Credentials');
        }
    }

    async register(payload:RegisterDTO){
        try {
            const response = await firstValueFrom(this.client.send({cmd:'AUTH_REGISTER'}, payload));
            return JSON.stringify(this.jwtService.sign({email: response.email}));
        }catch (e) {
            throw new BadRequestException('Email already exists');
        }
    }

    async listUsers(token){
        try {
            console.log(token);
            const decodedToken = this.jwtService.verify(token);
            const response = await firstValueFrom(this.client.send({cmd:'AUTH_LIST'}, decodedToken));
            return response;
        }catch (e) {
            console.log(e)
            throw new UnauthorizedException('Invalid Token');
        }
    }

    private validatePassword(password: string, password2) {
        return password === password2;
    }
}
