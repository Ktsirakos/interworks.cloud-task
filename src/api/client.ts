import type { Product } from "./types";

export class ApiClient {

    static fetchAllProducts(): Promise<Product[]> {
        return fetch("/server/products.json")
            .then((value) => value.json())
            .then((value) => value.products)

    }
}