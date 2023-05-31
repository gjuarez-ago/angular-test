import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Store } from '../models/Store';
import { Department } from '../models/Deparment';
import { FurnituresByStore } from '../models/FurnituresByStore';
import { EventByStore } from '../models/EventByStore';
import { FurnituresOpsHist } from '../models/FurnituresOpsHist';
import { FurnitureByStoreParams } from '../models/params/FurnitureByStoreParams';
import { FurnituresMonParams } from '../models/params/FurnituresMonParams';
import { CategoriesByEventStoreParams } from '../models/params/CategoriesByEventStoreParams';
import { CategoryByEvent } from '../models/CategoryByEvent';
import { DetailFurnitureParams } from '../models/params/DetailFurnitureParams';
import { ProductAccesoryParams } from '../models/params/ProductAccesoryParams';
import { DetailFurnitureResponse } from '../models/DetailFurnitureResponse';
import { ProductAccesoryResponse } from '../models/ProductAccesoryResponse';
import { DeletePictureResponse } from '../models/DeletePictureResponse';
import { PicturesResponse } from '../models/PicturesResponse';

@Injectable({
  providedIn: 'root'
})
export class ValidateElementsService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // VE.spSListadoTiendas
  public getStores(): Observable<Store[]> {      
    return this.http.get<Store[]>(`${this.host}/validate-elements/get-stores`)
  }

  // VE.spSListadoEventosPorTienda
  public getEventsByStore(store : any): Observable<EventByStore[]> {
    return this.http.get<EventByStore[]>(`${this.host}/validate-elements/get-events-by-store/${store}`)
  }
  
  // VE.spSListadoDepartamento
  public getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.host}/validate-elements/get-departments`)
  }
  
  // VE.spSListadoMueblesPorTiendaEvento
  public getFurnituresByStore(values : FurnitureByStoreParams): Observable<FurnituresByStore[]> {
    const params = new HttpParams({
      fromObject: {
        idTienda: values.idTienda,
        idEvento: values.idEvento,
        idDepto: values.idDepto,
      }
    });

    return this.http.get<FurnituresByStore[]>(`${this.host}/validate-elements/get-furnitures-by-store`, {params: params})
  }

  // VE.spSListadoCategoriasPorTiendaEvento
  public getCategoriesByEvent(values : CategoriesByEventStoreParams): Observable<CategoryByEvent[]> {
    const params = new HttpParams({
      fromObject: {
        idTienda: values.idTienda,
        idEvento: values.idEvento,
        idDepto: values.idDepto,
      }
    });
    return this.http.get<CategoryByEvent[]>(`${this.host}/validate-elements/get-categories-by-event`, {params: params})
  }
 
  // VE.spSListadoMueblesMonHistPorTiendaEvento 
  public getFurnituresMonHistoric(values : FurnituresMonParams): Observable<FurnituresOpsHist[]> {
    const params = new HttpParams({
      fromObject: {
        idTienda: values.idTienda,
        idEvento: values.idEvento,
        idDepto: values.idDepto,
        idPLN:values.idPLN,
        categoria:values.categoria,
        idOrden:values.idOrden,
      }
    });
    return this.http.get<FurnituresOpsHist[]>(`${this.host}/validate-elements/get-furnitures-historic`, {params: params})
  }

  //  VE.spSListadoMueblesMonOpetPorTiendaEvento 61, 51, 1 , 0, null, 1
  public getFurnituresMonOps(values : FurnituresMonParams): Observable<FurnituresOpsHist[]> {
    const params = new HttpParams({
      fromObject: {
        idTienda: values.idTienda,
        idEvento: values.idEvento,
        idDepto: values.idDepto,
        idPLN:values.idPLN,
        categoria:values.categoria,
        idOrden:values.idOrden,
      }
    });
    return this.http.get<FurnituresOpsHist[]>(`${this.host}/validate-elements/get-furnitures-ops`, {params: params})
  }

  // VE.spSDetalleMueblesMonHistPorTiendaEvento
  public getDetailFurnitureHist(values : DetailFurnitureParams): Observable<DetailFurnitureResponse[]> {
    const params = new HttpParams({
      fromObject: {
        idTienda: values.idTienda,
        idEvento: values.idEvento,
        idDepto: values.idDepto,
        idPLN:values.idPLN,
        categoria:values.categoria,
      }
    });
    return this.http.get<DetailFurnitureResponse[]>(`${this.host}/validate-elements/get-detail-furniture-hist`, {params: params})
  }

  // VE.spSDetalleMueblesMonOperativoPorTiendaEvento 857, 16, 1
  public getDetailFurnitureOps(values : DetailFurnitureParams): Observable<DetailFurnitureResponse[]> {
    const params = new HttpParams({
      fromObject: {
        idTienda: values.idTienda,
        idEvento: values.idEvento,
        idDepto: values.idDepto,
        idPLN:values.idPLN,
        categoria:values.categoria,
      }
    });
    return this.http.get<DetailFurnitureResponse[]>(`${this.host}/validate-elements/get-detail-furniture-ops`, {params: params})
  }

  // VE.spSListaProductosAccesorioMueble 5828666,'N1/2', 1, 100"
  public getProductsAccesoryOps(values : ProductAccesoryParams): Observable<ProductAccesoryResponse[]> {
    const params = new HttpParams({
      fromObject: {
        idPln: values.idPln,
        idFixel: values.idFixel,
      }
    });
    return this.http.get<ProductAccesoryResponse[]>(`${this.host}/validate-elements/get-product-accesory-ops`, {params: params})
  }

  // VE.spSListaProductosAccesorioMueble
  public getProductsAccesoryHist(values : ProductAccesoryParams): Observable<ProductAccesoryResponse[]> {
    const params = new HttpParams({
      fromObject: {
        idPln: values.idPln,
        idFixel: values.idFixel,
      }
    });
    return this.http.get<ProductAccesoryResponse[]>(`${this.host}/validate-elements/get-product-accesory-hist`, {params: params})
  }

  // VE.spSListaProductosBorradosAccesorioMueble
  public getProductsDeleteOps(values : ProductAccesoryParams): Observable<DeletePictureResponse[]> {
     const params = new HttpParams({
      fromObject: {
        idPln: values.idPln,
        idFixel: values.idFixel,
      }
    });
    return this.http.get<DeletePictureResponse[]>(`${this.host}/validate-elements/get-products-delete-ops`, {params: params})
  }

  // VE.spSListaProductosBorradosAccesorioMueble
  public getProductsDeleteHist(values : ProductAccesoryParams): Observable<DeletePictureResponse[]> {
    const params = new HttpParams({
     fromObject: {
       idPln: values.idPln,
       idFixel: values.idFixel,
     }
   });
   return this.http.get<DeletePictureResponse[]>(`${this.host}/validate-elements/get-products-delete-hist`, {params: params})
 }

  // VE.spSListaFotosMueble
  public getPicturesHist(idPln : any): Observable<PicturesResponse[]> {
    return this.http.get<PicturesResponse[]>(`${this.host}/validate-elements/get-pictures-hist/${idPln}`)
  }


  // VE.spSListaFotosMueble
  public getPicturesOps(idPln : any): Observable<PicturesResponse[]> {
    return this.http.get<PicturesResponse[]>(`${this.host}/validate-elements/get-pictures-ops/${idPln}`)
  }  

  // VE.spSListaFotosMueble
  public restoreProducts(data : any): Observable<String[]> {
      return this.http.post<String[]>(`${this.host}/validate-elements/restore-product-ops`, data)
  }  

    
}
