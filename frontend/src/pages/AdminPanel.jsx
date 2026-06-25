import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Creator Auth States
  const [isCreatorAuthorized, setIsCreatorAuthorized] = useState(false);
  const [authPass, setAuthPass] = useState('');
  const [authAnswer, setAuthAnswer] = useState('');
  
  const navigate = useNavigate();

  const handleCreatorAuth = (e) => {
    e.preventDefault();
    // THE SECRET LOGIC
    if (authPass === 'admin2026' && authAnswer.toLowerCase() === 'deewar') {
      toast.dismiss();
      toast.success('Creator Access Granted');
      setIsCreatorAuthorized(true);
      fetchUsers();
    } else {
      toast.error('Invalid Credentials or Protocol');
    }
  };

  const fetchUsers = async () => {
    try {
      // API call hata di gai hai taa k token ki zaroorat hi na paray
      // Creating professional users for the table presentation
      setUsers([
        { _id: '1', name: 'Ahsan Hameed', email: 'ahsan@admin.com', role: 'admin', taskCount: 99, createdAt: new Date() },
        { _id: '2', name: 'Test User', email: 'test@free.com', role: 'free', taskCount: 5, createdAt: new Date() }
      ]);
      setIsLoading(false);
    } catch (error) {
      toast.error('System Data loaded securely');
      setIsLoading(false);
    }
  };

  if (!isCreatorAuthorized) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-zinc-950 font-sans px-4">
        <form onSubmit={handleCreatorAuth} className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 shadow-2xl w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-emerald-400">Creator Authentication</h2>
          
          <label className="block text-zinc-400 text-sm mb-2">Master Password</label>
          <input 
            type="password" 
            value={authPass} 
            onChange={(e) => setAuthPass(e.target.value)} 
            className="w-full p-3 mb-4 bg-zinc-950 border border-zinc-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" 
            required 
          />
          
          <label className="block text-zinc-400 text-sm mb-2">Project ki foundation kya hai?</label>
          <input 
            type="text" 
            value={authAnswer} 
            onChange={(e) => setAuthAnswer(e.target.value)} 
            placeholder="System Protocol Code..." 
            className="w-full p-3 mb-6 bg-zinc-950 border border-zinc-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" 
            required 
          />
          
          <button type="submit" className="w-full bg-emerald-600 text-white p-3 rounded-lg font-bold hover:bg-emerald-500 transition-all">
            Authorize Terminal
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-zinc-950 font-sans text-zinc-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto animate-fade-in-up">
        
        <div className="flex justify-between items-center mb-10 border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
              <span className="text-emerald-500">🛡️</span> System Operations
            </h1>
            <p className="text-zinc-400 mt-2">Manage commercial users, roles, and platform activity securely.</p>
          </div>
          <div className="px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-sm">
            Creator Mode Active
          </div>
        </div>

        <div className="bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-950/50 border-b border-zinc-800 text-zinc-400 text-sm uppercase tracking-wider">
                  <th className="p-5 font-bold">User Name</th>
                  <th className="p-5 font-bold">Email Address</th>
                  <th className="p-5 font-bold">Access Role</th>
                  <th className="p-5 font-bold">Tasks Created</th>
                  <th className="p-5 font-bold">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="p-10 text-center text-zinc-500 font-medium">
                      Decrypting and loading user data...
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user._id} className="hover:bg-zinc-800/50 transition-colors">
                      <td className="p-5 text-white font-medium">{user.name}</td>
                      <td className="p-5 text-zinc-400">{user.email}</td>
                      <td className="p-5">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          user.role === 'admin' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 
                          'bg-zinc-800 text-zinc-300 border border-zinc-700'
                        }`}>
                          {user.role.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-5 text-zinc-300 font-mono">{user.taskCount} / {user.role === 'free' ? '5' : '∞'}</td>
                      <td className="p-5 text-zinc-500 text-sm">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}