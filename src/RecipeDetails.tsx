/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useQuery } from "@tanstack/react-query";

function RecipeDetails(props: { id: string | undefined }) {
  const fetchFood = async (id: string | undefined) => {
    console.log("FETCHING DETAILS");
    if (id == undefined) return;
    return await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${
        import.meta.env.VITE_SPOONACULAR_API_KEY
      }`,
    ).then((res) => res.json());
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: ["projects"],
    queryFn: () => fetchFood(props.id),
    keepPreviousData: true,
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  console.log(data);
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error</div>
      ) : (
        <div className="flex flex-row text-black">
          <div className="basis-1/2">
            <div className="p-8">
              <img className="rounded-lg shadow-lg" src={data?.image} />
            </div>
          </div>
          <div className="basis-1/2 px-4">
            <div className="text-4xl font-medium py-8">{data?.title}</div>
            <div className="font-bold text-lg py-2 border-y border-gray-400">
              Ingredients
            </div>
            <ul className="py-2">
              {data.extendedIngredients?.map(
                (ingredient: any, index: number) => (
                  <li key={index}>
                    <div className="flex justify-between">
                      <div className="capitalize">{`${ingredient?.name}`}</div>
                      <div>{`${ingredient?.measures?.metric?.amount} ${ingredient?.measures?.metric?.unitShort}`}</div>
                    </div>
                  </li>
                ),
              )}
            </ul>
            <div className="font-bold py-2 border-y border-gray-400">
              Health Information
            </div>
            <ul className="flex py-2">
              {data.diets?.map((diet: string, index: number) => (
                <li className="capitalize pr-1" key={index}>
                  {`${diet},`}
                </li>
              ))}
            </ul>
            <div className="font-bold py-2 border-y border-gray-400">
              Cooking Instructions
            </div>
            <div className="py-2">{data?.instructions}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeDetails;
