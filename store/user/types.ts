export type Role = {
  name: string;
};

export interface UserData {
  id?: number | string;
  fullname: string;
  phone: string;
  email: string;
  roles: Role[];
}
