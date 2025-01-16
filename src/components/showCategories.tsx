"use client";
import { useEffect, useState } from "react";

interface Meta {
  id: number;
  category_name: string;
  number_of_items: number;
}
interface ShowCategoryProps {
  onCategorySelect: (category_id: number) => void;
}
const ShowCategory: React.FC<ShowCategoryProps> = ({ onCategorySelect }) => {
  const link = "http://127.0.0.1:8000/categories/";
  const [data, setData] = useState<Meta[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [disabledCategories, setDisabledCategories] = useState<number | null>(
    null
  );
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(link);

        if (!response.ok)
          throw new Error(`Something went wrong :( :${response.statusText}`);

        const result: Meta[] = await response.json();
        setData(result);
        console.log(result);
        console.log(` data" ${data}`);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const handleCategoryClick = (category_id: number) => {
    onCategorySelect(category_id);
    setDisabledCategories((prev) =>
      prev === category_id ? null : category_id
    );
  };
  if (loading) {
    return <div> Loading...</div>;
  }
  if (error) {
    return <div> There was an error </div>;
  }
  if (!data || data.length === 0)
    return <div> No categoris found??? Impossible</div>;
  return (
    <div className="flex flex-row gap-2 m-1">
      {data.map((category) => (
        <div key={category.id}>
          <button
            disabled={disabledCategories === category.id}
            className={`${
              disabledCategories === category.id
                ? "bg-gray-500 cursor-not-allowed opacity-50"
                : "bg-cyan-900 text-white hover:bg-cyan-700"
            } flex p-1 rounded-md`}
            onClick={() => handleCategoryClick(category.id)}
          >
            {category.category_name}: {category.number_of_items}
          </button>
        </div>
      ))}
    </div>
  );
};
export default ShowCategory;
