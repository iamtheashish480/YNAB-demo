import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

 public name:string="";
 public accountType:string="";
 public budgetId:string="";
 public errorMessage:string="";
 public balance:number;
  constructor(private httpService:HttpService,private activatedRoute:ActivatedRoute) { 
    this.activatedRoute.params.subscribe(res=>{
      this.budgetId=res['budgetId'];
    })
  }

  ngOnInit(): void {
    this.httpService.createPostRequest('https://app.youneedabudget.com/oauth/token?client_id=ed6448be5e4ff1b4d03b57587c1d4c364c42b52d1471cad6b50475d62f39aa04&client_secret=244de37a62effeacb6ff39da80112076c0ea05178e2a2dfb814b2c702af959de&redirect_uri=http://localhost:4200&grant_type=authorization_code&code=c2ba2f1b621891e0baf5cce7a7f65c909dfe0554dafda94e4ac39a689a4f4249',{}).subscribe(res=>{

    })  }
  createAccount(){
    let data={
      "account": {
        "name": this.name,
        "type": this.accountType,
        "balance": this.balance
      }
    };
    this.httpService.createPostRequest('https://api.youneedabudget.com/v1/budgets/' + this.budgetId + '/accounts',data).subscribe(res=>{

    })
  }

}
