import React, { useState } from 'react';
import Tooltip from './Tooltip';

const QuizPhase = ({ onBeginExpedition, onLoadingAnimationChange, onViewLeaderboard }) => {
    const [difficulty, setDifficulty] = useState('medium');
    const [category, setCategory] = useState('9');
    const [numQuestions, setNumQuestions] = useState(10);
    const [timePerChallenge, setTimePerChallenge] = useState(20);
    const [message, setMessage] = useState('');

    const handleBeginExpedition = () => {
        if (!category) {
            setMessage('Please select a category to begin your quest.');
            return;
        }
        setMessage('');
        onLoadingAnimationChange(true);
        setTimeout(() => {
            onBeginExpedition({ difficulty, category, numQuestions, timePerChallenge });
            onLoadingAnimationChange(false);
        }, 2000);
    };

    return (
        <div className="text-center p-8 md:p-12 rounded-xl shadow-xl frosted-glass-effect max-w-2xl w-11/12 md:w-full animate-pop-in cont1">
            <h2 className="text-3xl md:text-5xl font-heading text-heading-color mb-4 md:mb-6">Forge Your Quest</h2>
            <p className="text-body-color text-base md:text-lg mb-6 md:mb-8 font-merriweather">Configure your challenge parameters to embark on a journey of knowledge.</p>

            <div className="mb-5 md:mb-6 max-w-sm mx-auto">
                <label htmlFor="difficulty" className="block text-body-color text-base md:text-lg font-medium mb-2 text-left">
                    Challenge Difficulty:
                    <Tooltip content="Choose the intensity of your intellectual journey.">
                        <span className="ml-2 text-heading-color cursor-help text-lg">?</span>
                    </Tooltip>
                </label>
                <select
                    id="difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="block w-full bg-input-bg-color border border-subtle-color text-body-color py-2 px-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-main focus:border-accent-main transition-colors duration-200 text-base md:text-lg appearance-none cursor-pointer"
                    data-interactive="true"
                >
                    <option value="any">Any</option>
                    <option value="easy">Novice</option>
                    <option value="medium">Adept</option>
                    <option value="hard">Master</option>
                </select>
            </div>

            <div className="mb-5 md:mb-6 max-w-sm mx-auto">
                <label htmlFor="category" className="block text-body-color text-base md:text-lg font-medium mb-2 text-left">
                    Knowledge Domain:
                    <Tooltip content="Select a specific realm of knowledge to explore.">
                        <span className="ml-2 text-heading-color cursor-help text-lg">?</span>
                    </Tooltip>
                </label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="block w-full bg-input-bg-color border border-subtle-color text-body-color py-2 px-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-main focus:border-accent-main transition-colors duration-200 text-base md:text-lg appearance-none cursor-pointer"
                    data-interactive="true"
                >
                    <option value="any">Any Realm</option>
                    <option value="9">General Knowledge</option>
                    <option value="10">Books</option>
                    <option value="11">Film</option>
                    <option value="12">Music</option>
                    <option value="13">Musicals & Theatres</option>
                    <option value="14">Television</option>
                    <option value="15">Video Games</option>
                    <option value="16">Board Games</option>
                    <option value="17">Science & Nature</option>
                    <option value="18">Computers</option>
                    <option value="19">Mathematics</option>
                    <option value="20">Mythology</option>
                    <option value="21">Sports</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="24">Politics</option>
                    <option value="25">Art</option>
                    <option value="26">Celebrities</option>
                    <option value="27">Animals</option>
                    <option value="28">Vehicles</option>
                    <option value="29">Comics</option>
                    <option value="30">Gadgets</option>
                    <option value="31">Anime & Manga</option>
                    <option value="32">Cartoon & Animations</option>
                </select>
            </div>

            <div className="mb-5 md:mb-6 max-w-sm mx-auto">
                <label htmlFor="numQuestions" className="block text-body-color text-base md:text-lg font-medium mb-2 text-left">
                    Number of Challenges:
                    <Tooltip content="The total count of questions for your quest.">
                        <span className="ml-2 text-heading-color cursor-help text-lg">?</span>
                    </Tooltip>
                </label>
                <input
                    type="number"
                    id="numQuestions"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(Math.max(1, Math.min(parseInt(e.target.value), 50)))}
                    min="1"
                    max="50"
                    className="block w-full bg-input-bg-color border border-subtle-color text-body-color py-2 px-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-main focus:border-accent-main transition-colors duration-200 text-base md:text-lg"
                    data-interactive="true"
                />
            </div>

            <div className="mb-8 md:mb-10 max-w-sm mx-auto">
                <label htmlFor="timePerChallenge" className="block text-body-color text-base md:text-lg font-medium mb-2 text-left">
                    Time Per Challenge (seconds):
                    <Tooltip content="The ticking sands of time for each question.">
                        <span className="ml-2 text-heading-color cursor-help text-lg">?</span>
                    </Tooltip>
                </label>
                <input
                    type="number"
                    id="timePerChallenge"
                    value={timePerChallenge}
                    onChange={(e) => setTimePerChallenge(Math.max(5, parseInt(e.target.value)))}
                    min="5"
                    max="60"
                    className="block w-full bg-input-bg-color border border-subtle-color text-body-color py-2 px-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-main focus:border-accent-main transition-colors duration-200 text-base md:text-lg"
                    data-interactive="true"
                />
            </div>

            {message && (
                <p className="text-error-red text-base md:text-lg mb-6 font-medium animate-fade-in-out">
                    {message}
                </p>
            )}

            <div className="flex flex-col items-center space-y-4">
                <button
                    onClick={handleBeginExpedition}
                    className="btn w-full md:w-auto"
                    data-interactive="true"
                >
                    Commence Quest
                </button>
                <button
                    onClick={onViewLeaderboard}
                    className="btn w-full md:w-auto"
                    data-interactive="true"
                >
                    View Attainment Log
                </button>
            </div>
        </div>
    );
};

export default QuizPhase;