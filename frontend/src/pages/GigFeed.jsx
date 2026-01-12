import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function GigFeed() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const res = await api.get("/gigs");
        setGigs(res.data);
      } catch (err) {
        console.error("Failed to fetch gigs");
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, []);

  if (loading) {
    return <div className="p-6">Loading gigs...</div>;
  }

  return (
    <div className="p-6">

        <Link
  to="/create"
  className="inline-block mb-4 bg-green-600 text-white px-4 py-2 rounded"
>
  + Create Gig
</Link>

      <h1 className="text-2xl font-bold mb-4">Open Gigs</h1>

      {gigs.length === 0 && (
        <p className="text-gray-500">No gigs available</p>
      )}

      <div className="space-y-4">
        {gigs.map((gig) => (
          <div
            key={gig._id}
            className="border p-4 rounded shadow-sm"
          >
            <h2 className="text-lg font-semibold">{gig.title}</h2>
            <p className="text-gray-600">{gig.description}</p>
            <p className="font-medium mt-2">₹ {gig.budget}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
