import { geo } from "./geo.type";

export type Address = {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: geo;
  }