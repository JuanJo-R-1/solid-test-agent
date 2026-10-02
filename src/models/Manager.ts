import { writeFileSync } from 'fs';

export interface Employee {
    id: number;
    name: string;
    salary: number;
}

export class Manager {
    private employees: Employee[] = [];
    private reportPath: string = './reports/employees.json';
    private currentDate: Date = new Date();

    constructor(initialEmployees: Employee[] = []) {
        this.employees = initialEmployees;
    }

    addEmployee(emp: Employee): void {
        if (this.employees.find(e => e.id === emp.id)) {
            throw new Error('Employee with this id already exists');
        }

        this.employees.push(emp);
        this.saveReport(); // Guardamos cada vez que agregamos
    }

    removeEmployee(id: number): boolean {
        const index = this.employees.findIndex(e => e.id === id);

        if (index === -1) return false;

        this.employees.splice(index, 1);
        this.saveReport(); // Guardamos cada vez que eliminamos

        return true;
    }

    getEmployee(id: number): Employee | undefined {
        return this.employees.find(e => e.id === id);
    }

    getReport(): string {
        return JSON.stringify(
            {
                generatedAt: this.currentDate,
                data: this.employees
            },
            null,
            2
        );
    }

    private saveReport(): void {
        writeFileSync(
            this.reportPath,
            this.getReport(),
            'utf-8'
        );
    }
}

// Clase concreta que hereda de Manager
// (violación de LSP si se usa donde se espera Manager)
export class HRManager extends Manager {
    private departmentBudget: number;

    constructor(
        initial: Employee[] = [],
        budget: number
    ) {
        super(initial);
        this.departmentBudget = budget;
    }

    addEmployee(emp: Employee): void {
        if (this.departmentBudget <= 0) {
            throw new Error('No budget available to add employee');
        }

        super.addEmployee(emp);
        this.departmentBudget -= emp.salary;
        // Asume que Employee tiene salary
    }
}