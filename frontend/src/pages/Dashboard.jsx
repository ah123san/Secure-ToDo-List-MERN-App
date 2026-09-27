import { API_BASE_URL } from '../config/api';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import UpgradeModal from '../components/UpgradeModal';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  // Paywall Modal State
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      navigate('/login');
    } else {
      const parsedData = JSON.parse(userInfo);
      setUserName(parsedData.name);
      fetchTasks(parsedData.token);
    }
  }, [navigate]);

  const fetchTasks = async (token) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get(`${API_BASE_URL}/api/tasks`, config);
      setTasks(data);
    } catch (error) {
      toast.error('Failed to load tasks');
    }
  };

  const addTaskHandler = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const toastId = toast.loading('Adding task...');
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.post(`${API_BASE_URL}/api/tasks`, { title }, config);
      
      // FIX: Added 'prevTasks' callback for instant UI update without refresh
      setTasks((prevTasks) => [...prevTasks, data]); 
      setTitle(''); 
      toast.success('Task Added!', { id: toastId });
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast.dismiss(toastId); 
        setIsUpgradeModalOpen(true); 
      } else {
        toast.error('Failed to add task', { id: toastId });
      }
    }
  };

  const deleteTaskHandler = async (id) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      
      await axios.delete(`${API_BASE_URL}/api/tasks/${id}`, config);
      setTasks(tasks.filter((task) => task._id !== id));
      toast.success('Task Deleted!');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const toggleCompleteHandler = async (id, currentStatus) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      
      const { data } = await axios.put(`${API_BASE_URL}/api/tasks/${id}`, { completed: !currentStatus }, config);
      setTasks(tasks.map((task) => (task._id === id ? data : task)));
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const startEditHandler = (task) => {
    setEditingTaskId(task._id);
    setEditTitle(task.title);
  };

  const cancelEditHandler = () => {
    setEditingTaskId(null);
    setEditTitle('');
  };

  const saveEditHandler = async (id) => {
    if (!editTitle.trim()) return;
    
    const toastId = toast.loading('Updating task...');
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      
      const { data } = await axios.put(`${API_BASE_URL}/api/tasks/${id}`, { title: editTitle }, config);
      setTasks(tasks.map((task) => (task._id === id ? data : task)));
      
      setEditingTaskId(null);
      toast.success('Task Updated!', { id: toastId });
    } catch (error) {
      toast.error('Failed to update task', { id: toastId });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <main className="max-w-3xl mx-auto mt-10 p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
          <div className="flex justify-center items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 text-center">Hello, {userName}! 👋</h2>
          </div>
          
          <form onSubmit={addTaskHandler} className="flex gap-3 mb-8">
            <input 
              type="text" 
              placeholder="What needs to be done?" 
              className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-gray-900 transition-all"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 hover:shadow-lg transition-all duration-200">
              Add Task
            </button>
          </form>

          <div className="space-y-3">
            {tasks.length === 0 ? (
              <p className="text-center text-gray-400 italic py-6">No tasks yet. Start by adding one!</p>
            ) : (
              tasks.map((task) => (
                <div key={task._id} className={`flex items-center justify-between p-4 border rounded-xl transition-all duration-200 ${task.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 hover:border-blue-200 hover:shadow-sm'}`}>
                  
                  {editingTaskId === task._id ? (
                    <div className="flex-1 flex gap-3 mr-4">
                      <input
                        type="text"
                        className="flex-1 p-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        autoFocus
                      />
                      <button onClick={() => saveEditHandler(task._id)} className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition">
                        Save
                      </button>
                      <button onClick={cancelEditHandler} className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-semibold rounded-md hover:bg-gray-300 transition">
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className={`font-medium text-lg ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                        {task.title}
                      </span>
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={() => toggleCompleteHandler(task._id, task.completed)}
                          className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all duration-200 ${task.completed ? 'bg-gray-100 text-gray-500 hover:bg-gray-200' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}
                        >
                          {task.completed ? 'Undo' : 'Complete'}
                        </button>
                        
                        <button 
                          onClick={() => startEditHandler(task)}
                          disabled={task.completed}
                          className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all duration-200 ${task.completed ? 'opacity-50 cursor-not-allowed bg-gray-50 text-gray-400' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}
                        >
                          Edit
                        </button>
                        
                        <button 
                          onClick={() => deleteTaskHandler(task._id)}
                          className="px-3 py-1.5 text-xs font-bold bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-md transition-all duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      
      {/* Paywall Popup */}
      <UpgradeModal 
        isOpen={isUpgradeModalOpen} 
        onClose={() => setIsUpgradeModalOpen(false)} 
      />
    </div>
  );
};

export default Dashboard;