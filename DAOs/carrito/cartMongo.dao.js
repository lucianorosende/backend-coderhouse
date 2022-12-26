import { CartModel, ProductModel } from "../../models/index.js";

export class CarritoMongo {
    async getMongo() {
        try {
            let cart = await CartModel.find({});
            return cart;
        } catch (e) {
            console.log(e);
        }
    }
    async getIdMongo(id) {
        try {
            return await CartModel.find({ cartId: id });
        } catch (e) {
            console.log(e);
        }
    }
    async createCartMongo() {
        try {
            let read = await this.getMongo();
            let data = {
                cartId: undefined,
                timestamp: new Date().toLocaleDateString(),
                productos: [],
            };

            if (read.length === 0) {
                data.cartId = 1;
                await CartModel.create(data);
                return data.cartId;
            } else {
                data.cartId = read[read.length - 1].cartId + 1;
                await CartModel.create(data);
            }

            return data.cartId;
        } catch (e) {
            console.log(e);
        }
    }
    async saveProductInCart(cID, pID) {
        try {
            let product = await ProductModel.find({ productId: pID });
            let cart = await this.getIdMongo(cID);
            if (!cart.length || !product.length) {
                return null;
            } else {
                cart[0].productos.push(product[0]);

                await CartModel.updateOne(
                    { cartId: cID },
                    { $set: { productos: cart[0].productos } }
                );
            }
        } catch (e) {
            console.log(e);
        }
    }

    async deleteIdMongo(id) {
        try {
            return await CartModel.deleteOne({ cartId: id });
        } catch (e) {
            console.log(e);
        }
    }
    async deleteMongoCarts() {
        try {
            return await CartModel.deleteMany({});
        } catch (e) {
            console.log(e);
        }
    }
    async deleteProductInCart(cID, pID) {
        try {
            let cart = await this.getIdMongo(cID);
            let product = await ProductModel.find({ productId: pID });
            if (!cart.length || !product.length) {
                return null;
            } else {
                let prodArr = cart[0].productos;
                let filterProd = prodArr.filter((e) => e.productId != pID);
                await CartModel.updateOne(
                    { cartId: cID },
                    { $set: { productos: filterProd } }
                );
                return filterProd;
            }
        } catch (e) {}
    }
}
