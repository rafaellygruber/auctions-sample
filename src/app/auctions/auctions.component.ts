import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PoTableColumn, PoPageAction, PoTableAction, PoPageFilter, PoDialogService, PoBreadcrumb } from '@portinari/portinari-ui';

import { AuctionService } from './auction.service';

@Component({
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.css']
})
export class AuctionsComponent implements OnInit {
  private searchTerm: string = '';

  public readonly actions: Array<PoPageAction> = [
    { label: 'Novo Leilão', action: this.add, icon: 'po-icon-plus-circle' }
  ];

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Lista de leilões', link: '/auctions' }
    ]
  };

  public readonly tableActions: Array<PoTableAction> = [
    { action: this.edit.bind(this), icon: 'po-icon-edit', label: 'Editar' },
    { action: this.details.bind(this), icon: 'po-icon-document', label: 'Detalhes' },
    { action: this.delete.bind(this), icon: 'po-icon-delete', label: 'Excluir' }
  ];

  public readonly columns: Array<PoTableColumn> = [
    { property: 'name', label: 'Nome' },
    { property: 'initialValue', label: 'Valor inicial', type: "currency"},
    { property: 'used', label: 'Item Usado', type: 'boolean', 
      boolean: {
        trueLabel: 'Sim', falseLabel: 'Não'}
    },
    { property: 'responsible', label: 'Usuário Responsável' },
    { property: 'finished', label: 'Finalizado', type: 'boolean', 
      boolean: {
      trueLabel: 'Sim', falseLabel: 'Não'}
    },
  ];
  
  public items;

  public readonly filter: PoPageFilter = {
    action: this.loadData.bind(this),
    ngModel: 'searchTerm',
    placeholder: 'Pesquisar por nome'
  };

  constructor(
    private auctionService: AuctionService,
    private router: Router, 
    private poDialogService: PoDialogService) { }

  ngOnInit() {
    this.loadAuctions();
  }

  loadData() {
    this.loadAuctions(this.searchTerm);
  }

  loadAuctions(searchTerm?: string) {
    this.auctionService.readAuctions(searchTerm).subscribe(data => {
      this.items = data.map(e => {
      return {
        id: e.payload.doc.id,
        name: e.payload.doc.data()['name'],
        initialValue: e.payload.doc.data()['initial_value'],
        responsible: e.payload.doc.data()['user_responsible'],
        used: e.payload.doc.data()['used'],
        startDate: e.payload.doc.data()['start_date'],
        endDate: e.payload.doc.data()['end_date'],
        finished: !!e.payload.doc.data()['end_date']
       };
      })
    });
  }

  add() {
    this.router.navigate(['new-auction']);
  }

  delete(row: any) {

    this.poDialogService.confirm({
      title: `Atenção`,
      message: `Confirmar exclusão do registro? ${row.name}`,
      confirm: () => this.auctionService.deleteAuction(row.id)
    });
  }

  details(row: any) {
    this.router.navigate(['view-auction', { id: row.id }]);
  }

  edit(row:any) {
    this.router.navigate(['edit-auction', { id: row.id }]);
  }

}
