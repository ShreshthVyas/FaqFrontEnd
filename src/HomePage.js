
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const FAQPage = () => {
  const [faqData, setFaqData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFaqData, setFilteredFaqData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://faqbackend.vercel.app/');
        setFaqData(response.data);
      } catch (error) {
        console.error('Error fetching FAQ data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    setIsSearching(true);
    if (!searchQuery) {
      return;
    }
    // Split search query into words
    const searchWords = searchQuery.toLowerCase().split(' ');
  
    // Filter FAQ data based on search query and calculate matched word count
    const filteredData = faqData.map(item => {
      let matchedWordsCount = 0;
  
      // Ensure item.Questions is defined before using it
      if (item.Questions) {
        // Calculate the number of matching words in the question title
        searchWords.forEach(word => {
          if (item.Questions.toLowerCase().includes(word)) {
            matchedWordsCount++;
          }
        });
      }
  
      return { ...item, matchedWordsCount };
    });
  
    // Filter out items with no matched words
    const filteredByMatchedWords = filteredData.filter(item => item.matchedWordsCount > 0);
  
    // Sort filtered data based on the number of matched words (descending order)
    filteredByMatchedWords.sort((a, b) => b.matchedWordsCount - a.matchedWordsCount);
  
    setFilteredFaqData(filteredByMatchedWords);
    setSelectedQuestionId(null); // Reset selected question
  };
  

  const handleQuestionClick = questionId => {
    setSelectedQuestionId(selectedQuestionId === questionId ? null : questionId);
    
  };

  return (
    <div className="max-h-screen flex flex-col items-center justify-center h-screen bg-white overflow-auto">
      <header className="w-full ">
      <div className="flex flex-col items-center"> 
      <img src="/chromebook.jpg" alt="Chromebook" className="w-84 h-24 mr-1" />
        <h1 className="text-2xl font-serif text-center text-slate-500 "> FAQs</h1>
        </div>
        
      </header>
      <div className="w-full max-w-lg  p-4  shadow-md rounded-lg mt-4 flex items-center flex-col">
        <div className='mt-3 sm:flex sm:items-center'>
        <input
          type="text"
          placeholder="Type your FAQs ..."
          value={searchQuery}
          onChange={handleSearchChange}
          className=" w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
        />
        <button
          onClick={handleSearchClick}
          className=" flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Search
        </button>
        </div>
        <div className='w-full mt-4'>
        {isSearching && (
        <div className="w-full max-w-xl overflow-y-auto">
          {filteredFaqData.slice(0, 5).map((faqItem, index) => (
            <div
              key={index}
              onClick={() => handleQuestionClick(faqItem)}
              className="bg-white p-4 rounded-lg shadow cursor-pointer mb-4 w-full"
            >
              <h2 className="text-xl font-semibold">{faqItem.Questions}</h2>
              {selectedQuestionId === faqItem && (
                <QuestionDetail question={faqItem} />
              )}
            </div>
          ))}
        </div>
      )}
      </div>
      </div>
    </div>
  );
};
const QuestionDetail = ({ question }) => {
  if (!question) return null;

  const renderRemarks = () => {
    if (!question.Remarks) return null;

    // Replace \n with <br> for line breaks
    const remarksWithLineBreaks = question.Remarks.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));

    return (
      <div>
        <strong>Remarks:</strong> {remarksWithLineBreaks}
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      {/* <h2 className="text-xl font-semibold mb-4">{question.Questions}</h2> */}
      {question.Answers && (
        <p className="mb-4">
          <strong className="text-lg">Answer:</strong> {question.Answers}
        </p>
      )}
      {renderRemarks()}
      {question.Links && (
        <div className="mb-4">
          <strong className="text-lg">Links:</strong>
          <ul className="list-disc pl-4">
            {question.Links.split('\n').map((link, index) => (
              <li key={index}>
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {question['Follow-up'] && (
        <p className="mb-4">
          <strong className="text-lg">Follow-up:</strong> {question['Follow-up']}
        </p>
      )}
    </div>
  );
};

export default FAQPage;


