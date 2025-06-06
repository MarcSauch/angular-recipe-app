import { Injectable } from '@angular/core';
import { ReceiptCardInterface } from '../interfaces/receipt-card';

@Injectable({
  providedIn: 'root'
})
export class ReceiptCard {
 receipts_card : Array<ReceiptCardInterface>= [
    {
      name: "5 minute Soup",
      image: "chicken-noodle-soup",
      description: "Quick and easy chicken soup",
      favorite: false
    },
    {
      name:"Pasta Salad",
      image: "pasta",
      description: "Quick and easy chicken soup",
      favorite : false
    },
    {
      name: "Vegan Cake",
      image: "vegan_cake",
      description: "Quick and easy chicken soup",
      favorite : false
    }
    
  ]


  constructor() { }

  get_data()
  // mock api call , will change to return an observable 
  {
    return this.receipts_card
  }
  get_card_data(index:number) : ReceiptCardInterface | undefined
  // mock api call , will change to return an observable 
  {
    if (index > this.receipts_card.length)
    {
      console.log("out of bounds")
      return undefined
    }
    else{
      return this.receipts_card[index]
    }
  }
  
}
