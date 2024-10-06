export const handleImageChange = (event, imageRef, fileRef) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imageRef.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
    fileRef.value = file;
};
