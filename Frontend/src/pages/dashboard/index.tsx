import { canSSRAuth } from '../../utils/canSSRAuth'
import Head from 'next/head';

import { Header } from '../../components/Header'

export default function Dashboard(){
  return(
    <>
    <Head>
      <title>Painel - Sujeito Pizzaria</title>
    </Head>
    <div>
      <Header/>
    
     
    </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  return {
    props: {}
  }
})