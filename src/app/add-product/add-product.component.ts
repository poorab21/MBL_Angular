import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { units } from '../../assets/data/productUnits';
import { ProductService } from '../Services/product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
  form: any;
  prodNameFocused: boolean;
  prodPriceFocused: boolean;
  productUnits: any;
  prodDetailsFocused: boolean;
  
  constructor( private route: ActivatedRoute , private router: Router , private productService: ProductService , private fb: FormBuilder ) {
    this.form = fb.group({
      name: [
        "",
        [
          Validators.required
        ]
      ],
      price: [
        100,
        [
          Validators.required ,
          Validators.min(100) ,
          Validators.max(35000)
        ]
      ],
      unit: [
        "Kilogram",
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
    this.productService.addProduct(this.form.value).subscribe((response) => {
      this.form.reset("");
      this.router.navigate(['../list'],{ relativeTo: this.route });
    });
  }
}
