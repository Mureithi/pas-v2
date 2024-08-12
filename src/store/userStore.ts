import { create } from 'zustand';

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  secondary_email?: string;
  company?: string;
  website?: string;
  role_id?: number;
  tos_check?: boolean;
  licensee?: boolean;
  onboarding?: boolean;
  monthly_income?: number;
  meeting_url?: string;
  calendarurls?: string[];
  annual_income?: number;
  show_tour?: boolean;
  prospects_notify?: boolean;
  trainings?: any[];
  integrations?: any[];
  module_sets?: any[];
  profile_pic?: string;
  title?: string;
  location?: string;
  time_zone?: string;
  phone_number?: string;
  birthday?: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  status?: string;
  created_at?: string;
  pas_token: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
