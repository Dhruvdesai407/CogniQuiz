import React from 'react';

const QuestionDisplay = ({challengeData, onParticipantResponse, selectedResponseKey, isTimedOut}) => {
    const {id , question , options, correctAnswers} = challengeData;

    const isAnswerRevealed = selectedResponseKey !== null || isTimedOut;

    return (
        <div className="p-6 md:p-8 rounded-xl shadow-md mb-6 text-left frosted-glass-effect transform transition-all duration-300 animate-pop-in">
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-heading-color font-heading leading-snug text-center">{question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"> 
                {options.map((option) => {
                    const isSelected = selectedResponseKey === option.key;
                    const isCorrectOption = Array.isArray(correctAnswers) && correctAnswers.includes(option.text);

                    let buttonClasses = `
                        py-4 px-5 rounded-lg text-left text-lg md:text-xl font-medium border-2
                        transition-all duration-300 ease-in-out transform
                        w-full
                        text-wrap break-words
                        shadow-lg
                        hover:shadow-xl
                    `;

                    if (isAnswerRevealed) {
                        if (isSelected && isCorrectOption) {
                            buttonClasses += ' bg-success-green text-white border-success-green scale-105';
                        } else if (isSelected && !isCorrectOption) {
                            buttonClasses += ' bg-error-red text-white border-error-red scale-105';
                        } else if (!isSelected && isCorrectOption) {
                            buttonClasses += ' bg-success-green/30 text-[var(--color-correct-unselected-text)] border-success-green animate-pulse-subtle';
                        } else {
                            buttonClasses += ' bg-input-bg-color text-body-color border-subtle-color opacity-70';
                        }
                        buttonClasses += ' cursor-not-allowed';
                    } else {
                        buttonClasses += ' bg-input-bg-color text-body-color border-subtle-color hover:bg-secondary-color hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-main focus:border-accent-main';
                        buttonClasses += ' cursor-pointer';
                        if (isSelected) {
                            buttonClasses += ' ring-2 ring-accent-main ring-offset-2 ring-offset-primary-color';
                        }
                    }

                    return (
                        <button
                            key={option.key}
                            onClick={() => onParticipantResponse(id, option.key)}
                            disabled={isAnswerRevealed}
                            className={buttonClasses}
                            data-interactive="true"
                        >
                            {option.text}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default QuestionDisplay;