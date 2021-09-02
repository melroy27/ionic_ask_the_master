import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EditorChangeContent, EditorChangeSelection, Focus, Range, QuillEditorComponent } from 'ngx-quill';
import { Subscription } from 'rxjs/internal/Subscription';
import { QuestionComponentService } from '../../../core/services/questionComponent.service'
import { QuestionDataServiceService } from '../../../core/services/question-data-service.service'
@Component({
  selector: 'app-dynatext',
  templateUrl: './dynatext.component.html',
  styleUrls: ['./dynatext.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DynatextComponent implements OnInit {
  @Input() quill
  editModeStatus = false;
  map = new Map();
  counter;

  isEditing = false;

  _ref: any;

  confirmCheck;
  editCheck;
  editorForm: FormGroup;
  textEditorData = '';
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
  loadedData = [];

  data = ""
  index;
  focused = false
  private componentSub: Subscription;
  private indexSub: Subscription;

  constructor(
    public qc: QuestionComponentService,
    public QDS: QuestionDataServiceService,
    public fb: FormBuilder
  ) { }

  @ViewChild('editor', {
  }) editor: QuillEditorComponent

  ngOnInit() {
    // behaviour subject
    this.componentSub = this.qc.allcomponent.subscribe(components => {
      this.loadedData = components;
    });
    // behaviour subject for viewContainer Ref
    this.indexSub = this.qc.allIndex.subscribe(indexCount => {
      this.index = indexCount;
    });

    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    });

    this.counter = this.QDS.getGlobalCounter();
    this.editModeStatus = this.QDS.getEditMode();
    this.editCheck = true;

    if (this.editModeStatus == true) {
      this.editorForm = this.fb.group({
        editor: this.quill
      })
    } else {
      console.log('Not in Edit-Mode');
    }

  }

  changeEditor(editorData: EditorChangeContent | EditorChangeSelection | Focus) {
    this.textEditorData = editorData['editor']['root']
    ['innerHTML'];
  }

  onChange(editor) {
    editor.focus();
  }


  addingDataInArray() {
    this.loadedData.push(this.map.set(this.counter, {
      'Type': "text", 'Text': this.textEditorData
    }));
  }

  editDataInArray() {
    let cpyLoaded = [...this.loadedData];
    cpyLoaded[this.counter] = this.loadedData.push(this.map.set(this.counter, {
      'Type': "text", 'Text': this.textEditorData
    }));
    cpyLoaded.pop();
    this.loadedData.pop();
    this.loadedData = cpyLoaded;
  }

  confirm() {
    this.editorForm.controls.editor.disable();
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
    this.editorForm.controls.editor.enable()
    this.isEditing = true;
    this.editCheck = true;
    this.confirmCheck = false;
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
