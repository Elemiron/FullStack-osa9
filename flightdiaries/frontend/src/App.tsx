import { useEffect, useState } from 'react';
import type { SyntheticEvent } from 'react';
import type { DiaryEntry, Visibility, Weather } from './types';
import diaryService from './diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>('sunny');
  const [visibility, setVisibility] = useState<Visibility>('great');
  const [comment, setComment] = useState('');

  useEffect(() => {
    diaryService.getAll().then(setDiaries).catch((error: unknown) => {
      console.error(error);
    });
  }, []);

  const addDiary = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const entry = await diaryService.create({ date, weather, visibility, comment });
      setDiaries(previous => previous.concat(entry));
      setDate('');
      setComment('');
    } catch (error: unknown) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={addDiary}>
        <div>
          <label>Date <input value={date} onChange={event => setDate(event.target.value)} /></label>
        </div>
        <div>
          <label>Visibility <input value={visibility} onChange={event => setVisibility(event.target.value as Visibility)} /></label>
        </div>
        <div>
          <label>Weather <input value={weather} onChange={event => setWeather(event.target.value as Weather)} /></label>
        </div>
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
