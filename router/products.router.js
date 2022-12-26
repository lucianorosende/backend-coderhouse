import Express from "express";
import { ContenedorMongo } from "../DAOs/productos/productsMongo.dao.js";

//Router --------------------------------------------------------------------------------

const ContainerMongo = new ContenedorMongo();
export const productsRouter = Express.Router();

const isAdmin = (req, res, next) => {
    req.query.admin === "true"
        ? next()
        : res.status(400).json({ error: "You are not allowed to access this" });
};

// get Products
productsRouter.get("/", async (req, res) => {
    let PRODUCTS = await ContainerMongo.getMongo();
    PRODUCTS.length === 0
        ? res.json({ error: "No products found" })
        : res.json({ PRODUCTS: PRODUCTS });
});

// get Products based off id
productsRouter.get("/:id", async (req, res) => {
    const { id } = req.params;
    let product = await ContainerMongo.getIdMongo(id);
    product === null
        ? res.json({ error: "Product not found" })
        : res.json({ PRODUCT: product });
});

// add products and add id
productsRouter.post("/", isAdmin, async (req, res) => {
    let saveProduct = await ContainerMongo.createMongo(req.body);
    res.send(`producto con id: ${saveProduct}`);
});

// update product based off id
productsRouter.put("/:id", isAdmin, async (req, res) => {
    let update = await ContainerMongo.updateMongo(req.params.id, req.body);
    update.modifiedCount === 0
        ? res.send("no hay producto para actualizar")
        : res.send(`producto actualizado con id: ${req.params.id}`);
});

// delete product based off id
productsRouter.delete("/:id", isAdmin, async (req, res) => {
    let result = await ContainerMongo.deleteIdMongo(req.params.id);
    result.deletedCount === 0
        ? res.send("no hay producto para borrar")
        : res.send(`producto borrado con id ${req.params.id}`);
});
productsRouter.delete("/", isAdmin, async (req, res) => {
    const result = await ContainerMongo.deleteMongo();
    result.deletedCount === 0
        ? res.send("no hay productos para borrar")
        : res.send("TODOS LOS PRODUCTOS BORRADOS");
});
