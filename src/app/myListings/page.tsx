"use client";
import ListingData from "@/components/listingdata";
import { useUser } from "@/components/getUserData";
import CreateListingForm from "@/components/createListingForm";
export default function Page() {
  const { user } = useUser();
  if (!user?.id) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>This page has my listings</div>
      <div>
        {" "}
        <ListingData page={1} seller_id={user?.id || 0} category={0} />{" "}
        <CreateListingForm />
      </div>
    </div>
  );
}
