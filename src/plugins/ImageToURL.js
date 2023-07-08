export default function(base64String){
    const byteCharacters = atob(base64String.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const blob = new Blob([new Uint8Array(byteNumbers)], {type: 'image/png'});
    // 生成图片的url地址
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
}