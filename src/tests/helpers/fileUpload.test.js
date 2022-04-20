import { fileUpload } from "../../helpers/fileUpload";
import cloudinary from 'cloudinary'

cloudinary.config({ 
    cloud_name: 'davat1eco', 
    api_key: '787439461171482', 
    api_secret: 'wjhqJhbK6dB3HAXyLdZzFVEDSJE',
    secure: true
  });

describe('Pruebas a fileUpload', () => {



  test('debe de retonrar url', async(done) => {
    
    const resp=await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png');
    const blob= await resp.blob();

    const file= new File([blob], 'foto.png');

    const url = await fileUpload(file);
    expect(typeof url).toBe('string');

    const segments= url.split('/');
    const imgId= segments[segments.length-1].replace('.png','');

    cloudinary.v2.api.delete_resources(imgId, {}, ()=>{ done(); });

  });

  test('debe regresa null si no hay archivo', async () => {
    const file= new File([],'foto.png');
    const url= await fileUpload(file);

    expect(url).toBe(null);
  });
  
  
});
