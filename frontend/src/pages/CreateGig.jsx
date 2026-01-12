import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateGig() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/gigs", {
        title,
        description,
        budget: Number(budget),
      });
      navigate("/");
    } catch (err) {
      setError("Failed to create gig");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Gig</h1>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="w-full border p-2"
          placeholder="Description"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="number"
          className="w-full border p-2"
          placeholder="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Post Gig
        </button>
      </form>
    </div>
  );
}
