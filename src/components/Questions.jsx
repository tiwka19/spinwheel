import React, { useState, useEffect, useRef } from 'react';
import { Winwheel } from '../scripts/wheel';
import './questions.css';
import 'reactjs-popup/dist/index.css';
const Questions = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
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
  let wheelPower = 0;
  let wheelSpinning = false;

  const alertPrize = (indicatedSegment) => {
    setClickCount(clickCount + 1);
    console.log(clickCount);
    if (indicatedSegment.text === 'iphone') {
      alert('iphone!');
    } else {
      alert('not iphone');
    }
  };

  const calculatePrize = () => {
    // This formula always makes the wheel stop somewhere inside prize 3 at least
    // 1 degree away from the start and end edges of the segment.
    let stopAt = Math.floor(Math.random() * 25);

    // Important thing is to set the stopAngle of the animation before stating the spin.
    theWheel.animation.stopAngle = stopAt;

    // May as well start the spin from here.
    theWheel.startAnimation();
  };

  const startSpin = () => {
    if (wheelSpinning == false) {
      // Based on the power level selected adjust the number of spins for the wheel, the more times is has
      // to rotate with the duration of the animation the quicker the wheel spins.
      if (wheelPower == 1) {
        theWheel.animation.spins = 3;
      } else if (wheelPower == 2) {
        theWheel.animation.spins = 8;
      } else if (wheelPower == 3) {
        theWheel.animation.spins = 15;
      }

      if (clickCount === 2) {
        calculatePrize();
      } else {
        theWheel.startAnimation();
      }

      // Set to true so that power can't be changed and spin button re-enabled during
      // the current animation. The user will have to reset before spinning again.
      wheelSpinning = true;
    }
  };

  const resetSpin = () => {
    theWheel.stopAnimation(false); // Stop the animation, false as param so does not call callback function.
    theWheel.rotationAngle = 0; // Re-set the wheel angle to 0 degrees.
    theWheel.draw(); // Call draw to render changes to the wheel.
    wheelSpinning = false; // Reset to false to power buttons and spin can be clicked again.
  };

  const handleAnswerButtonClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="mb-10">
      {showResult ? (
        <>
          <h2 className="text-2xl text-center font-bold mb-10">Lorem ipsum dolor sit amet.</h2>
          <div className="wheel mb-10 mx-auto w-[320px] h-[320px]">
            <canvas id="canvas" width="320" height="320"></canvas>
          </div>

          <button className="bg-[#4B94F7] py-3 px-5 w-full rounded-full text-lg text-white" onClick={startSpin}>
            Play
          </button>

          <button onClick={resetSpin}>Сброс</button>
        </>
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
    </div>
  );
};

export default Questions;
