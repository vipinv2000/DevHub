// components/Switch.jsx

const Switch = ({ checked, onChange }) => {
    return (
      <p
        onClick={onChange}
        className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
          checked ? 'bg-green-500' : 'bg-gray-600'
        }`}
      >
        <div
          className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${
            checked ? 'translate-x-6' : 'translate-x-0'
          }`}
        />
      </p>
    );
  };
  
  export default Switch;
  