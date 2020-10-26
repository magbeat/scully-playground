import {Translation} from './translation.interface';

export interface Section {
    title: string;
    content: string;
}

export interface SectionTranslation extends Translation {
    title: string;
    content: string;
}

export interface SectionResult {
    identifier: string;
    translations: SectionTranslation[];
}
