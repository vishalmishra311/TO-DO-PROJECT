import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Task } from '../models/task.model';
import { CommonService } from '../common.service';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    // Material
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    HttpClientModule,

    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent implements OnInit {
  taskForm: FormGroup;
  taskDetail!: any;
  paramsID!: string;

  constructor(
    private fb: FormBuilder,
    private common: CommonService,
    private param: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      task: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  ngOnInit(): void {
    console.log(this.param.snapshot.params['id']);
    this.paramsID = this.param.snapshot.params['id'];

    if (this.paramsID) {
      this.common.getTaskById(this.paramsID).subscribe((res) => {
        this.taskDetail = res;
        console.log(this.taskDetail, 'resssss');
        this.patchUpform();
      });
    }
  }

  public onsubmit() {
    console.log(this.taskForm.value);

    const taskData: Task = this.taskForm.value;
    if (this.paramsID) {
      this.common.upadteTask(this.paramsID, taskData).subscribe((res) => {
        this.snackbar.open('Congratulations! Your Task is Updated', 'Close', {
          duration: 2000,
        });
        this.router.navigate(["/add-task"])
      });
    } else {
      this.common.addtask(taskData).subscribe((res) => {
        if (res) {
          this.snackbar.open('Congratulations! Your Task is  added', 'Close', {
            duration: 2000,
   
          });
          this.taskForm.reset();
        }
      });
    }
  }

  public patchUpform() {
    this.taskForm.get('name')?.setValue(this.taskDetail.name);
    this.taskForm.get('email')?.setValue(this.taskDetail.email);
    this.taskForm.get('task')?.setValue(this.taskDetail.task);
    this.taskForm.get('date')?.setValue(this.taskDetail.date);
    this.taskForm.get('time')?.setValue(this.taskDetail.time);
  }
}
