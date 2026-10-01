export class UserModel {
  public id: string;
  public email: string;
  public gender: string;

  constructor(id: string, email: string, gender: string) {
    this.id = id;
    this.email = email;
    this.gender = gender;
  }

  // ❌ SRP: la clase se encarga de guardar usuarios
  // ❌ DIP: depende directamente de MySQL
  saveToDatabase(): void {
    const db = new MySQLDatabase();

    db.connect();
    db.execute(
      `INSERT INTO users VALUES ('${this.id}', '${this.email}', '${this.gender}')`
    );
  }

  // ❌ SRP: también se encarga de enviar correos
  sendEmail(): void {
    console.log(`Enviando correo a ${this.email}`);
  }

  // ❌ SRP: también genera reportes
  generateReport(): string {
    return `
      ID: ${this.id}
      Email: ${this.email}
      Gender: ${this.gender}
    `;
  }

  // ❌ OCP: si cambia el formato, hay que modificar esta clase
  exportData(format: string): string {
    if (format === "json") {
      return JSON.stringify(this);
    }

    if (format === "xml") {
      return `<user>
        <id>${this.id}</id>
        <email>${this.email}</email>
        <gender>${this.gender}</gender>
      </user>`;
    }

    throw new Error("Formato no soportado");
  }
}

// ❌ DIP: implementación concreta
class MySQLDatabase {
  connect(): void {
    console.log("Conectando a MySQL...");
  }

  execute(query: string): void {
    console.log(`Ejecutando: ${query}`);
  }
}


// ❌ ISP: interfaz demasiado grande
interface UserOperations {
  save(): void;
  delete(): void;
  sendEmail(): void;
  generateReport(): string;
  exportToJSON(): string;
}


// ❌ LSP: AdminUser hereda de UserModel,
// pero cambia el comportamiento esperado.
export class AdminUser extends UserModel {

  delete(): void {
    throw new Error("Un administrador no puede eliminarse");
  }

  override saveToDatabase(): void {
    throw new Error("Los administradores no se guardan de esta manera");
  }
}
```
