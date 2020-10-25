import {Component, OnInit} from '@angular/core';
import {PageService} from '../../shared/services/page.service';
import {Page} from '../../shared/interfaces/page.interface';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public page$: Observable<Page>;

    constructor(private pageService: PageService) {
    }

    ngOnInit(): void {
        this.page$ = this.pageService.loadPage('home');
    }

}
