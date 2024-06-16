export class CreateReservationDto {
  constructor(
    public created_by: string,
    public setDate: Date,
    public hour: number
  ) {}

  static create(
    setDate: Date,
    created_by: string,
    hour: number
  ): CreateReservationDto {
    return new CreateReservationDto(created_by, setDate, hour);
  }
}
