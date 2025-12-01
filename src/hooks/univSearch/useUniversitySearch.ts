'use client';

import { useEffect, useState } from 'react';

export interface University {
  id: number;
  name: string;
}

export function useUniversitySearch() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [filtered, setFiltered] = useState<University[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const load = async () => {
      const res = await fetch('/data/university_names.json');
      const json = await res.json();
      setUniversities(json);
      setFiltered(json);
    };
    load();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setFiltered(universities);
      return;
    }

    const lower = query.toLowerCase();

    setFiltered(universities.filter((u) => u.name.toLowerCase().includes(lower)));
  }, [query, universities]);

  return { query, setQuery, filtered };
}
