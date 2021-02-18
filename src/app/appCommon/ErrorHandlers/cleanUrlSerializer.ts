import { UrlTree ,DefaultUrlSerializer, UrlSerializer } from '@angular/router';

export class cleanUrlSerializer extends DefaultUrlSerializer {
    public parse(url: string): UrlTree {
        console.log(url);
        function cleanUrl(url) {
            return unescape(url);
        }

        return super.parse(cleanUrl(url));
    }
}
