import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { SortableDirective, SortEvent } from 'src/app/services/data/user/sortable.directive';
import { UtilityService } from 'src/app/services/data/user/utility.service';
import { Country } from 'src/models/Country';

@Component({
  selector: 'app-guestuser',
  templateUrl: './guestuser.component.html',
  styleUrls: ['./guestuser.component.css'],
  providers: [UtilityService, DecimalPipe]
})
export class GuestuserComponent implements OnInit {

  ngOnInit(): void {
  }

  countries$: Observable<Country[]>;
  total$: Observable<number>;

  @ViewChildren(SortableDirective)
  headers!: QueryList<SortableDirective>;

  constructor(public service: UtilityService) {
    this.countries$ = service.countries$;
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
