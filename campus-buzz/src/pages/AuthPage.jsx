import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser, faCalendarDays } from '@fortawesome/free-solid-svg-icons';

// --- FIXED: Renamed function from ProfilePage to AuthPage ---
function AuthPage() {
  const [activeTab, setActiveTab] = useState('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const user = { name: signupName, email: signupEmail, password: signupPassword };
    localStorage.setItem('campusbuzz_user', JSON.stringify(user));
    alert('Account created successfully! You can now log in.');
    setActiveTab('login'); // Switch to login tab
    setSignupName('');
    setSignupEmail('');
    setSignupPassword('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('campusbuzz_user'));

    if (storedUser && storedUser.email === loginEmail && storedUser.password === loginPassword) {
      alert('Login successful! Welcome back.');
      navigate('/'); // Redirect to home page
    } else {
      alert('Invalid email or password!');
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen flex items-center justify-center p-6">
      
      <div className="relative bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 overflow-hidden">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faCalendarDays} className="text-white" />
            </div>
            <span className="font-bold text-2xl text-gray-800">CAMPUS BUZZ</span>
          </Link>
          <p className="text-gray-500 mt-2">
            {activeTab === 'login' ? 'Welcome back! Sign in to continue.' : 'Create an account to join the buzz.'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex mb-6 rounded-lg bg-gray-100 p-1">
          <button
            id="loginTab"
            onClick={() => setActiveTab('login')}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${activeTab === 'login' ? 'bg-white shadow text-purple-600' : 'text-gray-700'}`}
          >
            Login
          </button>
          <button
            id="signupTab"
            onClick={() => setActiveTab('signup')}
            className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${activeTab === 'signup' ? 'bg-white shadow text-purple-600' : 'text-gray-700'}`}
          >
            Sign Up
          </button>
        </div>

        {/* Login Form */}
        {activeTab === 'login' && (
          <form id="loginForm" className="space-y-4" onSubmit={handleLogin}>
            <div className="relative">
              <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="email" 
                id="loginEmail" 
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" 
                placeholder="Email Address"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <FontAwesomeIcon icon={faLock} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="password" 
                id="loginPassword" 
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" 
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 text-white py-3 rounded-lg font-semibold transition-all shadow-lg">Login</button>
          </form>
        )}

        {/* Sign Up Form */}
        {activeTab === 'signup' && (
          <form id="signupForm" className="space-y-4" onSubmit={handleSignup}>
            <div className="relative">
              <FontAwesomeIcon icon={faUser} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                id="signupName" 
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" 
                placeholder="Full Name"
                required
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
              />
            </div>
            <div className="relative">
              <FontAwesomeIcon icon={faEnvelope} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="email" 
                id="signupEmail" 
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" 
                placeholder="Email Address"
                required
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <FontAwesomeIcon icon={faLock} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="password" 
                id="signupPassword" 
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" 
                placeholder="Create Password"
                required
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 text-white py-3 rounded-lg font-semibold transition-all shadow-lg">Create Account</button>
          </form>
        )}
      </div>
    </div>
  );
}

// --- FIXED: Correct export ---
export default AuthPage;