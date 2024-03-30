import { TProductName } from "../typs";

export interface IProduct {
  id?: string | undefined;
  title: string;
  description: string;
  img: string;
  price: string;
  colors: string[];
  category: {
    name: string;
    img: string;
  };
}

export interface IFormInput {
  id: string;
  name: TProductName;
  label: string;
  type: string;
}

export interface ICategory {
  id: string;
  name: string
  img: string
}
