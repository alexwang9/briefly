import React, { useState } from 'react';

const EmailForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
    setEmail('');
  };

  return(
    <form onSubmit={handleSubmit} className="email-form">
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
      <button type="submit">Subscribe</button>
    </form>
  );
};

export default EmailForm;