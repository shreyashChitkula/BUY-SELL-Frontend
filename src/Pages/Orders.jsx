import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserState } from '../utils/UserState';
import { UserDetails } from '../Components/Profile';
import Modal from '../Components/Modal';
import { Clock, Package, User } from 'lucide-react';

const Orders = () => {
  const { getUser } = useUserState();
  const user = getUser();
  const [activeOrders, setActiveOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeller, setSelectedSeller] = useState(null);

  useEffect(() => {
    const fetchActiveOrders = async () => {
      try {
        const response = await axios.get(`${process.env.BACKEND_URL}/api/orders/active-orders/${user.id}`);
        setActiveOrders(response.data);
      } catch (err) {
        setError('Failed to fetch active orders');
      } finally {
        setLoading(false);
      }
    };

    fetchActiveOrders();
  }, [user.id]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin text-blue-500">
        <Clock size={48} />
      </div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      {error}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <h1 className="text-4xl font-extrabold text-white flex items-center">
            <Package className="mr-4" size={40} />
            Active Orders
          </h1>
        </div>
        
        {activeOrders.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Package size={64} className="mx-auto mb-4 text-gray-300" />
            <p className="text-xl">No active orders found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {activeOrders.map((order) => (
              <div 
                key={order._id} 
                className="p-6 hover:bg-gray-50 transition-colors duration-200 flex items-center"
              >
                <img 
                  src={order.product.productImage[0].URL} 
                  alt={order.product.productImage[0].alt} 
                  className="w-32 h-32 object-cover rounded-xl shadow-lg mr-6" 
                />
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {order.product.name}
                  </h2>
                  <div className="space-y-2 text-gray-600">
                    <p className="flex items-center">
                      <span className="font-semibold mr-2">Price:</span> 
                      <span className="text-green-600 font-bold">₹{order.product.price}</span>
                    </p>
                    <p className="flex items-center">
                      <span className="font-semibold mr-2">OTP:</span> 
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {order.otp}
                      </span>
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedSeller(order.seller)}
                    className="mt-4 flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <User className="mr-2" size={20} />
                    View Seller Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={!!selectedSeller} onClose={() => setSelectedSeller(null)}>
        {selectedSeller && <UserDetails user={selectedSeller} />}
      </Modal>
    </div>
  );
};

export default Orders;