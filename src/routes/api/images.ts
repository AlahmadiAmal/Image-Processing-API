import express from 'express';
import sharp from 'sharp';
import { promises } from "fs";
import path from 'path';
import { request } from 'http';
import {resizeImage} from '../../utilities/utilities';
const images = express.Router();


const directoryPath_image = path.join(__dirname, '../../../images');
const directoryPath_thumbs = path.join(__dirname, '../../../thumbs');

const routes = express.Router();

images.get('/', async (req, res) => {
    const filename = `${req.query.filename}.png`;
    const imagepath = path.join(__dirname, `../../../images/${filename}`);
    const filename_output = `${req.query.filename}-${req.query.width}x${req.query.height}.png`;
    const output = path.join(__dirname, `../../../thumbs/${filename_output}`); 
    const check_highet = isNumeric(req.query.height);
    const check_width = isNumeric(req.query.width);


    //check if there is file name or not
    if (req.query.filename?.length == 0 || req.query.filename == undefined) {
        return res.status(404).json({ error: 'invalid file name' });
    }
    
     //check if there is height name or not
    if (check_highet == false || req.query.height?.length == 0 || req.query.height == undefined){
        return res.status(404).json({ error: 'invalid Height name' });
    }

    //check if there is height name or not
    if (check_width == false || req.query.width?.length == 0 || req.query.width == undefined){
        return res.status(404).json({ error: 'invalid Width name' });
    }
    

    const check_path_name_for_image_dir = await get_path_name(filename,directoryPath_image);
    const check_path_name_for_thumbs_dir = await get_path_name(filename_output,directoryPath_thumbs);
    
    if (check_path_name_for_thumbs_dir){
        return res.status(200).sendFile(path.resolve(output));
         
    }
    if (check_path_name_for_image_dir){
        
        const get_resizeImage = await resizeImage(imagepath,Number(req.query.width),Number(req.query.height),output);
         if (get_resizeImage == true)
         {
            return res.status(200).sendFile(path.resolve(output));
         }
         else{
            return res.status(500).json('Error Resizeing Image');
         }   
    }
    else{
        return res.status(404).json("Image Not Found");
    }
    
   });

   async function get_path_name (path_name: string, dir_name: string): Promise<Boolean> {
        console.log('path_name: ',path_name);
        console.log('dir_name: ',dir_name);
        const files = await promises.readdir(dir_name);
        const file = files.find((file) => file.includes(path_name));
        const check_file = files.includes(path_name);
        if (check_file){
            return true;
        }
    return false ;
  };

  function isNumeric(n: any) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

export default images;
export {get_path_name}