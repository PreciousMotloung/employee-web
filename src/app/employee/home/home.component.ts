import { AfterViewInit, Component, inject, OnInit,ViewChild } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import {NgModule} from '@angular/core';
import {MatDialog,MatDialogModule} from '@angular/material/dialog';

@Component({
    selector: 'app-home',
    imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatInput, MatTableModule,MatSortModule,MatPaginatorModule,MatDialogModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})

export class HomeComponent implements AfterViewInit{
  displayedColumns: string[] = ['id', 'name', 'email', 'salary','edit','delete'];
  dataSource = new MatTableDataSource<Employee>()

  employees:Employee[] =[];
  filteredEmployees:Employee[]=[];
  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator) paginator: any;
  readonly dialog=inject(MatDialog)

  constructor(private employeeService: EmployeeService) { }

  name:string = "";
  email:string = "";
  salary:any=undefined;

  employee: Employee=
  {
    id: 0,
    name:'',
    email:'',
    salary:this.salary
  }

  ngAfterViewInit(): void {
    this.employeeService.fetchAllEmployees().subscribe((data)=>{
      this.employees = data;
      this.dataSource = new MatTableDataSource<Employee>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  searchEmployee(input:any)
  {
    this.filteredEmployees = this.employees.filter(item=>item.name.toLowerCase().includes(input.toLowerCase())
    || item.email.toLowerCase().includes(input.toLowerCase()) || item.salary.toString().includes(input));
    this.dataSource = new MatTableDataSource<Employee>(this.filteredEmployees)
  }

  openDialog(employee:Employee) : void
  {
    const dialogRef=this.dialog.open(EmployeeFormComponent,{
      data:employee});


    dialogRef.afterClosed().subscribe(result=>{
      if(result!==undefined){
        this.employee.id=result.id;
        this.employee.email=result.email;
        this.employee.salary=result.salary;
      }
    })
  }
      
  deleteEmployee(id:number)
  {
    const isConfrimation = window.confirm("Are you sure you want to delete this employee");

    if(isConfrimation)
    {
      this.employeeService.deleteEmployee(id).subscribe((data =>
        this.employees=this.employees.filter(item=>item.id != id)
      ));
    }

  }

}
