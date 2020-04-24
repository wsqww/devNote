### 实现 自定义audio样式，隐藏H5默认audio样式

1. 播放/暂停/重播 音频
2. 拖动改变 音频播放进度
3. 修改音频播放音量
-----   

这里使用angular作事例代码

#### html
```html
<div class="audio-player">
  <div class="play-name" [title]="name">{{name}}</div>
  <div class="play-progress">
    <p #progressBg class="progress-bar" (mousemove)="mouseMove($event)" (mouseleave)="mouseUp()">
      <span [ngStyle]="{width: progressRate}">
        <i #progressDot (mousedown)="mouseDown($event)"></i>
      </span>
    </p>
    <span class="progress-time">{{audioCurrentTime}}/{{audioDuration}}</span>
  </div>
  <ul class="play-tools">
    <li *ngIf="!playing" (click)="play()">播放</li>
    <li *ngIf="playing" (click)="pause()">暂停</li>
    <li (click)="rePlay()">重播</li>
    <li class="volume">
      <span>音量</span>
      <div class="volume-bar">
        <span (click)="changeVolume('+')">+</span>
        <span>{{audioVolume}}</span>
        <span (click)="changeVolume('-')">-</span>
      </div>
    </li>
  </ul>
  <audio #audio [src]="src"></audio>
</div>
```
   
#### scss
```scss
.audio-player {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, .3);
  padding: 0 30px;
  font-size: 14px;
  line-height: 30px;

  .play-name {
    min-width: 100px;
    max-width: 150px;
    padding: 0 10px;
    margin-right: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: default;
  }

  .play-progress {
    flex: 1;
    display: flex;
    align-items: center;

    .progress-bar {
      flex: 1;
      height: 6px;
      background-color: #ddd;
      // margin: 0 10px;

      span {
        display: block;
        height: 100%;
        position: relative;
        background-color: #0c9;

        i {
          position: absolute;
          right: 0px;
          top: 50%;
          transform: translate(50%, -50%);
          display: block;
          height: 14px;
          width: 14px;
          border-radius: 50%;
          border: 1px solid #0c9;
          background-color: #fff;
        }
      }
    }

    .progress-time {
      padding-left: 20px;
    }
  }

  .play-tools {
    display: flex;
    padding: 0 10px;
    -moz-user-select:none; /*火狐*/
    -webkit-user-select:none; /*webkit浏览器*/
    -ms-user-select:none; /*IE10*/
    -khtml-user-select:none; /*早期浏览器*/
    user-select:none;

    li {
      padding: 0 5px;
      cursor: pointer;

      &.volume {
        position: relative;
        &:hover {
          .volume-bar {
            display: flex;
          }
        }
        .volume-bar {
          position: absolute;
          // display: flex;
          display: none;
          flex-direction: column;
          vertical-align: center;
          width: 40px;
          height: 110px;
          left: 50%;
          bottom: 0;
          transform: translate(-50%, -24px);
          padding: 10px 0;
          box-shadow: 0 0 10px 1px rgba(0, 0, 0, .1);
          border-radius: 30px;
          background-color: #fff;
          cursor: pointer;
          span {
            display: block;
            text-align: center;
            flex: 1;
          }
        }
      }
    }
  }
}

```
   
#### Ts
```typescript
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { AudioPlayerService } from './audio-player.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit, OnDestroy {

  constructor(
    private audioService: AudioPlayerService,
  ) { }

  @ViewChild('audio', { static: true }) audio: ElementRef;
  @ViewChild('progressDot', { static: true }) progressDot: ElementRef;
  @ViewChild('progressBg', { static: true }) progressBg: ElementRef;

  public audioReady = false;

  public src = '';
  public name = '等待播放';
  public audioDuration = '00:00';
  public audioCurrentTime = '00:00';
  public audioVolume = 0;
  public progressRate = '0%';

  public playing = false;

  public dotPosition = {
    oriOffestLeft: 0, // 移动开始时进度条的点距离进度条的偏移值
    oriX: 0, // 移动开始时的x坐标
    maxLeft: 0, // 向左最大可拖动距离
    maxRight: 0 // 向右最大可拖动距离
  };
  public dotDragFlag = false; // 标记是否拖动开始

  ngOnInit() {
    this.audioSet('@/assets/audio/朴树-空帆船.mp3');
  }

  ngOnDestroy() {
    this.clearEventListener();
  }

  // 设置 音频链接
  audioSet(src: string) {
    this.src = src;
    const audio = this.audio.nativeElement;

    // 元数据已加载
    audio.addEventListener('loadedmetadata', () => {
      this.setDuration();
      this.audioVolume = Math.round(this.audio.nativeElement.volume * 100);
    });
    // 进度更新
    audio.addEventListener('timeupdate', () => { this.setCurentTime(); });
    // 播放结束
    audio.addEventListener('ended', () => { this.ended(); });

    // 拖动结束
    document.addEventListener('mouseup', () => { this.mouseUp(); } );

    this.audioReady = true;
  }

  // 音频时长
  setDuration() {
    this.audioDuration = this.ransTime(this.audio.nativeElement.duration);
  }

  // 播放时长
  setCurentTime() {
    const audio = this.audio.nativeElement;
    this.audioCurrentTime = this.ransTime(audio.currentTime);
    this.progressRate = Math.round((Math.floor(audio.currentTime) / Math.floor(audio.duration)) * 100) + '%';
  }

  // 播放
  play() {
    if (!this.audioReady) { return false; }
    this.audio.nativeElement.play();
    this.playing = true;
  }

  // 重播
  rePlay() {
    this.audio.nativeElement.currentTime = 0;
    this.play();
  }

  // 暂停
  pause() {
    this.audio.nativeElement.pause();
    this.playing = false;
  }

  // 播放结束
  ended() {
    this.audio.nativeElement.currentTime = 0;
    this.pause();
    this.playing = false;
  }

  // 时间转换
  ransTime(time) {
    const duration = parseInt(time, 10);
    let minute = String(parseInt(String(duration / 60), 10));
    let sec = String(duration % 60);
    const isM0 = ':';
    if (minute === '0') {
      minute = '00';
    } else if (Number(minute) < 10) {
      minute = '0' + minute;
    }
    if (sec.length === 1) {
      sec = '0' + sec;
    }
    return minute + isM0 + sec;
  }

  // 清除事件监听
  clearEventListener() {
    const audio = this.audio.nativeElement;
    audio.removeEventListener('loadedmetadata');
    audio.removeEventListener('timeupdate');
    audio.removeEventListener('ended');

    this.progressDot.nativeElement.removeEventListener('mousedown');
    this.progressBg.nativeElement.removeEventListener('mousemove');
    document.removeEventListener('mouseup', () => { this.mouseUp(); });
  }

  // 鼠标 事件
  mouseDown(event) {
    const audio = this.audio.nativeElement;
    if ( !this.playing || audio.currentTime === 0) {
      // 只有音乐开始播放后才可以调节，已经播放过但暂停了的也可以
      return false;
    }
    this.dotDragFlag = true;

    this.dotPosition.oriOffestLeft = this.progressDot.nativeElement.offsetLeft;
    this.dotPosition.oriX = event.touches ? event.touches[0].clientX : event.clientX; // 要同时适配mousedown和touchstart事件
    this.dotPosition.maxLeft = this.dotPosition.oriOffestLeft; // 向左最大可拖动距离
    this.dotPosition.maxRight = this.progressBg.nativeElement.offsetWidth - this.dotPosition.oriOffestLeft; // 向右最大可拖动距离

    // 禁止默认事件（避免鼠标拖拽进度点的时候选中文字）
    if (event && event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }

    // 禁止事件冒泡
    if (event && event.stopPropagation) {
      event.stopPropagation();
    } else {
      window.event.cancelBubble = true;
    }
  }

  mouseMove(event) {
    if (!this.dotDragFlag) {
      return false;
    }

    const audio = this.audio.nativeElement;
    const clientX = event.touches ? event.touches[0].clientX : event.clientX; // 要同时适配mousemove和touchmove事件
    let length = clientX - this.dotPosition.oriX + (this.progressDot.nativeElement.offsetWidth);
    if (length > this.dotPosition.maxRight) {
      length = this.dotPosition.maxRight;
    } else if (length < -this.dotPosition.maxLeft) {
      length = - this.dotPosition.maxLeft;
    }
    const pgsWidth = this.progressBg.nativeElement.offsetWidth;
    const rate = (this.dotPosition.oriOffestLeft + length) / pgsWidth;
    audio.currentTime = audio.duration * rate;
  }

  mouseUp() {
    this.dotDragFlag = false;
  }

  // 修改播放音量
  changeVolume(type: '+' | '-') {
    let volume = this.audio.nativeElement.volume * 100;

    if (type === '+') { volume += 10; }
    if (type === '-') { volume -= 10; }

    volume = volume >= 100 ? 100 : volume;
    volume = volume <= 0 ? 0 : volume;

    this.audioVolume = volume;
    this.audio.nativeElement.volume = volume / 100; // 0～1
  }
}

```
   