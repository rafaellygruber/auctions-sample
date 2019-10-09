import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PoModule } from '@portinari/portinari-ui';
import { PoTemplatesModule } from '@portinari/portinari-templates';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule} from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuctionsComponent } from './auctions/auctions.component';
import { ViewAuctionComponent } from './auctions/view-auction/view-auction.component';
import { NewAuctionComponent } from './auctions/new-auction/new-auction.component';

import { environment } from 'src/environments/environment';
import { EditAuctionComponent } from './auctions/edit-auction/edit-auction.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuctionsComponent,
    ViewAuctionComponent,
    NewAuctionComponent,
    EditAuctionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    PoModule,
    PoTemplatesModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
