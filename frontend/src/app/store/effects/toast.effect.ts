import {ApplicationRef, ComponentFactoryResolver, EmbeddedViewRef, Injectable, Injector, RendererFactory2} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import {OverlayContainer} from '@angular/cdk/overlay';
import {ToastActions, ToastActionTypes} from '../actions/toast.actions';
import {map, switchMap} from 'rxjs/operators';
import {CURRENT_TOAST, ToastComponent} from '../../widget/toast/toast.component';

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
                private injector: Injector,
                private rendererFactory: RendererFactory2) {
        console.log("<constructor> ", store);
        this.containerElement = this.overlayContainer.getContainerElement();
    }

    @Effect()
    createToast: Observable<ToastActions> = this.actions.pipe(
        ofType(ToastActionTypes.CREATE),
        map(action => action.payload),
        switchMap((toast: Toast) => {
            const toastInjector = Injector.create({
                providers: [{
                    provide: CURRENT_TOAST,
                    useValue: toast
                }],
                parent: this.injector,
                name: 'toast-injector'
            });
            // 1. create the toast component
            const factory = this.componentFactoryResolver.resolveComponentFactory(ToastComponent);
            const toastComponentRef = factory.create(toastInjector); // in app.module.ts : entryComponents: [ToastComponent], to enable a factory...
            // 2. Attach component to the appRef so that it's inside the ng component tree
            this.appRef.attachView(toastComponentRef.hostView);
            // 3. Get DOM element from component
            const domElem = (toastComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
            // 4. Append DOM element to the body
            const renderer2 = this.rendererFactory.createRenderer(this.containerElement, null);
            renderer2.appendChild(this.containerElement, domElem);
            // 5. append a cleanup callback:
            const toastComponent = toastComponentRef.instance;
            toastComponentRef.instance.destroy = () => {
                renderer2.removeChild(this.containerElement, toastComponent.elementRef.nativeElement);
                toastComponentRef.destroy();
            };
            return [];
        })
    );

    @Effect()
    dismissToast: Observable<ToastActions> = this.actions.pipe(
        ofType(ToastActionTypes.DISMISS),
        map(action => action.payload),
        switchMap((toastComponent: ToastComponent) => {
            toastComponent.destroy();
            return [];
        })
    );

}
