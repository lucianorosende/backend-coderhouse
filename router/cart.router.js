import Express from "express";
import { CarritoMongo } from "../DAOs/carrito/cartMongo.dao.js";

const CartMongo = new CarritoMongo();
export const cartRouter = Express.Router();

cartRouter.get("/", async (req, res) => {
    let getCarts = await CartMongo.getMongo();
    getCarts.length === 0
        ? res.send("No hay carritos para cargar")
        : res.send(getCarts);
});

cartRouter.get("/:id", async (req, res) => {
    let getCart = await CartMongo.getIdMongo(req.params.id);
    getCart.length === 0
        ? res.send(`No hay ningun carrito con id ${req.params.id}`)
        : res.send(getCart);
});

cartRouter.get("/:id/productos", async (req, res) => {
    let getCart = await CartMongo.getIdMongo(req.params.id);
    getCart.length === 0
        ? res.send(`No hay ningun carrito con id ${req.params.id}`)
        : res.send(getCart[0].productos);
});

cartRouter.post("/", async (req, res) => {
    let newCart = await CartMongo.createCartMongo(req.body);
    res.send(`carrito creado con id ${newCart}`);
});

cartRouter.post("/:id/productos/:idPrd", async (req, res) => {
    let saveProduct = await CartMongo.saveProductInCart(
        req.params.id,
        req.params.idPrd
    );

    saveProduct === null
        ? res.send("no hay productos para agregar")
        : res.send(`producto agregado con id ${req.params.idPrd}`);
});

cartRouter.delete("/", async (req, res) => {
    const result = await CartMongo.deleteMongoCarts();
    result.deletedCount === 0
        ? res.send("no hay carritos para borrar")
        : res.send("TODOS LOS CARRITOS BORRADOS");
});

cartRouter.delete("/:id", async (req, res) => {
    let result = await CartMongo.deleteIdMongo(req.params.id);
    result.deletedCount === 0
        ? res.send("no hay carrito para borrar")
        : res.send(`carrito borrado con id ${req.params.id}`);
});

cartRouter.delete("/:id/productos/:idPrd", async (req, res) => {
    let deleteProduct = await CartMongo.deleteProductInCart(
        req.params.id,
        req.params.idPrd
    );

    deleteProduct.length === 0
        ? res.send("no hay productos para eliminar")
        : res.send(deleteProduct);
});
