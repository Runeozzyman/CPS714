export interface User {
  id?: string; // Optional because it might not be available on the frontend
  fullname: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  loyaltypoints: number; // Optional because it might not be provided during registration
  company: string;
  isVerified?: boolean; // Optional because it might not be relevant in all contexts
  verifyToken?: string; // Optional because it might not be relevant in all contexts
  verifyTokenExpire?: Date; // Optional because it might not be relevant in all contexts
}