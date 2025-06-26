import React, { useState, useEffect, useCallback } from 'react';

import Pattern from './components/Pattern';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import ThemeSelector from './components/ThemeSelector';
import QuizPhase from './components/QuizPhase';
import QuizGame from './components/QuizGame';
import QuizResults from './components/QuizResults';
import Leaderboard from './components/Leaderboard';

function App() {
  const [currentQuizPhase, setCurrentQuizPhase] = useState('briefing');
  const [quizParameters, setQuizParameters] = useState(null);
  const [isLoadingAnimationVisible, setIsLoadingAnimationVisible] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('theme-emerald');
  const [sessionToken, setSessionToken] = useState(null);
  const [sessionTokenError, setSessionTokenError] = useState(null);
  const [isFetchingToken, setIsFetchingToken] = useState(false);
  const [isTokenReady, setIsTokenReady] = useState(false);
  const [quizFinalScore, setQuizFinalScore] = useState(0);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  const [totalQuestionsAttempted, setTotalQuestionsAttempted] = useState(0);

  useEffect(() => {
    document.body.className = currentTheme;
  }, [currentTheme]);

  useEffect(() => {
    const fetchToken = async () => {
      if (isFetchingToken || sessionToken) return;
      setIsFetchingToken(true);
      setSessionTokenError(null);
      try {
        const response = await fetch('https://opentdb.com/api_token.php?command=request');
        const data = await response.json();
        if (data.response_code === 0) {
          setSessionToken(data.token);
          setIsTokenReady(true);
        } else {
          setSessionTokenError(`Failed to acquire a quiz token: ${data.response_message}. Please refresh.`);
        }
      } catch (error) {
        setSessionTokenError("Network error: Could not connect to the quiz service. Check your connection.");
      } finally {
        setIsFetchingToken(false);
      }
    };

    if (!sessionToken && !isFetchingToken) {
      fetchToken();
    }
  }, [sessionToken, isFetchingToken]);

  const resetSessionToken = async () => {
    if (!sessionToken) return false;
    setIsFetchingToken(true);
    setSessionTokenError(null);
    try {
      const response = await fetch(`https://opentdb.com/api_token.php?command=reset&token=${sessionToken}`);
      const data = await response.json();
      if (data.response_code === 0) {
        setSessionToken(data.token);
        setIsTokenReady(true);
        return true;
      } else {
        setSessionTokenError(`Failed to reset quiz token: ${data.response_message}.`);
        return false;
      }
    } catch (error) {
      setSessionTokenError("Network error: Could not reset quiz token.");
      return false;
    } finally {
      setIsFetchingToken(false);
    }
  };

  const startExpedition = useCallback((params) => {
    setQuizParameters(params);
    setCurrentQuizPhase('game');
  }, []);

  const saveScoreToLocalStorage = useCallback(({ score, totalCorrect, totalQuestions, difficulty, category, numQuestions, timePerChallenge }) => {
    const existingScores = JSON.parse(localStorage.getItem('quizLeaderboard')) || [];
    const newScoreEntry = {
      id: Date.now(),
      score: score,
      totalCorrect: totalCorrect,
      totalQuestions: totalQuestions,
      difficulty: difficulty,
      category: category,
      numQuestions: numQuestions,
      timePerChallenge: timePerChallenge,
      timestamp: new Date().toISOString(),
    };
    const updatedScores = [...existingScores, newScoreEntry];
    localStorage.setItem('quizLeaderboard', JSON.stringify(updatedScores));
  }, []);

  const concludeExpedition = useCallback(async ({ finalScore, totalCorrect, totalQuestions, wasError, quizParameters: paramsUsed }) => {
    setQuizParameters(paramsUsed);
    setQuizFinalScore(finalScore);
    setTotalCorrectAnswers(totalCorrect);
    setTotalQuestionsAttempted(totalQuestions);

    if (!wasError) {
      saveScoreToLocalStorage({
        score: finalScore,
        totalCorrect: totalCorrect,
        totalQuestions: totalQuestions,
        difficulty: paramsUsed.difficulty,
        category: paramsUsed.category,
        numQuestions: paramsUsed.numQuestions,
        timePerChallenge: paramsUsed.timePerChallenge,
      });
      setCurrentQuizPhase('results');
    } else {
      setCurrentQuizPhase('briefing');
      if (sessionTokenError || !sessionToken) {
        setSessionToken(null);
        setIsTokenReady(false);
      }
    }
  }, [saveScoreToLocalStorage, sessionTokenError, sessionToken]);

  const startNewQuiz = useCallback(() => {
    setQuizParameters(null);
    setQuizFinalScore(0);
    setTotalCorrectAnswers(0);
    setTotalQuestionsAttempted(0);
    setCurrentQuizPhase('briefing');
    resetSessionToken();
  }, [resetSessionToken]);

  const navigateToLeaderboard = useCallback(() => {
    setCurrentQuizPhase('leaderboard');
  }, []);

  const returnToSettings = useCallback(() => {
    setCurrentQuizPhase('briefing');
  }, []);

  return (
    <div className={`app-container`}>
      <CustomCursor />
      <Pattern />

      <header className="w-full bg-secondary-color text-body-color py-4 shadow-md z-10 relative">
        <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
          <div className="flex items-center space-x-6 moding">
            <h1 className="text-xl md:text-4xl font-heading text-heading-color">CogniQuiz</h1>
            <a href="https://github.com/Dhruvdesai407/CogniQuiz" target="_blank" rel="noopener noreferrer" className="text-heading-color hover:text-yellow-300 transition-colors duration-200 p-2 rounded-full border border-heading-color hover:border-yellow-300 transform hover:scale-110 active:scale-95 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8"/>
              </svg>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-8 flex items-center justify-center z-10 relative">
        {isLoadingAnimationVisible && (
          <div className="absolute inset-0 flex items-center justify-center loader-overlay z-50">
            <Loader />
          </div>
        )}

        {sessionTokenError && (
          <div className="text-center text-error-red text-xl p-8 rounded-xl shadow-xl frosted-glass-effect max-w-2xl w-11/12 md:w-full animate-fade-in">
              <p className="mb-4">{sessionTokenError}</p>
              <button
                  onClick={resetSessionToken}
                  className="btn w-full md:w-auto"
                  data-interactive="true"
              >
                  Try Again
              </button>
          </div>
        )}

        {!isLoadingAnimationVisible && !sessionTokenError && currentQuizPhase === 'briefing' && (
          <QuizPhase
            onBeginExpedition={startExpedition}
            onLoadingAnimationChange={setIsLoadingAnimationVisible}
            onViewLeaderboard={navigateToLeaderboard}
          />
        )}

        {currentQuizPhase === 'game' && quizParameters && sessionToken && isTokenReady && !sessionTokenError && (
          <QuizGame
            parameters={quizParameters}
            onConcludeExpedition={concludeExpedition}
            onLoadingAnimationChange={setIsLoadingAnimationVisible}
            sessionToken={sessionToken}
            resetSessionToken={resetSessionToken}
            isLoading={isLoadingAnimationVisible}
          />
        )}
        {currentQuizPhase === 'game' && (!sessionToken || !isTokenReady) && !isLoadingAnimationVisible && !sessionTokenError && (
            <div className="text-center text-body-color text-xl p-8 rounded-xl shadow-xl frosted-glass-effect max-w-2xl w-11/12 md:w-full animate-fade-in">
                Preparing your quiz token...
            </div>
        )}
        
        {currentQuizPhase === 'results' && (
            <QuizResults
                finalScore={quizFinalScore}
                totalCorrect={totalCorrectAnswers}
                totalQuestions={totalQuestionsAttempted}
                onStartNewQuiz={startNewQuiz}
                quizParameters={quizParameters}
            />
        )}

        {currentQuizPhase === 'leaderboard' && (
          <Leaderboard
            onReturnToSettings={returnToSettings}
          />
        )}
      </main>

      <footer className="w-full bg-secondary-color text-body-color py-4 text-center text-sm shadow-inner mt-auto z-10 relative">
        <div className="container mx-auto px-4 md:px-8 flex justify-around items-center flex-wrap">
          <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
          <span className="ml-4 md:ml-0 mt-2 md:mt-0">
            {`© ${new Date().getFullYear()} CogniQuiz. Unveil the Depths of Knowledge.`}
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;