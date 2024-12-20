import { useState } from "react";
import useShowToast from "./useShowToast.js";

const uploadPdf = () => {
  const [uploadImage, setUploadImage] = useState(null);
  const showToast = useShowToast();

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();

      reader.onloadend = () => {
        setUploadImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      showToast("Salah File", "Silahkan upload file PDF", "error");
      setUploadImage(null);
    }
  };

  return { handleUpload, uploadImage };
};

export default uploadPdf;
