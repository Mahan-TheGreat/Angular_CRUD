
interface ImageDto{
    fileName: string;
    filePath: string;
    base64String: string;

}

export class ImageDTO implements ImageDto{
    fileName='';
    filePath='';
    base64String='';
    constructor(Image:ImageDto){
        this.fileName = Image.fileName;
        this.filePath = Image.filePath;
        this.base64String = Image.base64String;
    }
    
}

