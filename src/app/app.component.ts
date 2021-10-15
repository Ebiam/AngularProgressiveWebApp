import { Component } from '@angular/core';
import {SwPush} from "@angular/service-worker";
import {ApiService} from "./api.service";

@Component({
  selector: 'app-root',
  template: `
        <button class="button button-primary" (click)="subscribeToNotifications()">
          Subscribe
        </button>
`})

/*@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})*/

export class AppComponent {
  title = 'AngularPwa';
  readonly VAPID_PUBLIC_KEY = "BNd5N-Y2tk_p5jcJmwa_bXP_ryoc9HXFeRkY0XV6RbvV3FCdM-5kHo9MzJSeMksQOilOLQyQy-CMsIFSr0O19kk";

  constructor(
    private swPush: SwPush,
    private ApiService:ApiService
  ) {
    this.swPush.notificationClicks.subscribe( arg =>
    {
      console.log(
        'Action: ' + arg.action,
        'Notification data: ' + arg.notification.data,
        'Notification data.url: ' + arg.notification.data.url,
        'Notification data.body: ' + arg.notification.body,
      );
      window.open(arg.notification.data.url, "_blank");
    });
  }

  subscribeToNotifications() {

    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => this.ApiService.sendToken(sub).subscribe(res => {console.log(res)}))
      .catch(err => console.error("Could not subscribe to notifications", err));
  }
}
