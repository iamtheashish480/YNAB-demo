import {  Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input('headers') headers: any;
  @Input('data') data: any;
  @Input('tableId') tableId: any;
  @Input('showSerialNumber') showSerialNumber: boolean;
  @Input('showActionColumn') showActionColumn: boolean;
  @Input('showViewPayeeOption') showViewPayeeOption: boolean;
  @Input('showCheckBoxes') showCheckBoxes: boolean;
  @Output('triggerActionEvent') triggerActionEvent = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    console.log(this.data, this.headers);
  }
  public showDetails(budgetId, ind, type,accountId?:any) {
    console.log({ id: budgetId, index: ind, type: type, tableId: this.tableId });
    this.triggerActionEvent.emit({ budgetId: budgetId,accountId:accountId, index: ind, type: type, tableId: this.tableId });
  }

}
