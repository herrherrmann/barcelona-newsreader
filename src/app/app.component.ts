import { Component, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { NewsPage } from "../pages/news/news";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = NewsPage;
  sources$: Observable<any>;

  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public http: Http
  ) {
    this.initializeApp();
    this.loadSources();
  }

  loadSources() {
    this.sources$ = this.http.get('https://newsapi.org/v1/sources')
      .map(res => res.json());
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(source) {
    this.nav.setRoot(NewsPage, {
      source: source.id,
    });

  }
}
