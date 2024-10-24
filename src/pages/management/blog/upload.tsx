import { useState } from 'react';
import { Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';

interface UploadCropImageProps {
  handleFileListUpdate: (fileList: UploadFile[]) => void; // New prop to send fileList to parent
}

const UploadCropImage: React.FC<UploadCropImageProps> = ({ handleFileListUpdate }) => {
  // State for storing the list of uploaded files
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  // State for storing the uploaded image URL or base64 data
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    // Log the uploaded file details
    console.log("File List:", newFileList);

    // Update the file list
    setFileList(newFileList);
    handleFileListUpdate(newFileList); // Send updated fileList to the parent

    // Set the uploaded image and notify the parent component
    if (newFileList.length > 0 && newFileList[0].status === 'done') {
      const thumbUrl = newFileList[0].thumbUrl || URL.createObjectURL(newFileList[0].originFileObj as File);
      setUploadedImage(thumbUrl);
    }
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as File);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const imgWindow = window.open(src);
    imgWindow?.document.write(`<img src="${src}" style="width:100%;"/>`);
  };

  return (
    <div>
      {/* Image cropper for uploading images */}
      <ImgCrop rotationSlider>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          beforeUpload={() => false} // Prevent the automatic upload to the backend
        >
          {fileList.length < 5 && '+ Upload'}
        </Upload>
      </ImgCrop>

      {/* Display the uploaded image stored in the variable */}
      {uploadedImage && (
        <div style={{ marginTop: 20 }}>
          <h3>Uploaded Image:</h3>
          <img src={uploadedImage} alt="Uploaded" style={{ width: '200px' }} />
        </div>
      )}
    </div>
  );
};

export default UploadCropImage;
