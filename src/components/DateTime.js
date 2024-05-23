import React, { useEffect, useState } from 'react';
import '../DateTime.css';

export const DateTime = () => {
  var [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000)
    return function cleanup() {
      clearInterval(timer)
    }
  });

  return(
    <div className="datetime-container">
      <p className="datetime"> {date.toLocaleDateString()} {date.toLocaleTimeString()} </p>
    </div>
  )
}

export default DateTime