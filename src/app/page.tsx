<<<<<<< HEAD
"use client";
import ListingData from "@/components/listingdata";
import { useState, useEffect } from "react";
export default function Home() {
  const [category, setCategory] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  useEffect(() => {
    // Zwiększamy 'refreshKey' po zmianie kategorii, aby wymusić ponowne renderowanie ListingData
    setRefreshKey((prevKey) => prevKey + 1);
  }, [category]);
=======
import ListingData from "@/components/listingdata";
export default function Home() {
>>>>>>> 2a2682fe5fc749d910797aa4aaf4072ba6d4b869
  return (
    <div>
      {" "}
      <div>This is the main page </div>
<<<<<<< HEAD
      <button className="bg-cyan-900 text-white" onClick={() => setCategory(2)}>
        {" "}
        Category change test
      </button>
      <ListingData
        key={refreshKey}
        page={1}
        seller_id={0}
        category={category}
      />{" "}
=======
      <ListingData />{" "}
>>>>>>> 2a2682fe5fc749d910797aa4aaf4072ba6d4b869
    </div>
  );
}
