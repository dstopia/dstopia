'use strict'

exports.validateImage = (file) => {
    const data = { ...file }
    const ext = data.originalname.split('.')
    data.originalname =
        new Date().getTime().toString() + '.' + ext[ext.length - 1]
    return data
}

/**
   {
     fieldname: 'image',
     originalname: 'name.jpg',
     encoding: '7bit',
     mimetype: 'image/jpeg',
     size: 2076030
   } 
 */
