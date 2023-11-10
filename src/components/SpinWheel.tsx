import { useState, useRef, useEffect, Fragment } from 'react';
import { Wheel } from 'spin-wheel/dist/spin-wheel-esm';
import { Dialog, Transition } from '@headlessui/react';
import { confetti } from 'tsparticles-confetti';
import { data } from '../utils';
interface SpinWheel {
  spinToItem: (
    itemIndex: number,
    duration?: number,
    spinToCenter?: boolean,
    numberOfRevolutions?: number,
    easingFunction?: null | ((t: number) => number),
  ) => void;
}

const SpinWheel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWinnerOpen, setIsWinnerOpen] = useState(false);

  const wheelContainerRef = useRef(null);
  const [wheel, setWheel] = useState(null);
  const [clickCount, setClickCount] = useState(0);

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

  const props = {
    items: [
      { image: '/spin-product.png', imageScale: 0.8, imageRadius: 0.6 },
      { label: '?' },
      { label: '?' },
      { label: '?' },
      { label: '?' },
      { label: '?' },
      { label: '?' },
      { label: '?' },
    ],
    image: '/overlay-test.svg',
    itemBackgroundColors: ['#E60304', '#F5C001', '#E60304', '#F5C001', '#E60304', '#F5C001', '#E60304', '#F5C001'],
    rotationSpeedMax: 500,
    lineWidth: 2,

    isInteractive: false,
    itemLabelFontSizeMax: 80,
    itemLabelRadius: 0.8,
  };

  useEffect(() => {
    const container = wheelContainerRef.current;

    if (container && !wheel) {
      const newWheel = new Wheel(container, props);
      setWheel(newWheel);

      newWheel.onRest = (e) => {
        if (e.currentIndex !== 0) {
          openModal();
        } else {
          openWinnerModal();
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
        }
      };
    }
  }, [wheel]);

  const handleRandomizeClick = () => {
    setClickCount(clickCount + 1);
    if (clickCount === 2) {
      wheel.spinToItem(0, 4000, true, 5);
    } else {
      const randomItemIndex = Math.floor(Math.random() * (props.items.length - 1)) + 1;
      wheel.spinToItem(randomItemIndex, 4000, true, 5);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center gap-0 sm:gap-10">
      <div id="wheel" ref={wheelContainerRef} className="lg:-ml-72 my-20 w-full sm:my-10 scale-150 sm:scale-100"></div>
      <div className="flex flex-col gap-10">
        <h2 className="text-4xl font-bold text-center">Lorem ipsum dolor sit amet.</h2>
        <button className="bg-primary py-3 w-full px-5  rounded-full text-lg text-white" onClick={handleRandomizeClick}>
          Play!
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
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
                  <Dialog.Title as="h3" className="text-lg font-semibold text-center leading-6 text-gray-900">
                    {data[0].modals[0].lose.title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-center text-gray-500">{data[0].modals[0].lose.description}</p>
                  </div>

                  <div className="mt-4">
                    <button className="bg-primary py-2 px-5 w-full rounded-full text-base text-white" onClick={closeModal}>
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
                    <img src={data[0].modals[0].win.image} className="h-[226px] mx-auto object-contain mb-5" />
                    {data[0].modals[0].win.title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-center text-gray-500">{data[0].modals[0].win.description}</p>
                  </div>

                  <div className="mt-4">
                    <a href={data[0].modals[0].win.externalLink} className="bg-primary block py-2 px-5 w-full rounded-full text-base text-white">
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

export default SpinWheel;
