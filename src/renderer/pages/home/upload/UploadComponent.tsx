import { useState } from 'react';
import { message, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { tr } from '../../../translate/Translate';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export default function UploadComponent() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const beforeUpload = (file: RcFile) => {
    if (!(file.type === 'image/jpeg' || file.type === 'image/png')) {
      message.error('You can only upload JPG/PNG file!');
      return false;
    }
    setLoading(true);
    getBase64(file, (url) => {
      setImageUrl(url);
      setLoading(false);
    });
    return false;
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
        displayName={tr("")}
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      beforeUpload={beforeUpload}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="avatar" style={{ width: '100px' }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
}
