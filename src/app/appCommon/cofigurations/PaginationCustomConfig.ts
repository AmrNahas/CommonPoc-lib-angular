import {MatPaginatorIntl} from '@angular/material/paginator';
import {AfterViewInit, Injectable, OnChanges, SimpleChanges} from '@angular/core';
import {MessagesService} from '../utility/MessagesService';



@Injectable({
    providedIn: 'root'
})
export class PaginationCustomConfig extends MatPaginatorIntl {

    private rangeLabelIntl: string;

    constructor(private msgService: MessagesService) {
        super();
        this.getAndInitTranslations();
    }



    getAndInitTranslations() {
        this.itemsPerPageLabel = this.msgService.getMessageTranslation('GENERIC.itemPerPage');
        this.nextPageLabel = this.msgService.getMessageTranslation('GENERIC.nextPage');
        this.previousPageLabel =this.msgService.getMessageTranslation('GENERIC.previousPage');
        this.changes.next();

    }


    getRangeLabel = (page: number, pageSize: number, length: number) =>  {
        this.getAndInitTranslations();
        var totalNum= this.msgService.getMessageTranslation('GENERIC.totalNum');
        var from= this.msgService.getMessageTranslation('GENERIC.from');
        var to= this.msgService.getMessageTranslation('GENERIC.to');
        if (length === 0 || pageSize === 0) {
            return `0 / ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `  ${startIndex + 1} - ${endIndex}   /  ${totalNum} : (${length})`;
    }

}
