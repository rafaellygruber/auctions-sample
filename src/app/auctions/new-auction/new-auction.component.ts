import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { PoNotificationService, PoBreadcrumb } from '@portinari/portinari-ui';

import { AuctionService } from '../auction.service';

@Component({
  selector: 'app-new-auction',
  templateUrl: './new-auction.component.html'
})
export class NewAuctionComponent {

  auction = { name: '', initialValue: undefined, used: false, responsible: '', startDate: '', endDate: ''};
  
  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Lista de leilões', link: '/auctions' },
      { label: 'Novo leilão', link: '/new-auction' }
    ]
  };

  @ViewChild('formAuction', { static: true }) formAuction: { form: NgForm };

  constructor(private auctionService: AuctionService, private router: Router, private poNotification: PoNotificationService) { }

  saveNew() {

    if(this.formAuction.form.valid) {

      this.auctionService.createNewAuction(this.setRecord()).then(resp => {
        this.poNotification.success('Registro criado com sucesso.');
        this.router.navigate(['auctions']);
      }).catch(error => {
        this.poNotification.error('Erro ao criar registro');
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
