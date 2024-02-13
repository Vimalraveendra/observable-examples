import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit,OnDestroy{
  title = 'observables-example';
   userEmitter=false;
   private firstSubjSubscription:Subscription;

   constructor(private userService:UserService){}
   ngOnInit() {
       this.firstSubjSubscription=this.userService.activatedEmitter.subscribe(
        (didActivate)=>{
          this.userEmitter=didActivate;
        }
       )
   }
   ngOnDestroy(): void {
       this.firstSubjSubscription.unsubscribe()
   }
}
