import { useState } from 'react';
import CustomDropdown from './formcontrols/CustomDropdown';
import CustomInput from './formcontrols/CustomTextInput';

export default function AddInventory() {
  const [selectedValue, setSelectedValue] = useState('');
  const [email, setEmail] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Only proceed if form is valid
    if (selectedValue) {
      // Handle form submission logic here
      console.log('Form submitted with value:', selectedValue);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-6 flex gap-10">
          <CustomDropdown
            value={selectedValue}
            onChange={setSelectedValue}
            options={["Option 1", "Option 2", "Option 3"]}
            required={true}
            errorMessage="Please select an option"
            isSubmitted={formSubmitted}
          />
          <CustomInput
            value={email}
            onChange={setEmail}
            type="email"
            label="Email Address"
            required={true}
            errorMessage="Please enter a valid email"
            isSubmitted={formSubmitted}
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
}