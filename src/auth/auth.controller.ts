import {Body, Controller, Post, Headers, Get} from "@nestjs/common";
import {LoginDTO} from "./dtos";
import {RegisterDTO} from "./dtos";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('login')
    async login(@Body() payload: LoginDTO) {
        return this.authService.login(payload);
    }

    @Post('register')
    async register(@Body() payload: RegisterDTO) {
        return this.authService.register(payload);
    }

    @Get('list')
    async list(@Headers('authorization') authorization: string) {
        if (authorization) {
            const [bearer, token] = authorization.split(' ');
            return this.authService.listUsers(token);
        }
    }
}