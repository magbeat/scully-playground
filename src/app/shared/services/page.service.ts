import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {map, tap} from 'rxjs/operators';
import {Page, PageResult} from '../interfaces/page.interface';
import {Observable} from 'rxjs';
import {TransferStateService} from "@scullyio/ng-lib";

@Injectable({
    providedIn: 'root'
})
export class PageService {

    constructor(private apollo: Apollo, private transferStateService: TransferStateService) {
    }

    public loadPage(identifier: string): Observable<Page> {
        return this.transferStateService.useScullyTransferState(
            'page',
            this.apollo.watchQuery<PageResult>({
                query: gql`
                    {
                        page(filter: {identifier: {eq: "${identifier}"}}) {
                            title
                            content (markdown: true)
                        }
                    }
                `
            }).valueChanges.pipe(
                tap(result => console.log(result)),
                map(result => result.data.page as Page)
            )
        );
    }
}
