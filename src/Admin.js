import React, { useState } from 'react';
import axios from 'axios';

const AddQuestionForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [remark, setRemark] = useState('');
  const [links, setLinks] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    // Check if username and password match the fixed values
    if (username !== 'paarth' || password !== 'atharv') {
      setError('Invalid username or password.');
      setIsLoading(false);
      return;
    }

    try {
      // If authentication successful, set isLoggedIn to true and proceed with the post request
      setIsLoggedIn(true);
      const response = await axios.post('https://faqbackend.vercel.app/admin/add', {
        Questions: question,
        Answers: answer,
        Remarks: remark,
        Links: links
      });
      console.log(response.data); // Log the response from the backend
      // Optionally, you can reset the form fields here
      setQuestion('');
      setAnswer('');
      setRemark('');
      setLinks('');
    } catch (error) {
      console.error('Error adding question:', error);
      setError('Failed to add question. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="border border-gray-300 p-2 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    );
  }

  // Render the form if user is authenticated
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add New Question</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter question"
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter answer"
            className="border border-gray-300 p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="Enter remark"
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={links}
            onChange={(e) => setLinks(e.target.value)}
            placeholder="Enter links (optional)"
            className="border border-gray-300 p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add Question'}
        </button>
      </form>
    </div>
  );
};

export default AddQuestionForm;
