import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  public openModal: boolean = false;
  @Input('data') data: any;
  @Input('type') id: any;
  @Output('closeModal')closeModal=new EventEmitter<any>();
  public categoryTableHeaders: Array<any> = [{ "name": "id", "ngModel": "id" },
  { "name": "name", "ngModel": "name" },
  { "name": "note", "ngModel": "note" },
  { "name": "budgeted", "ngModel": "budgeted" },
  { "name": "activity", "ngModel": "activity" },
  { "name": "balance", "ngModel": "balance" },
  { "name": "goal type", "ngModel": "goal_type" },
  { "name": "goal creation month", "ngModel": "goal_creation_month" },
  { "name": "goal target", "ngModel": "goal_target" },
  { "name": "goal target month", "ngModel": "goal_target_month" },
  { "name": "goal percentage complete", "ngModel": "goal_percentage_complete" }];
  constructor() { }
  ngOnInit(): void {
  }
  public getDate(param): any {
    return new Date(param).toISOString();
  }
  public closeModalComponent(){
    this.closeModal.emit();
  }
}
