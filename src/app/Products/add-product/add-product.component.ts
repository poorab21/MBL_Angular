import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { units } from '../../../assets/data/productUnits';
import { ProductService } from '../../Services/product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { constants } from '../../../assets/constant/constant';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  form: any;
  mode: any;
  prodNameFocused: boolean;
  prodPriceFocused: boolean;
  productUnits: any;
  prodDetailsFocused: boolean;
  
  constructor(private toastrService: ToastrService, private route: ActivatedRoute , private router: Router , private productService: ProductService , private fb: FormBuilder ) {
    
    this.form = fb.group({
      name: [
        "",
        [
          Validators.required
        ]
      ],
      price: [
        "",
        [
          Validators.required ,
          Validators.min(100) ,
          Validators.max(35000)
        ]
      ],
      unit: [
        "Kilogram" ,
        [
          Validators.required
        ]
      ],
      details: [
        "" ,
        [
          Validators.required ,
          Validators.pattern("^(.|\n)*[^\n]+(.|\n)*$")
        ]
      ]
    });

    this.prodNameFocused = false;
    this.prodPriceFocused = false;
    this.productUnits = units;
    this.prodDetailsFocused = false;
    this.mode = 'create';

    if(router.url.includes("edit")) {
      const prodId = this.route.snapshot.params['id'];
      this.mode = 'edit';

      this.productService.getProduct(prodId).subscribe((data) => {
        this.form.patchValue({
          name: data.name ,
          price: data.price ,
          unit: data.unit ,
          details: data.details
        })
      })
    } 
  }

  get Name() {
    return this.form.get("name");
  }

  get Price() {
    return this.form.get("price");
  }

  get Unit() {
    return this.form.get("unit");
  }

  get Details() {
    return this.form.get("details");
  }

  onSubmit() {
    if( this.mode == 'create' ) {
      this.productService.addProduct(this.form.value).subscribe((success) => {
        console.log(success);

        this.form.reset("");
        this.toastrService.success(constants.toastrAddProductMsg);
        this.router.navigate(['../list'],{ relativeTo: this.route });
      }, (error) => {
        console.log(error);
      });
    }
    else {
      this.productService.editProduct( this.route.snapshot.params['id'] , this.form.value ).subscribe((success) => {
        console.log(success);

        this.toastrService.success(constants.toastrEditProductMsg);
        this.router.navigate([ '../../list' ] , { relativeTo: this.route } );
      }, (error) => {
        console.log(error);
      });
    }
  }
}
