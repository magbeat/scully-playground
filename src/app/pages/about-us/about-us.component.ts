import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Page} from "../../shared/interfaces/page.interface";
import {PageService} from "../../shared/services/page.service";

@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

    public page$: Observable<Page>;

    constructor(private pageService: PageService) {
    }

    ngOnInit(): void {
        this.page$ = this.pageService.loadPage('about-us');
    }
}
