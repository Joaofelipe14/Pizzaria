import prismaClient  from '../../prisma';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

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

      // verificar se a senha esta correta
    if(!passwordMatch){
        throw new Error ('O email ou senha incorreto.')

    }

    // Gerar um token JWT para Autenticar Usuarios

    const token = sign(
        {
        name: user.name,
        email: user.email
        },
        process.env.JWT_SECRET,
        {subject : user.id,
            expiresIn : '30d'
        }
    )
  
    return{
        id: user.id,
        name: user.name,
        email: user.email,
        token: token }

    }
}


export { AuthUserService };