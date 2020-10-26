import {Translation} from './translation.interface';
import {Section, SectionResult} from './section.interface';

export interface Page {
    identifier: string;
    title: string;
    sections: Section[];
}

export interface PageTranslation extends Translation {
    title: string;
}

export interface PageResult {
    identifier: string;
    translations: PageTranslation[];
    sections: PageSectionResult[];
}

export interface PageSectionResult {
    section: SectionResult;
}

