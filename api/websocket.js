import { Server } from "socket.io";
import { ContenedorMongo, Messages } from "../DAOs/index.js";

// Websocket ----------------------------------------------------------------------------
const Container = new ContenedorMongo();
const Message = new Messages();

const ConnectWebSocket = (localServer) => {
    const io = new Server(localServer, {
        cors: {
            origin: process.env.SOCKET_ORIGIN,
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on("connection", async (socket) => {
        console.log("new connection");
        socket.on("deploy", async (data) => {
            if (data === "deploy") {
                socket.emit("messages", await Message.getMessages());
                socket.emit("products", await Container.getMongo());
            }
        });

        socket.on("update", async (data) => {
            await Container.createMongo(data);
            io.sockets.emit("products", await Container.getMongo());
        });

        socket.on("newMsg", async (data) => {
            io.sockets.emit("messages", await Message.saveMessages(data));
        });
        socket.on("deleteProducts", async (data) => {
            if (data === "delete") {
                await Container.deleteMongo();
                io.sockets.emit("products", await Container.getMongo());
            }
        });
        socket.on("deleteMessages", async (data) => {
            if (data === "delete") {
                io.sockets.emit("messages", await Message.deleteMessages());
            }
        });
    });
};

export default ConnectWebSocket;
