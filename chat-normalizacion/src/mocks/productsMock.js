//import { Contenedor } from "../contenedores/contenedorMemoria.js";
//import { faker } from "@faker-js/faker"

const Contenedor = require("../managers/contenedorProductos.js")
const faker = require("@faker-js/faker")

const { commerce } = faker

class ProductMock extends Contenedor{
    constructor(){
        super()
    }

    populate(cant){
        let newProducts = []
        for (let i=0; i<cant; i++){
            newProducts.push(
                {
                    id: commerce.uuid(),
                    title: commerce.productName(),
                    price: commerce.price(),
                    thumbnail: commerce.avatar()
                }
            )
        }
        this.products = [...this.products, ...newProducts]
        return newProducts
    }
}

export { ProductMock }
