'use client';

import { Project } from '@/types/projects';
import { useProjectsStore } from '@/store/projects.store';

interface Props {
  projects: Project[];
}

export function ProjectTable({ projects }: Props) {
  const setSelectedProject = useProjectsStore(
    (state) => state.setSelectedProject
  );

  return (
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
      }}
    >
      <thead>
        <tr>
          <th>Nombre del Proyecto</th>
          <th>Ciudad</th>
          <th>Dirección</th>
          <th>Estado</th>
          <th>Plan</th>
          <th>Equipo</th>
          <th>Items</th>
        </tr>
      </thead>

      <tbody>
        {projects.map((project) => (
          <tr
            key={project._id}
            onClick={() => setSelectedProject(project)}
            style={{ cursor: 'pointer' }}
          >
            <td>
  <div style={{ fontWeight: 600 }}>{project.title}</div>
  <div style={{ fontSize: '12px', color: '#777' }}>
    24 Nov 2023 • 24 Nov 2023
  </div>
</td>

            <td>{project.city}</td>
            <td>{project.address}</td>
            <td>
  <span
    style={{
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      backgroundColor:
        project.status === 'active' ? '#22c55e' : '#9ca3af',
      color: 'white',
    }}
  >
    {project.status}
  </span>
</td>

            <td>
  <span
    style={{
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      backgroundColor:
        project.projectPlanData.plan === 'small'
          ? '#f59e0b'
          : '#6b7280',
      color: 'white',
    }}
  >
    {project.projectPlanData.plan}
  </span>
</td>
{/* Equipo */}
<td>
  <div style={{ display: 'flex', gap: '4px' }}>
    {project.users.slice(0, 5).map((user, index) => (
      <div
        key={index}
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          backgroundColor: '#facc15',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 600,
        }}
      >
        {user.name[0]}
        {user.lastName[0]}
      </div>
    ))}
  </div>
</td>
{/* Items  por vencer */}
<td>
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      maxWidth: '220px',
      fontSize: '13px',
      textAlign: 'center',
    }}
  >
    <div>
      <div style={{ fontWeight: 600 }}>
        {project.incidents.length}
      </div>
      <div style={{ color: '#6b7280', fontSize: '12px' }}>
        Incidencias
      </div>
    </div>

    <div>
      <div style={{ fontWeight: 600 }}>
        {project.incidents.length}
      </div>
      <div style={{ color: '#6b7280', fontSize: '12px' }}>
        RFI
      </div>
    </div>

    <div>
      <div style={{ fontWeight: 600 }}>
        {project.incidents.length}
      </div>
      <div style={{ color: '#6b7280', fontSize: '12px' }}>
        Tareas
      </div>
    </div>
  </div>
</td>



          </tr>
        ))}
      </tbody>
    </table>
  );
}
