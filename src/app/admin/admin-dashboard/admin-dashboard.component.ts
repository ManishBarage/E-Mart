import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  standalone : true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{
  user_dashboard_data:any;
  total_users:number=0;
  admin_users:number=0;
  seller_users:number=0;
  buyer_users:number=0;

  product_dashboard_data:any;
  total_products:number=0;
  publish_prodcuts:number=0;
  inactive_products:number=0;
  draft_products:number=0;

  constructor(private router:Router, private adminService:AdminService){}

  ngOnInit(): void {
      this.adminUserDashboardData();
      this.adminProdcutDashboardData();
  }

  userDashboard(){
    this.router.navigateByUrl("/admin/user");
  }

  productDashboard(){
    this.router.navigateByUrl("/admin/product");
  }

  adminUserDashboardData(){
    this.adminService.userDashboardData().subscribe(data=>{
      this.user_dashboard_data = data;
      // console.log(this.user_dashboard_data);
      for(let user in this.user_dashboard_data)
      {
        if(this.user_dashboard_data[user].role == 'admin')
        {
          ++this.admin_users;
        }
        else if(this.user_dashboard_data[user].role == 'seller')
        {
          ++this.seller_users;
        }
        else if(this.user_dashboard_data[user].role == 'buyer')
        {
          ++this.buyer_users;
        }

        ++this.total_users;
      }
    },error=>{
      console.log("My error",error);
    })
  }

  adminProdcutDashboardData(){
    this.adminService.productDashboardData().subscribe(data=>{
      this.product_dashboard_data = data;
      // console.log(this.product_dashboard_data);
      for(let product in this.product_dashboard_data)
      {
        if(this.product_dashboard_data[product].status == 'publish')
        {
          ++this.publish_prodcuts;
        }
        else if(this.product_dashboard_data[product].status == 'draft')
        {
          ++this.draft_products;
        }
        else if(this.product_dashboard_data[product].status == 'inactive')
        {
          ++this.inactive_products;
        }

        ++this.total_products;
      }
    },error=>{
      console.log("My Error",error);
    })
  }

}
