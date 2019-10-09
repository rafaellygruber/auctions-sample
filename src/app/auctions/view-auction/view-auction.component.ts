import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PoBreadcrumb } from '@portinari/portinari-ui';
import { Subscription } from 'rxjs';

import { AuctionService } from '../auction.service';

@Component({
  selector: 'app-view-auction',
  templateUrl: './view-auction.component.html'
})
export class ViewAuctionComponent implements OnInit, OnDestroy {
  
  private routeSubscription: Subscription;
  private getSubscription: Subscription;

  auction = { name: '', initialValue: undefined, used: false, responsible: '', startDate: '', endDate: ''};

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Lista de leilões', link: '/auctions' },
      { label: 'Visualizar leilão', link: '/view-auction' }
    ]
  };

  constructor(private auctionService: AuctionService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getAuction();
  }

  ngOnDestroy() {
    this.getSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  private getAuction() {
    this.routeSubscription = this.route.params.subscribe(params => {
      if (params['id']) {

        this.getSubscription = this.auctionService.getAuction(params['id']).subscribe(data => {
          this.auction.name = data['name'],
            this.auction.initialValue = data['initial_value'],
            this.auction.responsible = data['user_responsible'],
            this.auction.used = data['used'],
            this.auction.startDate = data['start_date'],
            this.auction.endDate = data['end_date'];
        });
      }
    });
  }

  back() {
    this.router.navigate(['auctions']);
  }
}
