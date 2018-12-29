import {Injectable} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';


export class Toast {
    content: string;
    style: string;

    constructor(content, style?) {
        this.content = content
        this.style = style || 'info'
    }

}

@Injectable()
export class ToastService {


}
