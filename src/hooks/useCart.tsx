import { ReactNode, createContext, useState, useEffect, useContext } from "react"
import { ProductType } from "../services/products"

type CartContextType = {
    cart: ProductType[]
    addProduct: (product: ProductType) => void //n retorna nada (void)
    removeProduct: (productId: number) => void //n retorna nada (void)
}

const CartContext = createContext<CartContextType>({} as CartContextType) //createContext -> cria um contexto e aceita um valor inicial.
//O valor inicial é um objeto vazio com o tipo CartContextType
//A notação '{} as CarttContextType> é uma forma de dizer ao TypeScript que o valor inicial é um objeto que segue o formato do tipo 'CartContextType'

//Após definir o contexto, você pode usar o CartContext.Provider para envolver componentes que desejam acessar as informações do carrinho no contexto. 
//Isso permite que esses componentes acessem as propriedades do contexto, como cart, addProduct e removeProduct,

export const CartContextProvider = (props: {
    children?: ReactNode
}) => {
    const [cart, setCart] = useState<ProductType[]>([]) //inicializa o estado em cart e atualiza o estado em setCart

    useEffect(() => { //sempre que o local storage muda, o efeito é acionado
        const storedCart = localStorage.getItem('shopping-cart') //Valor armazenado no localStorage sob a chave 'shopping-cart'.

        if (storedCart){ //se storedCart é verdadeiro (se há algo no localStorage)
            setCart(JSON.parse(storedCart)) //atualiza o estado do carrinho 
        }
    }, []) //o array vazio faz com que a função não seja executada toda hora, somente qdo a pag é atualizada

    const addProduct = (product: ProductType) => {
        const updatedCart = [...cart, product] // criando uma nova matriz chamada updatedCart que contém todos os elementos do carrinho atual (representado pela variável cart) 
                                                //mais o produto que está sendo adicionado. Isso é feito usando a sintaxe de propagação (...) para criar uma nova matriz que combina o conteúdo do carrinho atual e o novo produto.
        localStorage.setItem('shopping-cart', JSON.stringify(updatedCart)) //armazena a nova versão do carrinho (representada por updatedCart) no localStorage do navegador. 
                                                                            //O localStorage é uma maneira de armazenar dados no navegador do usuário.
        setCart(updatedCart)
    }

    const removeProduct = (productId: number) => {
        const productIndex = cart.findIndex(product => product.id === productId) //encontra o índice do produto no carrinho (representado pela variável cart) com base no productId. A função findIndex percorre o array cart e retorna o índice do primeiro elemento que atende à condição especificada.

        //Se nenhum produto com o productId especificado for encontrado, productIndex será definido como -1.

        if (productIndex !== -1){
            const updatedCart = [...cart] //cria uma cópia do carrinho atual para evitar a modificação direta do estado. Isso é feito usando a sintaxe de propagação (...) para criar uma nova matriz que é uma cópia exata do carrinho atual.
            updatedCart.splice(productIndex, 1) //O productIndex é o índice do produto a ser removido, e 1 é o número de elementos a serem removidos. 
            localStorage.setItem('shopping-cart', JSON.stringify(updatedCart))
            setCart(updatedCart)
        }

    }

    return (
        <CartContext.Provider
          value={{ cart, addProduct, removeProduct }}
        >
          {props.children}
        </CartContext.Provider>
    );


}

export const useCart = () =>  useContext(CartContext)  //useContext -> compartilha infos entre componentes