import prismaClient  from '../../prisma';
import { compare } from 'bcryptjs';

interface AuthRequest{
    email: string;
    password: string
}

class AuthUserService {
    async execute({email, password}: AuthRequest){
        console.log(email);
    // Verificar se o email existe....
    const user =  await prismaClient.user.findFirst({
        where:{
           email: email
        }
     })
  
     if (!user){
        throw new Error ('O email ou senha incorreto.')
     }

    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch){
        throw new Error ('O email ou senha incorreto.')

    }

    // verificar se a senha esta correta

    return{ok: true}

    }
}


export { AuthUserService };