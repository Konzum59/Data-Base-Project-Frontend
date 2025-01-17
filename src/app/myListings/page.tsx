"use client";
import ListingData from "@/components/listingdata";
import { useUser } from "@/components/getUserData";
import CreateListingForm from "@/components/createListingForm";
//import UpdateTransactionStatus from "@/components/updateTransactionStatus";
export default function Page() {
  const { user } = useUser();
  //<UpdateTransactionStatus transactionId={20} />
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
        <div className="flex leading-4"></div>
      </div>
    </div>
  );
}
