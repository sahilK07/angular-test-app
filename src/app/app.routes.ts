import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { GraphComponent } from './graph/graph.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

export const routes: Routes = [
    {path : '', component: DashboardComponent},
    {path : 'view-product', component: ProductsComponent},
    {path : 'graph', component: GraphComponent},
    { path: 'product-details/:productId', component: ProductDetailsComponent },
];
