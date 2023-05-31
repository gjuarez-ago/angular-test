import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxSpinnerService } from 'ngx-spinner';

export interface TreeNodeInterface {
  key: string;
  name: string;
  age?: number;
  level?: number;
  expand?: boolean;
  address?: string;
  children?: TreeNodeInterface[];
  parent?: TreeNodeInterface;
  option : boolean;
}

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {

  
  @ViewChild('f') myForm: NgForm | undefined;
  validateForm!: FormGroup;
  dateFormat = 'yyyy/MM/dd';
  selectedValue = null;

  isLoadingCreateDrawer = false;

  isLoadingCreateSub = false;

  public visibleAddSubCategory = false;
  public visibleEditSubCategory = false;
  public visibleDeleteSubCategory = false;
  public visibleModal = false;

  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: readonly Data[] = [];
  listOfCurrentPageData: readonly Data[] = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly Data[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(({ disabled }) => !disabled);
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData
      .filter(({ disabled }) => !disabled)
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  sendRequest(): void {
    this.loading = true;
    const requestData = this.listOfData.filter(data => this.setOfCheckedId.has(data.id));
    console.log(requestData);
    setTimeout(() => {
      this.setOfCheckedId.clear();
      this.refreshCheckedStatus();
      this.loading = false;
    }, 1000);
  }


  @ViewChild('d') crForm: NgForm | undefined;
  public createForm!: FormGroup;

  
  @ViewChild('e') crSForm: NgForm | undefined;
  public createFormSubC!: FormGroup;

  inputValue?: string;
  options: string[] = [];

  submitForm(): void {
    console.log('submit', this.validateForm.value);
  }

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private message: NzMessageService,
    private fb: FormBuilder) {}

  ngOnInit(): void {


    // this.createMessage("error", "Fallo en la conexión.");

    this.listOfMapData.forEach(item => {
      this.mapOfExpandedData[item.key] = this.convertTreeToList(item);
    });


    this.validateForm = this.fb.group({
      field1: [null],
      field2: [null],
      field3: [null],
      field4: [null],
      field5: [null],
    });

    this.listOfData = new Array(100).fill(0).map((_, index) => ({
      id: index,
      name: `Edward King ${index}`,
      age: 32,
      address: `London, Park Lane no. ${index}`,
      disabled: false
    }));
  


    this.createForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      sla: ['', Validators.required],
    });

    this.createFormSubC = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.required],
      sla: ['', Validators.required],
    });

    // this.spinner.show();
    
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

  
  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  openModal(): void {
    this.visibleModal = true;
  }

  closeModal(): void {
    this.visibleModal = false;
  }
  



  public createSubmit() {

    for (const i in this.createForm.controls) {
      if (this.createForm.controls.hasOwnProperty(i)) {
        this.createForm.controls[i].markAsDirty();
        this.createForm.controls[i].updateValueAndValidity();
      }
    }

    if(!this.createForm.valid) {
      return ; 
    }

  }

  createMessage(type: string , text : string): void {
    this.message.create(type, `${text}`);
  }

  public createSubmitSubCategory(): void { 

    for (const i in this.createFormSubC.controls) {
      if (this.createFormSubC.controls.hasOwnProperty(i)) {
        this.createFormSubC.controls[i].markAsDirty();
        this.createFormSubC.controls[i].updateValueAndValidity();
      }
    }

    if(!this.createFormSubC.valid) {
      return ; 
    }

  }

  openAddSubcategory() : void {
    this.visibleAddSubCategory = true;
  }

  closeAddSubcategory() : void {
    this.visibleAddSubCategory = false;
  }


  listOfMapData: TreeNodeInterface[] = [
    {
      key: `1`,
      name: 'Categoría 1.',
      age: 60,
      address: 'Poco importante ',
      option: true,
      children: [
        {
          key: `1-1`,
          name: 'Subcategoría',
          age: 42,
          address: 'Importante',
          option: false,
        },
        {
          key: `1-2`,
          name: 'Subcategoría',
          age: 30,
          address: 'Importante',         
          option: false,
        },
        {
          key: `1-3`,
          name: 'Subcategoría',
          age: 72,
          address: 'Importante',
          option: false,
        }
      ]
    },
    {
      key: `1`,
      name: 'Categoría 1.',
      age: 60,
      address: 'Poco importante ',
      option: true,
      children: [
        {
          key: `1-1`,
          name: 'Subcategoría',
          age: 42,
          address: 'Importante',
          option: false,
        },
        {
          key: `1-2`,
          name: 'Subcategoría',
          age: 30,
          address: 'Importante',         
          option: false,
        },
        {
          key: `1-3`,
          name: 'Subcategoría',
          age: 72,
          address: 'Importante',
          option: false,
        }
      ]
    },
    {
      key: `1`,
      name: 'Categoría 1.',
      age: 60,
      address: 'Poco importante ',
      option: true,
      children: [
        {
          key: `1-1`,
          name: 'Subcategoría',
          age: 42,
          address: 'Importante',
          option: false,
        },
        {
          key: `1-2`,
          name: 'Subcategoría',
          age: 30,
          address: 'Importante',         
          option: false,
        },
        {
          key: `1-3`,
          name: 'Subcategoría',
          age: 72,
          address: 'Importante',
          option: false,
        }
      ]
    },
    {
      key: `1`,
      name: 'Categoría 1.',
      age: 60,
      address: 'Poco importante ',
      option: true,
      children: [
        {
          key: `1-1`,
          name: 'Subcategoría',
          age: 42,
          address: 'Importante',
          option: false,
        },
        {
          key: `1-2`,
          name: 'Subcategoría',
          age: 30,
          address: 'Importante',         
          option: false,
        },
        {
          key: `1-3`,
          name: 'Subcategoría',
          age: 72,
          address: 'Importante',
          option: false,
        }
      ]
    },
    {
      key: `1`,
      name: 'Categoría 1.',
      age: 60,
      address: 'Poco importante ',
      option: true,
      children: [
        {
          key: `1-1`,
          name: 'Subcategoría',
          age: 42,
          address: 'Importante',
          option: false,
        },
        {
          key: `1-2`,
          name: 'Subcategoría',
          age: 30,
          address: 'Importante',         
          option: false,
        },
        {
          key: `1-3`,
          name: 'Subcategoría',
          age: 72,
          address: 'Importante',
          option: false,
        }
      ]
    },
    {
      key: `1`,
      name: 'Categoría 1.',
      age: 60,
      address: 'Poco importante ',
      option: true,
      children: [
        {
          key: `1-1`,
          name: 'Subcategoría',
          age: 42,
          address: 'Importante',
          option: false,
        },
        {
          key: `1-2`,
          name: 'Subcategoría',
          age: 30,
          address: 'Importante',         
          option: false,
        },
        {
          key: `1-3`,
          name: 'Subcategoría',
          age: 72,
          address: 'Importante',
          option: false,
        }
      ]
    },
    {
      key: `1`,
      name: 'Categoría 1.',
      age: 60,
      address: 'Poco importante ',
      option: true,
      children: [
        {
          key: `1-1`,
          name: 'Subcategoría',
          age: 42,
          address: 'Importante',
          option: false,
        },
        {
          key: `1-2`,
          name: 'Subcategoría',
          age: 30,
          address: 'Importante',         
          option: false,
        },
        {
          key: `1-3`,
          name: 'Subcategoría',
          age: 72,
          address: 'Importante',
          option: false,
        }
      ]
    },
    {
      key: `1`,
      name: 'Categoría 1.',
      age: 60,
      address: 'Poco importante ',
      option: true,
      children: [
        {
          key: `1-1`,
          name: 'Subcategoría',
          age: 42,
          address: 'Importante',
          option: false,
        },
        {
          key: `1-2`,
          name: 'Subcategoría',
          age: 30,
          address: 'Importante',         
          option: false,
        },
        {
          key: `1-3`,
          name: 'Subcategoría',
          age: 72,
          address: 'Importante',
          option: false,
        }
      ]
    },
    {
      key: `1`,
      name: 'Categoría 1.',
      age: 60,
      address: 'Poco importante ',
      option: true,
      children: [
        {
          key: `1-1`,
          name: 'Subcategoría',
          age: 42,
          address: 'Importante',
          option: false,
        },
        {
          key: `1-2`,
          name: 'Subcategoría',
          age: 30,
          address: 'Importante',         
          option: false,
        },
        {
          key: `1-3`,
          name: 'Subcategoría',
          age: 72,
          address: 'Importante',
          option: false,
        }
      ]
    },
    {
      key: `1`,
      name: 'Categoría 1.',
      age: 60,
      address: 'Poco importante ',
      option: true,
      children: [
        {
          key: `1-1`,
          name: 'Subcategoría',
          age: 42,
          address: 'Importante',
          option: false,
        },
        {
          key: `1-2`,
          name: 'Subcategoría',
          age: 30,
          address: 'Importante',         
          option: false,
        },
        {
          key: `1-3`,
          name: 'Subcategoría',
          age: 72,
          address: 'Importante',
          option: false,
        }
      ]
    },
    {
      key: `2`,
      name: 'Categoria 2',
      age: 32,
      address: 'Importante',
      option: true,
      children: [
        {
          key: `1-1`,
          name: 'Subcategoría',
          age: 42,
          address: 'Baja',
          option: false,
        },
        {
          key: `1-2`,
          name: 'Subcategoría',
          age: 30,
          address: 'Alta',
          option: false,
        },
        {
          key: `1-3`,
          name: 'Subcategoría',
          age: 72,
          address: 'Critico',
          option: false,
        }
      ]
    }
  ];


  mapOfExpandedData: { [key: string]: TreeNodeInterface[] } = {};

  collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
    if (!$event) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.key === d.key)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }


  convertTreeToList(root: TreeNodeInterface): TreeNodeInterface[] {
    const stack: TreeNodeInterface[] = [];
    const array: TreeNodeInterface[] = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      const node = stack.pop()!;
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[i], level: node.level! + 1, expand: false, parent: node });
        }
      }
    }

    return array;
  }

  visitNode(node: TreeNodeInterface, hashMap: { [key: string]: boolean }, array: TreeNodeInterface[]): void {
    if (!hashMap[node.key]) {
      hashMap[node.key] = true;
      array.push(node);
    }
  }

  
}



export interface Data {
  id: number;
  name: string;
  age: number;
  address: string;
  disabled: boolean;
}
