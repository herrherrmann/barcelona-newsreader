import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

@IonicPage({
  name: 'news',
  segment: 'news/:source',
})
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  articles$: Observable<any>;
  apiKey: string = '532eb943fa554087939def20f4f8729f';
  currentSource: string = 'the-verge';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http) {
  }

  ionViewDidLoad() {
    this.loadArticles();
  }

  loadArticles() {
    this.currentSource = this.navParams.data.source || this.currentSource;
    const params = {
      source: this.currentSource,
      apiKey: this.apiKey,
    };
    this.articles$ = this.http.get(`https://newsapi.org/v1/articles`, { params })
      .map(res => res.json());
  }

}
