
This is Node.js server that serves images from postgresql database for a given carousel. 

The running example can be seen at  https://crsl-imglist.herokuapp.com/1, 
                                    https://crsl-imglist.herokuapp.com/2,
                                    https://crsl-imglist.herokuapp.com/3
for the 3 carousels. 

To retrieve the image sources, server connects to postgresql tables "Carousel" and "Images". 
The image sources are saved as base64 format in table "Images".

The API for getting images works at https://serveraddress:port/:id (id of the caorousel). In this example, 3 carousels with 4, 3, 3, images
respectively. 

