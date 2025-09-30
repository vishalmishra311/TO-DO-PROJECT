import { Injectable } from '@angular/core';
import { Task } from './models/task.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient) {}

  public addtask(taskData: Task) {
    console.log(taskData, 'hi i am from service ');
    return this.http.post('http://localhost:3000/task', taskData);
  }

  public getTaskData(): Observable<Task[]> {
    return this.http.get<Task[]>('http://localhost:3000/getTaskDeatils');
  }

  public deleteTask(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/task/${id}`);
  }

  public getTaskById(id: string) {
    return this.http.get(`http://localhost:3000/getTaskbyId/${id}`);
  }

  public upadteTask(id: string, taskdata: Task) {
    return this.http.put(`http://localhost:3000/updateTask/${id}`, taskdata);
  }
}
