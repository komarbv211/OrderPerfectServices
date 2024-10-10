import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { MatButtonModule } from '@angular/material/button'; // Додано MatButtonModule
import { NgFor } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mat-star-rating',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule, MatButtonModule, NgFor],
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class StarRatingComponent implements OnInit {

  @Input('rating') public rating: number = 3; 
  @Input('starCount') public starCount: number = 5; 
  @Input('color') public color: string = 'accent'; 
  @Output() public ratingUpdated = new EventEmitter<number>(); 

  public ratingArr: number[] = []; 
  private totalVotes: number = 0; 
  private totalRating: number = 0; 
  
  ngOnInit() {
    this.ratingArr = Array(this.starCount).fill(0); 
  }

  onClick(rating: number): void {
    this.totalVotes += 1;
    this.totalRating += rating;
    this.rating = this.totalRating / this.totalVotes;
    this.ratingUpdated.emit(Number(this.rating.toFixed(1))); 
  }

  getStarIcon(index: number): string {
    if (this.rating >= index + 1) {
      return 'star'; 
    } else if (this.rating >= index + 0.1) {
      return 'star_half'; 
    } else {
      return 'star_border'; 
    }
  }
}
