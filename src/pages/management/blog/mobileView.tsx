/* eslint-disable react/no-danger */
import { useSettings } from '@/store/settingStore';
import { useThemeToken } from '@/theme/hooks';

import { ThemeMode } from '#/enum';
import { Image, UploadFile } from 'antd';
import { useEffect, useState } from 'react';

type Props = {
  content: string;
  fileList: UploadFile[]
};

export default function BlogMobileView({ content, fileList }: Props) {
  const { colorBgContainer } = useThemeToken();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const { themeMode } = useSettings();

  const boxShadow: { [key in ThemeMode]: string } = {
    light: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
    dark: 'rgba(0, 0, 0, 0.2) 0px 0px 2px 0px, rgba(0, 0, 0, 0.12) 0px 12px 24px -4px',
  };
useEffect(()=>{
  if(fileList.length === 1){
    const thumbUrl = fileList[0].thumbUrl || URL.createObjectURL(fileList[0].originFileObj as File);
    setUploadedImage(thumbUrl);
  }
  }, [fileList])
  return (
    <div
      style={{
        backgroundColor: colorBgContainer,
        backgroundImage: 'none',
        boxShadow: boxShadow[themeMode],
        transition: `box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`,
        borderRadius: '16px',
        padding: '24px',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Add an image at the top */}
      <Image
        src={uploadedImage||''}
        alt="Blog visual"
        style={{
          width: 'auto',
          height: 'auto',
          borderRadius: '16px',
          marginBottom: '16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      />
      {/* Display the content */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
