import { faker } from '@faker-js/faker';
import { Typography } from 'antd';

import Card from '@/components/card';
import { Iconify } from '@/components/icon';
import { useUserInfo } from '@/store/userStore';

export default function ProfileTab() {
  const userData = useUserInfo();
  const AboutItems = [
    {
      icon: <Iconify icon="fa-solid:user" size={18} />,
      label: 'Full Name',
      val: userData.user_name,
    },
    { icon: <Iconify icon="eos-icons:role-binding" size={18} />, label: 'Role', val: 'Developer' },
    { icon: <Iconify icon="tabler:location-filled" size={18} />, label: 'Country', val: 'USA' },
    { icon: <Iconify icon="ion:language" size={18} />, label: 'Language', val: 'English' },
    { icon: <Iconify icon="ph:phone-fill" size={18} />, label: 'Contact', val: '(123)456-7890' },
    {
      icon: <Iconify icon="ic:baseline-email" size={18} />,
      label: 'Email',
      val: userData.user_name,
    },
  ];

  return (
    <Card className="flex-col">
      <div className="flex w-full flex-col">
        <Typography.Title level={5}>About</Typography.Title>
        <Typography.Text>{faker.lorem.paragraph()}</Typography.Text>

        <div className="mt-2 flex flex-col gap-4">
          {AboutItems.map((item, index) => (
            <div className="flex" key={index}>
              <div className="mr-2">{item.icon}</div>
              <div className="mr-2">{item.label}:</div>
              <div className="opacity-50">{item.val}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
