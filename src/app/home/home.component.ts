import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { VideoItem } from '../videos/video';
import { VideoService } from '../videos/videos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [VideoService]
})
export class HomeComponent implements OnInit {
  private req: any;
  homeImageList: [VideoItem] = [] as [VideoItem];
  videoListDefaultImage = 'assets/images/nature/1.jpg';

  constructor(private _video: VideoService, private router: Router) {
  }

  ngOnInit() {
    this.req = this._video.list().subscribe(data => {
      data.filter(item => {
        if (item.featured) {
          this.homeImageList.push(item);
        }
      });
    }); // the GET method
  }

  ngOnDestroy() {
    this.req.unsubscribe();
  }

  preventNormal(event: MouseEvent, image: any) {
    if (!image.prevented) {
      event.preventDefault();
      // image.setAttribute('href', '/videos');
      // image.link = '/videos';
      // image.prevented = true;
      this.router.navigate(['./videos']);
    }
  }
}
