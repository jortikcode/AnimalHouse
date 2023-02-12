import { useState } from "react";

const Cart = () => {
  const [ showCart, setShowCart ] = useState(false)
  
  return (
    <div className="">
      <div className="flex items-center">
        <div className="relative ">
          <div className="flex flex-row cursor-pointer rounded">
            <div className="flex flex-row-reverse w-full">
              <button type="button" role="button" slot="icon" className="relative" onClick={(e) => setShowCart(oldCart => !oldCart)}>
                <div className="absolute text-xs rounded-full -mt-1 -mr-2 px-1 font-bold top-0 right-0 bg-red-700 text-white">
                  3
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-shopping-cart w-6 h-6 mt-2"
                >
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className={`${!showCart ? "hidden" : ""} absolute w-full rounded-b border-t-0 z-50 md:top-10 md:right-28 md:left-auto left-0 top-10`}>
            <div className="shadow-xl w-64">
              <div
                className="p-2 flex bg-white hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                style={{}}
              >
                <div className="p-2 w-12">
                  <img
                    src="https://dummyimage.com/50x50/bababa/0011ff&amp;text=50x50"
                    alt="img product"
                  />
                </div>
                <div className="flex-auto text-sm w-32">
                  <div className="font-bold">Product 1</div>
                  <div className="truncate">Product 1 description</div>
                  <div className="text-gray-400">Qt: 2</div>
                </div>
                <div className="flex flex-col w-18 font-medium items-end">
                  <div className="w-4 h-4 mb-6 hover:bg-red-200 rounded-full cursor-pointer text-red-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-trash-2 "
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </div>
                  $12.22
                </div>
              </div>
              <div
                className="p-2 flex bg-white hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                style={{}}
              >
                <div className="p-2 w-12">
                  <img
                    src="https://dummyimage.com/50x50/bababa/0011ff&amp;text=50x50"
                    alt="img product"
                  />
                </div>
                <div className="flex-auto text-sm w-32">
                  <div className="font-bold">Product 2</div>
                  <div className="truncate">Product 2 long description</div>
                  <div className="text-gray-400">Qt: 2</div>
                </div>
                <div className="flex flex-col w-18 font-medium items-end">
                  <div className="w-4 h-4 mb-6 hover:bg-red-200 rounded-full cursor-pointer text-red-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-trash-2 "
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </div>
                  $12.22
                </div>
              </div>
              <div
                className="p-2 flex bg-white hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                style={{}}
              >
                <div className="p-2 w-12">
                  <img
                    src="https://dummyimage.com/50x50/bababa/0011ff&amp;text=50x50"
                    alt="img product"
                  />
                </div>
                <div className="flex-auto text-sm w-32">
                  <div className="font-bold">Product 3</div>
                  <div className="truncate">Product 3 description</div>
                  <div className="text-gray-400">Qt: 2</div>
                </div>
                <div className="flex flex-col w-18 font-medium items-end">
                  <div className="w-4 h-4 mb-6 hover:bg-red-200 rounded-full cursor-pointer text-red-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-trash-2 "
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </div>
                  $12.22
                </div>
              </div>
              <div className="p-4 justify-center flex bg-white">
                <button
                  className="text-base  undefined  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
        hover:bg-yellow-400 hover:text-black 
        bg-yellow-100 
        text-gray-400 
        border border-gray-200 duration-200 ease-in-out 
         transition"
                >
                  Ordina $36.66
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart