import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public openModal: boolean = false;
  public showAccount: boolean = false;
  public budgetList: Array<any> = [];
  public showPayee: boolean = false;
  public payeeList: Array<any> = [];
  public tableType: string = "";
  public selectedBudgetId: string = "";
  public accountListArray: Array<any> = [];
  public selectedBudgetListData: Object = {};
  public accountdata: Object = {};
  public budgetTableHeaders = [
    { "name": "Id", ngModel: "id" },
    { "name": "Name", ngModel: "name" },
    { "name": "First Month", ngModel: "first_month" },
    { "name": "Last Month", ngModel: "last_month" },
  ];
  public accountTableHeaders = [
    { "name": "id", "ngModel": "id" },
    { "name": "name", "ngModel": "name" },
    { "name": "type", "ngModel": "type" },
    { "name": "balance", "ngModel": "balance" },
  ];
  public payeeTableHeaders = [
    { "name": "id", "ngModel": "id" },
    { "name": "name", "ngModel": "name" },
    { "name": " transfer account id", "ngModel": "transfer_account_id" },
  ];  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.httpService.createGetRequest('https://api.youneedabudget.com/v1/budgets').subscribe(res => {
      this.budgetList = res && res['data'] && res['data']['budgets'] ? res['data']['budgets'] : [];
    })
  }

  getActionTypeFromTable(params) {
    if (params['tableId'] == 'budget' && params['type'] == "info")
      this.showDetails(params['budgetId']);
    else if (params['tableId'] == 'budget' && params['type'] == "radio")
      this.fetchAccountList(params['budgetId']);
    else if (params['tableId'] == 'budget' && params['type'] == "payee")
      this.fetchPayeeList(params['budgetId']);
    else if (params['tableId'] == 'account' && params['type'] == "info")
      this.showAccountDetails(params['budgetId']);

  }
  public showDetails(budgetId) {
    console.log(budgetId);
    this.openModal = true;
    this.httpService.createGetRequest('https://api.youneedabudget.com/v1/budgets/' + budgetId).subscribe(res => {
      this.selectedBudgetListData = res && res['data'] && res['data']['budget'] ? res['data']['budget'] : {};
      this.tableType = 'budget';
    })
  }
  public fetchAccountList(budgetId) {
    this.selectedBudgetId = budgetId;
    this.httpService.createGetRequest('https://api.youneedabudget.com/v1/budgets/' + budgetId + '/accounts').subscribe(res => {
      this.accountListArray = res && res['data'] && res['data']['accounts'] ? res['data']['accounts'].filter(el => el['deleted'] == false).sort(function (a, b) { return a['balance'] - b['balance'] }) : [];
      this.showAccount = true;
    })
  }
  public fetchPayeeList(budgetId) {
    this.selectedBudgetId = budgetId;
    this.httpService.createGetRequest('https://api.youneedabudget.com/v1/budgets/' + budgetId + '/payees').subscribe(res => {
      this.payeeList = res && res['data'] && res['data']['payees'] ? res['data']['payees'].filter(el => el['deleted'] == false) : [];
      this.showPayee = true;
    })
  }
  public showAccountDetails(accountId) {
    console.log(this.selectedBudgetListData, accountId);
    this.openModal = true;
    this.httpService.createGetRequest('https://api.youneedabudget.com/v1/budgets/' + this.selectedBudgetId + '/accounts/' + accountId).subscribe(res => {
      this.accountdata = res && res['data'] && res['data']['account'] ? res['data']['account'] : {};
      this.tableType = 'account';
    })
  }
  public closeModal() {
    this.openModal = false;
  }
  public navigateToCreateAccount() {
    this.router.navigate(["/home/create-account", this.selectedBudgetId]);
  }
}
