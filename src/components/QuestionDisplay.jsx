import React from 'react';

const QuestionDisplay = ({challengeData, onParticipantResponse, selectedResponseKey, isTimedOut}) => {
    const {id , question , options, correctAnswers} = challengeData;

    const isAnswerRevealed = selectedResponseKey !== null || isTimedOut;

    return (
        <div className="p-6 md:p-8 rounded-xl shadow-md mb-6 text-left frosted-glass-effect transform transition-all duration-300 animate-pop-in">
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-heading-color font-heading leading-snug">{question}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"> 
                {options.map((option) => {
                    const isSelected = selectedResponseKey === option.key;
                    const isCorrectOption = Array.isArray(correctAnswers) && correctAnswers.includes(option.text);

                    let buttonClasses = `
                        py-3 px-4 rounded-lg text-left text-base md:text-lg font-medium border-2
                        transition-all duration-300 ease-in-out transform
                        w-full
                        text-wrap break-words
                        shadow-md
                        hover:shadow-lg
                    `;

                    if (isAnswerRevealed) {
                        if (isSelected && isCorrectOption) {
                            buttonClasses += ' bg-success-green text-white border-success-green scale-[1.01]';
                        } else if (isSelected && !isCorrectOption) {
                            buttonClasses += ' bg-error-red text-white border-error-red scale-[1.01]';
                        } else if (!isSelected && isCorrectOption) {
                            buttonClasses += ' bg-success-green/20 text-[var(--color-correct-unselected-text)] border-success-green animate-pulse-subtle';
                        } else {
                            buttonClasses += ' bg-input-bg-color text-body-color border-subtle-color';
                        }
                        buttonClasses += ' cursor-not-allowed';
                    } else {
                        buttonClasses += ' bg-input-bg-color text-body-color border-subtle-color hover:bg-secondary-color focus:outline-none focus:ring-2 focus:ring-accent-main focus:border-accent-main';
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