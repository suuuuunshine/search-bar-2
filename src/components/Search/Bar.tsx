interface BarProps {
  setSearchTerm: Function;
}

const Bar = ({ setSearchTerm }: BarProps) => {
  return (
    <>
      <div className="flex p-1 rounded-full border border-blue-100">
        <input
          className="focus:outline-none h-full w-full"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </>
  );
};

export default Bar;
