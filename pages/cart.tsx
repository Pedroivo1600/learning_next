import CartTable from "@/src/components/CartTable";
import Header from "@/src/components/Header";
import { NextPage } from "next";
import Head from "next/head"
import { Container } from "reactstrap";

const Cart: NextPage = () => {
    return(
        <>
            <Head>
                <title>Carrinho</title>
                <meta name="descriprion" content="Meu carrinho de compras"/>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <main>
                <Container className="mb-5">
                    <h1 className="my-5">
                        Carrinho
                    </h1>

                    <CartTable />
                </Container>
            </main>
        </>
    )
    
}

export default Cart