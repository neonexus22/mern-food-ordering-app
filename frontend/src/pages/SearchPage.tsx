import { useSearchRestaurant } from "@/api/RestaurantApi";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
};

const SearchPage = () => {
  const { city } = useParams();
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
  });
  const { data: restaurants, isLoading } = useSearchRestaurant(
    searchState,
    city
  );

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: searchFormData.searchQuery,
    }));
  };
  const resetSearch = () => {
    setSearchState((prev) => ({
      ...prev,
      searchQuery: "",
    }));
  };

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
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by Cuisine or Restaurant name"
          onReset={resetSearch}
        />
        <SearchResultInfo city={city} total={restaurants.pagination.total} />
        {restaurants?.data?.map((restaurant) => (
          <SearchResultCard restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
