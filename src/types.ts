export interface Project {
  id: string;
  title: string;
  url: string;
  description?: string;
  createdBy: string;
  creatorName: string;
  createdAt: any;
  thumbnail?: string;
}

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}
