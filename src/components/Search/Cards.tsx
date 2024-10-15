import { Product } from "../../types/Product";

interface CardsProps {
  products: Product[] | null;
}

const Cards = ({ products }: CardsProps) => {
  return (
    <div className="flex flex-wrap space-x-2">
      {products &&
        products.map((product) => (
          <div key={product.id} className="px-1 py-2 shadow h-70 w-40 rounded">
            <div
              className="bg-cover bg-center h-40 rounded"
              style={{ backgroundImage: `url(${product.images[0]})` }}
            />
            <p className="text-sm px-1 line-clamp-2">{product.title}</p>
            <p className="text-xs px-1 line-clamp-4 mt-1">
              {product.description}
            </p>
          </div>
        ))}
    </div>
  );
};

export default Cards;
