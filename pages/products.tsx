import { NextPage } from "next";
import Head from "next/head";

const Products: NextPage = () => {
    return(
        <>
            <Head>
                <title>Nossos Produtos</title>
                <meta name="descriprion" content="Conheça todos os nossos produtos"/>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1>
                Nossos produtos
            </h1>
        </>
    )
    
}

export default Products