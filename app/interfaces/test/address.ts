import { geo } from "./geo";

export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: geo;
  }