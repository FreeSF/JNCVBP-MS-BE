import { Injectable } from "@nestjs/common";
import { CreateSubTypeInput } from "./dto/create-sub-type.input";
import { UpdateSubTypeInput } from "./dto/update-sub-type.input";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SubTypeModel } from "./entities/sub-type.entity";

/**
 * SubTypeService is responsible for creating, retrieving, updating and deleting Sub-types from the database.
 *
 * @export
 * @class SubTypeService
 */
@Injectable()
export class SubTypeService {
  constructor(@InjectModel("SubType") private model: Model<SubTypeModel>) {}

  create(input: CreateSubTypeInput) {
    return this.model.create(input);
  }

  findAll(disabled = false) {
    return this.model.find().where({ disabled }).sort({ code: 1, name: 1 });
  }

  findAllIncludingDisabled() {
    return this.model.find();
  }

  findOne(id: string) {
    return this.model.findById(id).exec();
  }

  update(id: string, updateSubTypeInput: UpdateSubTypeInput) {
    return this.model.findOneAndUpdate({ _id: id }, updateSubTypeInput);
  }

  remove(id: string) {
    return this.model.findOneAndUpdate({ _id: id }, { disabled: true });
  }

  restore(id: string) {
    return this.model.findOneAndUpdate({ _id: id }, { disabled: false });
  }
}
