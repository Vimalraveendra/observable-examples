import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval,Observable, count } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  implements OnInit,OnDestroy{
  private firstObsSubscription:Subscription;

  constructor(){}

  ngOnInit(){
      // this.firstObsSubscription=interval(1000).subscribe(count=>{
      //     console.log("count",count)
      // })
      const customIntervalObservable=new Observable((observer)=>{
        let count=0;
        setInterval(()=>{
          observer.next(count);
          count++
        },1000)
      })
      this.firstObsSubscription=customIntervalObservable.subscribe(count=>{
        console.log("count",count)
      })
  }

  ngOnDestroy(): void {
      this.firstObsSubscription.unsubscribe();
  }
}
