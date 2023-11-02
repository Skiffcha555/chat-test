import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthInput } from 'src/user/models/inputs/authInput';
import { AuthService } from './auth.service';
import { AuthDTO } from 'src/user/models/dto/authDto.types';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthDTO)
  async signIn(@Args('data') authInput: AuthInput): Promise<AuthDTO> {
    const { email, password } = authInput;
    return this.authService.signIn({ email, password });
  }
}
