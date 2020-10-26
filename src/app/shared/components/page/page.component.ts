import {Component, Input, OnInit} from '@angular/core';
import {Page} from '../../interfaces/page.interface';

@Component({
    selector: 'app-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

    @Input() page: Page;

    constructor() {
    }

    ngOnInit(): void {
    }

}
