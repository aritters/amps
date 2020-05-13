import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { JokeStoreActions, JokeStoreSelectors, RootStoreState } from './../../../root-store';
import { Joke } from './../../../root-store/joke-store/models';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent implements OnInit {

  jokes$: Observable<Joke[]>;
  error$: Observable<any>;
  isLoading$: Observable<boolean>;

  constructor(private store$: Store<RootStoreState.State>) { }

  ngOnInit() {
    this.jokes$ = this.store$.select(
      JokeStoreSelectors.selectAllJokeItems
    );

    this.error$ = this.store$.select(
      JokeStoreSelectors.selectJokeError
    );

    this.isLoading$ = this.store$.select(
      JokeStoreSelectors.selectJokeIsLoading
    );

    this.store$.dispatch(
      new JokeStoreActions.LoadRequestAction()
    );
  }

  onRefresh() {
    this.store$.dispatch(
      new JokeStoreActions.LoadRequestAction()
    );
  }

}
