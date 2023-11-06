import React, { useState, useEffect, Fragment } from 'react';
import SpinWheel from '../components/SpinWheel.tsx';
import { Dialog, Transition } from '@headlessui/react';
import { confetti } from 'tsparticles-confetti';
import './questions.css';
import 'reactjs-popup/dist/index.css';
const Questions = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const questions = ['Вопрос 1: ...', 'Вопрос 2: ...', 'Вопрос 3: ...'];

  const handleAnswerButtonClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowLoader(true);
      setTimeout(() => {
        setShowLoader(false);
        setShowResult(true);
      }, 500);
    }
  };

  return (
    <div className="mb-10">
      {showResult ? (
        <SpinWheel />
      ) : (
        <div className="mt-20 py-10 px-5 bg-[#F5F5F5] rounded-3xl">
          {showLoader ? (
            <div className="mx-auto">
              <p className="text-2xl text-center font-bold mb-3">Текст после завершения вопросов</p>
              <div
                className="block mx-auto h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"
                role="status"></div>
            </div>
          ) : (
            <div>
              <h2 className="text-center text-xl mb-5 font-bold">
                Question {currentQuestionIndex + 1}/{questions.length}
              </h2>
              <p className="text-lg mb-5 text-center">{questions[currentQuestionIndex]}</p>
              <div className="flex flex-col gap-2">
                <button
                  className="bg-[#4B94F7] max-w-[365px] mx-auto py-3 px-5 w-full rounded-full text-lg text-white"
                  onClick={handleAnswerButtonClick}>
                  Yes
                </button>
                <button
                  className="bg-[#4B94F7] py-3 max-w-[365px] mx-auto px-5 w-full rounded-full text-lg text-white"
                  onClick={handleAnswerButtonClick}>
                  No
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Questions;
