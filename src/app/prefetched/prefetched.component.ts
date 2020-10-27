import {Component, OnInit} from '@angular/core';
import {defer, from, Observable} from 'rxjs';
import {Example} from '../shared/example.interface';
import {TransferStateService} from '@scullyio/ng-lib';
import {DirectusService} from '../shared/directus.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-prefetched',
  templateUrl: './prefetched.component.html',
  styleUrls: ['./prefetched.component.scss']
})
export class PrefetchedComponent implements OnInit {
  example$: Observable<Example>;

  constructor(private transferStateService: TransferStateService, private directusService: DirectusService) {
  }

  ngOnInit(): void {
    this.example$ = this.transferStateService.useScullyTransferState(
      'example',
      from(defer(() => this.directusService.api.getItems<Example[]>('examples', {})))
        .pipe(map(result => {
            return result.data[0] as Example;
          })
        )
    );
  }
}
