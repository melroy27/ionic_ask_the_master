import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Platform } from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Subscription } from 'rxjs/internal/Subscription';
import { QuestionComponentService } from '../../../core/services/questionComponent.service';
import { QuestionDataServiceService } from '../../../core/services/question-data-service.service';
import { IonicComponent } from '../../../core/components/ionic-component';
import { SpecialfunctionsService } from 'src/app/core/services/specialfunctions.service';
import { FileFunc } from 'src/app/core/services/filefunc.service';

@Component({
  selector: 'app-dynapdf',
  templateUrl: './dynapdf.component.html',
  styleUrls: ['./dynapdf.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})

export class DynapdfComponent implements OnInit {
  @Input() url;
  editModeStatus = false;
  fileUrl;
  fileName;
  base64String;
  temp;

  map = new Map();
  counter;
  isEditing = false;
  confirmCheck;
  editCheck;
  editable = true;
  loadedData = [];

  hasEnteredBefore;

  private componentSub: Subscription;
  private indexSub: Subscription;
  _ref: any;

  index;
  constructor(
    public qc: QuestionComponentService,
    private fileChooser: FileChooser,
    private platform: Platform,
    private fileOpener: FileOpener,
    private filePath: FilePath,
    public QDS: QuestionDataServiceService,
    public ionicComp: IonicComponent,
    public splFuncs: SpecialfunctionsService,
    public fileFunc: FileFunc
  ) { }


  ngOnInit() {
    this.editCheck = true;
    this.hasEnteredBefore = false;
    // behaviour subjects
    this.componentSub = this.qc.allcomponent.subscribe(components => {
      this.loadedData = components;
    });
    // behaviour subject for viewContainer Ref
    this.indexSub = this.qc.allIndex.subscribe(indexCount => {
      this.index = indexCount;
    });

    this.counter = this.QDS.getGlobalCounter();

    this.editModeStatus = this.QDS.getEditMode();
    if (this.editModeStatus == true) {
      if (this.hasEnteredBefore == false) {
        this.hasEnteredBefore = true;
        this.fileUrl = this.url;
      }
    } else {
      console.log('Not in Edit-Mode');
    }
  }

  uploadPdf() {
    if (this.platform.is('android')) {
      this.fileChooser.open({ "mime": "application/pdf" })
        .then(uri => {
          this.filePath.resolveNativePath(uri)
            .then(filePath => {
              this.fileUrl = filePath;
              console.log('File URL', this.fileUrl)
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }

  }

  addingDataInArray() {
    this.loadedData.push(this.map.set(this.counter, {
      'Type': "document", 'file': {
        'url': this.fileUrl
      }
    }));
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
      'Type': "document", 'file': {
        'url': this.fileUrl
      }
    }));
    cpyLoaded.pop();
    this.loadedData.pop();
    this.loadedData = cpyLoaded;
  }

  openDocument() {
    if (this.editModeStatus == true) {
      this.fileUrl = this.url
      this.ionicComp.showSpinner({
        animated: true,
        message: 'Opening Pdf...',
        showBackdrop: true,
        spinner: "dots"
      })
      this.fileFunc.downloadAndOpenPdf(this.fileUrl)
    }
    this.fileFunc.openFile(this.fileUrl)
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