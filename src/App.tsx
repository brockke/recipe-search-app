import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import SearchField from "./SearchField";

function App() {
  const [queryString, setQueryString] = useState("");
  const [page, setPage] = useState(0);
  const [cuisine, setCusine] = useState("");
  const NUM_RETURN = 2;

  const fetchFood = async (page = 0, queryString: string, cuisine: string) => {
    console.log("FETCHING");
    return await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${queryString}&number=${NUM_RETURN}&offset=${
        page * NUM_RETURN
      }&apiKey=${
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        import.meta.env.VITE_SPOONACULAR_API_KEY
      }`,
    ).then((res) => res.json());
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

  // const routeConfig = createRouteConfig().createChildren((createRoute) => [
  //   createRoute({
  //     path: "/",
  //     element: <Index />,
  //   }),
  //   createRoute({
  //     path: "posts",
  //     element: <Posts />,
  //     errorElement: "Oh crap!",
  //     loader: async () => {
  //       queryClient.getQueryData(["posts"]) ??
  //         (await queryClient.prefetchQuery(["posts"], fetchPosts));
  //       return {};
  //     },
  //   }).createChildren((createRoute) => [
  //     createRoute({ path: "/", element: <PostsIndex /> }),
  //     createRoute({
  //       path: ":postId",
  //       element: <Post />,
  //       loader: async ({ params: { postId } }) => {
  //         queryClient.getQueryData(["posts", postId]) ??
  //           (await queryClient.prefetchQuery(["posts", postId], () =>
  //             fetchPostById(postId),
  //           ));
  //         return {};
  //       },
  //     }),
  //   ]),
  // ]);

  // // Set up a ReactRouter instance
  // const router = createReactRouter({
  //   routeConfig,
  //   defaultPreload: "intent",
  // });

  return (
    <div>
      <div className="flex flex-col items-center animate-fade-in-down h-screen justify-center relative cursor-default">
        <SearchField
          refetch={() => refetch()}
          queryString={queryString}
          setQueryString={(queryString: string) => setQueryString(queryString)}
          setPage={() => setPage(0)}
        />
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
                    <img src={food.image} />
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
              if (!isPreviousData && data?.totalResults > NUM_RETURN * page) {
                setPage((old) => old + 1);
              }
            }}
            // Disable the Next Page button until we know a next page is available
            disabled={
              isPreviousData || !(data?.totalResults > NUM_RETURN * page)
            }
          >
            Next Page
          </button>
          {isFetching ? <span> Loading...</span> : null}{" "}
        </div>
      </div>
    </div>
  );
}

export default App;
