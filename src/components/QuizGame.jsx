import React, { useState, useEffect, useCallback, useRef } from 'react';
import QuestionDisplay from './QuestionDisplay';

const QuizGame = ({ parameters, onConcludeExpedition, onLoadingAnimationChange, sessionToken, resetSessionToken, isLoading }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [score, setScore] = useState({ correct: 0, total: 0, totalScore: 0 });
    const [feedback, setFeedback] = useState(null);
    const [answeredThisQuestion, setAnsweredThisQuestion] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [timeLeft, setTimeLeft] = useState(parameters.timePerChallenge || 20);
    const timerRef = useRef(null);
    const fetchInitiatedRef = useRef(false);

    const decodeHtml = (html) => {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = html;
        return textarea.value;
    };

    const shuffleArray = useCallback((array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }, []);

    const resetTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        setTimeLeft(parameters.timePerChallenge || 20);
    }, [parameters.timePerChallenge]);

    useEffect(() => {
        const fetchQuizQuestions = async () => {
            if (fetchInitiatedRef.current || !sessionToken) {
                return;
            }
            fetchInitiatedRef.current = true;
            onLoadingAnimationChange(true);
            setFetchError(null);

            try {
                let url = `https://opentdb.com/api.php?amount=${parameters.numQuestions || 5}&type=multiple`;
                if (parameters.difficulty && parameters.difficulty !== 'any') {
                    url += `&difficulty=${parameters.difficulty}`;
                }
                if (parameters.category && parameters.category !== 'any' && !isNaN(Number(parameters.category))) {
                    url += `&category=${parameters.category}`;
                }
                url += `&token=${sessionToken}`;
                url += `&encode=base64`;

                const response = await fetch(url);
                
                if (response.status === 429) {
                    setFetchError("Rate limit exceeded. Please wait a moment before starting another quiz.");
                    onConcludeExpedition({ finalScore: score.totalScore, wasError: true, totalCorrect: score.correct, totalQuestions: score.total, quizParameters: parameters });
                    return;
                }

                const data = await response.json();

                if (data.response_code === 0 && data.results && data.results.length > 0) {
                    const loadedQuestions = data.results.map(q => {
                        const allAnswers = [atob(q.correct_answer), ...q.incorrect_answers.map(atob)];
                        const shuffledOptions = shuffleArray(allAnswers.map((text, index) => ({ key: `option${index}`, text })));

                        return {
                            id: `q${Math.random()}`,
                            question: atob(q.question),
                            correctAnswers: [atob(q.correct_answer)],
                            options: shuffledOptions,
                        };
                    });
                    setQuestions(loadedQuestions);
                    setCurrentQuestionIndex(0);
                    setScore({ correct: 0, total: 0, totalScore: 0 });
                    resetTimer();
                } else {
                    let errorMessage = "An unexpected error occurred fetching questions.";
                    switch (data.response_code) {
                        case 1:
                            errorMessage = "Not enough questions for your criteria. Try different settings!";
                            break;
                        case 2:
                            errorMessage = "Invalid parameters provided. This could be due to an incorrect category. Please check your quiz settings.";
                            break;
                        case 3:
                            errorMessage = "Session token not found or invalid. This quiz cannot proceed. Please refresh the page.";
                            break;
                        case 4:
                            errorMessage = "All questions exhausted for this token and criteria. Please reset token or try different settings.";
                            resetSessionToken();
                            break;
                    }
                    setFetchError(errorMessage);
                    onConcludeExpedition({ finalScore: score.totalScore, wasError: true, totalCorrect: score.correct, totalQuestions: score.total, quizParameters: parameters });
                }
            } catch (error) {
                setFetchError("Network error: Could not connect to the quest service. Please check your internet connection.");
                onConcludeExpedition({ finalScore: score.totalScore, wasError: true, totalCorrect: score.correct, totalQuestions: score.total, quizParameters: parameters });
            } finally {
                onLoadingAnimationChange(false);
            }
        };

        if (sessionToken && !fetchInitiatedRef.current) {
            fetchQuizQuestions();
        }
    }, [parameters, onConcludeExpedition, onLoadingAnimationChange, sessionToken, resetSessionToken, score.totalScore, shuffleArray, resetTimer]);

    useEffect(() => {
        if (questions.length > 0 && !answeredThisQuestion) {
            resetTimer();
            timerRef.current = setInterval(() => {
                setTimeLeft(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(timerRef.current);
                        handleSubmitAnswer(true);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else if (answeredThisQuestion) {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [currentQuestionIndex, answeredThisQuestion, questions.length, parameters.timePerChallenge, resetTimer]);


    const handleParticipantResponse = (questionId, selectedKey) => {
        if (!answeredThisQuestion) {
            setSelectedAnswer(selectedKey);
        }
    };

    const handleSubmitAnswer = (isTimedOut = false) => {
        if ((!selectedAnswer && !isTimedOut) || answeredThisQuestion) return;

        setAnsweredThisQuestion(true);
        clearInterval(timerRef.current);

        const currentQuestion = questions[currentQuestionIndex];
        const selectedAnswerText = currentQuestion.options.find(opt => opt.key === selectedAnswer)?.text;
        const isCorrect = currentQuestion.correctAnswers.includes(selectedAnswerText);

        let points = 0;
        switch (parameters.difficulty.toLowerCase()) {
            case 'easy': points = 10; break;
            case 'medium': points = 20; break;
            case 'hard': points = 30; break;
            default: points = 10;
        }

        setScore(prev => ({
            correct: prev.correct + (isCorrect ? 1 : 0),
            total: prev.total + 1,
            totalScore: prev.totalScore + (isCorrect ? points : 0)
        }));

        setFeedback(isCorrect ? 'correct' : 'incorrect');
        if (isTimedOut && !isCorrect) {
            setFeedback('timed_out');
        }
    };

    const handleNextQuestion = () => {
        setSelectedAnswer(null);
        setFeedback(null);
        setAnsweredThisQuestion(false);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            onConcludeExpedition({ finalScore: score.totalScore, totalCorrect: score.correct, totalQuestions: questions.length, wasError: false, quizParameters: parameters });
        }
    };

    if (fetchError) {
      return (
          <div className="text-center text-error-red text-xl p-8 rounded-xl shadow-xl frosted-glass-effect max-w-2xl w-full animate-fade-in">
              <p className="mb-4 font-merriweather">{fetchError}</p>
              <button
                  onClick={() => onConcludeExpedition({ finalScore: score.totalScore, wasError: true, totalCorrect: score.correct, totalQuestions: score.total, quizParameters: parameters })}
                  className="btn w-full md:w-auto"
                  data-interactive="true"
              >
                  Back to Quest Setup
              </button>
          </div>
      );
    }

    if (isLoading && questions.length === 0) {
        return (
            <div className="text-center text-body-color text-2xl p-8 rounded-xl shadow-xl frosted-glass-effect max-w-2xl w-full animate-fade-in">
                Loading challenges...
            </div>
        );
    }
    
    if (!isLoading && questions.length === 0 && fetchInitiatedRef.current) {
        return (
            <div className="text-center text-body-color text-2xl p-8 rounded-xl shadow-xl frosted-glass-effect max-w-2xl w-full animate-fade-in">
                No challenges found for your criteria. Please return to setup and try different selections.
                <button
                    onClick={() => onConcludeExpedition({ finalScore: score.totalScore, wasError: true, totalCorrect: score.correct, totalQuestions: score.total, quizParameters: parameters })}
                    className="btn w-full md:w-auto"
                    data-interactive="true"
                >
                    Back to Quest Setup
                </button>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="p-6 md:p-8 rounded-xl shadow-xl frosted-glass-effect max-w-3xl w-11/12 md:w-full animate-fade-in">
            <div className="flex justify-between items-center text-body-color text-lg md:text-xl mb-4">
                <span className="font-semibold">Score: <span className="font-bold text-heading-color ml-1">{score.totalScore}</span></span>
                <span className="font-semibold">Correct: <span className="font-bold text-heading-color ml-1">{score.correct}</span>/<span className="font-bold text-heading-color">{questions.length}</span></span>
                <span className="font-semibold">Time: <span className={`font-bold ml-1 ${timeLeft <= 5 && !answeredThisQuestion ? 'text-error-red animate-pulse-subtle' : 'text-heading-color'}`}>{timeLeft}s</span></span>
            </div>

            {currentQuestion && (
                <>
                    <QuestionDisplay
                        challengeData={currentQuestion}
                        onParticipantResponse={handleParticipantResponse}
                        selectedResponseKey={selectedAnswer}
                        isTimedOut={timeLeft === 0 && !answeredThisQuestion}
                    />

                    {!answeredThisQuestion && (
                        <button
                            onClick={() => handleSubmitAnswer(false)}
                            disabled={!selectedAnswer}
                            className="btn"
                            data-interactive="true"
                        >
                            Submit Answer
                        </button>
                    )}

                    {feedback && (
                        <div className={`mt-6 p-4 rounded-xl text-center font-bold text-base md:text-xl animate-fade-in
                            ${feedback === 'correct' ? 'bg-success-green text-feedback-success' : 'bg-error-red text-feedback-error'}`}
                        >
                            {feedback === 'correct' ? 'Correct! Well done.' : `Incorrect. The correct answer was: "${currentQuestion.correctAnswers.length > 0 ? currentQuestion.correctAnswers[0] : 'N/A'}"`}
                        </div>
                    )}
                    {feedback === 'timed_out' && (
                        <div className="mt-6 p-4 rounded-xl text-center font-bold text-base md:text-xl animate-fade-in bg-error-red text-feedback-error">
                            Time's up! The correct answer was: "{currentQuestion.correctAnswers.length > 0 ? currentQuestion.correctAnswers[0] : 'N/A'}"
                        </div>
                    )}

                    {answeredThisQuestion && (
                        <button
                            onClick={handleNextQuestion}
                            className="btn mt-6 w-full md:w-auto"
                            data-interactive="true"
                        >
                            {currentQuestionIndex < questions.length - 1 ? 'Next Challenge' : 'Conclude Quest'}
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default QuizGame;