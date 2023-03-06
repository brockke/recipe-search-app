import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "wouter";

function SearchField() {
  const [queryString, setQueryString] = useState("");
  const [page, setPage] = useState(0);
  const [cuisine, setCusine] = useState("");
  const [searched, setSearch] = useState(false);
  const NUM_RETURN = 5;

  const fetchFood = async (page = 0, queryString: string, cuisine: string) => {
    console.log("FETCHING");
    if (cuisine != "") {
      return await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${queryString}&cuisine=${cuisine}&number=${NUM_RETURN}&offset=${
          page * NUM_RETURN
        }&apiKey=${
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          import.meta.env.VITE_SPOONACULAR_API_KEY
        }`,
      ).then((res) => res.json());
    } else {
      return await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${queryString}&number=${NUM_RETURN}&offset=${
          page * NUM_RETURN
        }&apiKey=${
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          import.meta.env.VITE_SPOONACULAR_API_KEY
        }`,
      ).then((res) => res.json());
    }
  };

  const { isLoading, isError, data, isFetching, isPreviousData, refetch } =
    useQuery({
      queryKey: ["projects", page],
      queryFn: () => fetchFood(page, queryString, cuisine),
      keepPreviousData: true,
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    });

  return (
    <div className="flex flex-col items-center animate-fade-in-down justify-center relative cursor-default">
      <SearchBar
        refetch={() => refetch()}
        queryString={queryString}
        setQueryString={(queryString: string) => setQueryString(queryString)}
        setPage={() => setPage(0)}
        setSeatched={() => setSearch(true)}
      />
      <label className="text-black font-medium">
        Pick a cuisine{" "}
        <select
          className="bg-amber-50"
          value={cuisine}
          onChange={(e) => {
            setCusine(e.target.value);
            () => refetch();
          }}
        >
          <option selected value={""}></option>
          <option value="African">African</option>
          <option value="American">American</option>
          <option value="British">British</option>
          <option value="Cajun">Cajun</option>
          <option value="Caribbean">Caribbean</option>
          <option value="Chinese">Chinese</option>
          <option value="Eastern European">Eastern European</option>
          <option value="European">European</option>
          <option value="French">French</option>
          <option value="German">German</option>
          <option value="Greek">Greek</option>
          <option value="Indian">Indian</option>
          <option value="Irish">Irish</option>
          <option value="Italian">Italian</option>
          <option value="Japanese">Japanese</option>
          <option value="Jewish">Jewish</option>
          <option value="Korean">Korean</option>
          <option value="Latin American">Latin American</option>
          <option value="Mediterranean">Mediterranean</option>
          <option value="Mexican">Mexican</option>
          <option value="Middle Eastern">Middle Eastern</option>
          <option value="Nordic">Nordic</option>
          <option value="Southern">Southern</option>
          <option value="Spanish">Spanish</option>
          <option value="Thai">Thai</option>
          <option value="Vietnamese">Vietnamese</option>
        </select>
      </label>
      {searched && (
        <div className="text-black">
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error</div>
          ) : (
            <div>
              <ul className="flex flex-row">
                {data.results.map(
                  (food: {
                    id: number;
                    image: string;
                    imageType: string;
                    title: string;
                  }) => (
                    <li className="px-1" key={food.id}>
                      {/* <Link to={`/data/${food.id}`}>{food.title}</Link> */}
                      <Link href={`/${food.id}`}>
                        <img
                          className="rounded-lg shadow-lg"
                          src={food.image}
                        />
                        <div className="">
                          <a className="link">{food.title}</a>
                        </div>
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}
          <div className="flex justify-center">
            {isFetching ? <span> Loading...</span> : null}{" "}
          </div>
          <div className="flex justify-center py-8">
            <button
              onClick={() => setPage((old) => Math.max(old - 1, 0))}
              disabled={page === 0}
            >
              <div className="rounded-full bg-black w-12 h-12">
                <svg
                  className="w-8 h-8 fill-amber-50 pl-4 pt-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -6.5 36 36"
                >
                  <path d="M10.892.29.35 10.742l-.059.054a.984.984 0 0 0-.291.642v.124c.014.234.11.463.291.642l.052.044L10.892 22.71c.39.387 1.023.387 1.413 0a.985.985 0 0 0 0-1.402l-9.008-8.934h31.704c.552 0 .999-.443.999-.99a.995.995 0 0 0-1-.992H3.533l8.773-8.7a.985.985 0 0 0 0-1.402 1.005 1.005 0 0 0-1.413 0ZM.885 11.383l10.714 10.626L.998 11.5v-.004l.059-.053.06-.06H.885Z" />
                </svg>
              </div>
            </button>
            <span className="text-4xl px-6 align-top ">{page + 1}</span>
            <button
              onClick={() => {
                if (!isPreviousData && data?.totalResults > NUM_RETURN * page) {
                  setPage((old) => old + 1);
                }
              }}
              disabled={
                isPreviousData || !(data?.totalResults > NUM_RETURN * page)
              }
            >
              <div className="rounded-full bg-black w-12 h-12 rotate-180">
                <svg
                  className="w-8 h-8 fill-amber-50 pl-4 pt-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -6.5 36 36"
                >
                  <path d="M10.892.29.35 10.742l-.059.054a.984.984 0 0 0-.291.642v.124c.014.234.11.463.291.642l.052.044L10.892 22.71c.39.387 1.023.387 1.413 0a.985.985 0 0 0 0-1.402l-9.008-8.934h31.704c.552 0 .999-.443.999-.99a.995.995 0 0 0-1-.992H3.533l8.773-8.7a.985.985 0 0 0 0-1.402 1.005 1.005 0 0 0-1.413 0ZM.885 11.383l10.714 10.626L.998 11.5v-.004l.059-.053.06-.06H.885Z" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const SearchBar = (props: {
  refetch: any;
  queryString: string;
  setQueryString: (query: string) => void;
  setPage: () => void;
  setSeatched: () => void;
}) => {
  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      props.setPage();
      props.refetch();
      props.setSeatched();
    }
  };
  return (
    <div className="flex flex-col items-center animate-fade-in-down py-32 justify-center relative cursor-default">
      <div className="max-w-md mx-auto">
        <div className="relative group flex items-center w-full h-12 rounded-full outline outline-1 outline-black bg-amber-50 hover:bg-black overflow-hidden">
          <div className="grid place-items-center h-full w-12">
            <button
              onClick={() => {
                props.setPage();
                props.refetch();
                props.setSeatched();
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
};

export default SearchField;
