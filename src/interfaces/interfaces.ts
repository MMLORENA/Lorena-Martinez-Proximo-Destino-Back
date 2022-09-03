export interface UserRegister {
  name: string;
  firstName: string;
  secondName?: string;
  userName: string;
  password: string;
  repeatedPassword: string;
}

export interface UserLogin {
  id: string;
  userName: string;
  password: string;
  destinations?: [{}];
}
export interface CustomJwtPayload {
  id: string;
  userName: string;
}
