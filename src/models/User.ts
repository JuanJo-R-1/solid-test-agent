export class UserModel {
  public id: string;
  public email: string;
  public gender: string;

  constructor(id: string, email: string, gender: string) {
    this.id = id;
    this.email = email;
    this.gender = gender;
  }

  // ❌ SRP: UserModel maneja datos y también persistencia
  saveToDatabase(): void {
    console.log(`Guardando usuario ${this.email} en la base de datos...`);

    // ❌ OCP/DIP: está acoplado directamente a una implementación
    // concreta de base de datos.
    const database = new MySQLDatabase();

    database.connect();
    database.insert(
      "users",
      this.id,
      this.email,
      this.gender
    );
  }

  // ❌ También mezcla lógica de negocio/presentación
  sendWelcomeEmail(): void {
    console.log(`Enviando email de bienvenida a ${this.email}`);
  }

  // ❌ La clase conoce detalles de infraestructura
  exportToJSON(): string {
    return JSON.stringify({
      id: this.id,
      email: this.email,
      gender: this.gender
    });
  }
}

class MySQLDatabase {
  connect(): void {
    console.log("Conectando a MySQL...");
  }

  insert(
    table: string,
    id: string,
    email: string,
    gender: string
  ): void {
    console.log(
      `INSERT INTO ${table} VALUES (${id}, ${email}, ${gender})`
    );
  }
}