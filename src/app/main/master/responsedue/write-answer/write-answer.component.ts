import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

import { EditorChangeContent, EditorChangeSelection, Focus, Range, QuillEditorComponent } from 'ngx-quill';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IonicComponent } from '../../../../core/components/ionic-component';
import { PostService } from '../../../../core/services/posts.service';
import { AnswerService } from '../../../../core/services/answer.service';
import { QuestionDataServiceService } from '../../../../core/services/question-data-service.service';
import { LocalStorage } from '../../../../core/storage/local-storage';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs/internal/Subscription';
import { QuestionComponentService } from '../../../../core/services/questionComponent.service';
import { HelperfuncService } from '../../../../core/services/helperfunc.service';
import { FileFunc } from '../../../../core/services/filefunc.service';

@Component({
  selector: 'app-write-answer',
  templateUrl: './write-answer.component.html',
  styleUrls: ['./write-answer.component.scss'],
})
export class WriteAnswerComponent implements OnInit, OnDestroy {

  /*
   * This is the question's Data
   */
  CarExtra;
  PostData;
  AnswerData;
  headerTitle = "Write Answer"
  sections = [];
  loadedComponents = [];
  componentSub: Subscription;
  indexSub: Subscription;
  btnText = "Submit"

  modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],        // toggled buttons 
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],        // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'align': [] }],
    ]
  };
  answerTitle: FormGroup
  titleData = '';
  userData = "";
  expand;
  editMode;
  index: number;
  constructor(
    public quesCom: QuestionComponentService,
    private QDS: QuestionDataServiceService,
    public IonicComp: IonicComponent,
    public postService: PostService,
    public lclStr: LocalStorage,
    private ansService: AnswerService,
    private navCtrl: NavController,
    public fb: FormBuilder,
    public helperFunc: HelperfuncService,
    public fileFun: FileFunc
  ) { }

  @ViewChild('quillEditor', {
  }) editor: QuillEditorComponent

  @ViewChild('loadcontainer', { read: ViewContainerRef }) entry: ViewContainerRef;

  ngOnInit() {
    this.userData = this.lclStr.getFullUserData();
    if (this.editMode == true) {

      this.titleData = this.AnswerData.title

      this.answerTitle = this.fb.group({
        'editor': this.titleData
      })
    } else {
      this.answerTitle = new FormGroup({
        'editor': new FormControl(null)
      });
    }

    this.componentSub = this.quesCom.allcomponent.subscribe(components => { // behaviour subject
      this.loadedComponents = components;
    });
    this.indexSub = this.quesCom.allIndex.subscribe(indexCount => {// behaviour subject for viewContainer Ref
      this.index = indexCount;
      console.log('Index is: ', this.index);
    });
  }

  ngAfterViewInit() {
    if (this.editMode == true) {
      this.QDS.setEditMode(true)
      this.sections = this.AnswerData.sections

      this.sections.forEach((value, index) => {

        console.log('Before checking...', value, index)

        if (value['Type'] == 'text') {
          this.helperFunc.openContainer('textcontainer', this.entry, value['Text'])
        } else if (value['Type'] == 'document') {
          this.helperFunc.openContainer('documentcontainer', this.entry, value['file']['url'])
        } else if (value['Type'] == 'image') {
          this.helperFunc.openContainer('cameracontainer', this.entry, value['file']['url'])
        }
      });
    }
  }

  changeEditor(editorData: EditorChangeContent | EditorChangeSelection | Focus) {
    this.titleData = editorData['editor']['root']
    ['innerHTML'];
  }

  onChange(editor) {
    editor.focus();
  }

  openDynaComponents = (type: string) => {
    this.helperFunc.openContainer(type, this.entry)
  }


  show() {
    if (this.expand == true) {
      this.expand = false;
    } else {
      this.expand = true;
    }
  }

  checkType = (data) => {
    this.helperFunc.isHtml(data);
    this.helperFunc.isImage(data);
    this.helperFunc.isDocument(data);
  }

  openDocument(file) {
    this.IonicComp.loadingCtrl.create({
      animated: true,
      message: 'Opening Pdf...',
      showBackdrop: true,
      spinner: "dots"
    }).then(onFullfill => {
      onFullfill.present();
    })
    this.fileFun.downloadSingleFile(file).then(res => {
      this.fileFun.openFile(res.nativeURL);
    }).catch(err => {
      console.log(err)
    })
  }

  async onSubmit() {
    let finalData = [];
    let qid = this.PostData['id']
    const answerTitle = this.titleData

    finalData = await this.helperFunc.settingSections(this.loadedComponents)

    var answeredBy = {
      "userId": this.userData['uid'],
      "name": this.userData['name']
    }

    console.log('QID:', qid, 'answeredBy:', answeredBy, 'Sections:', finalData, 'Title:', answerTitle)

    if (this.editMode == true) {
      this.ansService.updateAnswer(this.AnswerData.questionId, this.AnswerData._id, answeredBy, finalData, answerTitle).subscribe(res => {
        if (res['success'] === true) {
          this.IonicComp.showToast("Answer Updated Successfully");
          this.IonicComp.modalController.dismiss();
          this.IonicComp.loadingCtrl.dismiss(null, null, 'uploadSingleSpinner')
          this.reseting()
          this.navCtrl.navigateBack('/main/master/tabs/searchquestion')
        } else {
          this.IonicComp.loadingCtrl.dismiss(null, null, 'uploadSingleSpinner')
          this.IonicComp.showToast("Couldn't Update Answer");
        }
      })
    } else {
      this.ansService.addAnswer(qid, finalData, answerTitle, answeredBy).subscribe(res => {
        if (res['success'] === true) {
          this.IonicComp.showToast("Answer Created Successfully");
          this.IonicComp.modalController.dismiss();
          this.IonicComp.loadingCtrl.dismiss(null, null, 'uploadSingleSpinner')
          this.reseting()
          this.navCtrl.navigateBack('/main/master/tabs/responsedue')
        } else {
          this.IonicComp.loadingCtrl.dismiss(null, null, 'uploadSingleSpinner')
          this.IonicComp.showToast("Couldn't Create Answer");
        }
      })
    }
  }

  closeModal() {
    this.IonicComp.closeModal();
  }

  reseting() {
    this.QDS.setGlobalCounter(0);
    this.loadedComponents = [];
  }
  ngOnDestroy() {
    console.log('Question Component is destroyed')
    if (this.componentSub && this.indexSub) {
      this.componentSub.unsubscribe();
      this.indexSub.unsubscribe();
    }
  }
}
