'use client';

import { useProjectsStore } from '@/store/projects.store';
import { SortBy } from '@/store/projects.store';

export function SortSelect() {
  const sortBy = useProjectsStore((state) => state.sortBy);
  const setSortBy = useProjectsStore((state) => state.setSortBy);

  const sortOrder = useProjectsStore((state) => state.sortOrder);
  const toggleSortOrder = useProjectsStore((state) => state.toggleSortOrder);

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <select
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value as SortBy)}
  style={{
    padding: '8px',
    height: '40px',
  }}
>

        <option value="none">Sin ordenar</option>
        <option value="alphabetical">Orden alfabético</option>
        <option value="incidents">Cantidad de incidencias</option>
        <option value="rfi">Cantidad de RFI</option>
        <option value="tasks">Cantidad de tareas</option>
      </select>

      {sortBy !== 'none' && (
      <button
         onClick={toggleSortOrder}
         style={{
         padding: '8px 12px',
         height: '40px',
          }}
       title="Cambiar orden"
        >

          {sortOrder === 'asc' ? 'A → Z / ↑' : 'Z → A / ↓'}
        </button>
      )}
    </div>
  );
}
