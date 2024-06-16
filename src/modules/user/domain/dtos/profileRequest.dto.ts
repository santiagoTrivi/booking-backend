import Block from "../../../block/model/block.model";
import { FollowRequestStatus } from "../../../follow/domain/dtos/followRequest.status";
import { followRequestStatus } from "../../../follow/services/followStatus.service";

export class ProfileRequestDto {
  public request_status: FollowRequestStatus;
  public profile: any | null = null;
  public content_blocked: boolean;
  public isPublic: boolean;

  private constructor(
    private readonly follower: string,
    private readonly following: string
  ) {}

  public static async create(
    follower: string,
    following: string,
    isPublicfollowing: boolean
  ): Promise<ProfileRequestDto> {
    const request = await (
      await new ProfileRequestDto(follower, following).isUserBlocked()
    ).getRequestStatus();
    request.isPublic = isPublicfollowing;
    return request;
  }

  private isUserBlocked = async () => {
    const block = await Block.findOne({
      where: { block_by: this.following, block_to: this.follower },
    });
    this.content_blocked = !!block;
    return this;
  };
  private async getRequestStatus() {
    this.request_status = await followRequestStatus(
      this.follower,
      this.following
    );
    return this;
  }
}
