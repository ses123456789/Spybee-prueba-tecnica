'use client';

import { useProjectsStore } from '@/store/projects.store';

export function SearchInput() {
  const search = useProjectsStore((state) => state.search);
  const setSearch = useProjectsStore((state) => state.setSearch);

  return (
    <input
      type="text"
      placeholder="Buscar proyecto..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{
        padding: '8px',
        width: '300px',
        height: '40px',
      }}

    />
  );
}
