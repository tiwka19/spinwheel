import React, { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { confetti } from 'tsparticles-confetti';
import { getAssetURL } from '../utils';

const Gift = ({ contentData, winImage, winImageModal }) => {
  console.log(contentData.modals);
  const initialGifts = Array(9).fill('/gift.png');
  const [gifts, setGifts] = useState(initialGifts);
  const [attempts, setAttempts] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);
  const [restartCount, setRestartCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isWinnerOpen, setIsWinnerOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  console.log(winImage);

  console.log(winImageModal);

  const openModal = () => {
    setIsOpen(true);
  };

  const openWinnerModal = () => {
    setIsWinnerOpen(true);
    const duration = 15 * 1000,
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

      // since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          zIndex: 100,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        }),
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          zIndex: 100,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        }),
      );
    }, 250);
  };

  const updateGifts = (index, imageUrl) => {
    const newGifts = [...gifts];
    newGifts[index] = imageUrl;
    setGifts(newGifts);
  };

  const handleClick = (index) => {
    updateGifts(index, '/empty-gift.png');
    setAttempts(attempts + 1);
    setTimeout(() => openModal(), 1000);
    if (restartCount > 1) {
      updateGifts(index, getAssetURL(winImage[0].directus_files_id.id));
      setTimeout(() => openWinnerModal(), 1000);
    }
  };

  const resetGame = () => {
    setGifts(initialGifts);
    setAttempts(0);
    setIsGameWon(false);
    setRestartCount(restartCount + 1);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-y-20 mx-auto max-w-xl">
        {gifts.map((gift, index) => (
          <div className={`${attempts > 0 && 'pointer-events-none'}`} key={index}>
            <img src={gift} className="w-[120px] h-[120px] mx-auto cursor-pointer" alt={`Подарок ${index + 1}`} onClick={() => handleClick(index)} />
          </div>
        ))}
      </div>

      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" static onClose={() => null}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
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
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-semibold text-center leading-6 text-gray-900">
                    {contentData.modals[0].lose.title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-center text-gray-500">{contentData.modals[0].lose.description}</p>
                  </div>

                  <div className="mt-4">
                    <button
                      className="bg-primary py-2 px-5 w-full rounded-full text-base text-white"
                      onClick={() => {
                        closeModal();
                        resetGame();
                      }}>
                      Next
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition show={isWinnerOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" static onClose={() => null}>
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
                    <img src={getAssetURL(winImageModal[0].directus_files_id.id)} className="h-[226px] mx-auto object-contain mb-5" />
                    {contentData.modals[0].win.title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-center text-gray-500">{contentData.modals[0].lose.description}</p>
                  </div>

                  <div className="mt-4">
                    <a
                      href={contentData.modals[0].win.externalLink}
                      className="bg-primary block text-center py-2 px-5 w-full rounded-full text-lg text-white">
                      Receive
                    </a>
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

export default Gift;
