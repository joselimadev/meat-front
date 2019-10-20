import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormGroup, FormControl, FormBuilder, Form } from '@angular/forms';
import 'rxjs/operator/switchMap'

import { Restaurant } from 'app/models/restaurant.model';

import { RestaurantsService } from 'app/services/restaurants.service';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css'],
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        'max-height': '0px'
      })),
      state('visible', style({
        opacity: 1,
        'max-height': '70px',
        'margin-top': '20px'
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  public restaurants: Restaurant[];
  public searchBarState = 'hidden';
  public searchForm: FormGroup;
  public searchControl: FormControl;


  constructor(
    private restaurantsService: RestaurantsService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.searchControl = this.fb.control('');
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    });

    // Busca de restaurantes por parametro
    this.searchControl.valueChanges
      .switchMap((searchTerm) => this.restaurantsService.getRestaurants(searchTerm))
      .subscribe(restaurants => this.restaurants = restaurants)

    // Busca de todos os reaturantes
    this.restaurantsService.getRestaurants()
      .subscribe(restaurants => this.restaurants = restaurants);
  }

  toggleSearchBar() {
    this.searchBarState = this.searchBarState == 'hidden' ? 'visible' : 'hidden';
  }

}
