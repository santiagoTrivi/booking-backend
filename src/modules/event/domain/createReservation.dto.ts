export class CreateReservationDto {
  constructor(public created_by: string, public setDate: Date) {}

  static create(setDate: Date, created_by: string): CreateReservationDto {
    return new CreateReservationDto(created_by, setDate);
  }
}
