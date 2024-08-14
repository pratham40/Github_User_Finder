// src/App.js

import { useState, useEffect } from 'react';
import axios from 'axios';
import useDebounce from './hooks/useDebounce';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const debouncedUsername = useDebounce(username);

  useEffect(() => {
    const fetchAvatar = async () => {
      if (debouncedUsername) {
        try {
          const response = await axios.get(`https://api.github.com/users/${debouncedUsername}`);
          setAvatarUrl(response.data.avatar_url);
          setErrorMessage('');
        } catch (error) {
          setErrorMessage('User not found. Please try another username.');
          setAvatarUrl(null);
        }
      }
    };

    fetchAvatar();
  }, [debouncedUsername]);

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <input className='border-2 rounded-lg px-6 py-1'
        type="text"
        placeholder="Enter GitHub username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {errorMessage && <p className="error">{errorMessage}</p>}
      {avatarUrl && (
        <div className="avatar-container">
          <img src={avatarUrl} alt={`${debouncedUsername}'s avatar`} className="avatar" />
        </div>
      )}
    </div>
  );
}

export default App;
