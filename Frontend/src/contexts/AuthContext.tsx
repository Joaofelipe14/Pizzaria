import { createContext, ReactNode, useState } from 'react';


import {api} from '../services/apiClient'

import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router';


type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  singUp: (credentials: SingUpProps) => Promise<void>;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
}

type SignInProps = {
  email: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

type SingUpProps ={
  name: string,
  email: string,
  password: string
}
export const AuthContext = createContext({} as AuthContextData)


export function signOut(){
  try{
    destroyCookie(undefined, '@nextauth.token')
    Router.push('/')
  }catch{
    console.log('erro ao deslogar')
  }
}

export function AuthProvider({ children }: AuthProviderProps){
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInProps){
    try{
      const response = await api.post('/session',{
        email,
        password
      })


     // console.log(response.data);

     const {id, name, token} = response.data
     setCookie(undefined, '@nextauth.token', token,{
      maxAge: 60*60*23*30, 
      path: '/' 
     })

     setUser({
      id,
      name,
      email
     })


     // Passando o token para as proximas requisições

     api.defaults.headers['Authorization'] = `Bearer${token}`

     //Redirecionar

     Router.push('/dashboard')


    }catch(err){
      console.log(err,'erro')
    }
  }

 async function singUp ({name, email, password}: SingUpProps){

  console.log(name);
  try{

    const response = await api.post('/users',{
      name,
      email,
      password
    })

    console.log("Cadastrado com sucesso!")

    Router.push('/')

  }catch(err){
    console.log("erro ao cadastrar", err)
  }


 }
  
  return(
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut,singUp }}>
      {children}
    </AuthContext.Provider>
  )
}