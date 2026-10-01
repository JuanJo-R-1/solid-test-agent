export class UserModel {
  public id: string;
  public email: string;
  public gender: string;

  constructor(id: string, email: string, gender: string) {
    this.id = id;
    this.email = email;
    this.gender = gender;
  }

  saveToDatabase(): void {
    throw new Error("Not implemented"); // ❌ Violación LSP
  }
}