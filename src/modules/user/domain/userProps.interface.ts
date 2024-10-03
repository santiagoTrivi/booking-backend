import { AuthProps } from "../../auth/domain/authProps.interface";

export interface UserProps extends AuthProps {
  phone: string;
  email: string;
  profilePicture: string;
  balance: number;
  premium: boolean;
  isActive: boolean;
  isPublic: boolean;
  verificado: boolean;
  name: string;
  description: string;
  followersCount: number;
  followingsCount: number;
  role: any[];
  bankNumber: string;
}
