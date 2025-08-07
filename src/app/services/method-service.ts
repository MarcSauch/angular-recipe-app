import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MethodDTO, CreateMethodDTO } from '../interfaces/method';

@Injectable({
  providedIn: 'root'
})
export class MethodService {

  base_url = "http://localhost:8010/api/methods";
  http = inject(HttpClient);

  constructor() { }


  create_step( step: CreateMethodDTO): Observable<any> {
    const url: string = `${this.base_url}/create-method`;
    return this.http.post(url, step);
  }

  delete_step(step_id: number): Observable<any> {
    const url: string = `${this.base_url}/method/${step_id}`;
    return this.http.delete(url);
  }

}
