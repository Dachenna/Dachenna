import React, { useState } from "react";
import axios from "axios";

const FraudDetection = () => {
  const [wallet, setWallet] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFraudData = async () => {
    if (!wallet) return;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://us-central1-YOUR_PROJECT.cloudfunctions.net/detectFraud?wallet=${wallet}`
      );
      setData(response.data.results);
    } catch (err) {
      setError("Failed to fetch fraud data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-6 text-center">
      <h2 className="text-3xl font-bold">Fraud Detection System</h2>
      <p className="mt-2 text-lg">Enter a wallet address to check for fraudulent transactions.</p>
      <div className="mt-6 flex justify-center">
        <input
          type="text"
          className="px-4 py-2 text-black rounded-lg w-1/3"
          placeholder="Enter Wallet Address"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
        />
        <button
          className="ml-2 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition"
          onClick={fetchFraudData}
          disabled={loading}
        >
          {loading ? "Checking..." : "Check Now"}
        </button>
      </div>
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {data && (
        <div className="mt-6 bg-gray-800 p-6 rounded-lg text-white">
          <h3 className="text-xl font-bold">Results:</h3>
          <pre className="mt-2 text-left overflow-auto">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default FraudDetection;
