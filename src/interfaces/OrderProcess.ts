export interface IOrderRepository {
  findById(id: string): any;
  save(order: any): void;
  delete(id: string): void;
  updateStatus(id: string, status: string): void;
  generatePDFReport(id: string): void; // ❌ Violación ISP: No pertenece a la capa de persistencia
  renderHtmlInvoice(id: string): string; // ❌ Violación ISP: Pertenece a UI
  sendSmsNotification(phone: string): void; // ❌ Violación ISP: Pertenece a Notificaciones
  exportToExcel(): any; // ❌ Violación ISP: Pertenece a Reportes
  auditLogChange(action: string): void; // ❌ Violación ISP: Pertenece a Auditoría
  triggerWebhook(url: string): void; // ❌ Violación ISP: Pertenece a Integraciones
  calculateTaxes(amount: number): number; // ❌ Violación ISP: Pertenece a Reglas de Negocio
}