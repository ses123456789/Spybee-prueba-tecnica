'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/store/auth.store';
import { useProjectsStore } from '@/store/projects.store';

import { SearchInput } from '@/components/Search.Input/search.input';
import { ProjectTable } from '@/components/Project.Table/project.table';
import { SortSelect } from '@/components/Sort.Select/sort.select';
import { Map } from '@/components/Map/map';
import { ProjectSummary } from '@/components/Project.Summary/project.summary';

import data from '@/data/mock_data.json';
import styles from './page.module.css'

const ITEMS_PER_PAGE = 10;

export default function Home() {
 
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  
  const {
    projects,
    page,
    search,
    sortBy,
    sortOrder,
    setPage,
    selectedProject,
  } = useProjectsStore();

  
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const isAuthenticated = Boolean(user);

  useEffect(() => {
    if (projects.length === 0) {
      useProjectsStore.setState({ projects: data });
    }
  }, [projects.length]);


  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase())
  );


  const sortedProjects =
    sortBy === 'none'
      ? filteredProjects
      : [...filteredProjects].sort((a, b) => {
          let result = 0;

          switch (sortBy) {
            case 'alphabetical':
              result = a.title.localeCompare(b.title);
              break;

            case 'incidents':
              result = b.incidents.length - a.incidents.length;
              break;

            case 'rfi':
              result =
                b.incidents.filter((i) => i.item === 'RFI').length -
                a.incidents.filter((i) => i.item === 'RFI').length;
              break;

            case 'tasks':
              result =
                b.incidents.filter((i) => i.item === 'task').length -
                a.incidents.filter((i) => i.item === 'task').length;
              break;
          }

          return sortOrder === 'asc' ? result : -result;
        });

 
  const start = (page - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  const paginatedProjects = sortedProjects.slice(start, end);
  const totalPages = Math.ceil(sortedProjects.length / ITEMS_PER_PAGE);

  if (!isAuthenticated) return null;

  return (
    <main style={{ padding: '20px' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px',
        }}
      >
        <h1>Mis Proyectos</h1>
        <button onClick={logout}>Cerrar sesión</button>
      </header>

      <div className={styles.filters}>
        <SearchInput />
        <SortSelect />
      </div>

      <div className="table-wrapper">
        <ProjectTable projects={paginatedProjects} />
      </div>

      {selectedProject && (
        <>
          <button
            className="details-button"
            onClick={() => setShowDetails(true)}
          >
            Ver mapa y resumen: {selectedProject.title}
          </button>

          {showDetails && (
            <div className="details-container">
              <button
                className="close-button"
                onClick={() => setShowDetails(false)}
              >
                ✕ Cerrar
              </button>

              <Map />
              <ProjectSummary />
            </div>
          )}
        </>
      )}

      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previa
        </button>

        <span style={{ margin: '0 10px' }}>
          Página {page} de {totalPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Siguiente
        </button>
      </div>
    </main>
  );
}
