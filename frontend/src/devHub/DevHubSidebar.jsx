import { useState } from 'react';
import { Heart, Home, LogOut, Package, Settings, ShoppingCart, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DevHubSidebar = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('home'); // Manage active tab state

    return (
        <div className="w-full pl-2 relative h-full p-1 shadow-xl">
            <nav>
                {[
                    { name: 'Home', icon: Home, id: 'home', path: '/user/home' },
                    { name: 'Profile', icon: User, id: 'profile', path: '/user/profile' },
                    { name: 'Orders', icon: Package, id: 'orders', path: '/user/orders' },
                    { name: 'Wishlist', icon: Heart, id: 'wishlist', path: '/user/wishlist' },
                    { name: 'Cart', icon: ShoppingCart, id: 'cart', path: '/user/viewCart' },
                    { name: 'Settings', icon: Settings, id: 'settings', path: '/user/settings' },
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => {
                            setActiveTab(item.id);
                            navigate(item.path);
                        }}
                        className={`hover:bg-gray-100 rounded-xl w-full flex items-center px-4 py-3 text-gray-700 
                            ${activeTab === item.id ? "bg-gray-100 text-black font-medium rounded-xl" : ""}`}
                    >
                        <item.icon className="h-5 w-5 mr-3" />
                        {item.name}
                        {item.id === "cart" && (
                            <div className="text-sm text-white font-extrabold ml-2 bg-red-700 opacity-70 rounded-full px-2">
                                <p>3</p>
                            </div>
                        )}
                    </button>
                ))}
            </nav>

            {/* Logout Button */}
            <div className="absolute bottom-6 w-full flex items-center justify-center">
                <button className="cursor-pointer text-black w-full flex items-center">
                    <LogOut className="h-5 sm:w-5 w-20 mr-3" />
                    Logout
                </button>
            </div>
        </div>
    );
};

export default DevHubSidebar;
