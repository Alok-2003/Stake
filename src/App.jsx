import { useState } from 'react'
import './App.css'

const Box = ({ selected, onClick }) => (
  <div
    onClick={onClick}
    className={`w-12 md:w-24 h-12 md:h-24 flex justify-center rounded-xl items-center border border-gray-300 ${selected ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
  >
    Box
  </div>
);

function App() {
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [numToSelect, setNumToSelect] = useState('');
  const [randomSelection, setRandomSelection] = useState([]);

  // Function to handle clicking on a box
  const handleBoxClick = (index) => {
    if (selectedBoxes.includes(index)) {
      setSelectedBoxes(selectedBoxes.filter((item) => item !== index));
    } else {
      setSelectedBoxes([...selectedBoxes, index]);
    }
  };

  // Function to handle generating random selection
  const handleRandomSelection = () => {
    const numSelected = parseInt(numToSelect);
    if (isNaN(numSelected) || numSelected <= 0) {
      alert('Please enter a valid number greater than 0.');
      return;
    }
    const randomIndices = [];
    while (randomIndices.length < numSelected) {
      const randomIndex = Math.floor(Math.random() * 25);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }
    setRandomSelection(randomIndices);
  };

  return (
    <>
      <div className="container mx-auto mt-8">
        <div className="flex flex-col items-center justify-center mb-4">
          <input
            type="number"
            value={numToSelect}
            onChange={(e) => setNumToSelect(e.target.value)}
            placeholder="Enter number of boxes to select"
            className="mr-2 p-2 border border-gray-300"
          />
          <button onClick={handleRandomSelection} className="p-2 bg-blue-500 text-white hover:bg-blue-600 mt-2 md:mt-0">Random Select</button>
        </div>
        <div className="flex items-center justify-center mb-4">
          <div className="grid grid-cols-5 md:grid-cols-5 gap-2 w-full md:w-1/2">
            {Array.from({ length: 25 }, (_, index) => (
              <Box
                key={index}
                selected={selectedBoxes.includes(index) || randomSelection.includes(index)}
                onClick={() => handleBoxClick(index)}
                className=''
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
