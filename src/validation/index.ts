/* eslint-disable @typescript-eslint/no-unused-vars */
export const productValidation = (product: {
  title: string;
  description: string;
  img: string;
  price: string;
  // color: string[];
}) => {
  const errors: {
    title: string;
    description: string;
    img: string;
    price: string;
    // color: string[];
  } = {
    title: "",
    description: "",
    img: "",
    price: "",
    // color:[],
  };

  const validurl = /^(ftp|http|https):\/\/[^"]+$/.test(product.img);

  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 80
  ) {
    errors.title = "Product title must be between 10 and 80 characters!";
  }

  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 900
  ) {
    errors.description =
      "Product description must be between 10 and 900 characters!";
  }

  if (!product.img.trim() || !validurl) {
    errors.img = "Not valid image URL";
  }

  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "Not valid price";
  }

  // if (product.color.length === 0) {
  //   errors.color.push("Select at least one color");
  // }
  return errors;
};
