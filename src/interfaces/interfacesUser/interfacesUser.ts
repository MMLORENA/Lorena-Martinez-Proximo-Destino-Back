export interface UserRegister {
  name: string;
  firstName: string;
  secondName?: string;
  userName: string;
  password: string;
  repeatedPassword: string;
}

export interface UserLogin {
  userName: string;
  password: string;
}

export interface UserDB extends UserLogin {
  id: string;
  destinations?: [{}];
}

export interface NewUser {
  name: string;
  firstName: string;
  userName: string;
  password: string;
}
