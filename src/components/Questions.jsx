import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Winwheel } from '../scripts/wheel';
import { confetti } from 'tsparticles-confetti';
import './questions.css';
import 'reactjs-popup/dist/index.css';
const Questions = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  let [isOpen, setIsOpen] = useState(false);
  let [isWinnerOpen, setIsWinnerOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeWinner = () => {
    setIsWinnerOpen(false);
  };

  const openWinnerModal = () => {
    setIsWinnerOpen(true);
  };

  const questions = ['Вопрос 1: ...', 'Вопрос 2: ...', 'Вопрос 3: ...'];
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    if (showResult) {
      theWheel = new Winwheel({
        canvasId: 'canvas',
        numSegments: 9, // Specify number of segments.
        outerRadius: 150, // Set outer radius so wheel fits inside the background.
        textFontSize: 24, // Set font size as desired.
        drawMode: 'image',
        // centerX: '10',
        innerRadius: '10',
        // Define segments including colour and text.
        // imageOverlay: true,
        segments: [
          { fillStyle: '#E60304', text: 'iphone' },
          { fillStyle: '#F5C001', text: '1' },
          { fillStyle: '#E60304', text: '2' },
          { fillStyle: '#F5C001', text: '3' },
          { fillStyle: '#E60304', text: '4' },
          { fillStyle: '#F5C001', text: '5' },
          { fillStyle: '#E60304', text: '6' },
          { fillStyle: '#F5C001', text: '7' },
          { fillStyle: '#F5C001', text: '8' },
        ],

        // Specify the animation to use.
        animation: {
          type: 'spinToStop',
          duration: 5, // Duration in seconds.
          spins: 8, // Number of complete spins.
          callbackFinished: alertPrize,
        },
      });

      let loadedImg = new Image();
      loadedImg.onload = function () {
        theWheel.wheelImage = loadedImg;
        theWheel.draw();
      };
      loadedImg.src = '/bg-wheel.svg';
    }
  });

  let theWheel;
  let wheelSpinning = false;

  const alertPrize = (indicatedSegment) => {
    setClickCount(clickCount + 1);
    if (indicatedSegment.text === 'iphone') {
      openWinnerModal();
      const duration = 5 * 1000,
        animationEnd = Date.now() + duration,
        defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti(
          Object.assign({}, defaults, {
            zIndex: 100,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          }),
        );
        confetti(
          Object.assign({}, defaults, {
            zIndex: 100,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          }),
        );
      }, 250);
    } else {
      openModal();
    }
  };

  const calculatePrize = () => {
    let stopAt = Math.floor(Math.random() * 20);
    theWheel.animation.stopAngle = stopAt;
    theWheel.startAnimation();
  };

  const startSpin = () => {
    if (wheelSpinning == false) {
      if (clickCount === 2) {
        calculatePrize();
      } else {
        theWheel.startAnimation();
      }
      wheelSpinning = true;
    }
  };
  const handleAnswerButtonClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowLoader(true);
      setTimeout(() => {
        setShowLoader(false);
        setShowResult(true);
      }, 5000);
    }
  };

  return (
    <div className="mb-10">
      {showResult ? (
        <div>
          <h2 className="text-2xl text-center font-bold mb-10">Lorem ipsum dolor sit amet.</h2>
          <div className="wheel mb-5 mx-auto w-[320px] h-[320px]">
            <canvas id="canvas" width="320" height="320"></canvas>
          </div>

          <button className="bg-[#4B94F7] py-3 px-5 w-full rounded-full text-lg text-white" onClick={startSpin}>
            Play
          </button>
        </div>
      ) : showLoader ? (
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
          <p className="text-lg mb-5">{questions[currentQuestionIndex]}</p>
          <div className="flex flex-col gap-2">
            <button className="bg-[#4B94F7] py-3 px-5 w-full rounded-full text-lg text-white" onClick={handleAnswerButtonClick}>
              Yes
            </button>
            <button className="bg-[#4B94F7] py-3 px-5 w-full rounded-full text-lg text-white" onClick={handleAnswerButtonClick}>
              No
            </button>
          </div>
        </div>
      )}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-semibold text-center leading-6 text-gray-900">
                    Ohh...
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-center text-gray-500">Lorem ipsum dolor sit amet consectetur adipiscing elit ultricies venenatis.</p>
                  </div>

                  <div className="mt-4">
                    <button className="bg-[#4B94F7] py-2 px-5 w-full rounded-full text-base text-white" onClick={closeModal}>
                      Next
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isWinnerOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="div" className="text-2xl font-bold text-center">
                    <img src="/product/product-1.png" className="h-[226px] mx-auto object-contain mb-5" />
                    WIN!!
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-center text-gray-500">Lorem ipsum dolor sit amet consectetur adipiscing elit ultricies venenatis.</p>
                  </div>

                  <div className="mt-4">
                    <button className="bg-[#4B94F7] py-2 px-5 w-full rounded-full text-base text-white" onClick={closeWinner}>
                      Receive
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Questions;
