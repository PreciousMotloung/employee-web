import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,MatInput,MatTableModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'email', 'salary'];
  dataSource = new MatTableDataSource<Employee>()

  employees:Employee[] =[];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.fetchAllEmployees().subscribe((data)=>{
      this.employees = data;
      this.dataSource = new MatTableDataSource<Employee>(data);
    })
  }

}
