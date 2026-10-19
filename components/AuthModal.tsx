import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { X, UserCheck, KeyRound, Building2, User as UserIcon, ArrowLeft } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: User) => void;
}

type AuthView = 'LOGIN' | 'ROLE_SELECT' | 'REGISTER';

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [view, setView] = useState<AuthView>('LOGIN');
  const [role, setRole] = useState<UserRole>(UserRole.CLIENT);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: name || (role === UserRole.LANDLORD ? 'Landlord User' : 'Client User'),
      email: email || 'user@example.com',
      role: view === 'LOGIN' ? UserRole.CLIENT : role, // Default to client on login for demo
    };
    onLogin(newUser);
    onClose();
    // Reset state after close
    setTimeout(() => {
        setView('LOGIN');
        setName('');
        setEmail('');
    }, 300);
  };

  const handleRoleSelect = (selectedRole: UserRole) => {
      setRole(selectedRole);
      setView('REGISTER');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-5 border-b border-gray-100">
            <div className="flex items-center gap-2">
                {view === 'REGISTER' && (
                    <button onClick={() => setView('ROLE_SELECT')} className="text-gray-400 hover:text-gray-600 mr-1 transition">
                        <ArrowLeft className="h-5 w-5" />
                    </button>
                )}
                <h2 className="text-xl font-bold text-gray-900">
                    {view === 'LOGIN' && 'Welcome Back'}
                    {view === 'ROLE_SELECT' && 'Join EstateMarket'}
                    {view === 'REGISTER' && (role === UserRole.CLIENT ? 'Client Registration' : 'Landlord Registration')}
                </h2>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition">
                <X className="h-6 w-6" />
            </button>
        </div>

        <div className="p-6 overflow-y-auto">
            
            {/* VIEW: ROLE SELECTION */}
            {view === 'ROLE_SELECT' && (
                <div className="space-y-4">
                    <p className="text-gray-500 text-center mb-6">Choose how you want to use EstateMarket AI</p>
                    
                    <button 
                        onClick={() => handleRoleSelect(UserRole.CLIENT)}
                        className="w-full flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition group text-left"
                    >
                        <div className="bg-blue-100 text-blue-600 p-3 rounded-full mr-4 group-hover:bg-blue-600 group-hover:text-white transition">
                            <UserIcon className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">I'm a Client</h3>
                            <p className="text-sm text-gray-500">I'm looking for a home, hotel, or apartment.</p>
                        </div>
                    </button>

                    <button 
                        onClick={() => handleRoleSelect(UserRole.LANDLORD)}
                        className="w-full flex items-center p-4 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition group text-left"
                    >
                        <div className="bg-purple-100 text-purple-600 p-3 rounded-full mr-4 group-hover:bg-purple-600 group-hover:text-white transition">
                            <Building2 className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">I'm a Landlord</h3>
                            <p className="text-sm text-gray-500">I want to list and manage my properties.</p>
                        </div>
                    </button>

                    <div className="mt-8 text-center pt-4 border-t border-gray-100">
                        <p className="text-sm text-gray-600">
                            Already have an account?
                            <button
                                onClick={() => setView('LOGIN')}
                                className="ml-1 font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                            >
                                Log in
                            </button>
                        </p>
                    </div>
                </div>
            )}

            {/* VIEW: LOGIN OR REGISTER FORM */}
            {(view === 'LOGIN' || view === 'REGISTER') && (
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {view === 'REGISTER' && (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {role === UserRole.LANDLORD ? 'Agency / Full Name' : 'Full Name'}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserCheck className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                                    placeholder={role === UserRole.LANDLORD ? "Estate Agencies Ltd" : "John Doe"}
                                />
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <KeyRound className="h-5 w-5 text-gray-400" />
                                </div>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full text-white font-bold py-3 rounded-lg transition shadow-lg ${
                            view === 'REGISTER' && role === UserRole.LANDLORD 
                            ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-600/30' 
                            : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30'
                        }`}
                    >
                        {view === 'LOGIN' ? 'Sign In' : 'Create Account'}
                    </button>
                    
                    {view === 'LOGIN' && (
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?
                                <button
                                    type="button"
                                    onClick={() => setView('ROLE_SELECT')}
                                    className="ml-1 font-semibold text-blue-600 hover:text-blue-800 hover:underline"
                                >
                                    Sign up
                                </button>
                            </p>
                        </div>
                    )}
                </form>
            )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;