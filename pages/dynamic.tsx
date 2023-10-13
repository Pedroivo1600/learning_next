import { NextPage, GetServerSideProps } from "next";
import { Container, Row, Col } from "reactstrap";
import { ReactNode, useEffect, useState } from "react";

interface ApiResponse {
    name: string
    timestamp: Date
}


//Fazendo o HTMl da página dinãmica não ficar vazio na parte de dados buscados do Servidor
export const getServerSideProps: GetServerSideProps = async () => {
    const serverSideData: ApiResponse = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/hello`).then(res => res.json()) //Next precisa que a gnt passe o caminho absoluto da URL, pois esse código vai estar rodando no servidor

    return {
        props: {
            serverSideData //é assim que acessamos os dados dessa função que vem do lado do servidor (hello.ts) tem q estar disponivel nas props do nosso componente abaixo
        }
    }
}

const Dynamic: NextPage = (props: {
    children?: ReactNode
    serverSideData?: ApiResponse
}) => {
    const [clientSideData, setClientSideData] = useState<ApiResponse>()  //Inicializa o estado em clientSideData e atualiza o estado em setClientSideData

    useEffect(() => { //gerenciar efeitos colaterais em componentes funcionais. Efeitos colaterais referem-se a qualquer ação que um componente precisa realizar fora do fluxo de renderização, como buscar dados de uma API,
        fetchData()
    }, []) //array vazio faz não chamar API toda hora, só qdo reinicia a pagina. Este array serve para vc configurar quando quer usar a função fetchData, e é p isso que o useEffect serve

    const fetchData = async () => {
        const data = await fetch("/api/hello").then( res => res.json()) //fetch busca dados de uma API; .then() trata a resposta da slicitação
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
                        Gerado no servidor:
                    </h3>
                    <h2>
                        {props.serverSideData?.timestamp.toString()}
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

export default Dynamic