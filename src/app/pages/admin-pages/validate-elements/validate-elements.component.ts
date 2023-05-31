import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzImageService } from 'ng-zorro-antd/image';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { CategoryByEvent } from 'src/app/models/CategoryByEvent';
import { DeletePictureResponse } from 'src/app/models/DeletePictureResponse';
import { Department } from 'src/app/models/Deparment';
import { DetailFurnitureResponse } from 'src/app/models/DetailFurnitureResponse';
import { EventByStore } from 'src/app/models/EventByStore';
import { FurnituresByStore } from 'src/app/models/FurnituresByStore';
import { FurnituresOpsHist } from 'src/app/models/FurnituresOpsHist';
import { PicturesResponse } from 'src/app/models/PicturesResponse';
import { ProductAccesoryResponse } from 'src/app/models/ProductAccesoryResponse';
import { Store } from 'src/app/models/Store';
import { AuthService } from 'src/app/services/auth.service';
import { ValidateElementsService } from 'src/app/services/validate-elements.service';

@Component({
  selector: 'app-validate-elements',
  templateUrl: './validate-elements.component.html',
  styleUrls: ['./validate-elements.component.css']
})
export class ValidateElementsComponent implements OnInit {

  confirmModal?: NzModalRef; // For testing by now

  // * Variables de la tabla
  public pageSize: number = 10;
  public current: number = 1;
  public subscriptions: Subscription[] = [];
  public total: number = 0;
  public totalElementByPage = 0;

  public isLoadingTable = false;

  // * Variables genericas  
  public isLoadingGeneral = false;

  // * Variables para agregar un usuario  
  @ViewChild('f') myForm: NgForm | undefined;
  public createForm!: FormGroup;

  public arrayExample = [1, 2, 3, 4, 5, 7, 8, 9, 10, 12, 31];

  public visiblePictures = false;
  public visibleDetail = false;

  // Combos
  public stores: any = [];
  public departments: any = [];
  public events: any = [];
  public furnitures: any = [];
  public categories: any = [];

  // Valores seleccionados
  public storeSelected: any = null;
  public deparmentSelected: any;
  public eventSelected: any;
  public furnitureSelected: any;
  public classSelected: any;
  public presentationSelected: any;

  // Listado de muebles
  public furnituresList: any;

  public detailFurnituresList: any;

  public listadoLevelsAndTrams: any = [];

  public listActual: any = [];
  public isLoadingListActual = false;

  public listBorrada: any = [];
  public isLoadingListDelete = false;

  public listPictures: any = [];
  public isLoadingPictures = false;

  public tomaPicture: any = undefined;
  public retomaPicture: any = "";

  public tramoSelectPicture: any;
  public tramoSelectDetail: any;

  public loadDetail = false;

  public eventOriginal = 0;
  public selectedIndex = 0;

  constructor(
    private service: ValidateElementsService,
    private authenticationService: AuthService,
    private fb: FormBuilder,
    private modal: NzModalService,
    private message: NzMessageService,
    private router: Router,
    private ngxSpinner: NgxSpinnerService,
    private nzImageService: NzImageService
  ) {

    this.createForm = this.fb.group({
      store: [null, [Validators.required]],
      event: [null, [Validators.required]],
      department: [null, [Validators.required]],
      furniture: [null, [Validators.required]],
      class: [null, [Validators.required]],
      presentation: [null, [Validators.required]]
    });

    this.isLoadingGeneral = false;

  }

  ngOnInit(): void {

    this.getStores();
    this.getDepartments();

    this.ngxSpinner.show();

    setTimeout(() => {
      this.ngxSpinner.hide();
    }, 2000);

  }


  convertImage(data: any) {
    let image = "data:image/png;base64," + data;
    return image;
  }


  submitForm(): void {
    for (const i in this.createForm.controls) {
      if (this.createForm.controls.hasOwnProperty(i)) {
        this.createForm.controls[i].markAsDirty();
        this.createForm.controls[i].updateValueAndValidity();
      }
    }

    if (!this.createForm.valid) {
      this.createMessage('warning', '¡Es necesario llenar todos los campos!');
      return;
    }

    this.loadDetail = true;

    this.listadoLevelsAndTrams = [];
    this.furnituresList = [];
    this.detailFurnituresList = [];

    this.eventOriginal = this.eventSelected.historica;

    if (this.eventSelected.historica == 1) {
      this.getFurnituresMonHistoric();
    } else {
      this.getFurnitureMonOps();
    }

  }

  public clean() {
    this.deparmentSelected = null;
    this.eventSelected = null;
    this.furnitureSelected = null;
    this.classSelected = null;
    this.presentationSelected = null;
    this.storeSelected = null;
  }



  public getStores() {
    this.ngxSpinner.show();
    this.subscriptions.push(
      this.service.getStores().subscribe(
        (response: Store[]) => {
          this.stores = response;
          this.ngxSpinner.hide();
        },
        (errorResponse: HttpErrorResponse) => {
          this.ngxSpinner.hide();
          this.message.create("error", errorResponse.error.message);
        }
      )
    );
  }


  public getEventsByStore(store: any) {
    this.ngxSpinner.show();
    this.subscriptions.push(
      this.service.getEventsByStore(store).subscribe(
        (response: EventByStore[]) => {
          this.events = response;
          this.ngxSpinner.hide();
        },
        (errorResponse: HttpErrorResponse) => {
          this.ngxSpinner.hide();
          this.message.create("error", errorResponse.error.message);
        }
      )
    );
  }

  public getDepartments() {
    this.ngxSpinner.show();
    this.subscriptions.push(
      this.service.getDepartments().subscribe(
        (response: Department[]) => {
          this.departments = response;
          this.ngxSpinner.hide();
        },
        (errorResponse: HttpErrorResponse) => {
          this.ngxSpinner.hide();
          this.message.create("error", errorResponse.error.message);
        }
      )
    );
  }

  public getCategoriesByEvent(idEvento: any) {
    this.ngxSpinner.show();
    this.subscriptions.push(
      this.service.getCategoriesByEvent({ idDepto: this.deparmentSelected, idEvento: idEvento, idTienda: this.storeSelected }).subscribe(
        (response: CategoryByEvent[]) => {
          this.categories = response;
          this.ngxSpinner.hide();
        },
        (errorResponse: HttpErrorResponse) => {
          this.ngxSpinner.hide();
          this.message.create("error", errorResponse.error.message);
        }
      )
    );
  }

  public getFurnituresByStore(idEvento: any) {
    this.ngxSpinner.show();
    this.subscriptions.push(
      this.service.getFurnituresByStore({ idDepto: this.deparmentSelected, idEvento: idEvento, idTienda: this.storeSelected }).subscribe(
        (response: FurnituresByStore[]) => {
          this.furnitures = response;
          this.ngxSpinner.hide();
        },
        (errorResponse: HttpErrorResponse) => {
          this.ngxSpinner.hide();
          this.message.create("error", errorResponse.error.message);
        }
      )
    );
  }

  getColor(data: any) {

    if (data.length == 0) {
      return "#fffff";
    }

    // if(data == "#25a18e") {
    //   return "#fffff";
    // }

    return data;
  }


  getColorText(data: any) {

    if (data.length == 0) {
      return "#fffff";
    }

    if (data == "#FFFFFF") {
      return "#000000";
    }

    return data;
  }

  getCursor(tramo : any) {

    
    if (tramo.productos == "0" || tramo.productos == "COL" || tramo.productos == "FAM" || tramo.productos == "NEX"  || tramo.colorFondo == '#C70039') {
      return "default";
    }

    return "pointer"
  }

  // Listado de tiendas
  public getFurnituresMonHistoric() {
    this.ngxSpinner.show();
    this.subscriptions.push(
      this.service.getFurnituresMonHistoric({ idDepto: this.deparmentSelected, idEvento: this.eventSelected.evento, idTienda: this.storeSelected, idPLN: this.furnitureSelected, categoria: this.classSelected == 'N/A' ? null : this.classSelected, idOrden: this.presentationSelected }).subscribe(
        (response1: FurnituresOpsHist[]) => {
          this.furnituresList = response1;
          this.subscriptions.push(
            this.service.getDetailFurnitureHist({ idDepto: this.deparmentSelected, idEvento: this.eventSelected.evento, idTienda: this.storeSelected, idPLN: this.furnitureSelected, categoria: this.classSelected == 'N/A' ? null : this.classSelected }).subscribe(
              (response2: DetailFurnitureResponse[]) => {      
                this.detailFurnituresList = response2;
                let listPlnds: any = [];
                
                for (let e of response1) {
                  // Buscamos dentro de la lista que agrega los no repetidos si existe
                  let found = listPlnds.find((b: any) => b.header.plnId == e.plnId);
                  // Si no existe
                  if (found == undefined) {
                    let founds = response2.filter((b: any) => b.plnid == e.plnId);
                    let niveles = Array.from(new Set(founds.map((s: any) => s.nivel)))
                      .map(nivel => {
                        return {
                          nivel: nivel,
                          tramos: founds.filter((s: any) => s.nivel === nivel)
                        };
                      });
      
      
                    //   Longitud de niveles
                    let tramosLong = [];
                    for (let index = 1; index <= niveles[0].tramos.length; index++) { tramosLong.push(index); }
      
                    listPlnds.push({ header: e, tramos: tramosLong, niveles });
                  }
                }
      
                this.listadoLevelsAndTrams = listPlnds;                
                this.loadDetail = false;
                console.log(this.listadoLevelsAndTrams);
      
                setTimeout(() => {
                  this.ngxSpinner.hide();
                }, 2500);
      
              },
              (errorResponse: HttpErrorResponse) => {
                this.ngxSpinner.hide();
                this.message.create("error", errorResponse.error.message);
              }
            )
          );





        },
        (errorResponse: HttpErrorResponse) => {
          this.ngxSpinner.hide();
          this.message.create("error", errorResponse.error.message);
        }
      )
    );
  }

  public getFurnitureMonOps() {
    this.ngxSpinner.show();
    this.subscriptions.push(
      this.service.getFurnituresMonOps({ idDepto: this.deparmentSelected, idEvento: this.eventSelected.evento, idTienda: this.storeSelected, idPLN: this.furnitureSelected, categoria: this.classSelected == 'N/A' ? null : this.classSelected, idOrden: this.presentationSelected }).subscribe(
        (response1: FurnituresOpsHist[]) => {
          this.furnituresList = response1;
          
          

          this.subscriptions.push(
            this.service.getDetailFurnitureOps({ idDepto: this.deparmentSelected, idEvento: this.eventSelected.evento, idTienda: this.storeSelected, idPLN: this.furnitureSelected, categoria: this.classSelected == 'N/A' ? null : this.classSelected }).subscribe(
              (response2: DetailFurnitureResponse[]) => {          
                this.detailFurnituresList = response2;
                
                let listPlnds: any = [];
                
                for (let e of response1) {
      
                  let found = listPlnds.find((b: any) => b.header.plnId == e.plnId);
                  if (found == undefined) {
      
                    let founds = response2.filter((b: any) => b.plnid == e.plnId);
      
                    let niveles = Array.from(new Set(founds.map((s: any) => s.nivel)))
                      .map(nivel => {
                        return {
                          nivel: nivel,
                          tramos: founds.filter((s: any) => s.nivel === nivel)
                        };
                      });
      
      
                    let tramosLong = [];
                    for (let index = 1; index <= niveles[0].tramos.length; index++) { tramosLong.push(index); }
      
                    listPlnds.push({ header: e, tramos: tramosLong, niveles });
                  }
                }
      
                this.listadoLevelsAndTrams = listPlnds;
                this.loadDetail = false;
      
                setTimeout(() => {
                  this.ngxSpinner.hide();
                }, 2500);
      
      
      
              },
              (errorResponse: HttpErrorResponse) => {
                this.ngxSpinner.hide();
                this.message.create("error", errorResponse.error.message);
              }
            )
          );


        },
        (errorResponse: HttpErrorResponse) => {
          this.ngxSpinner.hide();
          this.message.create("error", errorResponse.error.message);
        }
      )
    );
  }


  // 
  public getProductsAccesoryOps(plnId: any, idFixel: any) {
    this.ngxSpinner.show();
    this.isLoadingListActual = true;
    this.subscriptions.push(
      this.service.getProductsAccesoryOps({ idPln: plnId, idFixel: idFixel }).subscribe(
        (response: ProductAccesoryResponse[]) => {
          this.listActual = response;
          console.log(response);
          
          this.retomaPicture = response[0].retoma == null || response[0].retoma == "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"  ? "" : this.convertImage(response[0].retoma);
          this.tomaPicture =  response[0].foto == null || response[0].retoma == "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930" ? "" : this.convertImage(response[0].foto);

          this.isLoadingListActual = false;
          this.ngxSpinner.hide();
        },
        (errorResponse: HttpErrorResponse) => {
          this.isLoadingListActual = false;
          this.ngxSpinner.hide();
          this.message.create("error", errorResponse.error.message);
        }
      )
    );
  }

  public getProductsAccesoryHist(plnId: any, idFixel: any) {
    this.ngxSpinner.show();
    this.isLoadingListActual = true;

    this.subscriptions.push(
      this.service.getProductsAccesoryHist({ idPln: plnId, idFixel: idFixel }).subscribe(
        (response: ProductAccesoryResponse[]) => {
          this.listActual = response;
          this.retomaPicture = response[0].retoma == null || response[0].retoma == "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930"  ? "" : this.convertImage(response[0].retoma);
          this.tomaPicture =  response[0].foto == null || response[0].retoma == "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930" ? "" : this.convertImage(response[0].foto);

          this.isLoadingListActual = false;
          this.ngxSpinner.hide();
        },
        (errorResponse: HttpErrorResponse) => {
          this.ngxSpinner.hide();
          this.isLoadingListActual = false;
          this.message.create("error", errorResponse.error.message);
        }
      )
    );
  }

  public getProductsDeleteOps(plnId: any, idFixel: any) {
    this.ngxSpinner.show();
    this.isLoadingListDelete = true;
    this.subscriptions.push(
      this.service.getProductsDeleteOps({ idPln: plnId, idFixel: idFixel }).subscribe(
        (response: DeletePictureResponse[]) => {
          this.listBorrada = response;
          this.isLoadingListDelete = false;
          this.ngxSpinner.hide();
        },
        (errorResponse: HttpErrorResponse) => {
          this.ngxSpinner.hide();
          this.isLoadingListDelete = false;
          this.message.create("error", errorResponse.error.message);
        }
      )
    );
  }

  public getProductsDeleteHist(plnId: any, idFixel: any) {
    this.ngxSpinner.show();
    this.isLoadingListDelete = true;
    this.subscriptions.push(
      this.service.getProductsDeleteHist({ idPln: plnId, idFixel: idFixel }).subscribe(
        (response: DeletePictureResponse[]) => {
          this.listBorrada = response;
          this.isLoadingListDelete = false;
          this.ngxSpinner.hide();
        },
        (errorResponse: HttpErrorResponse) => {
          this.ngxSpinner.hide();
          this.isLoadingListDelete = false;
          this.message.create("error", errorResponse.error.message);
        }
      )
    );
  }

  public getPicturesHist(idPln: any) {
    this.ngxSpinner.show();
    this.isLoadingPictures = true;
    this.subscriptions.push(
      this.service.getPicturesHist(idPln).subscribe(
        (response: PicturesResponse[]) => {
          this.listPictures = response.map((prop: PicturesResponse, key: any) => {
            return {
              ...prop,
              key: key + 1,
              picture: this.convertImage(prop.imagen)
            };
          });

          this.ngxSpinner.hide();
          this.isLoadingPictures = false;
        },
        (errorResponse: HttpErrorResponse) => {
          this.ngxSpinner.hide();
          this.isLoadingPictures = false;
          this.message.create("error", errorResponse.error.message);
        }
      )
    );
  }


  public getPicturesOps(idPln: any) {
    this.ngxSpinner.show();
    this.isLoadingPictures = true;
    this.subscriptions.push(
      this.service.getPicturesOps(idPln).subscribe(
        (response: PicturesResponse[]) => {
          this.listPictures = response.map((prop: PicturesResponse, key: any) => {
            return {
              ...prop,
              key: key + 1,
              picture: this.convertImage(prop.imagen)
            };
          });

          this.ngxSpinner.hide();
          this.isLoadingPictures = false;
        },
        (errorResponse: HttpErrorResponse) => {
          this.ngxSpinner.hide();
          this.isLoadingPictures = false;
          this.message.create("error", errorResponse.error.message);
        }
      )
    );
  }

  public restoreProductModal() {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Restablecer productos',
      nzContent: '¿Seguro que deseas restablecer los siguientes productos?',
      nzOnOk: () => this.restoreProduct()
    });
  }

  public restoreProduct() {
    this.ngxSpinner.show();

    this.subscriptions.push(
      this.service.restoreProducts({ idPln: this.tramoSelectDetail.plnid, idFixel: this.tramoSelectDetail.fixelId }).subscribe(
        (response: String[]) => {

          if (this.eventOriginal == 1) {
            this.getProductsDeleteHist(this.tramoSelectDetail.plnid, this.tramoSelectDetail.fixelId);
          } else {
            this.getProductsDeleteOps(this.tramoSelectDetail.plnid, this.tramoSelectDetail.fixelId);
          }

          this.selectedIndex = 0;
          this.message.create("success", "Productos restaurados correctamente!");
          this.ngxSpinner.hide();
        },
        (errorResponse: HttpErrorResponse) => {
          this.ngxSpinner.hide();
          this.message.create("error", errorResponse.error.message);
        }
      )
    );
  }



  sortElement() {

    let arr: any = [{ key: 2 }, { key: 3 }, { key: 4 }, { key: 1 }, { key: 5 }, { key: 8 }, { key: 11 }];
    let sortFn2 = (obj1: any, obj2: any) => { return obj1.key - obj2.key; }
    const sortedArray2: any = arr.sort(sortFn2);


  }



  // Métodos funcionales

  public showModalPictures = (tramo: any) => {

    this.visiblePictures = true;
    this.tramoSelectPicture = tramo;


    if (this.eventOriginal == 1) {
      this.getPicturesHist(tramo.plnId);
    } else {
      this.getPicturesOps(tramo.plnId);
    }

  };
  public closeModalPictures() {
    this.listPictures = [];
    this.visiblePictures = false;

  };

  public showModalDetail = (tramo: any) => {

    if (tramo.productos == "0" || tramo.productos == "COL" || tramo.productos == "FAM" || tramo.productos == "NEX"  || tramo.colorFondo == '#C70039') {
      return;
    }

    this.tramoSelectDetail = tramo;
    this.visibleDetail = true;


    console.log(this.tramoSelectDetail);


    if (this.eventOriginal == 1) {
      this.getProductsAccesoryHist(tramo.plnid, tramo.fixelId);
      this.getProductsDeleteHist(tramo.plnid, tramo.fixelId);
    } else {
      this.getProductsAccesoryOps(tramo.plnid, tramo.fixelId);
      this.getProductsDeleteOps(tramo.plnid, tramo.fixelId);
    }


  };
  public closeModalDetail = () => {
    this.visibleDetail = false
    this.tomaPicture = undefined;
    this.retomaPicture = "";
    this.listActual = [];
    this.listBorrada = [];
  };


  public changeSelectStore(data: any) {


    if (data == null) {
      this.deparmentSelected = null;
      this.eventSelected = null;
      this.furnitureSelected = null;
      this.classSelected = null;
      this.presentationSelected = null;
    } else {
      this.deparmentSelected = null;
      this.eventSelected = null;
      this.furnitureSelected = null;
      this.classSelected = null;
      this.presentationSelected = null;
      this.storeSelected = data;
      this.getEventsByStore(data);
    }



  }

  public changeSelectDeparment(data: any) {

    if (data == null) {
      this.eventSelected = null;
      this.furnitureSelected = null;
      this.classSelected = null;
      this.presentationSelected = null;
    } else {
      this.eventSelected = null;
      this.furnitureSelected = null;
      this.classSelected = null;
      this.presentationSelected = null;
      this.deparmentSelected = data;
      this.getEventsByStore(this.storeSelected);
    }

  }

  public changeSelectEvent(data: any) {

    if (data == null) {
      this.furnitureSelected = null;
      this.classSelected = null;
      this.presentationSelected = null;
    } else {
      this.furnitureSelected = null;
      this.classSelected = null;
      this.presentationSelected = null;
      this.eventSelected = data;
      this.getCategoriesByEvent(data.evento);
      this.getFurnituresByStore(data.evento);
    }

  }

  public changeSelectFurniture(data: any) {
    if (data == null) {
      this.classSelected = null;
      this.presentationSelected = null;
    } else {
      this.classSelected = null;
      this.presentationSelected = null;
      this.furnitureSelected = data;
    }
  }

  public changeSelectCategory(data: any) {
    if (data == null) {
      this.presentationSelected = null;
    } else {
      this.presentationSelected = null;
      this.classSelected = data;
    }
  }

  public changeSelectPresentation(data: any) {
    this.presentationSelected = data;
  }


  onClick(img: any): void {
    const images = [
      {
        src: img,
        width: '300px',
        alt: 'ng-zorro'
      },

    ];
    this.nzImageService.preview(images, { nzZoom: 1.0, nzRotate: 0 });
  }



  createMessage(type: string, message: string): void {
    this.message.create(type, message);
  }
}




interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}

interface PorA {
  plnid: string,
  levels: any
}