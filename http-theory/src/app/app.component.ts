import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators'
import { Post } from './post.model';
import { PostsService } from './posts.service';
// @ts-ignore
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  error?: string = undefined;
  private errorSubscription!: Subscription;

  constructor(private http: HttpClient,
              private postsService: PostsService) {}

  ngOnInit() {
    this.errorSubscription = this.postsService.error
      .subscribe((error: string) => this.error = error)
    this.isFetching = true;
    this.postsService.getPosts()
      .subscribe(
        (posts: Post[]) => {
          this.isFetching = false;
          this.loadedPosts = posts;
        },
        (error: Error) => {
          this.error = error.message
        }
      );
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsService.addPost(postData)
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postsService.getPosts()
      .subscribe({
          next: (posts: Post[]) => {
            this.isFetching = false;
            this.loadedPosts = posts;
          },
          error: (error: Error) => {
            this.isFetching = false
            this.error = error.message
          }
        }
      );
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts()
      .subscribe(() => {
        this.loadedPosts = [];
      });
  }

  onHandleError() {
    this.error = undefined;
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }
}
