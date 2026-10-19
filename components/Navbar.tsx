import React from 'react';
import { Home, User, LogOut, Menu } from 'lucide-react';
import { User as UserType } from '../types';

interface NavbarProps {
  user: UserType | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onRefresh: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onOpenAuth, onLogout, onRefresh }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={onRefresh}>
            <Home className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900 tracking-tight">EstateMarket AI</span>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 uppercase">{user.role}</p>
                </div>
                <button
                  onClick={onLogout}
                  className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-red-500 transition"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition shadow-sm hover:shadow-md"
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </button>
            )}
            
            <div className="md:hidden">
                <button className="p-2 text-gray-600">
                    <Menu className="h-6 w-6" />
                </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;