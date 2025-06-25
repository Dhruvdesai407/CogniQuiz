import React from 'react';

const QuizResults = ({ finalScore, totalCorrect, totalQuestions, onStartNewQuiz, quizParameters }) => {

    const copyScoreToClipboard = () => {
        const difficultyMap = { easy: 'Novice', medium: 'Adept', hard: 'Master' };
        const categoryMap = {
            '9': 'General Knowledge', '18': 'Computers', '17': 'Science & Nature',
            '21': 'Sports', '22': 'Geography', '23': 'History', '24': 'Politics',
            '27': 'Animals', '11': 'Film', '12': 'Music', '14': 'Television',
            '15': 'Video Games', '10': 'Books', '30': 'Gadgets', 'any': 'Any Realm'
        };

        const quizDetails = [
            `Correct Answers: ${totalCorrect}/${totalQuestions},`,
            `Difficulty: ${difficultyMap[quizParameters.difficulty] || quizParameters.difficulty},`,
            `Category: ${categoryMap[quizParameters.category] || quizParameters.category},`,
            `Number of Questions: ${quizParameters.numQuestions},`,
            `Time Per Question: ${quizParameters.timePerChallenge}s.`
        ].join('\n');

        const el = document.createElement('textarea');
        el.value = quizDetails;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                alert('Quiz results copied to clipboard!');
            } else {
                alert('Failed to copy. Please copy manually.');
            }
        } catch (err) {
            alert('Failed to copy. Error: ' + err.message);
        } finally {
            document.body.removeChild(el);
        }
    };

    return (
        <div className="text-center p-8 md:p-12 rounded-xl shadow-xl frosted-glass-effect max-w-2xl w-11/12 md:w-full animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-heading text-heading-color mb-4 md:mb-6">Quest Complete!</h2>

            <p className="text-body-color text-lg md:text-xl mb-8 font-merriweather">
                You answered <span className="font-bold text-heading-color">{totalCorrect}</span> out of <span className="font-bold text-heading-color">{totalQuestions}</span> challenges correctly.
            </p>

            <div className="flex flex-col items-center space-y-4 mt-8">
                <button
                    onClick={copyScoreToClipboard}
                    className="btn w-full md:w-auto"
                    data-interactive="true"
                >
                    Share Attainment
                </button>
                <button
                    onClick={onStartNewQuiz}
                    className="btn w-full md:w-auto"
                    data-interactive="true"
                >
                    Embark on New Quest
                </button>
            </div>
        </div>
    );
};

export default QuizResults;