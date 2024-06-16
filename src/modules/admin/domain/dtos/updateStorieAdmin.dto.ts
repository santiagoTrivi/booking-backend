import { StorieProps } from "../../../storie/domain/storiesProps.interface";

export type UpdateStorieAdmin = Pick<StorieProps, "status" | "isAvailable">;

export class UpdateStorieAdminDto {
  constructor(
    public readonly storieId: string,
    public readonly updateStoriePatial: Partial<UpdateStorieAdmin>
  ) {}
  static create(
    storieId: string,
    updateStoriePatial: Partial<UpdateStorieAdmin>
  ): UpdateStorieAdminDto {
    return new UpdateStorieAdminDto(storieId, updateStoriePatial);
  }
}
