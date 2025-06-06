import { Component } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { ReceiptCard } from '../../services/receipt-card';
import { ReceiptCardInterface } from '../../interfaces/receipt-card';
import {MatCardModule} from '@angular/material/card';
import { MatCard, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle } from '@angular/material/card';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  imports: [MatCardModule,MatList,MatCardImage,CommonModule,],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  reciepts : Array<ReceiptCardInterface> = []
  constructor(private reciept_service : ReceiptCard){
    // recieves data from api
    let data = reciept_service.get_data()
    // sorts data based on if they favorited the item
    data.sort((a, b) => Number(b.favorite) - Number(a.favorite));
    // save the list to be rendered by the front end
    this.reciepts = reciept_service.get_data()
  }

  on_click(index: number)
  {
    if(this.reciepts[index].favorite == true)
    {
      this.reciepts[index].favorite = !this.reciepts[index].favorite
      this.reciepts.sort((a, b) => Number(b.favorite) - Number(a.favorite));
    }
    else{
      this.reciepts[index].favorite = !this.reciepts[index].favorite
      this.reciepts.unshift(this.reciepts.splice(index, 1)[0]);
    }
  
  }
}
