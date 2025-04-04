import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../core/Model/object-model';
import { Router } from '@angular/router';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  all_product_data: any;
  addEditProductForm!: FormGroup;
  addEditProduct: boolean = false;
  popup_header!: string;
  add_product!: boolean;
  edit_product!: boolean;
  product_data: any;
  single_product_data: any;
  product_dto!: Product;
  edit_product_id: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.addEditProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      productDesc: ['', Validators.required],
      mrp: ['', Validators.required],
      dp: ['', Validators.required],
      status: ['', Validators.required]
    })

    this.getAllProducts();
  }

  get rf() {
    return this.addEditProductForm.controls;
  }

  getAllProducts() {
    this.productService.allProduct().subscribe(data => {
      this.all_product_data = data;
      // console.log("All products ", this.all_product_data);
    }, error => {
      console.log("Something went wrong", error);
    })
  }

  addProductPopup() {
    this.add_product = true;
    this.edit_product = false;
    this.popup_header = "Add New Product";
    this.addEditProductForm.reset();
  }

  addNewProduct() {
    this.addEditProduct = true;
    if (this.addEditProductForm.invalid) {
      return;
    }
    this.product_data = this.addEditProductForm.value;
    this.product_dto = {
      id: "0",
      name: this.product_data.name,
      uploadPhoto: this.product_data.uploadPhoto,
      productDesc: this.product_data.productDesc,
      mrp: this.product_data.mrp,
      dp: this.product_data.dp,
      status: this.product_data.status
    }
    this.productService.addNewProduct(this.product_dto).subscribe(data => {
      // console.log(data);
      this.getAllProducts();
    }, error => {
      console.log("My error", error);
    })
  }

  editProductPopup(id: any) {
    this.add_product = false;
    this.edit_product = true;
    this.popup_header = "Edit Product";
    this.addEditProductForm.reset();
    this.productService.singleProduct(id).subscribe(data => {
      this.single_product_data = data;
      // console.log("Single Data", this.single_product_data);
      this.edit_product_id = data.id;
      this.addEditProductForm.setValue({
        name: this.single_product_data.name,
        uploadPhoto: this.single_product_data.uploadPhoto,
        productDesc: this.single_product_data.productDesc,
        mrp: this.single_product_data.mrp,
        dp: this.single_product_data.dp,
        status: this.single_product_data.status
      })
    }, error => {
      console.log("My error", error);
    })
  }

  updateProduct() {
    this.addEditProduct = true;
    if (this.addEditProductForm.invalid) {
      return;
    }
    this.product_data = this.addEditProductForm.value;
    this.product_dto = {
      id: 0,
      name: this.product_data.name,
      uploadPhoto: this.product_data.uploadPhoto,
      productDesc: this.product_data.productDesc,
      mrp: this.product_data.mrp,
      dp: this.product_data.dp,
      status: this.product_data.status
    }
    this.productService.updateProduct(this.edit_product_id, this.product_dto).subscribe(data => {
      this.getAllProducts();
    }, error => {
      console.log("My error", error);
    })
  }

  deleteProduct(id: any) {
    let conf = confirm("Do you want to delete this product ?");
    if (conf) {
      this.productService.deleteProduct(id).subscribe(data => {
        console.log("Deleted Sucessfully :", data);
        this.getAllProducts();
      }, error => {
        console.log(error);
      })
    }
    else {
      alert("You choose to cancel");
    }

  }
}
