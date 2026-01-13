import { useEffect, useState } from "react";
import api from "../api/axios";

export default function MyBids() {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const res = await api.get("/bids/me");
        setBids(res.data);
      } catch {
        console.error("Failed to load bids");
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, []);

  if (loading) return <div className="p-6">Loading your bids...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Bids</h1>

      {bids.length === 0 && (
        <p className="text-gray-500">You have not placed any bids yet.</p>
      )}

      <div className="space-y-4">
        {bids.map((bid) => (
          <div key={bid._id} className="border p-4 rounded">
            <h2 className="font-semibold">
              {bid.gigId?.title || "Deleted gig"}
            </h2>
            <p className="mt-1">Your Price: ₹ {bid.price}</p>
            <p className="mt-1">
              Status:{" "}
              <span className="font-semibold capitalize">
                {bid.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
