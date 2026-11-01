import { useEffect, useState } from 'react';
import axios from 'axios';
import type { SyntheticEvent } from 'react';
import type { DiaryEntry, Visibility, Weather } from './types';
import diaryService from './diaryService';

const App = () => {
  const weatherOptions: Weather[] = ['sunny', 'rainy', 'cloudy', 'stormy', 'windy'];
  const visibilityOptions: Visibility[] = ['great', 'good', 'ok', 'poor'];

  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>('sunny');
  const [visibility, setVisibility] = useState<Visibility>('great');
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    diaryService.getAll().then(setDiaries).catch((error: unknown) => {
      console.error(error);
    });
  }, []);

  const addDiary = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    try {
      const entry = await diaryService.create({ date, weather, visibility, comment });
      setDiaries(previous => previous.concat(entry));
      setDate('');
      setComment('');
    } catch (error: unknown) {
      if (axios.isAxiosError<unknown>(error)) {
        const data = error.response?.data;
        if (typeof data === 'string') {
          setErrorMessage(data);
        } else if (typeof data === 'object' && data !== null && 'error' in data) {
          if (typeof data.error === 'string') {
            setErrorMessage(data.error);
          } else if (Array.isArray(data.error)) {
            const issues: unknown[] = data.error;
            setErrorMessage(issues.map(issue => {
              if (typeof issue === 'object' && issue !== null && 'message' in issue && typeof issue.message === 'string') {
                const path = 'path' in issue && Array.isArray(issue.path) ? issue.path.join('.') : '';
                return path ? `${path}: ${issue.message}` : issue.message;
              }
              return 'Invalid diary entry';
            }).join('; '));
          } else {
            setErrorMessage(error.message);
          }
        } else {
          setErrorMessage(error.message);
        }
      } else {
        setErrorMessage(error instanceof Error ? error.message : 'Failed to create diary entry');
      }
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {errorMessage && <p role="alert" style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={addDiary}>
        <div>
          <label>Date <input type="date" value={date} onChange={event => setDate(event.target.value)} /></label>
        </div>
        <fieldset>
          <legend>Visibility</legend>
          {visibilityOptions.map(option => (
            <label key={option}>
              <input
                type="radio"
                name="visibility"
                value={option}
                checked={visibility === option}
                onChange={() => setVisibility(option)}
              />
              {option}
            </label>
          ))}
        </fieldset>
        <fieldset>
          <legend>Weather</legend>
          {weatherOptions.map(option => (
            <label key={option}>
              <input
                type="radio"
                name="weather"
                value={option}
                checked={weather === option}
                onChange={() => setWeather(option)}
              />
              {option}
            </label>
          ))}
        </fieldset>
        <div>
          <label>Comment <input value={comment} onChange={event => setComment(event.target.value)} /></label>
        </div>
        <button type="submit">Add</button>
      </form>
      <h1>Diary entries</h1>
      {diaries.map(entry => (
        <div key={entry.id}>
          <h3>{entry.date}</h3>
          <p>Visibility: {entry.visibility}<br />Weather: {entry.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
