import { NextPage, GetStaticProps } from "next";
import { Container, Row, Col } from "reactstrap";
import { ReactNode, useEffect, useState } from "react";

interface ApiResponse {
    name: string
    timestamp: Date
}

export const getStaticProps: GetStaticProps = async () => {
    const staticData = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/hello`).then(res => res.json())

    return {
        props: {
            staticData
        }, revalidate: 10
    }
} //dados nao sao atualizados no lado do cliente, o dado é gerado estaticamente. COm o revalidate: 10 eles sao atualizados a cada 10 segundos



//Fazendo o HTMl da página dinãmica não ficar vazio na parte de dados buscados do Servidor


const Static: NextPage = (props: {
    children?: ReactNode
    staticData?: ApiResponse
}) => {
    const [clientSideData, setClientSideData] = useState<ApiResponse>()  //Inicializa o estado em clientSideData e atualiza o estado em setClientSideData

    useEffect(() => { //gerenciar efeitos colaterais em componentes funcionais. Efeitos colaterais referem-se a qualquer ação que um componente precisa realizar fora do fluxo de renderização, como buscar dados de uma API,
        fetchData()
    }, []) //array vazio faz não chamar API toda hora, só qdo reinicia a pagina. Este array serve para vc configurar quando quer usar a função fetchData, e é p isso que o useEffect serve

    const fetchData = async () => {
        const data = await fetch("/api/hello").then( res => res.json()) //fetch busca dados de uma API; .then() trata a resposta da slicitação xxxx
        setClientSideData(data)
    }

    return(
        <Container tag="main">
            <h1 className="my-5">
                Como funcionam as renderizações do Next.js
            </h1>

            <Row>
                <Col>
                    <h3>
                        Gerado no estaticamente durante o build:
                    </h3>
                    <h2>
                        {props.staticData?.timestamp.toString()}
                    </h2>
                </Col>

                <Col>
                    <h3>
                        Gerado no Cliente:
                    </h3>
                    <h2>
                        {clientSideData?.timestamp.toString()}
                        {/* ao buscar o código fonte no chrome, você vai se deparar com algo ilegível.
                        Ao colar ele em um arquivo HTMl no VScode, ele é traduzido e se tornal um html normal.
                        Ao analisar o HTML, esses dados da API nesse h2 estariam vazios, pois não existem no código fonte da página (Isso é prejudicial). O JS carrega
                        todos eles uma vez que a página é carregada dinamicamente */}
                    </h2>
                </Col>
            </Row>
        </Container>

    )
}

export default Static