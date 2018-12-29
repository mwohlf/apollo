import {Component, OnInit} from '@angular/core';


export interface ThemeChoice {
  label: string;
  value: string;
}


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html'

})
export class ToastComponent implements OnInit {

  ngOnInit(): void {
  }

}
