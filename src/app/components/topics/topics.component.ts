import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Topic } from '../../models/topic';
import { TopicService } from '../../services/topic.service';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css'],
  providers: [TopicService, UserService]
})
export class TopicsComponent implements OnInit {

  public page_title: string;
  public topics: Topic[];
  public totalPages;
  public page;
  public next_page;
  public prev_page;
  public url;
  public identity;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _topicService: TopicService,
    private _userService: UserService
  ) {
    this.identity = this._userService.getIdentity();
    this.page_title = 'Temas';
    this.url = global.url;
  }

  ngOnInit() {
    this.getTopics(1);
  }

  getTopics(page = 1) {
    this._topicService.getTopics(page).subscribe(
      response => {
        if (response.topics) {
          this.topics = response.topics;

          // Navegación de paginación
        } else {
          this._router.navigate(['/inicio']);
        }
      },
      error => {
        console.log(error)
      }
    );
  }

}
