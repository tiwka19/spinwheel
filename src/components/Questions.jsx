import React, { useState } from 'react';
import SpinWheel from '../components/SpinWheel.tsx';
import Product from '../components/Product';
import 'reactjs-popup/dist/index.css';
import Gift from './Gift.jsx';

import { data } from '../utils/index.ts';

console.log(data[0].hero[0].title);

const Questions = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const questions = ['Вопрос 1: ...', 'Вопрос 2: ...', 'Вопрос 3: ...'];

  const options = { day: 'numeric', month: 'long' };
  const currentDate = new Date().toLocaleDateString('en-US', options);

  const handleAnswerButtonClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowLoader(true);
      setTimeout(() => {
        setShowAlert(true);
        window.scrollTo(0, 0);
      }, 5000);
    }
  };

  const showContent = () => {
    setShowResult(true);
  };

  return (
    <div className="mb-10">
      <div className={`flex mb-10 flex-col gap-10 lg:flex-row items-center ${(showResult && 'hidden') || (showLoader && 'hidden')}`}>
        <Product />
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5">{data[0].hero[0].title}</h1>
          <h2 className="text-2xl md:text-2xl font-bold mb-5">{data[0].hero[0].subtitle}</h2>
          <div className="md:max-w-[585px] mb-5">
            <p className="text-lg">{data[0].hero[0].description}</p>
          </div>
        </div>
      </div>

      <div className={`py-10 px-5 bg-[#F5F5F5] rounded-3xl ${showResult && 'hidden'}`}>
        {!showLoader ? (
          <div>
            <h2 className="text-center text-xl mb-5 font-bold">
              Question {currentQuestionIndex + 1}/{questions.length}
            </h2>
            <p className="text-lg mb-5 text-center">{questions[currentQuestionIndex]}</p>
            <div className="flex flex-col gap-2">
              <button className="bg-primary max-w-[365px] mx-auto py-3 px-5 w-full rounded-full text-lg text-white" onClick={handleAnswerButtonClick}>
                Yes
              </button>
              <button className="bg-primary py-3 max-w-[365px] mx-auto px-5 w-full rounded-full text-lg text-white" onClick={handleAnswerButtonClick}>
                No
              </button>
            </div>
          </div>
        ) : !showAlert ? (
          <div className="mx-auto">
            <p className="text-2xl text-center font-bold mb-3">{data[0].questionsAfter}</p>
            <div
              className="block mx-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"
              role="status"></div>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-5">
              <img src="/gift.png" className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-5">Congratulations, your answers have been verified correctly!</h3>
            <div className="text-lg mb-5">
              <p className="mb-3">
                Today, {currentDate}, you have a chance to win {data[0].winProduct}
              </p>
              <p className="mb-3">Just choose the right gift box</p>
              <p>
                You have <span className="text-primary">3</span> attempts, good luck!
              </p>
            </div>

            <button onClick={showContent} className="bg-primary py-2 max-w-[200px] mx-auto px-5 w-full rounded-full text-white">
              OK
            </button>
          </div>
        )}
      </div>
      {showResult && <Gift />}
    </div>
  );
};

export default Questions;
