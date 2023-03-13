import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { ImageDTO } from 'src/app/interface/image';
import { product } from 'src/app/interface/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{

  @ViewChild("imageuploader") ImageUploader!: FileUpload;

  tableValues: product[] = [];
  showEditPopup = false;
  header = "Edit Product";
  isAddProduct = false;
  isFileSelected = false;

  fileNameBase64 = '';

  imageDTO  = {
    fileName: '',
    filePath: '',
    base64String: ''
  }

  selectedProduct!: product;
  editProductForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl(0,[Validators.required,Validators.min(0)]),
    quantity: new FormControl(0,[Validators.required,Validators.min(0)]),
    isDiscountApplicable: new FormControl(false,),
    percentDiscount: new FormControl(0,[Validators.required,Validators.min(0)])  });

get Name() {
    return this.editProductForm.get('name');
}
get Description() {
    return this.editProductForm.get('description');
}

get Price() {
  return this.editProductForm.get('price');
}
get Quantity() {
  return this.editProductForm.get('quantity');

}get IsDiscount() {
  return this.editProductForm.get('isDiscountApplicable');
}
get PercentDiscount() {
  return this.editProductForm.get('percentDiscount');
}
constructor(private _messageService: MessageService, private _productService: ProductService){

}

ngOnInit(){
    this.GetAllProducts();
}

private GetAllProducts(){
  this._productService.getAllProducts()
  .subscribe({
    next: res => {
      this.tableValues = res;
    },
    error: err => {
      this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Something  wrong! Please try again.', life: 3000 });
    }
  })
}
addProduct(){
  const product = 
      { 
        name: this.selectedProduct.name,
        logo: new ImageDTO(this.imageDTO),
        isActive: this.selectedProduct.isActive 
      }
      //   this._clientService.post(new PostClientCommand(client))
      // .subscribe({
      //     next: res => {
      //         this._messageService.add({ severity: 'success', summary: 'Successful', detail: 'Client Added', life: 3000 });
      //         this.GetAllClients();
      //     },
      //     error: err => {
      //         this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Something  wrong! Please try again.', life: 3000 });
      //     }
      // })
}
updateProduct(){
  const product = 
      { 
        id: this.selectedProduct.id,
        name: this.selectedProduct.name,
        logo: new ImageDTO(this.imageDTO),
        isActive: this.selectedProduct.isActive 
      }
  // this._clientService.updateItemDetails(this.selectedProduct.id, new UpdateClientCommand(client))
  //     .subscribe({
  //         next: res => {
  //             if (res == 1) {
  //                 this._messageService.add({ severity: 'success', summary: 'Successful', detail: 'Client Updated', life: 3000 });
  //                 this.GetAllClients();

  //             } else {
  //                 this._messageService.add({ severity: 'error', summary: 'Failed', detail: 'Something went wrong! Please try again.', life: 3000 });
  //             }
  //         },
  //         error: err => {
  //             this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong! Please try again.', life: 3000 });
  //         }
  //     })
}

deactivateData(selectedProduct: product) {
  this.selectedProduct.id = selectedProduct.id;
  this.selectedProduct.name = selectedProduct.name;
  this.selectedProduct.isActive = false;
  // this.imageDTO.filePath = selectedProduct.logoPath;

  this.updateProduct();
}

activateData(selectedProduct: product) {
  this.selectedProduct.id = selectedProduct.id;
  this.selectedProduct.name = selectedProduct.name;
  this.selectedProduct.isActive = true;
  // this.imageDTO.filePath = selectedProduct.logoPath;

  this.updateProduct();
}

addNew() {
  this.header = "Add Product";
  this.isAddProduct = true;
  this.showEditPopup = true;
}

showDialog($event: any) {
  this.selectedProduct = $event;
  this.header = 'Edit Client';
  this.editProductForm.get('name')?.patchValue(this.selectedProduct.name);
  this.editProductForm.get('description')?.patchValue(this.selectedProduct.description);
  this.editProductForm.get('price')?.patchValue(this.selectedProduct.price);
  this.editProductForm.get('quantity')?.patchValue(this.selectedProduct.quantity);
  this.editProductForm.get('isDiscountApplicable')?.patchValue(this.selectedProduct.isDiscountApplicable!);
  this.editProductForm.get('percentDiscount')?.patchValue(this.selectedProduct.percentDiscount!);

  // this.imageDTO.filePath = this.selectedProduct.logoPath;
  this.showEditPopup = true;

}

checkNull() {
  var isNull = false;
  if ( this.Name!.value?.trim() == '' || this.Name!.value?.trim() == ''){
    isNull = true;
    return isNull;
  }
  if ( this.Description!.value?.trim() == '' || this.Description!.value?.trim() == ''){
    isNull = true;
    return isNull;
  }
  if((this.isAddProduct && !this.isFileSelected)){
      isNull = true;
      return isNull;
  }
  return isNull;
}
save() {
  if (this.checkNull()) {
    this._messageService.add({ severity: 'error', summary: 'Error', detail: 'Please Fill up the required field.', life: 3000 });
    return;
  }
  
  //for Image upload
    // if (!this.isFileSelected) {
    //   this.imageDTO.filePath = this.editProductForm.value.logo!;
    // } 
      this.selectedProduct.name = this.editProductForm.value.name!;
      this.selectedProduct.description = this.editProductForm.value.description!;
      this.selectedProduct.price = this.editProductForm.value.price!;
      this.selectedProduct.quantity = this.editProductForm.value.quantity!;
      this.selectedProduct.isDiscountApplicable = this.editProductForm.value.isDiscountApplicable!;
      this.selectedProduct.percentDiscount = this.editProductForm.value.percentDiscount!;

      if (!this.isAddProduct) {
          this.updateProduct();

      } else {
         this.addProduct();
      }

      this.hideDialog();
  
}

resetSelectedProduct(){
  this.selectedProduct = 
  {
    id: 0,
    name: '',
    description: '',
    price: 0.00,
    quantity: 0.5,
    isDiscountApplicable: false,
    percentDiscount: 0,
    isActive: true
  }
}
hideDialog() {
  this.editProductForm.reset();
  this.imageDTO = {
      fileName:"",
      filePath: "",
      base64String: ""
  }
  this.resetSelectedProduct();
  this.showEditPopup = false;
  this.isAddProduct = false;
  this.isFileSelected = false;
}
async handleFileChange() {
  let fileBase64Url: any
  this.isFileSelected = true;
  const file = this.ImageUploader.files[0];
  
  // await this._editDataService.convertImagetoBase64(file)
  //     .then(
  //         res => fileBase64Url = res
  //     );
  const fileBase64 = fileBase64Url.split(',')[1];
  this.imageDTO.fileName = file.name;
  this.imageDTO.base64String = fileBase64;
}
removeSelectedImage() {
  this.isFileSelected = false;
  this.imageDTO = {fileName:'',filePath:'',base64String:""}
}
}
