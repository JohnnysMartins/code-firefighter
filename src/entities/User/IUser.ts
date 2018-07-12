import { IMongoModel } from "../../shared/interfaces/IMongoModel";

export default interface IUser extends IMongoModel {
  name?: string;
  password?: string;
  role?: string;
  picture?: string;
  permissions?: IUserPermissions[];
}

export interface IUserPermissions {
  permissionName: string;
  hasPermission: boolean;
}