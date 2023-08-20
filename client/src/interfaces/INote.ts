import { IUser } from "./IUser";

export interface INote {
  id: number;
  text: string;
  date: Date;
  user: IUser;
}
