import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AuthguardService } from '../../assets/Services/authguard.service';

const routes: Routes = [
  { path: "" , redirectTo: "list" , pathMatch: "full" },
  { path: "list" , component: ProductListComponent , canActivate: [AuthguardService] },
  { path: "create" , component: AddProductComponent , canActivate: [AuthguardService] },
  { path: "edit/:id" , component: AddProductComponent , canActivate: [AuthguardService] } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
