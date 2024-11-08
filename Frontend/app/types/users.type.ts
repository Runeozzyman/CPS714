import { Address } from "./address.types";

export type Users = {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    address: Address;
  }