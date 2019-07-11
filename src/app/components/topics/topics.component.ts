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
  public number_pages;
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
    this._route.params.subscribe(params => {
      var page = +params['page'];

      if (!page || page == null || page == undefined) {
        page = 1;
        this.prev_page = 1;
        this.next_page = 2;
      }
      this.getTopics(page);
    });

  }

  getTopics(page = 1) {
    this._topicService.getTopics(page).subscribe(
      response => {
        if (response.topics) {
          this.topics = response.topics;

          // Navegación de paginación
          this.totalPages = response.totalPages;

          var number_pages = [];
          for (var i = 1; i <= this.totalPages; i++) {
            number_pages.push(i);
          }
          this.number_pages = number_pages;

          if (page >= 2) {
            this.prev_page = page - 1;
          } else {
            this.prev_page = 1;
          }

          if (page < this.totalPages) {
            this.next_page = page + 1;
          } else {
            this.next_page = this.totalPages;
          }

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
