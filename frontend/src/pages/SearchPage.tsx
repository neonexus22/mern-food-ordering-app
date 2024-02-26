import { useSearchRestaurant } from "@/api/RestaurantApi";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { city } = useParams();
  const { data: restaurants, isLoading } = useSearchRestaurant(city);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (!restaurants?.data || !city) {
    return <span>No restaurants found</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">insert cuisines</div>
      <div id="main-content" className="flex flex-col gap-5">
        <SearchResultInfo city={city} total={restaurants.pagination.total} />
        {restaurants?.data?.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
