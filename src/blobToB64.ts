export function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.toString().split(',')[1]);
    reader.readAsDataURL(blob);
  });
}
