import { Typography, Upload } from 'antd';
import { UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import { useState } from 'react';

import { fBytes } from '@/utils/format-number';

import { Iconify } from '../icon';

import { StyledUploadAvatar } from './styles';
import { beforeAvatarUpload, getBlobUrl } from './utils';

interface Props extends UploadProps {
  defaultAvatar?: string;
  helperText?: React.ReactElement | string;
}
export function UploadAvatar({ helperText, defaultAvatar = '', ...other }: Props) {
  const [imageUrl, setImageUrl] = useState<string>(defaultAvatar);

  const [isHover, setIsHover] = useState(false);
  const handelHover = (hover: boolean) => {
    setIsHover(hover);
  };

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (['done', 'error'].includes(info.file.status!)) {
      // TODO: Get this url from response in real world.
      setImageUrl(getBlobUrl(info.file.originFileObj!));
    }
  };

  const renderPreview = <img src={imageUrl} alt="" className="absolute rounded-full" />;

  const renderPlaceholder = (
    <div
      style={{
        backgroundColor: !imageUrl || isHover ? 'rgba(22, 28, 36, 0.64)' : 'transparent',
        color: '#fff',
      }}
      className="absolute z-10 flex h-full w-full flex-col items-center justify-center"
    >
      <Iconify icon="solar:camera-add-bold" size={32} />
      <div className="mt-1 text-xs">Upload Photo</div>
    </div>
  );

  const renderContent = (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full"
      onMouseEnter={() => handelHover(true)}
      onMouseLeave={() => handelHover(false)}
    >
      {imageUrl ? renderPreview : null}
      {!imageUrl || isHover ? renderPlaceholder : null}
    </div>
  );

  const defaultHelperText = (
    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
      Allowed *.jpeg, *.jpg, *.png, *.gif
      <br /> max size of {fBytes(3145728)}
    </Typography.Text>
  );
  const renderHelpText = <div className="text-center">{helperText || defaultHelperText}</div>;

  return (
    <StyledUploadAvatar>
      <Upload
        name="avatar"
        showUploadList={false}
        listType="picture-card"
        className="!flex items-center justify-center"
        {...other}
        beforeUpload={beforeAvatarUpload}
        onChange={handleChange}
      >
        {renderContent}
      </Upload>
      {renderHelpText}
    </StyledUploadAvatar>
  );
}

type UploadBlogProps = {
  helperText?: string;
  defaultAvatar?: string;
  onUpload: (url: string) => void; // Function to pass the uploaded image URL
};

export function UploadBlogImage({
  helperText,
  defaultAvatar = '',
  onUpload,
  ...other
}: UploadBlogProps) {
  const [imageUrl, setImageUrl] = useState<string>(defaultAvatar);
  const [isHover, setIsHover] = useState(false);

  const handelHover = (hover: boolean) => {
    setIsHover(hover);
  };

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      const blobUrl = getBlobUrl(info.file.originFileObj!); // Generate a blob URL from the file
      setImageUrl(blobUrl);
      onUpload(blobUrl); // Call the onUpload function to pass the uploaded URL
    }
  };

  const renderPreview = <img src={imageUrl} alt="Avatar" className="h-full w-full object-cover" />;

  const renderPlaceholder = (
    <div
      style={{
        backgroundColor: !imageUrl || isHover ? 'rgba(22, 28, 36, 0.64)' : 'transparent',
        color: '#fff',
      }}
      className="absolute z-10 flex h-full w-full flex-col items-center justify-center"
    >
      <Iconify icon="solar:camera-add-bold" size={32} />
      <div className="mt-1 text-xs">Upload Photo</div>
    </div>
  );

  const renderContent = (
    <div
      className="relative flex items-center justify-center overflow-hidden"
      onMouseEnter={() => handelHover(true)}
      onMouseLeave={() => handelHover(false)}
    >
      {imageUrl ? renderPreview : null}
      {!imageUrl || isHover ? renderPlaceholder : null}
    </div>
  );

  const defaultHelperText = (
    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
      Allowed *.jpeg, *.jpg, *.png, *.gif
      <br /> max size of {fBytes(3145728)}
    </Typography.Text>
  );

  const renderHelpText = <div>{helperText || defaultHelperText}</div>;

  return (
    <div className="flex items-center space-x-4">
      <Upload
        name="avatar"
        showUploadList={false}
        listType="picture-card"
        className="!flex items-center justify-center"
        {...other}
        beforeUpload={beforeAvatarUpload}
        onChange={handleChange}
      >
        {renderContent}
      </Upload>
      <div>{renderHelpText}</div>
    </div>
  );
}
