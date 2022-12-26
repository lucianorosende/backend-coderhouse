import { ProductModel } from "../../models/index.js";

export class ContenedorMongo {
    async getMongo() {
        try {
            let products = await ProductModel.find({});
            return products;
        } catch (e) {
            console.log(e);
        }
    }
    async getIdMongo(id) {
        try {
            let findProduct = await ProductModel.find({ productId: id });
            if (findProduct.length === 0) return null;
            return findProduct;
        } catch (e) {
            console.log(e);
        }
    }

    async createMongo(product) {
        try {
            const read = await this.getMongo();
            const { nombre, descripcion, codigo, foto, precio, stock } =
                product;
            if (
                !nombre ||
                !descripcion ||
                !codigo ||
                !foto ||
                !precio ||
                !stock
            ) {
                return null;
            }
            if (product.productId === undefined) {
                product.productId = 1;
                if (read.length > 0) {
                    product.productId = read[read.length - 1].productId + 1;
                }
            }
            product.timestamp = new Date().toLocaleTimeString();
            await ProductModel.create(product);
            return product.productId;
        } catch (e) {
            console.log(e);
        }
    }

    async updateMongo(id, product) {
        try {
            return await ProductModel.updateOne({ productId: id }, product);
        } catch (e) {
            console.log(e);
        }
    }
    async deleteIdMongo(id) {
        try {
            return await ProductModel.deleteOne({ productId: id });
        } catch (e) {
            console.log(e);
        }
    }
    async deleteMongo() {
        try {
            return await ProductModel.deleteMany({});
        } catch (e) {
            console.log(e);
        }
    }
}
