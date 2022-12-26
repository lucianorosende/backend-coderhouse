import { cartRouter, productsRouter, authRouter } from "./router/index.js";
import { PassportStrategy, ConnectMongo } from "./options/index.js";
import Express from "express";
import http from "http";
import cors from "cors";
import ConnectWebSocket from "./api/websocket.js";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongodb-session";
import passport from "passport";
import session from "express-session";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import * as dotenv from "dotenv";
dotenv.config();
const argv = yargs(hideBin(process.argv)).argv;

// Creando Servidor -----------------------------------------------------
const app = Express();
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());
const server = http.createServer(app);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    cors({
        origin: process.env.SOCKET_ORIGIN,
        methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
        credentials: true,
    })
);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header(
        "Access-Control-Allow-Methods",
        "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
    );
    next();
});

const MongoDBstore = MongoStore(session);

const sessionStore = new MongoDBstore({
    uri: process.env.MONGO_URL,
    collection: "sessions",
});

app.use(
    session({
        store: sessionStore,
        secret: process.env.MONGO_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 20000,
            secure: false,
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());
PassportStrategy(passport);

// PASSPORT ---------------------------------------------------------

// Declarando Rutas --------------------------------
app.use("/api/productos", productsRouter);
app.use("/api/carrito", cartRouter);
app.use("/auth", authRouter);

// Levanta el server -----------------------------------------------------------------
const PORT = argv.PORT || 8081;
const srv = server.listen(PORT, () => {
    console.log(`server up on ${PORT}`);
});
srv.on("error", (err) => console.log("server error: " + err));

// Websocket Runtime --------------------------------------------------------------
ConnectWebSocket(server);
// Mongo Connection --------------------------------------------------------------
ConnectMongo();
