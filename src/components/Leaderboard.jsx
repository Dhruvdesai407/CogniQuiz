import React, { useState, useEffect } from 'react';

const Leaderboard = ({ onReturnToSettings }) => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const categoryMap = {
        '9': 'General Knowledge', '10': 'Books', '11': 'Film', '12': 'Music',
        '13': 'Musicals & Theatres', '14': 'Television', '15': 'Video Games',
        '16': 'Board Games', '17': 'Science & Nature', '18': 'Computers',
        '19': 'Mathematics', '20': 'Mythology', '21': 'Sports', '22': 'Geography',
        '23': 'History', '24': 'Politics', '25': 'Art', '26': 'Celebrities',
        '27': 'Animals', '28': 'Vehicles', '29': 'Comics', '30': 'Gadgets',
        '31': 'Anime & Manga', '32': 'Cartoon & Animations', 'any': 'Any Realm'
    };

    const difficultyMap = {
        'easy': 'Novice', 'medium': 'Adept', 'hard': 'Master', 'any': 'Any Difficulty'
    };

    useEffect(() => {
        try {
            const storedScores = JSON.parse(localStorage.getItem('quizLeaderboard')) || [];
            const sortedData = storedScores.sort((a, b) => {
                if (b.score !== a.score) {
                    return b.score - a.score;
                }
                return new Date(b.timestamp) - new Date(a.timestamp);
            });
            setLeaderboardData(sortedData);
        } catch (e) {
            setError("Failed to load leaderboard from local storage.");
            console.error("Local storage read error:", e);
        } finally {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return (
            <div className="text-center text-body-color text-2xl p-8 rounded-xl shadow-xl frosted-glass-effect max-w-3xl w-11/12 md:w-full animate-fade-in">
                Loading Leaderboard...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-error-red text-xl p-8 rounded-xl shadow-xl frosted-glass-effect max-w-3xl w-11/12 md:w-full animate-fade-in">
                <p className="mb-4">{error}</p>
                <button
                    onClick={onReturnToSettings}
                    className="btn w-full md:w-auto mt-4"
                    data-interactive="true"
                >
                    Back to Quest Setup
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8 rounded-xl shadow-xl leaderboard-container animate-fade-in-scale">
            <h2 className="text-center font-heading text-heading-color leaderboard-title animate-slide-in-top">Global Attainment Log</h2>
            
            {leaderboardData.length === 0 ? (
                <div className="text-center text-body-color text-xl p-4 rounded-lg bg-secondary-color bg-opacity-50 border border-subtle-color">
                    No scores recorded yet. Be the first to mark your achievement!
                </div>
            ) : (
                <div className="overflow-x-auto relative shadow-2xl rounded-lg border border-subtle-color">
                    <table className="w-full text-sm text-left text-body-color border-collapse">
                        <thead className="text-xs text-heading-color uppercase font-heading bg-gradient-to-b from-accent-main to-accent-dark sticky top-0 z-10 shadow-md">
                            <tr>
                                <th scope="col" className="py-3 px-6 text-white text-shadow-sm">Rank</th>
                                <th scope="col" className="py-3 px-6 text-white text-shadow-sm">Score</th>
                                <th scope="col" className="py-3 px-6 text-white text-shadow-sm">Correct</th>
                                <th scope="col" className="py-3 px-6 text-white text-shadow-sm">Total Qs</th>
                                <th scope="col" className="py-3 px-6 text-white text-shadow-sm">Difficulty</th>
                                <th scope="col" className="py-3 px-6 text-white text-shadow-sm">Category</th>
                                <th scope="col" className="py-3 px-6 text-white text-shadow-sm">Time/Q (s)</th>
                                <th scope="col" className="py-3 px-6 text-white text-shadow-sm">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboardData.map((entry, index) => (
                                <tr key={entry.id} className={`transition-all duration-300 ease-in-out hover:scale-101 hover:shadow-lg hover:bg-accent-main hover:text-white
                                    ${index % 2 === 0 ? 'bg-primary-color bg-opacity-85' : 'bg-secondary-color bg-opacity-85'} border-b border-subtle-color`}>
                                    <td className="py-4 px-6 flex items-center h-full">
                                        {index === 0 && <span className="rank-icon rank-1 mr-2">🏆</span>}
                                        {index === 1 && <span className="rank-icon rank-2 mr-2">🥈</span>}
                                        {index === 2 && <span className="rank-icon rank-3 mr-2">🥉</span>}
                                        <span className="flex-grow flex items-center">{index + 1}</span>
                                    </td>
                                    <td className="py-4 px-6">{entry.score}</td>
                                    <td className="py-4 px-6">{entry.totalCorrect}</td>
                                    <td className="py-4 px-6">{entry.totalQuestions}</td>
                                    <td className="py-4 px-6">{difficultyMap[entry.difficulty] || entry.difficulty}</td>
                                    <td className="py-4 px-6">{categoryMap[entry.category] || entry.category}</td>
                                    <td className="py-4 px-6">{entry.timePerChallenge}</td>
                                    <td className="py-4 px-6">{new Date(entry.timestamp).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <button
                onClick={onReturnToSettings}
                className="btn w-full md:w-auto mx-auto mt-6"
                data-interactive="true"
            >
                Back to Quest Setup
            </button>
        </div>
    );
};

export default Leaderboard;