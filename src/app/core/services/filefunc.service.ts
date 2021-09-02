import { Injectable } from '@angular/core';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { environment } from 'src/environments/environment';
import { IonicComponent } from '../components/ionic-component';
import { PostService } from './posts.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { LocalStorage } from '../storage/local-storage';
import { File } from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root'
})

export class FileFunc {

  constructor(
    private fileOpener: FileOpener,
    public ionicComp: IonicComponent,
    public postsService: PostService,
    private fileTranser: FileTransfer,
    private lclStr: LocalStorage,
    private file: File
  ) { }

  /**
   * Download and Open PDF file
   * @param fileUrl 
   */
  downloadAndOpenPdf = (fileUrl) => {
    this.downloadSingleFile(fileUrl).then(res => {
      this.fileOpener.showOpenWithDialog(res.nativeURL, 'application/pdf')
        .then(() => {
          console.log('File is opened')
          this.ionicComp.loadingCtrl.dismiss()
        })
        .catch(e => {
          console.log('Error opening file', e)
          this.ionicComp.loadingCtrl.dismiss()
        });
    }).catch(err => {
      console.log(err)
    })
  }

  /**
   * Download and show image
   * @param fileUrl 
   */
  downloadAndOpenImage = (fileUrl) => {
    this.downloadSingleFile(fileUrl).then(res => {
      this.fileOpener.showOpenWithDialog(res.nativeURL, 'application/pdf')
        .then(() => {
          console.log('File is opened')
          this.ionicComp.loadingCtrl.dismiss()
        })
        .catch(e => {
          console.log('Error opening file', e)
          this.ionicComp.loadingCtrl.dismiss()
        });
    }).catch(err => {
      console.log(err)
    })
  }

  /**
   * Open PDF file
   * @param fileUrl 
   */
  openFile = (fileUrl) => {
    this.fileOpener.showOpenWithDialog(fileUrl, 'application/pdf')
      .then(() => {
        console.log('File is opened')
        this.ionicComp.loadingCtrl.dismiss()
      })
      .catch(e => {
        console.log('Error opening file', e)
        this.ionicComp.loadingCtrl.dismiss()
      });
  }

  /**
   * Single File Upload
   * Either a Document or Image
   * @param path 
   * @param mime 
   * @returns 
   */
  uploadSingleData = async (path, mime) => {
    const headers = {
      'Authorization': 'Bearer ' + this.lclStr.getToken()
    };

    const url = `${environment.appBaseUrl}/upload/image`
    var options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      mimeType: mime,
      headers: headers
    }
    const fileTranser = this.fileTranser.create();
    return await fileTranser.upload(path, url, options, true)
  }

  /**
   * Single File Upload
   * Upload Image
   * @param path 
   * @returns 
   */
  uploadSingleImage = async (path) => {
    const headers = {
      'Authorization': 'Bearer ' + this.lclStr.getToken()
    };
    const url = `${environment.appBaseUrl}/upload/image`
    var options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      headers: headers
    }
    const fileTranser = this.fileTranser.create();
    return await fileTranser.upload(path, url, options, true)
  }

  /**
   * Multiple Files Upload At a time
   * @param path 
   */
  uploadMultiData = async (path) => {
    const headers = {
      'Authorization': 'Bearer ' + this.lclStr.getToken()
    };
    const url = `${environment.appBaseUrl}/upload/images`
    var options: FileUploadOptions = {
      fileKey: 'file',
      chunkedMode: false,
      mimeType: "multipart/form-data",
      headers: headers
    }
    const fileTranser = this.fileTranser.create();
    await fileTranser.upload(path, url, options).then(resp => {
      let res = JSON.parse(resp.response)
      return res
    })
  }

  /**
   * Download File and store in cache Directory
   * @param fileUrl 
   * @returns 
   */
  downloadSingleFile = async (fileUrl) => {
    let file = this.file.cacheDirectory
    const url = fileUrl
    var fileTranser = this.fileTranser.create();
    return await fileTranser.download(url, file + 'temp.jpeg')
  }

}
