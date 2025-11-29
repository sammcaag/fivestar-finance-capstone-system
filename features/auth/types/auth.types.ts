import { ReactNode } from "react";

export interface IRequestUser {
  // for token decoded
  user: {
    id: number;
    email: string;
    role: string;
    branchId: number;
    status: string;
  };
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
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  dialogMessage: string | null;
  dialogVariant: "success" | "error" | "info" | "warning";
  dialogTimestamp: number; // ✅ Add timestamp to trigger dialog on same message
}

export type AuthFormValues = {
  email: string;
  password: string;
};
