import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { CoreHttpService } from './core-http.service';

const getEmployeelistURL='http://dummy.restapiexample.com/api/v1/employees';
const deletemployeeURL = 'http://dummy.restapiexample.com/api/v1/delete/';
const addEmployeeURL = 'http://dummy.restapiexample.com/create';
const editEmployeeURL ='http://dummy.restapiexample.com/api/v1/update/';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  constructor(private _coreHttpService: CoreHttpService){}

  getEmployeeList(): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this._coreHttpService.httpGetRequest<any>(
        getEmployeelistURL,
        headers
    );
}


addemployee (data) {
  const reqHeaders = new HttpHeaders({ "No-Auth": "true" });
  return this._coreHttpService.httpPostRequest<any, any>(addEmployeeURL,reqHeaders,data);
}

editEmployee(id){
  const reqHeaders = new HttpHeaders({ "No-Auth": "true" });
  const url = editEmployeeURL + id;
  return this._coreHttpService.httpPutRequest(url,reqHeaders);
}


deletemployee = (id) => {
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'application/json');
  const url = deletemployeeURL + id;
  return this._coreHttpService.httpGetRequest(
    url,
    headers
  );
}

}
