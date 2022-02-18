import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Post } from './post.model';
import { catchError, map, tap } from 'rxjs/operators';
// @ts-ignore
import { Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  error: Subject<string> = new Subject<string>();
  baseUrl: string = 'https://angular-intro-4967b-default-rtdb.europe-west1.firebasedatabase.app/';

  constructor(private http: HttpClient) { }

  addPost(postData: Post) {
    this.http
      .post<{ name: string }>(
        this.baseUrl + '/posts.json',
        postData,
        {
          observe: 'response'
        }
      )
      .subscribe({
        next: (responseData: HttpResponse<any>) => {
          console.log(responseData);
        },
        error: (error: Error) => {
          this.error.next(error.message);
        }
      })
  }

  getPosts(): Observable<Post[]> {
    return this.http
      .get<{ [key: string]: Post }>(
        this.baseUrl + '/posts.json',
        {
          headers: new HttpHeaders({ 'Custom-Header': 'hello' }),
          params: new HttpParams().set('print', 'heya')
        })
      .pipe(
        map((responseData: { [key: string]: Post }) => {
          if (responseData == null) return [];

          const postsArray: Post[] = []

          Object.keys(responseData).forEach((key: string) => {
            postsArray.push({ ...responseData[key], id: key })
          })

          return postsArray;
        }),
        catchError((errorRes) => {
          //... do some backend stuff with that error
          return throwError(errorRes);
        })
      )
  }

  deletePosts() {
    // const posts = this.getPosts();
    return this.http
      .delete(
        this.baseUrl + '/posts.json',
        {
          observe: 'events',
          responseType: 'text'
        }
      )
      .pipe(tap((event: HttpEvent<any>) => {
        console.log(event)
        if (event.type === HttpEventType.Sent) {
          //... inform user that response was sent
        }
        if (event.type === HttpEventType.Response) {
          console.log(event.body)
        }
      }));
  }
}
