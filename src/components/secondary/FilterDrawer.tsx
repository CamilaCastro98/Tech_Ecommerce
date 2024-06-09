import { IoFilter } from "react-icons/io5";
import { useState } from "react";
import { MdOutlineSignalCellularAlt } from "react-icons/md";

const FilterDrawer = () => {
  const [min, setMin] = useState(-Infinity);
  const [max, setMax] = useState(Infinity);
  const [isOpen, setIsOpen] = useState(false)
  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false)
  const [isRangeDropdownOpen, setIsRangeDropdownOpen] = useState(false)
  const [badInput, setBadInput] = useState("")

  const handleInputChangeMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMin(Number(e.target.value));
  };

  const handleInputChangeMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMax(Number(e.target.value));
  };

  const handleLowToHigh = () => {
    const event = new Event('lowToHigh');
    window.dispatchEvent(event);
  };

  const handleHighToLow = () => {
    const event = new Event('highToLow');
    window.dispatchEvent(event);
  };

  const handleResetOrder = () => {
    const event = new Event('resetOrder');
    window.dispatchEvent(event);
  };

  const handleInputRange = () => {
    if (min < max) {
       const event = new CustomEvent('applyRange', { detail: { min, max } });
    window.dispatchEvent(event)
    } else {
        setBadInput("The maximum value must be greater than the minimum")
    }
   
  };

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const togglePriceDropdown = () => {
    setIsPriceDropdownOpen(!isPriceDropdownOpen);
};

const toggleRangeDropdown = () => {
    setIsRangeDropdownOpen(!isRangeDropdownOpen);
};

  return (
    <>
      <div className="fixed left-8">
        <button
          className="text-white bg-green-400 hover:bg-green-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
          type="button"
          onClick={toggleDrawer}
        >
          <IoFilter />
        </button>
      </div>

      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white w-64 dark:bg-gray-800`}
        tabIndex={-1}
        aria-labelledby="drawer-navigation-label"
      >
        <h5 id="drawer-navigation-label" className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
          Filters
        </h5>
        <button
          type="button"
          onClick={toggleDrawer}
          aria-controls="drawer-navigation"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
                onClick={togglePriceDropdown}
              >
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Order by Price</span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul id="dropdown-example" className={`py-2 space-y-2 ${isPriceDropdownOpen ? 'block' : 'hidden'}`}>
                <li>
                  <button
                    onClick={handleLowToHigh}
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    < MdOutlineSignalCellularAlt className="w-5 h-auto" />
                    Lower to Higher
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleHighToLow}
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    < MdOutlineSignalCellularAlt className="w-5 h-auto transform -scale-x-100" />
                    Higher to Lower
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleResetOrder}
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Reset
                  </button>
                </li>
              </ul>
            </li>
            <li>
              <button
                type="button"
                className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-category"
                data-collapse-toggle="dropdown-category"
                onClick={toggleRangeDropdown}
              >
                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Select Range</span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <ul id="dropdown-category" className={`py-2 space-y-2 ${isRangeDropdownOpen ? 'block' : 'hidden'}`}>
                <li className="flex items-center justify-center gap-2">
                  <label htmlFor="min">Min $:</label>
                  <input
                    onFocus={()=>setBadInput("")}
                    onChange={handleInputChangeMin}
                    id="min"
                    type="number"
                    className="flex items-center w-1/2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  />
                </li>
                <li className="flex items-center justify-center gap-2">
                  <label htmlFor="max">Max $:</label>
                  <input
                    onFocus={()=>setBadInput("")}
                    onChange={handleInputChangeMax}
                    id="max"
                    type="number"
                    className="flex items-center w-1/2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  />
                  
                </li>
               { badInput && <p className="mb-4 p-1 border-2 text-center text-sm border-red-500 rounded-md font-semibold text-red-600 bg-red-300">{badInput}</p>}
                <li>
                  <button
                    onClick={handleInputRange}
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Apply
                  </button>
                </li>
                <li>
                  <button
                    onClick={()=> {
                      setMin(-Infinity)
                      setMax(Infinity)
                      handleResetOrder()
                    }}
                    className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    Reset
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default FilterDrawer;





