import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { parse } from 'path';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit,OnDestroy {
  employees:any=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  isshowtable:boolean = true;
  employeeForm:FormGroup;
  submitted:boolean=false;
  iseditable:boolean=false;
  empId:any;

  constructor(private empService:EmployeeService,
    private tostrService:ToastrService,
    private http: HttpClient,
    private fb:FormBuilder
  
    ) { }

  ngOnInit(): void {
    this.employeeForm=this.fb.group({
      name:['',Validators.required],
      salary:['',Validators.required],
      age:['',Validators.required]
    });

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.http.get(this.employees)
      .subscribe(empl => {
        this.employees = empl;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      });
    this.getEmployeeList();
  }

  


  getEmployeeList()
  {
    
    this.empService.getEmployeeList().subscribe(res=>{
      if(res.status === "success")
      {
        this.employees=res.data;
      }
      else
      {
        this.employees=[];
      }
    })
  }

  get f() { return this.employeeForm.controls; }

  reset()
  {
    this.submitted = false;
    this.employeeForm.reset();
    this.isshowtable=true;
    this.getEmployeeList();
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  deleteEmployee(id)
  {
    this.empService.deletemployee(parseInt(id)).subscribe( (response: any) => {
    if (response.status_code == 200) {
      this.tostrService.success("Employee Deleted Successfully");
    } else {
      this.tostrService.error("Error in Delete Employee")
    }
});
  }

  addEmployee()
  {
    this.isshowtable = false;
  }

  gotohome()
  {
    this.isshowtable = true;
    this.getEmployeeList();
  }

  updateEmployee()
  {
    this.empService.editEmployee(parseInt(this.empId)).subscribe(res=>{
      // if(res.status === "success")
      // {
        this.tostrService.success("Employee Updated Successfully");
        this.isshowtable=true;
        this.getEmployeeList();
      // }
      // else
      // {
      //   this.tostrService.error("Error in Update Employee");
       
      // }
    })
  }

  editEmployee(emp)
  {
    this.iseditable = true;
    this.isshowtable= false;
    this.employeeForm.patchValue({
      name:emp.employee_name,
      salary:emp.employee_salary,
      age:emp.employee_age
    })
    this.empId=parseInt(emp.id);
  }


  saveEmployee()
  {
    this.submitted = true;
    if(this.employeeForm.valid)
    {
      const salary = this.employeeForm.get('salary').value;
      const age = this.employeeForm.get('age').value;
      const data={
        name:this.employeeForm.get('name').value,
        salary:parseInt(salary),
        age:parseInt(age)
      }
      this.empService.addemployee(data).subscribe(res=>{
        if(res.status === "success")
        {
          this.tostrService.success("Employee Created Successfully");
          this.isshowtable=true;
          this.getEmployeeList();
        }
        else
        {
          this.tostrService.error("Error in Create Employee");
          this.isshowtable=true;
          this.getEmployeeList();

        }
        
      })
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


}
