import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx'
import { Subscription } from 'rxjs/internal/Subscription';
import { QuestionComponentService } from '../../../core/services/questionComponent.service';
import { QuestionDataServiceService } from '../../../core/services/question-data-service.service';
import { File } from '@ionic-native/file/ngx';
import { PostService } from '../../../core/services/posts.service';
import { IonicComponent } from '../../../core/components/ionic-component';
import { FileFunc } from 'src/app/core/services/filefunc.service';

@Component({
  selector: 'app-dynacamera',
  templateUrl: './dynacamera.component.html',
  styleUrls: ['./dynacamera.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DynacameraComponent implements OnInit, OnDestroy {
  editModeStatus = false;
  @Input() url;
  imageURL;
  _ref: any;

  map = new Map();
  counter;
  isEditing = false;
  confirmCheck;
  editCheck;
  editable = true;
  loadedData = [];

  index;

  fileURL;
  hasEnteredBefore;

  croppedImagepath = "";
  private componentSub: Subscription;
  private indexSub: Subscription;

  constructor(
    public camera: Camera,
    public qc: QuestionComponentService,
    public QDS: QuestionDataServiceService,
    private file: File,
    private postService: PostService,
    private ionicComp: IonicComponent,
    public fileFunc: FileFunc
  ) { }

  ngOnInit() {
    this.editCheck = true;
    this.hasEnteredBefore = this.QDS.getHasEnteredBefore();
    this.componentSub = this.qc.allcomponent.subscribe(components => {
      this.loadedData = components;
    });
    this.indexSub = this.qc.allIndex.subscribe(indexCount => {
      this.index = indexCount;
    });

    this.counter = this.QDS.getGlobalCounter();

    this.editModeStatus = this.QDS.getEditMode();

    if (this.editModeStatus == true) {
      if (this.hasEnteredBefore == false) {
        this.fileURL = this.url;
        this.downloadAndConvert();
        this.QDS.setHasEnteredBefore(true);
      }
    } else {
      console.log('Not in Edit-Mode');
    }
  }

  downloadAndConvert() {
    this.ionicComp.showSpinner({
      animated: true,
      message: 'Loading Image...',
      showBackdrop: true,
      spinner: "dots"
    })
    let editResUrl
    this.fileFunc.downloadSingleFile(this.fileURL).then(res => {
      editResUrl = res.nativeURL
      this.convertFileToBase64(editResUrl)
    }).catch(e => {
      console.log(e)
    })
  }

  takePicture(sourceType) {
    var options = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      encodingType: this.camera.EncodingType.JPEG,
    }
    this.camera.getPicture(options).then(imagePath => {
      this.fileURL = imagePath
      this.showFile(this.fileURL.split('?')[0])
    })
  }
  showFile(ImagePath) {
    this.convertFileToBase64(ImagePath)
  }
  convertFileToBase64(ImagePath) {
    var copyPath = ImagePath;
    var splitPath = copyPath.split('/');
    var imageName = splitPath[splitPath.length - 1];
    var filePath = ImagePath.split(imageName)[0];

    this.file.readAsDataURL(filePath, imageName).then(base64 => {
      this.croppedImagepath = base64;
    }, error => {
      alert('Error in showing image' + error);
    });
    this.ionicComp.loadingCtrl.dismiss()
  }

  openCamera() {
    this.takePicture(this.camera.PictureSourceType.CAMERA);
  }
  openGallery() {
    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
  }

  addingDataInArray() {
    this.loadedData.push(this.map.set(this.counter, {
      'Type': "image", 'file': {
        'url': this.fileURL
      }
    }));

    console.log('File URL: ->', this.fileURL)
  }

  confirm() {
    this.confirmCheck = true;
    this.editCheck = false;
    if (this.isEditing == true) {
      this.editDataInArray();
      this.isEditing = false;
    } else {
      this.addingDataInArray();
    }
  }
  edit() {
    this.isEditing = true;
    this.editCheck = true;
    this.confirmCheck = false;
  }
  editDataInArray() {
    let cpyLoaded = [...this.loadedData];
    cpyLoaded[this.counter] = this.loadedData.push(this.map.set(this.counter, {
      'Type': "image", 'file': {
        'url': this.fileURL
      }
    }));
    cpyLoaded.pop();
    this.loadedData.pop();
    this.loadedData = cpyLoaded;
  }

  remove() {
    let val = this.map.has(this.counter);
    let cpyData = [...this.loadedData];
    let tempArr = [];
    if (val) {
      this.map.delete(this.counter);
      cpyData.forEach(element => {
        if (element.size != 0) {
          tempArr.push(element);
        }
      });
      this.loadedData = tempArr;
      this._ref.destroy();
    }
    else {
      this._ref.destroy();
    }
    this.qc.index.next(this.index - 1);
  }

  resetComponent() {
    this.loadedData = [];
    this.map.clear();
  }

  ngOnDestroy() {
    if (this.componentSub && this.indexSub) {
      this.componentSub.unsubscribe();
      this.indexSub.unsubscribe();
    }
  }

}
