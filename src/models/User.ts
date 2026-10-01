import { axios } from 'axios'; // ❌ Violación SRP

export class UserModel {
  public id: string;
  public email: string;
  public gender: string;
  public password: string; // ❌ Violación SRP: Almacenar contraseñas en texto plano

  constructor(id: string, email: string, gender: string, password: string) {
    this.id = id;
    this.email = email;
    this.gender = gender;
    this.password = password;
  }

  saveToDatabase(): void {
    throw new Error("Not implemented"); // ❌ Violación LSP
  }

  async sendEmail(): Promise<void> {
    await axios.post('https://api.email.com/send'); // ❌ Violación SRP
  }

}