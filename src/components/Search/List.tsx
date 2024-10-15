import { Product } from "../../types/Product";

interface ListProps {
  products: Product[] | null;
  show: boolean;
  setShow: Function;
}

const List = ({ products, show, setShow }: ListProps) => {
  return (
    <>
      {show && products && (
        <div className="shadow rounded-xl" onClick={() => setShow(false)}>
          {products.map((product) => (
            <p
              key={`list${product.id}-list`}
              className="text-xs py-2 px-4 hover:bg-blue-50"
            >
              {product.title}
            </p>
          ))}
        </div>
      )}
    </>
  );
};

export default List;
