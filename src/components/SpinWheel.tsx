import { useState, useRef, useEffect, Fragment } from 'react';
import { Wheel } from 'spin-wheel/dist/spin-wheel-esm';
import { Dialog, Transition } from '@headlessui/react';
import { confetti } from 'tsparticles-confetti';
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
    // image: 'bg-wheel.png',
    itemBackgroundColors: ['#E60304', '#F5C001', '#E60304', '#F5C001', '#E60304', '#F5C001', '#E60304'],
    rotationSpeedMax: 500,
    lineWidth: 2,
    radius: 1,
    lineColor: '#fff',
    rotation: -22,
    borderColor: '#4B94F7',
    borderWidth: 26,
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
    <div>
      <div id="wheel" ref={wheelContainerRef} className="my-20 sm:my-10 scale-150 sm:scale-100"></div>
      <button className="bg-[#4B94F7] py-3 px-5 w-full rounded-full text-lg text-white" onClick={handleRandomizeClick}>
        Play!
      </button>

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

export default SpinWheel;