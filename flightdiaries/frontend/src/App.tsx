import { useEffect, useState } from 'react';
import type { DiaryEntry } from './types';
import diaryService from './diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then(setDiaries).catch((error: unknown) => {
      console.error(error);
    });
  }, []);

  return (
    <div>
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
