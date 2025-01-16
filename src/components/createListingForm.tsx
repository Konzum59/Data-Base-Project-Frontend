"use client";
import { useState, FormEvent } from "react";
import { useUser } from "./getUserData";
import ShowCategory from "./showCategories";
interface FormDataState {
  title: string;
  description: string;
  price: number;
  location: string;
  category: string;
  image: File | null;
  seller: number;
}

interface ListingResponse {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  category: string;
  created_at: string;
  seller: number;
  image: string | null;
}

export default function CreateListingForm() {
  const { user, accessToken } = useUser();
  console.log(user?.id);
  const [formData, setFormData] = useState<FormDataState>({
    title: "",
    description: "",
    price: 0,
    location: "",
    category: "",
    image: null,
    seller: user?.id || 0,
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLInputElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };
  const handleCategorySelect = (category_id: number) => {
    setFormData((prev) => ({
      ...prev,
      category: category_id.toString(),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { title, description, price, location, category, image, seller } =
      formData;

    if (
      !title ||
      !description ||
      !price ||
      !location ||
      !category ||
      seller === 0
    ) {
      setError("All forms must be filled");
      console.error("missing data in form:", {
        title,
        description,
        price,
        location,
        category,
        seller,
      });
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", title);
      formDataToSend.append("description", description);
      formDataToSend.append("price", price.toString());
      formDataToSend.append("location", location);
      formDataToSend.append("category", category);
      formDataToSend.append("seller", seller.toString());
      if (image) {
        formDataToSend.append("image", image);
      }

      const response = await fetch("http://127.0.0.1:8000/listings/create/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Backend error: ${errorDetails}`);
      }

      const data: ListingResponse = await response.json();
      setSuccess(true);
      setError(null);
      console.log("Listing has been added", data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`Error has occured: ${err.message}`);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-cyan-500  border-2 rounded-b-md  border-cyan-600 absolute right-0 top-9 p-2"
    >
      <div>Add your listing here</div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <ShowCategory onCategorySelect={handleCategorySelect} />
      </div>
      <div>
        <label htmlFor="image">Image (not required):</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleFileChange}
        />
      </div>
      <button
        className="bg-cyan-900 text-white hover:bg-cyan-700 flex p-1 rounded-md"
        type="submit"
      >
        Add listing
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>Listing added succesfully!</p>}
    </form>
  );
}
