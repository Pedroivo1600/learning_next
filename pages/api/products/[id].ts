import { NextApiRequest, NextApiResponse } from "next";
import products from '../../../database.json'

export default function handler(req: NextApiRequest, res: NextApiResponse){
    const { id } = req.query

    const product = products.find(prod => prod.id === Number(id)) //busca somente pelos ids da db e retorna o valor desse id em numero 
    res.status(200).json(product)  //rota: /api/products/um numero equivalente a algum id da db: retorna os dados do produto com esse id
}