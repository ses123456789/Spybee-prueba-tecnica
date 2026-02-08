export interface Incident {
  _id: string;
  status: string;      // ⬅️ string (NO union)
  item: string;        // ⬅️ string (NO union)
  description: string;
  owner: string;
  tag: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  limitDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  name: string;
  lastName: string;
}

export interface Project {
  _id: string;
  title: string;

  status: string;
  img: string;
  lastVisit: string;

  city: string;
  address: string;

  position: {
    lat: number;
    lng: number;
  };

  users: User[];

  projectPlanData: {
    plan: string; // ⬅️ string
  };

  incidents: Incident[];
}
