import { CSSProperties, useState } from 'react';

import CoverImage from '@/assets/images/cover/cover_4.jpg';
import Card from '@/components/card';
import { Iconify } from '@/components/icon';
import { useUserInfo } from '@/store/userStore';
import { useThemeToken } from '@/theme/hooks';

import ProfileTab from './profile-tab';

function UserProfile() {
  const {
    avatar,
    user_name: username,
    first_name: firstName,
    last_name: lastName,
    email,
    address,
    phone,
    admin_type: adminType,
    active,
  } = useUserInfo();

  const { colorTextBase } = useThemeToken();
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const bgStyle: CSSProperties = {
    background: `linear-gradient(rgba(0, 75, 80, 0.8), rgba(0, 75, 80, 0.8)) center center / cover no-repeat, url(${CoverImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    borderRadius: '20px 20px 0 0',
    backgroundSize: 'cover',
  };

  const tabs = [
    {
      icon: <Iconify icon="solar:user-id-bold" size={24} className="mr-2" />,
      title: 'Profile',
      content: <ProfileTab />,
    },
  ];

  return (
    <>
      <Card className="relative mb-6 h-[290px] flex-col rounded-2xl !p-0 shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl">
        <div style={bgStyle} className="relative h-full w-full">
          <div className="absolute inset-0 rounded-2xl bg-black opacity-20" />
          <div className="relative z-10 flex flex-col items-center justify-center pt-12 md:absolute md:bottom-6 md:left-6 md:flex-row md:pt-0">
            <img
              src={avatar}
              className="h-20 w-20 rounded-full shadow-md transition-transform duration-300 ease-in-out hover:scale-105 md:h-32 md:w-32"
              alt=""
            />
            <div className="ml-6 mt-6 flex flex-col justify-center text-[white] md:mt-0">
              <span className="mb-2 text-2xl font-bold leading-tight">{`${firstName} ${lastName}`}</span>
              <span className="text-center text-base font-light opacity-70 md:text-left">
                {adminType}
              </span>
            </div>
          </div>
        </div>
        <div className="z-10 min-h-[48px] w-full border-t border-gray-300">
          <div className="mx-6 flex h-full justify-center md:justify-end">
            {tabs.map((tab, index) => (
              <button
                onClick={() => setCurrentTabIndex(index)}
                key={tab.title}
                type="button"
                className="text-white relative px-4 py-2 font-semibold transition-colors duration-300 ease-in-out hover:text-gray-300"
                style={{
                  marginRight: index >= tabs.length - 1 ? '0px' : '40px',
                  opacity: index === currentTabIndex ? 1 : 0.6,
                  borderBottom: index === currentTabIndex ? `3px solid ${colorTextBase}` : '',
                  transform: index === currentTabIndex ? 'scale(1.05)' : 'scale(1)',
                  transition: 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out',
                }}
              >
                {tab.icon}
                <span className="ml-2">{tab.title}</span>
              </button>
            ))}
          </div>
        </div>
      </Card>

      <div className="bg-white rounded-2xl p-6 shadow-md transition-transform duration-300 ease-in-out">
        {/* Displaying user details */}
        <div className="flex flex-grow flex-wrap justify-center gap-2 align-middle">
          <div className="m-1 w-[300px] rounded-xl p-1 text-center shadow-lg">
            <h4 className="font-bold">Username:</h4>
            <p>{username}</p>
          </div>
          <div className="m-1 w-[300px] rounded-xl p-1 text-center shadow-lg">
            <h4 className="font-bold">Email:</h4>
            <p>{email}</p>
          </div>
          <div className="m-1 w-[300px] rounded-xl p-1 text-center shadow-lg">
            <h4 className="font-bold">Full Name:</h4>
            <p>{`${firstName} ${lastName}`}</p>
          </div>
          <div className="m-1 w-[300px] rounded-xl p-1 text-center shadow-lg">
            <h4 className="font-bold">Address:</h4>
            <p>{address}</p>
          </div>
          <div className="m-1 w-[300px] rounded-xl p-1 text-center shadow-lg">
            <h4 className="font-bold">Phone:</h4>
            <p>{phone}</p>
          </div>
          <div className="m-1 w-[300px] rounded-xl p-1 text-center shadow-lg">
            <h4 className="font-bold">Admin Type:</h4>
            <p>{adminType}</p>
          </div>
          <div className="m-1 w-[300px] rounded-xl p-1 text-center shadow-lg">
            <h4 className="font-bold">Status:</h4>
            <p>{active ? 'Active' : 'Inactive'}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
