export const capitalizeFirst = (name) => 
name.charAt(0).toUpperCase() + name.slice(1);


export const getImageId=(id)=>{
    let imageId=id;
    console.log(`this is the start id ${imageId}`)
    if (id<10){
        imageId=`00${id}`
        console.log(imageId);
    }
    else if(id<100>10){
        imageId=`0${id}`
    };
    console.log(`this is the new id${imageId}`)
    return imageId;
    
};