<<<<<<< HEAD
"use client";
import ListingData from "@/components/listingdata";
import { useUser } from "@/components/getUserData";

export default function Page() {
  const { user } = useUser();
  return (
    <div>
      <div>This page hzzas my listings</div>
      <div>
        {" "}
        <ListingData page={1} seller_id={user?.id || 0} category={0} />{" "}
      </div>
    </div>
  );
=======
export default function Page() {
  return <div>This page has my listings</div>;
>>>>>>> 2a2682fe5fc749d910797aa4aaf4072ba6d4b869
}
