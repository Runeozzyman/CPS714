import { Message } from "./message";

export interface UsernameMessage extends Message {
    username: string;
}