import { ComponentFactoryResolver, Injectable, OnInit, ViewContainerRef } from '@angular/core';
import { async } from 'rxjs/internal/scheduler/async';
import { Subscription } from 'rxjs/internal/Subscription';
import { DynacameraComponent } from '../../shared/components/dynacamera/dynacamera.component';
import { DynapdfComponent } from '../../shared/components/dynapdf/dynapdf.component';
import { DynatextComponent } from '../../shared/components/dynatext/dynatext.component';
import { IonicComponent } from '../components/ionic-component';
import { FileFunc } from './filefunc.service';
import { QuestionDataServiceService } from './question-data-service.service';
import { QuestionComponentService } from './questionComponent.service';

@Injectable({
  providedIn: 'root'
})

export class HelperfuncService implements OnInit {
  constructor(
    private resolver: ComponentFactoryResolver,
    private QDS: QuestionDataServiceService,
    public IonicComp: IonicComponent,
    public fileFun: FileFunc,
    public quesCom: QuestionComponentService
  ) { }

  indexSub: Subscription;
  index: number;

  ngOnInit() {
    this.indexSub = this.quesCom.allIndex.subscribe(indexCount => {// behaviour subject for viewContainer Ref
      this.index = indexCount;
    });
  }

  isHtml = (data: string) => {
    let res = data
    if (res['Type'] === 'text') {
      return true
    }
  }

  isImage = (data: string) => {
    let res = data
    if (res['Type'] === 'image') {
      return true
    }
  }

  isDocument = (data) => {
    let res = data
    if (res['Type'] === 'document') {
      return true
    }
  }

  openContainer = (typeOfC: string, entry?: ViewContainerRef, data?: any) => {
    if (typeOfC === 'textcontainer') {

      const factory = this.resolver.resolveComponentFactory(DynatextComponent);

      const componentRef = entry.createComponent(factory);
      componentRef.instance._ref = componentRef;

      componentRef.instance.quill = data

      let c = entry.indexOf(componentRef.hostView);
      this.quesCom.index.next(c);

      // this is a component ref for my use
      let count = this.QDS.getGlobalCounter();
      count = count + 1;
      this.QDS.setGlobalCounter(count);

    }
    else if (typeOfC === 'cameracontainer') {
      const factory = this.resolver.resolveComponentFactory(DynacameraComponent);
      const componentRef = entry.createComponent(factory);
      componentRef.instance._ref = componentRef;

      componentRef.instance.url = data

      let c = entry.indexOf(componentRef.hostView);
      this.quesCom.index.next(c);
      console.log(c)

      // this is a component ref for my use
      let count = this.QDS.getGlobalCounter();
      count = count + 1;
      this.QDS.setGlobalCounter(count);

    }
    else if (typeOfC === 'documentcontainer') {
      const factory = this.resolver.resolveComponentFactory(DynapdfComponent);
      const componentRef = entry.createComponent(factory);

      componentRef.instance._ref = componentRef;
      componentRef.instance.url = data

      let c = entry.indexOf(componentRef.hostView);
      this.quesCom.index.next(c);
      console.log(c)

      let count = this.QDS.getGlobalCounter();
      count = count + 1;
      this.QDS.setGlobalCounter(count);
    }
  }

  settingSections = async (loadedComponents) => {
    let jsonObject = {};
    let finalData = [];
    let orderNo: number = 0

    console.log('Loaded Components are -->', loadedComponents)

    loadedComponents.forEach((element) => {
      if (element.size != 0) {
        element.forEach((value, key) => {
          jsonObject[key] = value;
        });
      }
    });

    // clearning any unwanted data and converting it to JSON
    loadedComponents.forEach((element) => {
      if (element.size != 0) {
        element.forEach((value, key) => {
          jsonObject[key] = value;
        });
      }
    });

    for (const [k, v] of Object.entries(jsonObject)) {
      this.IonicComp.showSpinner({
        spinner: 'circular',
        translucent: true,
        id: 'uploadSingleSpinner'
      })

      if (v['Type'] == 'text') {
        finalData.push({
          'Order': orderNo = orderNo + 1,
          'Text': v['Text'],
          'Type': v['Type']
        })
      } else if (v['Type'] == 'document') {
        let mime = "application/pdf"
        let res = await this.fileFun.uploadSingleData(v['file']['url'], mime)
        let tempres = JSON.parse(res.response)
        console.log(tempres)
        finalData.push({
          'Order': orderNo = orderNo + 1,
          'Type': v['Type'],
          'file': {
            'url': tempres.data.url
          }
        })
      } else if (v['Type'] == 'image') {
        let res = await this.fileFun.uploadSingleImage(v['file']['url'])
        console.log(res);
        let tempres = JSON.parse(res.response)
        console.log(tempres)
        finalData.push({
          'Order': orderNo = orderNo + 1,
          'Type': v['Type'],
          'file': {
            'url': tempres.data.url
          }
        })
      }
    }
    return finalData
  }
  controllerDismiss = () => {
    this.IonicComp.modalController.dismiss(null, null, "DomainController")
    this.IonicComp.modalController.dismiss(null, null, "categorymodal");
    this.IonicComp.modalController.dismiss(null, null, "subcategorymodal");
    this.IonicComp.modalController.dismiss(null, null, "carmodal");
    this.IonicComp.modalController.dismiss(null, null, "questionmodal")
  }

}
