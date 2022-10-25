import supertest from 'supertest';
import app from "../index";
import  { resizeImage } from "../utilities/utilities";
import path from 'path';
import { get_path_name } from '../routes/api/images';


const request = supertest(app);
let dir = __dirname;
const directoryPath_image = path.join(dir, '../../images/face.png');
const thumbsPath_image = path.join(dir, '../../thumbs/face-70x70.png');  


describe('Test responses from endpoints', (): void => {
  describe('endpoint: /', (): void => {
    it('gets /', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/');
      expect(response.status).toBe(404);
    }
    );
  })});

it('Resize the image  ', async (): Promise<void> => {
  let src_path = dir.replace("build", "src");  
  const result  = await resizeImage(directoryPath_image,70,70,thumbsPath_image);
  expect(result).toBe(true);

});


it('return true if file exisit ', async (): Promise<void> => {
  const result  = await get_path_name('face.png',path.join(dir, '../../images'));
  expect(result).toBe(true);

});
