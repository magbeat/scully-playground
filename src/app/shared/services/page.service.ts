import { Injectable } from '@angular/core';
import { isScullyGenerated, TransferStateService } from '@scullyio/ng-lib';
import { from, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Page, PageResult } from '../interfaces/page.interface';
import { Section } from '../interfaces/section.interface';
import { DirectusService } from './directus.service';

@Injectable({
    providedIn: 'root',
})
export class PageService {
    constructor(
        private transferStateService: TransferStateService,
        private directusService: DirectusService
    ) {}

    public loadPage(
        identifier: string,
        languageCode: string = 'de'
    ): Observable<Page> {
        const scullyPageId = `page-${identifier}-${languageCode}`;
        if (isScullyGenerated()) {
            return this.transferStateService.getState(scullyPageId);
        } else {
            return from(this.getPage(identifier, languageCode)).pipe(
                tap({
                    next: (page) =>
                        this.transferStateService.setState(scullyPageId, page),
                })
            );
        }
    }

    private getPage(identifier: string, languageCode: string): Promise<Page> {
        return this.directusService.api
            .getItems<PageResult[]>('pages', {
                fields: [
                    'identifier',
                    'translations.*',
                    'sections.*',
                    'sections.section.*',
                    'sections.section.translations.*',
                ],
                filter: {
                    identifier: {
                        eq: identifier,
                    },
                },
            })
            .then((result) => {
                const pageData = result.data[0];
                const page = {
                    identifier: pageData.identifier,
                    title: pageData.translations.find(
                        (t) => t.language === languageCode
                    ).title,
                    sections: [],
                } as Page;

                const sections = pageData.sections;
                sections.forEach((sectionResult) => {
                    const section = sectionResult.section;
                    page.sections.push({
                        identifier: section.identifier,
                        title: section.translations.find(
                            (t) => t.language === languageCode
                        ).title,
                        content: section.translations.find(
                            (t) => t.language === languageCode
                        ).content,
                    } as Section);
                });
                return page;
            });
    }
}
