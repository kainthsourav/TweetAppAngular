import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";


const httpOptions1 = {
  headers: new HttpHeaders({
               'Content-Type': 'application/json',
               'Access-Control-Allow-Origin': '*',
               'Access-Control-Allow-Credentials': 'true'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthorizedService {
  token : String;
  url = environment.url;
  loginId : any;
  private loggedIn = false;

  
  constructor(private http: HttpClient) { }

  public getUserLoginId()
  {
    if (localStorage.getItem("loginId")) 
    {
      this.loginId = localStorage.getItem("loginId") == null ? "" : localStorage.getItem("loginId");
    }  
    return this.loginId;     
  }

  public getAllUsers() {
    console.log('hi');
    return this.http.get(this.url +  "users/all");
  }

  public getAllTweets()
  {
    return this.http.get(this.url +  "all");
  }
  
  public getLatestTweet()
  {
    return this.http.get(this.url +  "latestTweet");
  }

  public getTweetById(tweetId : string, userId : string)
  {
    console.log(tweetId);
    return this.http.get(this.url + "tweetById/" + tweetId + "/userId/" + userId);
  }

  public getTweetCommentsById(tweetId : string)
  {
    return this.http.get(this.url + "tweetCommentsById/" + tweetId);
  }

  public getTweetLikesById(tweetId : string)
  {
    return this.http.get(this.url + "GetTweetLikesByTweetId/" + tweetId);
  }

  public getTweetsByUserName(username : string)
  {
    return this.http.get(this.url + username);
  }


  public searchUserTweet(username : string)
  {
    return this.http.get(this.url + "user/search/" + username);
  }

  public getUserById(userId : string)
  {
    return this.http.get(this.url + "GetUserById/" + userId);
  }

  public getUserByUserName(username : string)
  {
    return this.http.get(this.url + "GetUserByUsername/" + username);
  }

   // Post Data In Db - API
  public changePassword(user : any) {
    console.log(user);
    return this.http
      .put(this.url + "ChangePassword/" + this.getUserLoginId(),  user, httpOptions1)
      .pipe(map(data1 => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public createTweet(tweet : any) {
    console.log(tweet);
    return this.http
      .post(this.url + tweet.loginId + "/add", tweet, httpOptions1)
      .pipe(map(data1 => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  public addComment(userComment: any)
  {
    console.log(userComment);
    return this.http
      .post(this.url + "addComment", userComment, httpOptions1)
      .pipe(map(data1 => (data1 = JSON.parse(JSON.stringify(data1)))));
  }

  
  public addLike(userLike: any)
  {
    console.log(userLike);
    return this.http
      .post(this.url + "LikeTweet", userLike, httpOptions1)
      .pipe(map(data1 => (data1 = JSON.parse(JSON.stringify(data1)))));
  }
  

}
 