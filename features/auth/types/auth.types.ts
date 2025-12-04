import { ReactNode } from "react";

export interface IRequestUser {
  id: string;
  email: string;
  role: string;
  branchId: number;
  status: string;
  name: string;
}

interface Slide {
  image: string;
  title: string;
  description: string;
}

export interface SlideShowProps {
  slides: Slide[];
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
}

export interface ProtectedRouteProps {
  allowedRoles: string[]; // Roles allowed to access this route
  children: ReactNode;
}

export interface AuthContextType {
  user: IRequestUser | null;
  isLoading: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

export type AuthFormValues = {
  email: string;
  password: string;
};
