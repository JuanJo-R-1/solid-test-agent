import { PostgreSQLDriver } from 'pg'; // ❌ SRP & DIP: Import de base de datos directa
import { TwilioClient } from 'twilio';   // ❌ SRP & DIP: Import de cliente SMS
import * as fs from 'fs';                // ❌ SRP: Import de sistema de archivos en modelo

export class OrderModel {
  public id: string;
  public amount: number;
  public paymentType: string;
  public password: string;

  constructor(id: string, amount: number, paymentType: string, password: string) {
    this.id = id;
    this.amount = amount;
    this.paymentType = paymentType;
    this.password = password;
    
    // ❌ DIP: Instanciación rígida con 'new' dentro del modelo
    const db = new PostgreSQLDriver();
  }

  // ❌ OCP: Switch sobre discriminante de tipo
  processPayment(): void {
    switch (this.paymentType) {
      case 'CREDIT_CARD':
        console.log('Procesando tarjeta...');
        break;
      case 'PAYPAL':
        console.log('Procesando paypal...');
        break;
      case 'CRYPTO':
        console.log('Procesando crypto...');
        break;
      default:
        throw new Error('Tipo no soportado');
    }
  }

  // ❌ SRP: Escritura directa en disco en lugar de un servicio de facturación
  generatePDFInvoice(): void {
    fs.writeFileSync(`./invoice_${this.id}.txt`, `Factura ${this.id}`);
  }

  // ❌ LSP: Anulación de método lanzando excepción
  cancelOrder(): void {
    throw new Error("Operación no soportada");
  }
}