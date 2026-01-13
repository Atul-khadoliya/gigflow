import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function GigFeed() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchGigs = async (query = "") => {
    try {
      setLoading(true);
      const res = await api.get("/gigs", {
        params: query ? { search: query } : {},
      });
      setGigs(res.data);
    } catch (err) {
      console.error("Failed to fetch gigs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchGigs(search);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            placeholder="Search by title..."
            className="border p-2 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Search
          </button>
        </form>

        <Link
          to="/create"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Create Gig
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">Open Gigs</h1>

      {loading && <p>Loading gigs...</p>}

      {!loading && gigs.length === 0 && (
        <p className="text-gray-500">No gigs found</p>
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
          </Link>
        ))}
      </div>
    </div>
  );
}
