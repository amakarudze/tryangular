import { Component, OnInit, OnDestroy } from '@angular/core';

import { VideoItem } from '../videos/video';
import { VideoService } from '../videos/videos.service';

@Component({
  selector: 'video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css'],
  providers: [VideoService]
})
export class VideoListComponent implements OnInit, OnDestroy {
  private req: any;
  title = 'Video list';
  // videoList = ["Item 1", "Item 2", "Item 3"];
  // todayDate;
  videoList: [VideoItem];

	constructor(private _video: VideoService) { }

  ngOnInit() {
	  // this.todayDate = new Date();
	  this.req = this._video.list().subscribe(data => {
	    this.videoList = data as [VideoItem];
    }); // the GET method
  }

  ngOnDestroy() {
    this.req.unsubscribe();
  }

}
