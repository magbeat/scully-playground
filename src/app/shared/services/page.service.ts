import {Injectable} from '@angular/core';
import {map, tap} from 'rxjs/operators';
import {Page, PageResult} from '../interfaces/page.interface';
import {from, Observable} from 'rxjs';
import {TransferStateService} from '@scullyio/ng-lib';
import {DirectusService} from './directus.service';
import {Section} from '../interfaces/section.interface';

@Injectable({
    providedIn: 'root'
})
export class PageService {

    constructor(private transferStateService: TransferStateService, private directusService: DirectusService) {
    }

    public loadPage(identifier: string, languageCode: string = 'de'): Observable<Page> {
        return this.transferStateService.useScullyTransferState(
            'page',
            from(this.directusService.api.getItems<PageResult[]>('pages', {
                fields: ['identifier', 'translations.*', 'sections.*', 'sections.section.*', 'sections.section.translations.*'],
                filter: {
                    identifier: {
                        eq: identifier
                    }
                }
            })).pipe(
                map(result => {
                    const pageData = result.data[0];
                    const page = {
                        identifier: pageData.identifier,
                        title: pageData.translations.find(t => t.language === languageCode).title,
                        sections: []
                    } as Page;

                    const sections = pageData.sections;
                    sections.forEach(sectionResult => {
                        const section = sectionResult.section;
                        page.sections.push({
                            identifier: section.identifier,
                            title: section.translations.find(t => t.language === languageCode).title,
                            content: section.translations.find(t => t.language === languageCode).content
                        } as Section);
                    });
                    return page;
                })
            )
        );
    }
}
