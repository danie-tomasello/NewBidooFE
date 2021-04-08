import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { SortableDirective, SortEvent } from 'src/app/services/data/user/sortable.directive';
import { UtilityService } from 'src/app/services/data/user/utility.service';
import { Utente } from 'src/models/Utente';

@Component({
  selector: 'app-guestuser',
  templateUrl: './guestuser.component.html',
  styleUrls: ['./guestuser.component.css'],
  providers: [UtilityService, DecimalPipe]
})
export class GuestuserComponent implements OnInit {

  ngOnInit(): void {
  }

  users$: Observable<Utente[]>;
  total$: Observable<number>;

  @ViewChildren(SortableDirective)
  headers!: QueryList<SortableDirective>;

  constructor(public service: UtilityService) {
    
    this.users$ = service.users$;
    this.total$ = service.total$;
  }
  
  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

}
