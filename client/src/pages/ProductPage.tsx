import ProductPageCopyButton from '#/components/ProductCard/ProductPage/ProductPageCopyButton';
import { ProductComments } from '#/components/ProductComments/ProductComments';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard/ProductCard';
import { useAppSelector } from '../libs/hooks/redux';

export default function ProductPage() {
  const { products } = useAppSelector((state) => state.productReducer);
  const { id } = useParams();

  const parsedId = Number(id);

  if (!id) {
    return <div>Invalid product ID</div>;
  }

  const foundProduct = products.find(({ node }) => node.id === parsedId);

  if (!foundProduct) {
    return <div>Product not found</div>;
  }

  const { node: product } = foundProduct;

  return (
    <main className="mx-auto my-10 flex w-11/12 flex-col justify-center gap-8 lg:w-11/12 lg:justify-normal xl:w-10/12 2xl:w-2/3">
      <div className="flex">
        <ProductCard
          product={product}
          className="flex h-full flex-col gap-8 lg:h-[400px] lg:flex-row"
          image={
            <ProductCard.Image
              className="flex w-[250px] self-center sm:w-[300px]"
              top={
                <ProductCard.TagContainer>
                  <ProductCard.Tag.FreeDelivery />
                  <ProductCard.Tag.Ukrainian />
                </ProductCard.TagContainer>
              }
            />
          }
          info={
            <div>
              <ProductCard.ProductPage.Name />
              <ProductCard.Discount />
              <ProductCard.Price className="text-3xl font-medium" />
              <ProductCard.ProductPage.Size />
              <ProductCard.ProductPage.Buttons className="mb-5" />
              <ProductCard.Like />
              <ProductPageCopyButton />
            </div>
          }
        />
      </div>
      <hr className="mt-10 w-full" />
      <ProductComments product={product} />
    </main>
  );
}
