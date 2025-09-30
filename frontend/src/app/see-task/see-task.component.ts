import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { CommonService } from '../common.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-see-task',
  imports: [CommonModule],
  templateUrl: './see-task.component.html',
  styleUrl: './see-task.component.css',
})
export class SeeTaskComponent implements OnInit {
  istask: boolean = false;
  email: string = '';
  tasksArray: any[] = [];
  constructor(
    private dialog: MatDialog,
    private commonService: CommonService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.openDialog();
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '200px', // customize width
      height: 'auto', // auto height
      disableClose: true, // true if you don't want outside click to close
    });
    dialogRef.afterClosed().subscribe((email) => {
      if (email) {
        this.email = email;
        this.istask = true;

        this.getAlltask(email);
        console.log('User entered email:', email);
      } else {
      }
    });
  }

  public getAlltask(email: string) {
    this.commonService.getTaskData().subscribe((res) => {
      this.tasksArray = res.filter((t) => t.email == email);
      console.log(this.tasksArray, 'frommmmmmm');
      if (!this.tasksArray.length) {
        this.istask = false;
      }
    });
  }

  public onDelete(id: string) {
    console.log('hiii');

    this.commonService.deleteTask(id).subscribe((res) => {
      if (res) {
        this.getAlltask(this.email);
        this.matSnackBar.open('Your Task is  Deleted', 'Close', {
          duration: 2000,
        });
      }
    });
  }

  public onUpdate(id: string) {
    this.router.navigate(['edit-task', id]);
  }
}
