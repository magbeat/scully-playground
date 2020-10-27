import {Component, OnInit} from '@angular/core';
import {DirectusService} from '../shared/directus.service';
import {TransferStateService} from '@scullyio/ng-lib';
import {Example, ExampleResponse} from '../shared/example.interface';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-eager',
  templateUrl: './eager.component.html',
  styleUrls: ['./eager.component.scss']
})
export class EagerComponent implements OnInit {

  example$: Observable<Example>;

  constructor(private transferStateService: TransferStateService, private directusService: DirectusService) {
  }

  ngOnInit(): void {
    this.example$ = this.transferStateService.useScullyTransferState(
      'example',
      from(this.directusService.api.getItems<Example[]>('examples', {}))
        .pipe(map(result => {
            return result.data[0] as Example;
          })
        )
    );
  }

}
