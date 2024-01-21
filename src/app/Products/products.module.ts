import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AddProductComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule ,
    ProductsRoutingModule ,
    ReactiveFormsModule ,
    FormsModule ,
    HttpClientModule ,
    MatButtonModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right'
    })

  ]
})
export class ProductsModule { }
