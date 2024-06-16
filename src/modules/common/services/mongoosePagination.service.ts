import { Model, Document, Schema, model, SortOrder } from "mongoose";
import { PaginationOption } from "../domain/paginationOptions.interface";
import { PaginationResult } from "../domain/paginationResult.interface";

export class MongoosePaginationService<T extends Document> {
  constructor(private model: Model<T>) {}

  async paginate(
    query: any,
    paginationOption: PaginationOption,
    populateOption?: any,
    selectOption?: any,
    sortOption?:
      | string
      | {
          [key: string]:
            | SortOrder
            | {
                $meta: any;
              };
        }
      | [string, SortOrder][]
      | null
      | undefined
  ) {
    const page = paginationOption.page || 1;
    const limit = paginationOption.limit || 10;

    const startIndex = (page - 1) * limit;

    const data = await this.model
      .find(query)
      .populate(populateOption)
      .select(selectOption)
      .skip(startIndex)
      .limit(limit)
      .sort(sortOption)
      .exec();

    const totalItems = await this.model.countDocuments(query).exec();
    const totalPages = Math.ceil(totalItems / limit);

    //const {from, until} = paginationDto;
    const paginationResult: PaginationResult<T> = {
      data,
      totalItems,
      totalPages,
      currentPage: page,
      //from,
      //until
    };

    return paginationResult;
  }
}
