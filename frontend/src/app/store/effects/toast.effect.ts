import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    EmbeddedViewRef,
    Injectable,
    Injector,
    RendererFactory2
} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as fromToast from '../reducers//toast.reducer';
import {OverlayContainer} from '@angular/cdk/overlay';
import {CreateToastAction, DismissToastAction, ToastActions, ToastActionTypes} from '../actions/toast.actions';
import {switchMap, withLatestFrom} from 'rxjs/operators';
import {ToastContainerComponent} from '../../widget/toast/toast-container.component';

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

    private toastContainerComponentRef: ComponentRef<ToastContainerComponent> | undefined = undefined;

    constructor(private actions: Actions<ToastActions>,
                private overlayContainer: OverlayContainer,
                private store: Store<fromRoot.ApplicationState>,
                private componentFactoryResolver: ComponentFactoryResolver,
                private appRef: ApplicationRef,
                private injector: Injector,
                private rendererFactory: RendererFactory2) {
    }

    @Effect()
    createToast: Observable<ToastActions> = this.actions.pipe(
        ofType(ToastActionTypes.CREATE),
        withLatestFrom(this.store.select(state => state.toasts)),
        switchMap(([createToastAction, toasts]: [CreateToastAction, fromToast.State]) => {
            console.log('toasts: ', toasts);
            const toastContainer = this.findToastContainer();
            toastContainer.setToasts(toasts.toasts);
            return [];
        })
    );

    @Effect()
    dismissToast: Observable<ToastActions> = this.actions.pipe(
        ofType(ToastActionTypes.DISMISS),
        withLatestFrom(this.store.select(state => state.toasts)),
        switchMap(([dismissToastAction, toasts]: [DismissToastAction, fromToast.State]) => {
            if (toasts.toasts.length === 0) {
                this.destroyToastContainer();
            } else {
                const toastContainer = this.findToastContainer();
                toastContainer.setToasts(toasts.toasts);
            }
            return [];
        })
    );

    private findToastContainer(): ToastContainerComponent {
        if (this.toastContainerComponentRef === undefined) {
            // 1. create the toast component
            const factory = this.componentFactoryResolver.resolveComponentFactory(ToastContainerComponent);
            this.toastContainerComponentRef = factory.create(this.injector); // in app.module.ts : entryComponents: [ToastComponent], to enable a factory...
            // 2. Attach component to the appRef so that it's inside the ng component tree
            this.appRef.attachView(this.toastContainerComponentRef.hostView);
            // 3. Get DOM element from component
            const domElem = (this.toastContainerComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
            // 4. Append DOM element to the body
            const renderer2 = this.rendererFactory.createRenderer(this.overlayContainer.getContainerElement(), null);
            renderer2.appendChild(this.overlayContainer.getContainerElement(), domElem);
        }
        return this.toastContainerComponentRef.instance;
    }

    private destroyToastContainer(): void {
        if (this.toastContainerComponentRef !== undefined) {
            const renderer2 = this.rendererFactory.createRenderer(this.overlayContainer.getContainerElement(), null);
            renderer2.removeChild(this.overlayContainer.getContainerElement(), this.toastContainerComponentRef.location.nativeElement);
            this.toastContainerComponentRef.destroy();
            this.toastContainerComponentRef = undefined;
        }
    }

}
