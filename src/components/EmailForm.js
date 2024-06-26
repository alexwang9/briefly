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
      <h2 className="sign-up">Interested? Sign up!</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@gmail.com" required className="email-input"/>
      <button type="submit" className="subscribe-button">Subscribe</button>
    </form>
  );
};

export default EmailForm;