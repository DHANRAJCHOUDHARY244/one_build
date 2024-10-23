import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Row, Tooltip } from 'antd';
import { useEffect } from 'react';

import { fakeAvatars } from '@/_mock/utils'; // Assuming this generates fallback avatars
import DCard from '@/components/dcard';
import { useDashboardData, useFetchDashboardData } from '@/store/dashboardStore';

import BannerCard from './banner-card';
import TransactionsList from './recent-history';
import TotalCard from './total-card';
import { useRouter } from '@/router/hooks';

function Workbench() {
  const { push } = useRouter();
  const dashboardData = useDashboardData(); // Get current dashboard data from Zustand store
  const fetchDashboardData = useFetchDashboardData(); // Fetch data from API

  useEffect(() => {
    fetchDashboardData(); // Fetch data on component mount
  }, [fetchDashboardData]);

  // Extract user data
  const users = dashboardData?.users || []; // Ensure users data is available

  return (
    <div className="p-2">
      <Row gutter={[16, 16]} justify="center">
        <Col span={24} lg={16}>
          <BannerCard />
        </Col>
        <Col span={24} lg={8}>
          <TotalCard
            title="Total No. Of Users"
            count={dashboardData?.totalUsers}
          />
          <div className="rounded-lg p-4 shadow-lg">
            <span className="text-sm font-bold">Users</span>
            <div className="flex w-full flex-wrap justify-around">
              {/* Use Avatar.Group to display user avatars */}
              <Avatar.Group max={{ count: 5 }}>
                {users.map((user) => {
                  const avatarSrc =
                    user.media?.find((mediaItem) => mediaItem.media_category === 'userPhoto')
                      ?.media_path || fakeAvatars(1)[0];
                  return (
                    <Tooltip title={user.user_name} placement="top">
                      <Avatar
                        src={avatarSrc} // Display the media path or fallback GitHub avatar
                        icon={<UserOutlined />} // Fallback icon if something goes wrong
                      />
                    </Tooltip>
                  );
                })}
              </Avatar.Group>
              <Button type="link" iconPosition="end" icon={<UserOutlined/>}  onClick={()=>push('/management/create-new-user')}>
                See All
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4" justify="center">
        <Col xs={24} sm={24} md={12} lg={8}>
          <DCard
            Date={`${new Date(Date.now()).toLocaleDateString()}`}
            FirstAmount={dashboardData?.depositSum}
            SecondAmount={String(dashboardData?.todayDepositSum)} // Convert to string
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={8}>
          <DCard
            _isWithdrawal
            Date={`${new Date(Date.now()).toLocaleDateString()}`}
            FirstAmount={dashboardData?.withdrawalSum}
            SecondAmount={String(dashboardData?.todayWithdrawalSum)}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8}>
          <TransactionsList
            deposit={dashboardData?.deposit}
            withdrawal={dashboardData?.withdrawal}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Workbench;
