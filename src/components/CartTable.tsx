import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "reactstrap";
import { useCart } from "../hooks/useCart";
import { ProductType } from "../services/products";

type CartEntry = {
  product: ProductType
  quantity: number
}

const CartTableRow = (props: {
  entry: CartEntry
}) => {
  const { addProduct, removeProduct } = useCart()

  return (
    <tr>
      <td>
        <Row className="align-items-center">
          <Col xs={4} md={2} lg={1}>
            <Image
              src={props.entry.product.imageUrl}
              alt={props.entry.product.name}
              height={70}
              width={70}
            />
          </Col>
        </Row>
      </td>
      <td>{props.entry.product.name}</td>
      <td>R$ {props.entry.product.price}</td>
      <td>{props.entry.quantity}</td>
      <td>R$ {(props.entry.product.price * props.entry.quantity)}</td>
      <td>
        <Button
          color="primary"
          size="sm"
          onClick={() => addProduct(props.entry.product)}
        >
          +
        </Button>
        {' '}
        <Button
          color="danger"
          size="sm"
          onClick={() => removeProduct(props.entry.product.id)}
        >
          –
        </Button>
      </td>
    </tr>
  )
}



export default function CartTable() {
    const [cartEntries, setCartEntries] = useState<CartEntry[]>([])
    const { cart } = useCart()
  
    useEffect(() => { //semore que o cart muda, o efeito é acionado
        const entriesList = cart.reduce((list, product) => { //entriesList é uma variável que vai armazenar as listas de entradas do carrinho. É inicializada com um array vazio []
            const entryIndex = list.findIndex(entry => entry.product.id === product.id) //reduce permite acumular valores. Para cada item no cart, reduce é executadaa
    
            if (entryIndex === -1) {  //verifica se já existe uma entrada correspondente para esse produto na lista, se não existir, (entryIndex = -1), produto e a quantidade 1 sao adicionados
            return [
                ...list,
                {
                product, //nova entrada
                quantity: 1
                }
            ]
            }
    
            list[entryIndex].quantity++ //se existir, +1 é incrementado a quantidade
            return list
  
      }, [] as CartEntry[]) //entriesList é inicializado como um array vazio as CartEntry[] - cada "append" é uma entry
  
      entriesList.sort((a, b) => a.product.id - b.product.id) //ordenando com base nos ids
      setCartEntries(entriesList) //atualiza cartEntries
  
    }, [cart])
  
    return (
      <Table responsive className="align-middle" style={{ minWidth: '32rem' }}>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Preço</th>
            <th>Qtd.</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
                  {cartEntries.map(entry => <CartTableRow key={entry.product.id} entry={entry} />)}
        </tbody>
      </Table>
    )
  }