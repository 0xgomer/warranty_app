import $api from "../axios";

export default class ProductService {
    static async getAllProducts ({page, limit, query}) {
        return $api.get('/products', {
            params: {page, limit, query}
        })
    }

    static async addProduct ({name, warranty, file}) {
        return $api.post('/product', {name, warranty, file}, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    static async editProduct ({id, name, warranty, file}) {
        return $api.patch('/product', {id, name, warranty, file}, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }

    static async deleteProduct (id) {
        return $api.delete('/product', {
            params: {
                id
            }
        })
    }
}