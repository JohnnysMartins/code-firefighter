import UserModel from './UserModel';
import IUser from './IUser';
import { AController } from '../../shared/class/AbstractController';

export default class UserController extends AController<IUser> {

  constructor() {
    super(UserModel);
  }
}