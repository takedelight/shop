import { Metadata } from "next";

import { ProductToolbarEntry } from "@/widgets/product/product-toolbar";

export const metadata: Metadata = {
  title: "Товари",
};

const ProductPage = () => {
  return (
    <div>
      <ProductToolbarEntry />
    </div>
  );
};

export default ProductPage;
