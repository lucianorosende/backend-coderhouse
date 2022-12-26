import { MessageModel } from "../../models/index.js";

export class Messages {
    async getMessages() {
        try {
            return await MessageModel.find({});
        } catch (e) {
            console.log(e);
        }
    }
    async saveMessages(data) {
        try {
            await MessageModel.create(data);
            return await this.getMessages();
        } catch (e) {
            console.log(e);
        }
    }
    async deleteMessages() {
        try {
            await MessageModel.deleteMany({});
            return await this.getMessages();
        } catch (e) {
            console.log(e);
        }
    }
}
