### 

1. 请求头
   ```typescript
   import { HttpHeaders } from '@angular/common/http';

   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': 'my-auth-token'
     })
   };

   httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');

   ```

2. 请求 非json 数据
   ```typescript
   const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'my-auth-token'})
      responseType: 'arraybuffer' | 'blob' | 'json' | 'text'
   };
   ```

3. 拦截请求和响应
   [insterceptor请求拦截器](./7-insterceptor请求拦截器.md)

4. 监听进度事件
   ```typescript
   import { Injectable } from '@angular/core';
   import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpEventType, HttpEvent } from '@angular/common/http';

   import { tap, map, last, catchError } from 'rxjs/operators';

   @Injectable({
     providedIn: 'root'
   })
   export class ApiService {

     constructor(private http: HttpClient) { }

     public localKoaHost = '/localkoa';

     // 上传文件  获取进度
     uploadTest(file) {
       const body = new FormData();
       body.append('file', file);
       const req = new HttpRequest('POST', `${this.localKoaHost}/upload`, body, {
         reportProgress: true,
       });
       console.log(req);

       return this.http.request(req).pipe(
         map(event => this.getEventMessage(event, file)),
         tap(message => message),
         // last(), // return last (completed) message to caller
         // catchError(this.handleError(file))
       );
     }
     private getEventMessage(event: HttpEvent<any>, file: File) {
       switch (event.type) {
         case HttpEventType.Sent:
           return `Uploading file "${file.name}" of size ${file.size}.`;
         case HttpEventType.UploadProgress:
           // Compute and show the % done:
           const percentDone = Math.round(100 * event.loaded / event.total);
           return `File "${file.name}" is ${percentDone}% uploaded.`;
         case HttpEventType.Response:
           return `File "${file.name}" was completely uploaded!`;
         default:
           return `File "${file.name}" surprising upload event: ${event.type}.`;
       }
     }
   }
   ```