import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ImageService{

    convertImagetoBase64 = (img:any) => new Promise((resolve,reject) =>{
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = () => resolve(reader.result);
        reader.onerror= error => reject(error);
    })
}