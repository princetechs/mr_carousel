import React, { ChangeEvent, FC } from 'react';

interface GenerateFormProps {
    inputData: string;
    setInputData: (value: string) => void;
    handleGenerateClick: () => void;
}

const GenerateForm: FC<GenerateFormProps> = ({ inputData, setInputData, handleGenerateClick }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputData(e.target.value);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                value={inputData}
                onChange={handleChange}
            />
            <button className="btn btn-primary mt-2" onClick={handleGenerateClick}>
                ✨ Generate
            </button>
        </div>
    );
};

export default GenerateForm;
