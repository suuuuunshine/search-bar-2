interface PaginatorProps {
  pages: number;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  pageChange: Function;
  currentPage: number;
}

const Paginator = ({ pages, currentPage, pageChange }: PaginatorProps) => {
  return (
    <div className="w-100 justify-center flex space-x-2 mt-2">
      {[...Array(pages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => pageChange(index + 1)}
          className={`p-2 ${
            currentPage === index + 1
              ? "bg-blue-500 text-white"
              : "bg-blue-50 text-gray-500"
          } shadow w-10 rounded-full`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Paginator;
