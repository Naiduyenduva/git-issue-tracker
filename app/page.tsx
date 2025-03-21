"use client"
import { useEffect } from 'react';
import Landing from './components/Landing';
import { checkForNewIssues } from './api/issues';

function App() {
  useEffect(() => {
    const intervalId = setInterval(async () => {
      await checkForNewIssues();
    }, 360000);
  
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <>
    <Landing />
    </>
  );
}

export default App;