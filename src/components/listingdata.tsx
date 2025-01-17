"use client";
import Image from "next/image";

import React, { useState, useEffect } from "react";
interface ImageLoaderProps {
  src: string;
  width: number;
}
interface ListingDataProps {
  page: number | null;
  seller_id: number | null;
  category: number | null;
}

const ImageLoader = ({ src, width }: ImageLoaderProps): string => {
  return `${src}?w=${width}&q=${75}`;
};
interface Meta {
  title: string;
  description: string;
  price: number;
  createdAt: string;
  category: number;
  id: number;
  state: string;
  image: string | null;
  seller: number;
}
interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Meta[];
}
const ListingData: React.FC<ListingDataProps> = ({
  page,
  seller_id,
  category,
}) => {
  page = page ? page : 1;
  category = category ? category : 0;
  seller_id = seller_id ? seller_id : 0;

  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(page);
  const link: string = `http://127.0.0.1:8000/user/${seller_id}/category/${category}/?page=${currentPage}`;
  console.log(link);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Fetching data from:", link);
        const response = await fetch(link);

        if (!response.ok) {
          throw new Error(`There was an error: ${response.statusText}`);
        }

        const result: ApiResponse = await response.json();
        console.log(result);
        console.log(result);

        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [link]);

  const handleNextPage = () => {
    if (data && data.next) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (data && data.previous) {
      setCurrentPage(currentPage - 1);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error has occured; {error}</div>;
  }
  if (!data || !data.results || data.results.length === 0) {
    return <div>No listings found.</div>;
  }
  return (
    <div className="flex flex-col gap-5   ">
      {data.results.map((item) => (
        <div
          key={item.id}
          className="border-cyan-600 border-2 rounded-sm bg-cyan-50   "
        >
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <p>Price: {item.price} PLN</p>
          <p>Category ID: {item.category}</p>
          <p>Seller ID: {item.seller}</p>
          <p>State: {item.state}</p>
          {item.image ? (
            <Image
              //src={"http://127.0.0.1:8000" + item.image}
              loader={ImageLoader}
              src={item.image}
              width={400}
              height={400}
              alt="image of product"
            />
          ) : (
            <div> No image</div>
          )}
        </div>
      ))}
      <div className="flex justify-between mt-5">
        <button
          onClick={handlePrevPage}
          disabled={!data.previous}
          className="px-4 py-2 rounded-tr-md text-xl bg-cyan-900 text-white hover:bg-cyan-700 disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil((data.count || 1) / 16)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={!data.next}
          className="px-4 py-2  rounded-tl-md text-xl bg-cyan-900 text-white hover:bg-cyan-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default ListingData;
