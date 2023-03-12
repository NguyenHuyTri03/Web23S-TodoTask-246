import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/services/users/user.service';
import { ProjectModel } from 'src/models/projects.model';
import { AddProjectComponent } from './components/add-project/add-project.component';
import * as ProjectActions from '../../../NgRx/Actions/projects.action';
import { Observable } from 'rxjs';
import { ShareProjectComponent } from './components/share-project/share-project.component';

export type Status = "in-progress" | "completed" | "overdue";

@Component({
  selector: 'app-viewallproject',
  templateUrl: './viewallproject.component.html',
  styleUrls: ['./viewallproject.component.scss']
})
export class ViewallprojectComponent implements OnInit {
  constructor(
    private matDialog: MatDialog,
    private userService: UserService,
    private store: Store<{ project: ProjectModel }>
  ) {
    this.project$ = this.store.select('project');
  }

  project$ !: Observable<any>;

  projectList: ProjectModel[] = [];

  is_in_progress: boolean = false;
  is_completed: boolean = false;
  is_overdue: boolean = false;

  total_amount: number = 0;
  in_progress_amount: number = 0;
  completed_amount: number = 0;
  overdue_amount: number = 0;

  dialogOpen() {
    this.matDialog.open(AddProjectComponent)
    console.log("Open dialog", this.userService.userInfo.uid);
  }
  opendialogShare(){
    this.matDialog.open(ShareProjectComponent)
  }
  ngOnInit(): void {
    this.store.dispatch(ProjectActions.getAllProjects());
    this.project$.subscribe((data) => {
      if (data) {
        this.projectList = data.projects;
        for (let i = 0; i < this.projectList.length; i++) {
          if (this.projectList[i].status == "in-progress") {
            this.in_progress_amount++;
          } else if (this.projectList[i].status == "completed") {
            this.completed_amount++;
          } else if (this.projectList[i].status == "overdue") {
            this.overdue_amount++;
          }

          this.getProjectStatus(this.projectList[i].status);
        }
        this.total_amount = this.projectList.length;
      }
      else {
        console.log("No data");
      }
    })
  }

  getProjectStatus(status: Status) {
    if (status == "in-progress") {
      this.is_in_progress = true;
      this.is_completed = false;
      this.is_overdue = false;
    } if (status == "completed") {
      this.is_in_progress = false;
      this.is_completed = true;
      this.is_overdue = false;
    } if (status == "overdue") {
      this.is_in_progress = false;
      this.is_completed = false;
      this.is_overdue = true;
    }
  }
}
