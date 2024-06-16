export interface FilterUserQuery {
  search?: string;
}

export class FilterUsersQueryDto {
  static create(object: { [key: string]: any }): FilterUserQuery {
    const { search } = object;

    return {
      search,
    };
  }
}
