import React, { useState } from 'react';
import Tooltip from './Tooltip';

const QuizPhase = ({ onBeginExpedition, onLoadingAnimationChange, onViewLeaderboard, onStartDailyQuiz, onNavigateToSettings, isDailyChallengeAvailable, markDailyChallengePlayed }) => {
    const [difficulty, setDifficulty] = useState('medium');
    const [category, setCategory] = useState('9');
    const [numQuestions, setNumQuestions] = useState(10);
    const [timePerChallenge, setTimePerChallenge] = useState(20);
    const [message, setMessage] = useState('');
    const [showInstructions, setShowInstructions] = useState(false);

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

    const handleStartDailyQuiz = () => {
        if (!isDailyChallengeAvailable) {
            setMessage(`You have already completed today's Daily Challenge. Come back tomorrow for a new one!`);
            return;
        }
        setMessage('');
        onLoadingAnimationChange(true);
        setTimeout(() => {
            onStartDailyQuiz();
            markDailyChallengePlayed();
            onLoadingAnimationChange(false);
        }, 2000);
    };

    const toggleInstructions = () => {
        setShowInstructions(!showInstructions);
    };

    return (
        <div className="text-center p-8 md:p-12 rounded-xl shadow-xl frosted-glass-effect max-w-4xl w-11/12 md:w-full animate-pop-in cont1">
            <h2 className="text-4xl md:text-6xl font-heading text-heading-color mb-4 md:mb-6">Forge Your Quest</h2>
            <p className="text-body-color text-lg md:text-xl mb-8 md:mb-10 font-merriweather">Configure your challenge parameters to embark on a journey of knowledge.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="max-w-sm mx-auto">
                    <label htmlFor="difficulty" className="block text-body-color text-lg md:text-xl font-medium mb-3 text-left">
                        Challenge Difficulty:
                        <Tooltip content="Choose the intensity of your intellectual journey.">
                            <span className="ml-2 text-heading-color cursor-help text-lg">?</span>
                        </Tooltip>
                    </label>
                    <select
                        id="difficulty"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="block w-full bg-input-bg-color border border-subtle-color text-body-color py-3 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-main focus:border-accent-main transition-colors duration-200 text-lg md:text-xl appearance-none cursor-pointer"
                        data-interactive="true"
                    >
                        <option value="any">Any</option>
                        <option value="easy">Novice</option>
                        <option value="medium">Adept</option>
                        <option value="hard">Master</option>
                    </select>
                </div>

                <div className="max-w-sm mx-auto">
                    <label htmlFor="category" className="block text-body-color text-lg md:text-xl font-medium mb-3 text-left">
                        Knowledge Domain:
                        <Tooltip content="Select a specific realm of knowledge to explore.">
                            <span className="ml-2 text-heading-color cursor-help text-lg">?</span>
                        </Tooltip>
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="block w-full bg-input-bg-color border border-subtle-color text-body-color py-3 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-main focus:border-accent-main transition-colors duration-200 text-lg md:text-xl appearance-none cursor-pointer"
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

                <div className="max-w-sm mx-auto">
                    <label htmlFor="numQuestions" className="block text-body-color text-lg md:text-xl font-medium mb-3 text-left">
                        Number of Challenges:
                        <Tooltip content="The total count of questions for your quest.">
                            <span className="ml-2 text-heading-color cursor-help text-lg">?</span>
                        </Tooltip>
                    </label>
                    <input
                        type="number"
                        id="numQuestions"
                        value={numQuestions}
                        onChange={(e) => setNumQuestions(Math.max(1, Math.min(parseInt(e.target.value) || 1, 50)))}
                        min="1"
                        max="50"
                        className="block w-full bg-input-bg-color border border-subtle-color text-body-color py-3 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-main focus:border-accent-main transition-colors duration-200 text-lg md:text-xl"
                        data-interactive="true"
                    />
                </div>

                <div className="max-w-sm mx-auto">
                    <label htmlFor="timePerChallenge" className="block text-body-color text-lg md:text-xl font-medium mb-3 text-left">
                        Time Per Challenge (seconds):
                        <Tooltip content="The ticking sands of time for each question.">
                            <span className="ml-2 text-heading-color cursor-help text-lg">?</span>
                        </Tooltip>
                    </label>
                    <input
                        type="number"
                        id="timePerChallenge"
                        value={timePerChallenge}
                        onChange={(e) => setTimePerChallenge(Math.max(5, Math.min(parseInt(e.target.value) || 5, 60)))}
                        min="5"
                        max="60"
                        className="block w-full bg-input-bg-color border border-subtle-color text-body-color py-3 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-main focus:border-accent-main transition-colors duration-200 text-lg md:text-xl"
                        data-interactive="true"
                    />
                </div>
            </div>

            {message && (
                <p className="text-error-red text-lg md:text-xl mb-8 font-medium animate-fade-in-out">
                    {message}
                </p>
            )}

            <div className="flex flex-wrap justify-center items-center gap-4">
                <button
                    onClick={handleBeginExpedition}
                    className="btn"
                    data-interactive="true"
                >
                    Commence Quest
                </button>
                <button
                    onClick={handleStartDailyQuiz}
                    className="btn"
                    data-interactive="true"
                    disabled={!isDailyChallengeAvailable}
                >
                    Daily Challenge
                </button>
                <button
                    onClick={onViewLeaderboard}
                    className="btn"
                    data-interactive="true"
                >
                    View Attainment Log
                </button>
                <button
                    onClick={toggleInstructions}
                    className="btn"
                    data-interactive="true"
                >
                    How to Play
                </button>
                <button
                    onClick={onNavigateToSettings}
                    className="btn"
                    data-interactive="true"
                >
                    Settings
                </button>
            </div>

            {showInstructions && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
                    <div className="bg-primary-color p-8 rounded-xl shadow-2xl text-center max-w-lg mx-auto animate-pop-in">
                        <h3 className="text-2xl font-heading text-heading-color mb-4">How to Play CogniQuiz</h3>
                        <p className="text-body-color text-base mb-4 text-left">
                            Welcome to CogniQuiz! Here's how to embark on your knowledge quest:
                        </p>
                        <ul className="text-body-color text-sm text-left list-disc list-inside mb-6 space-y-2">
                            <li>
                                <strong>Forge Your Quest:</strong> On the main screen, select your desired difficulty, category, number of questions, and time per challenge.
                            </li>
                            <li>
                                <strong>Commence Quest:</strong> Click 'Commence Quest' to start the quiz. Questions will appear one by one.
                            </li>
                            <li>
                                <strong>Answer Challenges:</strong> Read each question and select one of the provided options. Be mindful of the timer!
                            </li>
                            <li>
                                <strong>Submit & Progress:</strong> After selecting an answer (or if time runs out), click 'Submit Answer'. The correct answer will be revealed. Then, click 'Next Challenge' to proceed.
                            </li>
                            <li>
                                <strong>Conclude Quest:</strong> Once all questions are answered, your final score will be displayed.
                            </li>
                            <li>
                                <strong>Attainment Log:</strong> View your past scores and compare your progress on the 'Attainment Log' (Leaderboard) screen.
                            </li>
                            <li>
                                <strong>Share Your Feats:</strong> After completing a quiz, you can share your score with others.
                            </li>
                            <li>
                                <strong>Theme Selection:</strong> Customize your experience by choosing different themes from the footer.
                            </li>
                        </ul>
                        <button
                            onClick={toggleInstructions}
                            className="btn w-full md:w-auto"
                            data-interactive="true"
                        >
                            Got It!
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizPhase;