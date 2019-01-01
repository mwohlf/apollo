import {ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import {OverlayContainer} from '@angular/cdk/overlay';
import {ToastActions, ToastActionTypes} from '../actions/toast.actions';
import {map, switchMap} from 'rxjs/operators';
import {ToastComponent} from '../../widget/toast/toast.component';
import {ComponentPortal} from '@angular/cdk/portal';

export interface Toast {
    severity: Severity;
    title: string;
    content: string;
}

export enum Severity  {
    INFO,
    WARNING,
    ERROR
}


// see: https://blog.angularindepth.com/creating-a-toast-service-with-angular-cdk-a0d35fd8cc12
// see: https://stackoverflow.com/questions/44939878/dynamically-adding-and-removing-components-in-angular

@Injectable()
export class ToastEffects {

    private containerElement: HTMLElement;

    constructor(private actions: Actions<ToastActions>,
                private overlayContainer: OverlayContainer,
                private store: Store<fromRoot.State>,
                private componentFactoryResolver: ComponentFactoryResolver,
                private appRef: ApplicationRef,
                private injector: Injector ) {
        console.log("<constructor> ", store);
        this.containerElement = this.overlayContainer.getContainerElement();


    }

    @Effect()
    createToast: Observable<ToastActions> = this.actions.pipe(
        ofType(ToastActionTypes.CREATE),
        map(action => action.payload),
        switchMap((toast: Toast) => {
            console.log("<effect> oastActionTypes.CREATE: ", toast);
            console.log("<effect> this.containerElement : ", this.containerElement);


            const toastComponentRef = this.componentFactoryResolver
                .resolveComponentFactory(ToastComponent)
                .create(this.injector);

            // 2. Attach component to the appRef so that it's inside the ng component tree
            this.appRef.attachView(toastComponentRef.hostView);

            // 3. Get DOM element from component
            const domElem = (toastComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

            // 4. Append DOM element to the body
            //document.body.appendChild(domElem);
            //containerElement
            /*
            const toastComponent = new ComponentPortal(ToastComponent);
            console.log("<effect> toastComponent : ", toastComponent);


            this.containerElement.appendChild(toastComponent);
            */
            // no other action
            return [];
        })
    );

    @Effect()
    dismissToast: Observable<ToastActions> = this.actions.pipe(
        ofType(ToastActionTypes.DISMISS),
        map(action => action.payload),
        switchMap((toast: Toast) => {
            console.log("<effect> ToastActionTypes.DISMISS: ", toast);
            // no other action
            return [];
        })
    );

}
