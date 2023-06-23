import { Body, Controller, Post } from "@nestjs/common";
import {LoginDTO} from "./dtos/login.dto";
import {RegisterDTO} from "./dtos/register.dto";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService) {}

    @Post('login')
    async login(@Body() payload:LoginDTO) {
        return this.authService.login(payload);
    }

    @Post('register')
    async register(@Body() payload:RegisterDTO) {
        return this.authService.register(payload);
    }
}