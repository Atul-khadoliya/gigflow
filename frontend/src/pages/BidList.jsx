import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function BidList() {
  const { id } = useParams(); // gigId
  const navigate = useNavigate();
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBids = async () => {
      try {
        const res = await api.get(`/bids/${id}`);
        setBids(res.data);
      } catch {
        setError("Failed to load bids");
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, [id]);

  const hireBid = async (bidId) => {
    try {
      await api.patch(`/bids/${bidId}/hire`);
      alert("Bid hired successfully");
      navigate("/");
    } catch {
      alert("Failed to hire bid");
    }
  };

  if (loading) return <div className="p-6">Loading bids...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Bids</h1>

      {bids.length === 0 && (
        <p className="text-gray-500">No bids yet</p>
      )}

      <div className="space-y-4">
        {bids.map((bid) => (
          <div key={bid._id} className="border p-4 rounded">
            <p className="mb-2">{bid.message}</p>
            <p className="font-semibold mb-2">₹ {bid.price}</p>

            {bid.status === "hired" ? (
              <span className="text-green-600 font-semibold">
                Hired
              </span>
            ) : (
              <button
                onClick={() => hireBid(bid._id)}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                Hire
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
