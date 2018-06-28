import { Document, DocumentQuery } from "mongoose";

export default interface IController<T> {
  save(object: T): Promise<Document>;
  findAll(): DocumentQuery<Document[], Document>;
}