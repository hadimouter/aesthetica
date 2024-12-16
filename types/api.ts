export interface DashboardResponse {
    stats: {
      appointmentsCount: number;
      nextAppointment: Appointment | null;
      documentsCount: number;
      lastDocument: Document | null;
      medicalRecordsCount: number;
      recentActivities: number;
    };
    appointments: Appointment[];
    documents: Document[];
  }
  
  export interface Appointment {
    _id: string;
    userId: string;
    date: string;
    time: string;
    type: string;
    doctor: string;
    location: string;
    status: 'confirmed' | 'pending';
    createdAt: string;
  }
  
  export interface Document {
    _id: string;
    userId: string;
    name: string;
    type: string;
    url: string;
    size: number;
    createdAt: string;
  }