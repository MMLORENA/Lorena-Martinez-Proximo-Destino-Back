export interface UserRegister {
  name: string;
  firstName: string;
  secondName?: string;
  userName: string;
  password: string;
  repeatedPassword: string;
  destinations?: [{}];
}
