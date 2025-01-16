"use client";
import ListingData from "@/components/listingdata";
import { useState, useEffect } from "react";
import ShowCategory from "@/components/showCategories";
export default function Home() {
  const [category, setCategory] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  useEffect(() => {
    setRefreshKey((prevKey) => prevKey + 1);
  }, [category]);
  function chooseCategory(category_id: number) {
    setCategory(category_id);
  }
  return (
    <div>
      {" "}
      <div>This is the main page </div>
      <ShowCategory onCategorySelect={chooseCategory} />
      <ListingData
        key={refreshKey}
        page={1}
        seller_id={0}
        category={category}
      />{" "}
    </div>
  );
}
