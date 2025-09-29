"use client";

import { useState } from 'react';
import { UserService } from '../services/UserService';
import { useRouter } from 'next/router';

export default function LoginForm({ showLoginForm, handleLoginButton }) {

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  
  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onLoginExitButtonClick = () => {
    handleLoginButton(false);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const response = await UserService.loginUser(formData);
    console.log(response);
    
    if (response.code == "200") { // or check response data as per your API
      localStorage.setItem('token', response.token);
      setErrors({});
      setFormData({ username: '', password: '' });
      window.location.reload();
    } else {
      setSubmitMessage(response.message);
      setFormData({ username: '', password: '' });
    }
  };

  return (
    <>
      {showLoginForm && (
        <div
          style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',            // Fix to viewport
            top: 0,
            left: 0,
            width: '100%',                // Optional: make it responsive
            height: '100%',
            zIndex: 1000,                 // Ensure it overlays other content
            textAlign: 'center',
            background: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <div style={{
            maxWidth: '400px',
            padding: '20px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            margin: 'auto',
            }}
          >
            <div style={{ display: "flex", justifyContent: "right" }}>
                <button onClick={onLoginExitButtonClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
            </div>
            <form onSubmit={handleSubmit} 
              >
                <h2 style={{textAlign: "center", marginBottom: "16px"}}>Login</h2>
          
                <div style={{marginBottom: "8px"}}>
                  <input
                    placeholder="Username"
                    style={{padding: "10px", margin: "auto auto"}}
                    className="bg-gray-200 rounded-lg !outline-none h-8"
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
                </div>
          
                <div style={{marginBottom: "8px"}}>
                  <input
                    placeholder="Password"
                    style={{padding: "10px", margin: "auto auto"}}
                    className="bg-gray-200 rounded-lg !outline-none h-8"
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                </div>
          
                <button
                  style={{padding: "5px", display: "inline-block", marginTop: "16px"}}
                  type="submit"
                  className="bg-gray-300 hover:bg-gray-400 active:bg-gray-100 rounded-lg border border-neutral-300"
                    >Login
                </button>
          
              {submitMessage && <p style={{ color: 'red' }}>{submitMessage}</p>}
            </form>
          </div>
        </div>
      )}
    </>
  )
}