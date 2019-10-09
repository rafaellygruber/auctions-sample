import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';

import { AuctionsComponent } from './auctions/auctions.component';
import { NewAuctionComponent } from './auctions/new-auction/new-auction.component';
import { EditAuctionComponent } from './auctions/edit-auction/edit-auction.component';
import { ViewAuctionComponent } from './auctions/view-auction/view-auction.component';


const routes: Routes = [
  { path: '', component: AuctionsComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'auctions',
    component: AuctionsComponent,
    // canActivate: [AuthGuard] 
  },
  { path: 'new-auction', component: NewAuctionComponent },
  { path: 'edit-auction', component: EditAuctionComponent },
  { path: 'view-auction', component: ViewAuctionComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
