import Header from "../../src/components/Header";
import ProductDetails from "../../src/components/PorductDetails";
import { ProductType, fetchProduct, fetchProducts } from "../../src/services/products"
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head"
import { Container } from "reactstrap";
import { ReactNode } from "react";

export const getStaticProps: GetStaticProps = async (context) => {
    const id = context.params?.id  //extrair o parâmetro id da URL da solicitação e armazená-lo na variável id

    if (typeof id === 'string') {
        const product = await fetchProduct(id)

        return {
            props: {
                product
            }
        }
    }

    return{
        redirect: {
            destination: '/products', //se ele nao cair dentro do if, vai retornar o redirect para caso nao tenha o produto
            permanent: false
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const products = await fetchProducts()

    const paths = products.map(product => {
        return { params: 
            { id : product.id.toString() }
        }
    })

    return {
        paths,
        fallback: false //serve para dizer que nao queremos que haja nenhuma acao de reserva quando nao encontrar o produto -> retorna 404
    }
}

const Product: NextPage = (props: {
    children?: ReactNode
    product?: ProductType
}) => {
    return(
        <div>
            <Head>
                <title>{props.product!.name}</title>
                <meta name="description" content={props.product!.description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <Container className="mt-5">
                <ProductDetails product={props.product!} />
            </Container>
        </div>
    )
}

export default Product