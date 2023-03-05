import "./App.css";

import { useQuery } from "@tanstack/react-query";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useState,
} from "react";
// import { env } from "process";

function App() {
  const [queryString, setQueryString] = useState("");
  const [page, setPage] = useState(0);
  const [cuisine, setCusine] = useState("");

  const fetchFood = async (page = 0, queryString: string, cuisine: string) => {
    const NUM_RETURN = 2;
    return await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${queryString}&number=${NUM_RETURN}&offset=${
        page * NUM_RETURN
      }&apiKey=${
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        import.meta.env.VITE_SPOONACULAR_API_KEY
      }`,
    ).then((res) => res.json());
  };

  const { isLoading, isError, data, isFetching, isPreviousData } = useQuery({
    queryKey: ["projects", page],
    queryFn: () => fetchFood(page, queryString, cuisine),
    keepPreviousData: true,
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  console.log(data?.results);
  return (
    <div className="flex flex-col items-center animate-fade-in-down h-screen justify-center relative cursor-default">
      <div className="max-w-md mx-auto">
        <div className="relative group flex items-center w-full h-12 rounded-full outline outline-1 outline-black bg-amber-50 hover:bg-black overflow-hidden">
          <div className="grid place-items-center h-full w-12">
            <button
              onClick={() => {
                setQueryString("TEST");
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
            placeholder="Search something..."
            autoFocus
          />
        </div>
      </div>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error</div>
        ) : (
          <div>
            {data.results.map(
              (food: {
                id: number;
                image: string;
                imageType: string;
                title: string;
              }) => (
                <div key={food.id}>
                  <p>{food.title}</p>
                  <h1> {food.image} </h1>
                </div>
              ),
            )}
          </div>
        )}
        <span>Current Page: {page + 1}</span>
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 0}
        >
          Previous Page
        </button>{" "}
        <button
          onClick={() => {
            if (!isPreviousData && data.hasMore) {
              setPage((old) => old + 1);
            }
          }}
          // Disable the Next Page button until we know a next page is available
          disabled={isPreviousData || !data?.hasMore}
        >
          Next Page
        </button>
        {isFetching ? <span> Loading...</span> : null}{" "}
      </div>
    </div>
  );
}

export default App;
