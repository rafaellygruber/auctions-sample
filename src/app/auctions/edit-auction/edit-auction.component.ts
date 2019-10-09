import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';
import { PoNotificationService, PoBreadcrumb } from '@portinari/portinari-ui';

import { AuctionService } from '../auction.service';

@Component({
  selector: 'app-edit-auction',
  templateUrl: './edit-auction.component.html'
})
export class EditAuctionComponent implements OnInit, OnDestroy {

  private id: string;
  private routeSubscription: Subscription;
  private getSubscription: Subscription;
  
  auction = { name: '', initialValue: undefined, used: false, responsible: '', startDate: '', endDate: ''};
  
  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Lista de leilões', link: '/auctions' },
      { label: 'Editar leilão', link: '/edit-auction' }
    ]
  };

  @ViewChild('formAuction', { static: true }) formAuction: { form: NgForm };

  constructor(private auctionService: AuctionService, 
    private router: Router,
    private route: ActivatedRoute, 
    private poNotification: PoNotificationService) { }

  ngOnInit() {
    this.getAuction();
  }

  ngOnDestroy() {
    if(this.getSubscription) {
      this.getSubscription.unsubscribe();
    }
    this.routeSubscription.unsubscribe();
  }

  private getAuction() {
    this.routeSubscription = this.route.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];

        this.getSubscription = this.auctionService.getAuction(this.id).subscribe(data => {
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

  save() {

    if(this.formAuction.form.valid) {

      this.auctionService.updateAuction(this.id, this.setRecord()).then(resp => {
        this.poNotification.success('Registro alterado com sucesso.');
        this.router.navigate(['auctions']);
      }).catch(error => {
        this.poNotification.error('Erro ao alterar registro');
      });

    }
  }

  private setRecord() {
    let record = {};

    record['name'] = this.auction.name;
    record['initial_value'] = this.auction.initialValue;
    record['used'] = this.auction.used;
    record['start_date'] = this.auction.startDate;
    record['end_date'] = this.auction.endDate;
    record['user_responsible'] = this.auction.responsible;

    return record;
  }

  cancel() {
    this.router.navigate(['auctions']);
  }

}
