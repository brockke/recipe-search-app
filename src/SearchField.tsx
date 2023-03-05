function SearchField(props: {
  refetch: any;
  queryString: string;
  setQueryString: (queryString: string) => void;
}) {
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      void props.refetch();
    }
  };
  return (
    <div className="flex flex-col items-center animate-fade-in-down h-screen justify-center relative cursor-default">
      <div className="max-w-md mx-auto">
        <div className="relative group flex items-center w-full h-12 rounded-full outline outline-1 outline-black bg-amber-50 hover:bg-black overflow-hidden">
          <div className="grid place-items-center h-full w-12">
            <button
              onClick={() => {
                void props.refetch();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 stroke-black group-hover:stroke-amber-50 hover:stroke-amber-600"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
          <input
            className="peer bg-inherit h-full w-full outline-none text-sm text-black placeholder-gray-400 group-hover:placeholder-amber-50 group-hover:text-amber-50 pr-2"
            type="text"
            id="search"
            placeholder="Search recipes..."
            autoFocus
            value={props.queryString}
            onChange={(e) => props.setQueryString(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchField;
