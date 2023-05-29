import { Button, Upload, message } from 'antd';

import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useState } from 'react';

const useUploadAttachments = () => {
  const [uploadedAttachment , setUploadedAttachment ] = useState([]);
  
  const getBase64 = (file) =>
  new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
});
    
  const handleUploadChange = async (info) => {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      const base64 = await getBase64(info.file.originFileObj);          
      setUploadedAttachment(base64);
      console.log(uploadedAttachment);
      
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  const props = {
    name: 'file',
    // action: 'http://localhost:3001/upload/attachment',
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
  
  // uploadedAttachment.map((u) =>console.log(u.name , u.size, u.type, u.uid))
  
  return {
    uploadedAttachment,
    render : (
      <Upload.Dragger 
        multiple={true}  
        accept=".pdf" 
        {...props}
       onChange={(info) => handleUploadChange(info)}  
      >
        Drag files here or <br />
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload.Dragger >
      )
  }
};

export default useUploadAttachments;