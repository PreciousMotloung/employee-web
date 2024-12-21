import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    changeDetection:ChangeDetectionStrategy.OnPush,
    selector: 'app-employee-form',
    imports: [MatDialogModule ,MatDialogTitle,MatDialogActions,MatDialogContent,MatFormFieldModule,MatInputModule,MatIconButton,MatIconModule,MatButtonModule,
        CommonModule,FormsModule
    ],
    templateUrl: './employee-form.component.html',
    styleUrl: './employee-form.component.css'
})

export class EmployeeFormComponent {

    readonly dialogRef = inject(MatDialogRef<EmployeeFormComponent>)
    data=inject<Employee>(MAT_DIALOG_DATA);

    constructor(private employeeService:EmployeeService)
    {

    }

    addOrEditEmployee(employee:Employee)
    {
        if(employee.id!==0)
        {
            this.employeeService.updateEmployee(employee).subscribe({
                next:(data) =>
                {
                    console.log("Employee updated successfully")
                },
                error:err =>{
                    console.log(err)              
                },
            })
        }else
        {
            this.employeeService.createEmployee(employee).subscribe({
                next:(data) =>
                {
                    console.log("Employee created successfully")
                },
                error:err =>{
                    console.log(err) 
                    console.log("Employee created unsuccessfully")             
                },
            })
        }
                 
    }

}
