import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval,Observable, count } from 'rxjs';
import {map,filter} from 'rxjs/operators'


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
      const customIntervalObservable=new Observable<number>((observer)=>{
        let count=0;
        setInterval(()=>{
          observer.next(count);
          if(count===4){  
            observer.complete();
          }
           if(count>3){
            observer.error(new Error('Count is greater than 3!!'))
           }
          count++
        },1000)
      })

      // this.firstObsSubscription=customIntervalObservable. subscribe((count:number)=>{
      //   console.log("count",count)
      // },error=>{
      //   console.log(error)
      //   alert(error.message)
      // },()=>{
      //   console.log("Completed!!!")
      // })

      const mappedValue= customIntervalObservable.pipe(filter((count:number)=>{
        return count >0;
      }),map((count:number)=>{
         return 'Round :' +  (count +1) ;
      }))
      this.firstObsSubscription=mappedValue.subscribe({
        next: (count) => {
          console.log(count)
        }
          ,
        error: (error) => {
          console.error(error)
          alert(error.message)
        },
        complete: () => console.info('completed!!!') 
      })
      
   
  }

  ngOnDestroy(): void {
      this.firstObsSubscription.unsubscribe();
  }
}
