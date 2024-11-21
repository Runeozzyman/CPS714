import { Address } from "./address";

export interface Users {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    address: Address;
  }