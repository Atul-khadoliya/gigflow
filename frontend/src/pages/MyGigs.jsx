import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function MyGigs() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyGigs = async () => {
      try {
        const res = await api.get("/gigs/me");
        setGigs(res.data);
      } catch {
        console.error("Failed to load your gigs");
      } finally {
        setLoading(false);
      }
    };

    fetchMyGigs();
  }, []);

  if (loading) return <div className="p-6">Loading your gigs...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Gigs</h1>

      {gigs.length === 0 && (
        <p className="text-gray-500">You haven’t posted any gigs yet.</p>
      )}

      <div className="space-y-4">
        {gigs.map((gig) => (
          <Link
            key={gig._id}
            to={`/gigs/${gig._id}`}
            className="block border p-4 rounded hover:bg-gray-50"
          >
            <h2 className="text-lg font-semibold">{gig.title}</h2>
            <p className="text-gray-600">{gig.description}</p>
            <p className="font-medium mt-2">₹ {gig.budget}</p>
            <p className="text-sm text-gray-500 mt-1">
              Status: {gig.status}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
