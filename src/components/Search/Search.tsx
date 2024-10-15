import Bar from "./Bar";
import List from "./List";
import Cards from "./Cards";
import Loading from "./Loading";
import Error from "./Error";
import Paginator from "./Paginator";
import { Product } from "../../types/Product";
import { useFetch } from "../../hooks/fetch";

import axios from "axios";
import { useEffect, useState, useMemo } from "react";

const Search = () => {
  const pageLength = 16;
  const totalItems = 51;
  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const [products, setProducts] = useState<Product[]>([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [showList, setShowList] = useState(false);

  const url = useMemo(() => {
    return debouncedSearchTerm
      ? `https://api.escuelajs.co/api/v1/products?offset=0&limit=${pageLength}&title=${debouncedSearchTerm}`
      : `https://api.escuelajs.co/api/v1/products?offset=${
          pageLength * currentPage - 1
        }&limit=${pageLength}`;
  }, [debouncedSearchTerm, currentPage]);

  const { loading, error, data: products } = useFetch<Product[]>(url); //

  const pages = useMemo(() => {
    if (searchTerm) {
      if (!products) return 0;
      return Math.ceil(products.length / pageLength);
    } else return Math.ceil(totalItems / pageLength);
  }, [searchTerm, products]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setCurrentPage(1);
      setDebouncedSearchTerm(searchTerm);
      if (searchTerm) setShowList(true);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       setLoading(true);
  //       const url = debouncedSearchTerm
  //         ? `https://api.escuelajs.co/api/v1/products?offset=0&limit=${pageLength}&title=${debouncedSearchTerm}`
  //         : `https://api.escuelajs.co/api/v1/products?offset=${
  //             pageLength * currentPage - 1
  //           }&limit=${pageLength}`;
  //       const response = await axios.get(url);
  //       setProducts(response.data);
  //     } catch (err) {
  //       setError((err as Error).message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchProducts();
  // }, [debouncedSearchTerm, currentPage]);

  return (
    <div className="px-10 py-4">
      <Bar setSearchTerm={setSearchTerm} />
      {loading && <Loading />}
      {error && !loading && <Error />}
      {!loading && (
        <List show={showList} products={products} setShow={setShowList} />
      )}
      {!loading && <Cards products={products} />}
      {!loading && (
        <Paginator
          pages={pages}
          pageChange={setCurrentPage}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

export default Search;
