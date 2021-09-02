import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class HelperFunctions {
    constructor() { }
    
    // check if the data is html
    isHtml(data: string) {
        let res = data.substring(0, 3);
        if (res == "<p>") {
            return true;
        }
    }

    // check if the data is an image
    isImage(data: string) {
        let img = data.substring(0, 10);
        if (img == "data:image") {
            return true;
        }
    }
}
