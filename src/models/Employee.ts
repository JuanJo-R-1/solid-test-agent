import { writeFileSync } from 'fs';
import mysql from 'mysql2';

export class Employee {
    public id: number;
    public name: string;
    public salary: number;
    public position: string;

    constructor(
        id: number,
        name: string,
        salary: number,
        position: string
    ) {
        this.id = id;
        this.name = name;
        this.salary = salary;
        this.position = position;
    }

    // Calcula el salario anual
    calculateAnnualSalary(): number {
        return this.salary * 12;
    }

    // Genera un reporte del empleado
    generateReport(): string {
        return `
        Employee Report
        ----------------
        ID: ${this.id}
        Name: ${this.name}
        Position: ${this.position}
        Salary: $${this.salary}
        Annual Salary: $${this.calculateAnnualSalary()}
        `;
    }

    // Guarda el reporte directamente en un archivo
    saveReport(): void {
        const report = this.generateReport();

        writeFileSync(
            `./reports/employee_${this.id}.txt`,
            report,
            'utf-8'
        );
    }

    // Guarda el empleado directamente en MySQL
    saveToDatabase(): void {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1234',
            database: 'company'
        });

        connection.connect();

        const query = `
            INSERT INTO employees (id, name, salary, position)
            VALUES (?, ?, ?, ?)
        `;

        connection.query(query, [
            this.id,
            this.name,
            this.salary,
            this.position
        ]);

        connection.end();
    }

    // Cambia el comportamiento dependiendo del cargo
    calculateBonus(): number {
        if (this.position === 'Manager') {
            return this.salary * 0.20;
        }

        if (this.position === 'Developer') {
            return this.salary * 0.15;
        }

        if (this.position === 'Designer') {
            return this.salary * 0.10;
        }

        return this.salary * 0.05;
    }
}