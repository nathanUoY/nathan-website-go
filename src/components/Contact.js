import React, { useState } from 'react';
import '../styles/Contact.css';

function Contact() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === '123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  if (isAuthenticated) {
    return (
      <div className="contact">
        <div className="contact-info">
          <p>Name: Nathan Browne</p>
          <p>Mobile: 07554 429626</p>
          <p>Email: nathan.p.browne@gmail.com</p>
          <p>Other Links: *********</p>
        </div>
      </div>
    );
  }

  return (
    <div className="contact">
      <h1>Please enter password to see contact information</h1>
      <form className="password-container" onSubmit={handlePasswordSubmit}>
        <input
          type="password"
          placeholder="Enter password here"
          value={password}
          onChange={handlePasswordChange}
          className="password-input"
        />
        <button type="submit" className="password-submit">{'>'}</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Contact;
