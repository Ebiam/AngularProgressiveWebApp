import { Component } from '@angular/core';
import {SwPush} from "@angular/service-worker";

class NewsletterService {
}

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
    /*private newsletterService: NewsletterService*/
  ) {}

  subscribeToNotifications() {

    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => console.log(sub))
      .catch(err => console.error("Could not subscribe to notifications", err));
  }
}
