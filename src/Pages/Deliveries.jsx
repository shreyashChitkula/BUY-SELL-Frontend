import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUserState } from "../utils/UserState";
import { UserDetails } from "../Components/Profile";
import Modal from "../Components/Modal";
import { Package, Clock, CheckCircle, XCircle } from "lucide-react";

const Deliveries = () => {
  const { getUser } = useUserState();
  const user = getUser();
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [otp, setOtp] = useState("");
  const [selectedBuyer, setSelectedBuyer] = useState(null);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/orders/deliveries/${user.id}`
        );
        setDeliveries(response.data);
        console.log("deliveries", response.data);
      } catch (err) {
        setError("Failed to fetch deliveries");
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveries();
  }, [user.id]);

  const handleOtpSubmit = async (productId) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/orders/verify-otp",
        { productId, otp }
      );
      alert(response.data.message);
      console.log(response.data);
      setOtp("");
      const updatedDeliveries = deliveries.filter(
        (delivery) => delivery.product._id !== productId
      );
      setDeliveries(updatedDeliveries);
    } catch (err) {
      alert("Failed to verify OTP");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <Clock size={48} className="text-blue-400 animate-pulse" />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="flex items-center space-x-2 text-red-400">
          <XCircle size={32} />
          <span>{error}</span>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white/30 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6">
          <h1 className="text-3xl font-bold blue_gradient mb-6 flex items-center">
            <Package size={40} className="mr-4 text-blue-600" />
            Your Deliveries
          </h1>

          {deliveries.length === 0 ? (
            <div className="bg-white/20 backdrop-blur-md p-8 rounded-xl text-center">
              <Package size={64} className="mx-auto mb-4 text-blue-300" />
              <p className="text-blue-700">No deliveries at the moment</p>
            </div>
          ) : (
            <div className="space-y-4">
              {deliveries.map((delivery) => (
                <div
                  key={delivery._id}
                  className="bg-white/30 backdrop-blur-lg border border-white/20 rounded-2xl p-6 flex items-center hover:bg-white/40 transition-all"
                >
                  <img
                    src={delivery.product.productImage[0].URL}
                    alt={delivery.product.productImage[0].alt}
                    className="w-32 h-32 object-cover rounded-xl shadow-lg mr-6 border-4 border-white/50"
                  />
                  <div className="flex-grow">
                    <h2 className="text-2xl font-semibold text-blue-800">
                      {delivery.product.name}
                    </h2>
                    <p className="text-blue-600 mb-4">
                      Price: ₹{delivery.product.price}
                    </p>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setSelectedBuyer(delivery.buyer)}
                        className="bg-blue-500/30 text-blue-800 backdrop-blur-md border border-blue-500/20 px-4 py-2 rounded-lg hover:bg-blue-500/40 transition"
                      >
                        View Buyer Details
                      </button>
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                          placeholder="Enter OTP"
                          className="p-2 bg-white/30 backdrop-blur-md border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-300"
                        />
                        <button
                          onClick={() => handleOtpSubmit(delivery.product._id)}
                          className="bg-green-500/30 text-green-800 backdrop-blur-md border border-green-500/20 px-4 py-2 rounded-lg hover:bg-green-500/40 transition flex items-center"
                        >
                          <CheckCircle size={20} className="mr-2" />
                          Verify
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={!!selectedBuyer} onClose={() => setSelectedBuyer(null)}>
        {selectedBuyer && <UserDetails user={selectedBuyer} />}
      </Modal>
    </div>
  );
};

export default Deliveries;
