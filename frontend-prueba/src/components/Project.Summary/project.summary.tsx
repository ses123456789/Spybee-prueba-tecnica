'use client';

import { useProjectsStore } from '@/store/projects.store';
import { ProgressCircle } from '@/components/Progress.Circle/progress.circle';


export function ProjectSummary() {
  const selectedProject = useProjectsStore(
    (state) => state.selectedProject
  );
  const setSelectedProject = useProjectsStore(
    (state) => state.setSelectedProject
  );

  if (!selectedProject) return null;

  const incidents = selectedProject.incidents;

const countByType = (type: 'incidents' | 'RFI' | 'task') => {
  const total = incidents.filter(i => i.item === type).length;
  const active = incidents.filter(
    i => i.item === type && i.status === 'active'
  ).length;

  return { total, active };
};

const incidentsData = countByType('incidents');
const rfiData = countByType('RFI');
const tasksData = countByType('task');

  

  return (
    <div
      style={{
        width: '320px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '12px',
        background: '#fff',
      }}
    >
      
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px',
        }}
      >
        <h3>Resumen</h3>
        <button onClick={() => setSelectedProject(null)}>✕</button>
      </div>

      
      <p><strong>{selectedProject.title}</strong></p>
      <p>{selectedProject.city}</p>

      <hr />
        <div
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '16px',
  }}
>
  {[
    { label: 'Incidencias', data: incidentsData },
    { label: 'RFI', data: rfiData },
    { label: 'Tareas', data: tasksData },
  ].map(({ label, data }) => (
    <div
      key={label}
      style={{
        textAlign: 'center',
        flex: 1,
      }}
    >
      <p style={{ fontWeight: 'bold' }}>{label}</p>
      <p>{data.total}</p>
      <p style={{ fontSize: '12px', color: '#666' }}>
        Total abiertas
      </p>
      <ProgressCircle
        value={data.active}
        total={data.total}
      />
    </div>
  ))}
</div>

      
      <h4>Próximos a vencer</h4>

      {selectedProject.incidents.length === 0 && (
        <p>No hay ítems</p>
      )}

      {selectedProject.incidents.map((incident) => (
        <div
          key={incident._id}
          style={{
            marginBottom: '10px',
            paddingBottom: '8px',
            borderBottom: '1px solid #eee',
          }}
        >
          <p>
            <strong>
              {incident.item === 'incidents' && 'Incidencia'}
              {incident.item === 'RFI' && 'RFI'}
              {incident.item === 'task' && 'Tarea'}
            </strong>
          </p>

          <p style={{ fontSize: '13px' }}>
            {incident.description}
          </p>

          <p style={{ fontSize: '12px', color: '#666' }}>
            Fecha límite:{' '}
            {new Date(incident.limitDate).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
