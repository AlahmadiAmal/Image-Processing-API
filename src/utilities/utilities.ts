import { promises } from "fs";
import sharp from 'sharp';
import path from 'path';



async function resizeImage(imagepath: string, width: number, height: number, output: string): Promise<Boolean>{
    let res = false;
    await sharp(imagepath).resize({ height: height, width: width }).toFile(`${output}`)
    .then(function(newFileInfo) {
        res = true;
    })
    .catch(function(err) {
        console.log(err);
        res=false;
    });  
    return res;
} 

export {resizeImage}
 