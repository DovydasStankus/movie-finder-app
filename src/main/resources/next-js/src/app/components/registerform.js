"use client";

import { useState } from 'react';
import { UserService } from '../services/UserService';
import { redirect } from 'next/dist/server/api-utils';

export default function RegisterForm({ showRegisterForm, handleRegisterButton }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState('');
  // const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onRegisterExitButtonClick = () => {
    handleRegisterButton(false);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (!formData.passwordConfirm) {
      newErrors.passwordConfirm = 'Repeat Password is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setErrors({});

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Submit form data to API or handle registration logic here
    // For example:
    // fetch('/api/register', { method: 'POST', body: JSON.stringify(formData) })
    const response = await UserService.createUser(formData);
    
    if (response.code == "200") { // or check response data as per your API
      localStorage.setItem('token', response.token);
      setErrors({});
      setFormData({ username: '', email: '', password: '', passwordConfirm: ''});
      window.location.reload();
    } else {
      setSubmitMessage(response.message);
      setFormData({ username: '', email: '', password: '', passwordConfirm: ''});
    }
  };

  return (
    <>
      {showRegisterForm && (
        <div style={{
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
                <button onClick={onRegisterExitButtonClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
            </div>
            <form onSubmit={handleSubmit} 
              >
                <h2 style={{textAlign: "center", marginBottom: "16px"}}>Register</h2>
            
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
                    placeholder="Email"
                    style={{padding: "10px", margin: "auto auto"}}
                    className="bg-gray-200 rounded-lg !outline-none h-8"
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
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
                  <label>
                    <ul className="text-gray-800 list-disc" style={{ fontSize: "12px", textAlign: "left", margin: "auto", width: "200px" }}>
                      <li>Minimum 8 characters</li>
                      <li>At least one uppercase letter</li>
                      <li>At least one lowercase letter</li>
                      <li>At least one number</li>
                      <li>At least one special character</li>
                    </ul>
                  </label> 
                  {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                </div>
            
                <div style={{marginBottom: "8px"}}>
                  <input
                    placeholder="Repeat Password"
                    style={{padding: "10px", margin: "auto auto"}}
                    className="bg-gray-200 rounded-lg !outline-none h-8"
                    type="password"
                    id="passwordConfirm"
                    name="passwordConfirm"
                    value={formData.passwordConfirm}
                    onChange={handleChange}
                  />
                  {errors.passwordConfirm && <p style={{ color: 'red' }}>{errors.passwordConfirm}</p>}
                </div>
            
                {submitMessage && <p style={{ color: 'red' }}>{submitMessage}</p>}
            
                <button
                  style={{padding: "5px", display: "inline-block", marginTop: "16px"}}
                  type="submit"
                  className="bg-gray-300 hover:bg-gray-400 active:bg-gray-100 rounded-lg border border-neutral-300"
                    >Register
                </button>
            
            </form>
          </div>
        </div>
      )}
    </>
  )
}