import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '../../../assets/Services/product.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { units } from '../../../assets/data/productUnits';
import { constants } from '../../../assets/constant/constant';
import { Regex } from '../../../assets/regex/regex';

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
          Validators.pattern(Regex.textBoxRegex)
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

      this.productService.getProduct(prodId).subscribe((data: any) => {
        this.form.patchValue({
          name: data.name ,
          price: data.price ,
          unit: data.unit ,
          details: data.details
        })
      },(error) => console.log(error));
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
