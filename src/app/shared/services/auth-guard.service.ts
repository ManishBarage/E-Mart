import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

//Admin before login check
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardLogin implements CanActivate{

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      let role = sessionStorage.getItem("role");
      if(role == "admin")
      {
        this.router.navigate(['/admin-dashboard']);
        return false;
      }
      else
      {
        return true;
      }
  }
}

//Admin after login check
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService{

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      let role = sessionStorage.getItem("role");
      if(role == "admin")
      {
        return true;
      }
      else
      {
        this.router.navigate(['/admin-login']);
        return false;
      }
  }
}

//Customer (seller & buyer) before login check
@Injectable({
  providedIn: 'root'
})
export class SellerBuyerAuthGuardLogin implements CanActivate{

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      let role = sessionStorage.getItem("role");
      if(role == "seller")
      {
        this.router.navigate(['/seller-dashboard']);
        return false;
      }
      else if(role == "buyer")
      {
        this.router.navigate(['buyer-dashboard']);
        return false;
      }
      else
      {
        return true;
      }
  }
}

//Buyer after login check
@Injectable({
  providedIn: 'root'
})
export class BuyerAuthGuardService{

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      let role = sessionStorage.getItem("role");
      if(role == "buyer")
      {
        return true;
      }
      else
      {
        this.router.navigate(['/sign-in']);
        return false;
      }
  }
}

//Seller after login check
@Injectable({
  providedIn: 'root'
})
export class SellerAuthGuardService{

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      let role = sessionStorage.getItem("role");
      if(role == "seller")
      {
        return true;
      }
      else
      {
        this.router.navigate(['/sign-in']);
        return false;
      }
  }
}
