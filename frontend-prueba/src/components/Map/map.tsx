'use client';

import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { useProjectsStore } from '@/store/projects.store';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export function Map() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const projects = useProjectsStore((state) => state.projects);
  const selectedProject = useProjectsStore(
    (state) => state.selectedProject
  );

  // inicializar le mapa
  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [0, 0],
      zoom: 2,
    });
  }, []);

  // marcadores
  useEffect(() => {
    if (!mapRef.current) return;

    projects.forEach((project) => {
      new mapboxgl.Marker()
        .setLngLat([project.position.lng, project.position.lat])
        .addTo(mapRef.current!);
    });
  }, [projects]);

  // mapa visible al seleccionar el proyecto
  useEffect(() => {
    if (!mapRef.current || !selectedProject) return;

    mapRef.current.flyTo({
      center: [
        selectedProject.position.lng,
        selectedProject.position.lat,
      ],
      zoom: 12,
    });
  }, [selectedProject]);
return (
  <div
    ref={mapContainerRef}
    style={{
      width: '100%',
      height: '500px',
      minHeight: '500px',
      marginTop: '30px',
    }}
  />
);

}
