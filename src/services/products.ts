export type ProductType = {
    id: number
    name: string
    description: string
    price: number
    imageUrl: string
    inStock: number
  }
  
  export const fetchProducts = async () => {
    const products: ProductType[] = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`).then(res => res.json()) //puxa da base de dados todos os produtos
    return products
  }
  
  export const fetchProduct = async (id: string | number) => {
    const product: ProductType = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${id}`).then(res => res.json()) //puxa da base de dados um produto, com base em seu id
    return product
  }