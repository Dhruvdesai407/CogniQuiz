import React, { useState, useMemo } from 'react';

const QuizResults = ({ finalScore, totalCorrect, totalQuestions, onStartNewQuiz, quizParameters }) => {
    const [copied, setCopied] = useState(false);

    const { baseScore, timeBonus } = useMemo(() => {
        let difficultyMultiplier = 10;
        if (quizParameters && quizParameters.difficulty === 'medium') difficultyMultiplier = 20;
        if (quizParameters && quizParameters.difficulty === 'hard') difficultyMultiplier = 30;

        const calculatedBaseScore = totalCorrect * difficultyMultiplier;
        const calculatedTimeBonus = finalScore - calculatedBaseScore;

        return { baseScore: calculatedBaseScore, timeBonus: calculatedTimeBonus };
    }, [finalScore, totalCorrect, quizParameters?.difficulty]);

    const copyScoreToClipboard = () => {
        const difficultyMap = { easy: 'Novice', medium: 'Adept', hard: 'Master' };
        const categoryMap = {
            '9': 'General Knowledge', '10': 'Books', '11': 'Film', '12': 'Music',
            '13': 'Musicals & Theatres', '14': 'Television', '15': 'Video Games',
            '16': 'Board Games', '17': 'Science & Nature', '18': 'Computers',
            '19': 'Mathematics', '20': 'Mythology', '21': 'Sports', '22': 'Geography',
            '23': 'History', '24': 'Politics', '25': 'Art', '26': 'Celebrities',
            '27': 'Animals', '28': 'Vehicles', '29': 'Comics', '30': 'Gadgets',
            '31': 'Anime & Manga', '32': 'Cartoon & Animations', 'any': 'Any Realm'
        };

        const quizDetails = [
            `My CogniQuiz Score: ${finalScore} points!`,
            `Correct Answers: ${totalCorrect}/${totalQuestions}`,
            `Difficulty: ${quizParameters?.difficulty ? difficultyMap[quizParameters.difficulty] || quizParameters.difficulty : 'N/A'}`,
            `Category: ${quizParameters?.category ? categoryMap[quizParameters.category] || quizParameters.category : 'N/A'}`,
            `Number of Questions: ${quizParameters?.numQuestions || 'N/A'}`,
            `Time Per Question: ${quizParameters?.timePerChallenge ? quizParameters.timePerChallenge + 's' : 'N/A'}`
        ].join('\n');

        const el = document.createElement('textarea');
        el.value = quizDetails;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        try {
            document.execCommand('copy');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        } catch (err) {
            console.error('Failed to copy. Error: ' + err.message);
        } finally {
            document.body.removeChild(el);
        }
    };

    const shareOnTwitter = () => {
        const text = `I scored ${finalScore} points in CogniQuiz, answering ${totalCorrect}/${totalQuestions} challenges correctly! Can you beat my score? #CogniQuiz #QuizGame`;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    const shareOnFacebook = () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(`I scored ${finalScore} points in CogniQuiz!`)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="text-center p-8 md:p-12 rounded-xl shadow-xl frosted-glass-effect max-w-2xl w-11/12 md:w-full animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-heading text-heading-color mb-4 md:mb-6">Quest Complete!</h2>
            <p className="text-body-color text-lg md:text-xl mb-2 font-merriweather">
                Base Score: <span className="text-heading-color font-bold">{baseScore}</span>
            </p>
            <p className="text-body-color text-lg md:text-xl mb-2 font-merriweather">
                Time Bonus: <span className="text-heading-color font-bold">{timeBonus}</span>
            </p>
            <p className="text-body-color text-xl md:text-2xl mb-2 font-merriweather">
                Your final attainment: <span className="text-heading-color font-bold text-4xl md:text-5xl">{finalScore}</span> points!
            </p>
            <p className="text-body-color text-lg md:text-xl mb-8 font-merriweather">
                You answered <span className="font-bold text-heading-color">{totalCorrect}</span> out of <span className="font-bold text-heading-color">{totalQuestions}</span> challenges correctly.
            </p>

            <div className="flex flex-col items-center space-y-4 mt-8">
                <button
                    onClick={copyScoreToClipboard}
                    className="btn w-full md:w-auto"
                    data-interactive="true"
                >
                    {copied ? 'Copied!' : 'Copy Score to Clipboard'}
                </button>
                <button
                    onClick={shareOnTwitter}
                    className="btn w-full md:w-auto bg-blue-400 border-blue-400 text-white hover:bg-blue-500"
                    data-interactive="true"
                >
                    Share on Twitter
                </button>
                <button
                    onClick={shareOnFacebook}
                    className="btn w-full md:w-auto bg-blue-700 border-blue-700 text-white hover:bg-blue-800"
                    data-interactive="true"
                >
                    Share on Facebook
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
