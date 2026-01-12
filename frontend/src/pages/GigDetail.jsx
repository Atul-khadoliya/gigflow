import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function GigDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [gig, setGig] = useState(null);
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await api.get("/gigs");
        const found = res.data.find((g) => g._id === id);
        setGig(found);
      } catch {
        setError("Failed to load gig");
      } finally {
        setLoading(false);
      }
    };

    fetchGig();
  }, [id]);

  const handleBid = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/bids", {
        gigId: id,
        message,
        price: Number(price),
      });
      alert("Bid submitted");
      navigate("/");
    } catch {
      setError("Failed to submit bid");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (!gig) return <div className="p-6">Gig not found</div>;

  const isOwner = user && user.id === gig.ownerId;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{gig.title}</h1>
      <p className="text-gray-600 mb-2">{gig.description}</p>
      <p className="font-semibold mb-6">Budget: ₹ {gig.budget}</p>

      {isOwner ? (
        <button
          onClick={() => navigate(`/gigs/${id}/bids`)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          View Bids
        </button>
      ) : (
        <form onSubmit={handleBid} className="space-y-4">
          {error && <p className="text-red-600">{error}</p>}

          <textarea
            className="w-full border p-2"
            placeholder="Your proposal"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <input
            type="number"
            className="w-full border p-2"
            placeholder="Your price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit Bid
          </button>
        </form>
      )}
    </div>
  );
}
