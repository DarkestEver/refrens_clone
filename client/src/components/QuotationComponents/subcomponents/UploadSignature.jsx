import { CloseOutlined, PlusOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Input, Modal, Upload, message } from 'antd';

import axios from "axios";
import { useState } from "react";

const url = "http://localhost:3001/upload/signature";

const useSignatureUpload = () => {
    const [ uploadedSignature , setUploadedSignature ] = useState(null);
    const [ addSignatureLabel, setAddSignatureLabel] = useState(true);
    const [ signatureLabel , setSignatureLabel ] = useState("Authorized Signature");
    const [ postImage , setPostImage ] = useState({myFile : ""});

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
    });

    
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    
    const uploadButton = (
        <div>
        <PlusOutlined />
        <div
            style={{
            marginTop: 8,
            }}
        >
            Upload
        </div>
        </div>
    );

    const handleUploadChange = async (info) => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          const base64 = await getBase64(info.file.originFileObj); // Use originFileObj to get the file for base64 conversion
          setUploadedSignature(base64);
          
          setPostImage({ myFile: base64 });
          createPost(postImage);

        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);

        }
      };

    const createPost = async (postImage) => {
      try {
        await axios.post(url, postImage);
        console.log("uploaded!!");
      } catch (err) {
        console.log(err);
      }
    }
 
  const props = {
    name: 'file',
    // action: url,        
    // headers: {
    //   authorization: 'authorization-text',
    // },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

    //   console.log(uploadedSignature , signatureLabel);
      
    //   console.log(uploadedSignature.thumbUrl);

    return {
        uploadedSignature,
        signatureLabel,
        render: (
            <>
            <Upload
                {...props}
                accept=".jpeg,.png" 
                listType="picture-circle"
                maxCount={1}
                onPreview={handlePreview}
                onChange={(info) => handleUploadChange(info)}
            >
                {uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                alt="example"
                style={{
                    width: '100%',
                    }}
                    src={previewImage}
                    />
            </Modal>

            { addSignatureLabel ?
                   <>  
                       <div className="n-top-desc" style={{paddingBottom: '0.5rem'}}>Add Signature Label
                           <CloseOutlined onClick={() => setAddSignatureLabel(false)}/>
                       </div>
                       <Input onChange={(e) => setSignatureLabel(e.target.value)} placeholder="Add your Name" value={signatureLabel} />
                   </>
               :
                   <div class='s-sig-label' onClick={() => setAddSignatureLabel(true)}>
                       <PlusSquareOutlined style={{ color: 'rgb(115, 61, 217)', paddingRight: '8px', display:'flex',alignItems:'center' }} />
                       Add Signature Label
                   </div>
            }
        </>
    )
}
};
export default useSignatureUpload;