import DefaultCoverImage from '~/assets/images/default-coverImage.png';
import DefaultAvatar from '~/assets/images/default-avatar.jpg';
import { useAppSelector } from '~/hooks/useActionRedux';
import { Tab, Tabs, TabsContent, TabsBody, TabsHeader } from '~/components/Tabs';
import Icon from '~/components/customs/Icon';
import UserInfo from '~/components/UserInfo';
import ChangePassword from '~/components/ChangePassword';
import { Navigate } from 'react-router-dom';
interface ProfileProps {
  className?: string;
}

/**
 * Renders the profile component.
 *
 * @return {ReactElement} The rendered profile component.
 */
const Profile: React.FC<ProfileProps> = () => {
  const auth = useAppSelector((state) => state.auth);
  if (auth.currentUser) {
    return (
      <div>
        <div className="relative">
          <img className="w-full" src={auth?.currentUser?.coverImage || DefaultCoverImage} alt="" />
          <div className="ml-[30px] flex -translate-y-1/2 items-end gap-4">
            <div className="relative">
              <div className="h-[120px] w-[120px] overflow-hidden rounded-full border-[2px] border-cs_semi_green">
                <img src={auth?.currentUser?.avatar || DefaultAvatar} alt="" />
              </div>
              <button className="absolute left-[calc(100%/6*5)] top-[calc(100%/6*5)] grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[1px] border-cs_semi_green bg-cs_light shadow-border-light shadow-cs_light">
                <Icon name="pencil-outline" />
              </button>
            </div>
            <div className="mb-2">
              <h1 className="text-2xl font-bold dark:text-cs_light">{auth?.currentUser?.fullName}</h1>
              <span className="text-cs_gray">{auth?.currentUser?.email}</span>
            </div>
          </div>
          <button className="absolute bottom-[130px] right-[10px] grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[1px] border-cs_semi_green bg-cs_light shadow-border-light shadow-cs_light">
            <Icon name="camera-reverse-outline" />
          </button>
        </div>
        <div>
          <Tabs orientation="horizontal">
            <TabsHeader className="w-[25%]">
              <Tab className="flex items-center justify-between" index={0}>
                <span>Thông tin tài khoản</span>
                <Icon name="newspaper"></Icon>
              </Tab>
              <Tab className="flex items-center justify-between" index={1}>
                <span>Lịch sử giao dịch</span>
                <Icon name="time"></Icon>
              </Tab>
              <Tab className="flex items-center justify-between" index={2}>
                <span>Vé của bạn</span>
                <Icon name="wallet"></Icon>
              </Tab>
              <Tab className="flex items-center justify-between" index={3}>
                <span>Thông báo</span>
                <Icon name="notifications"></Icon>
              </Tab>
              <Tab className="flex items-center justify-between" index={4}>
                <span>Đổi mật khẩu</span>
                <Icon name="key"></Icon>
              </Tab>
            </TabsHeader>
            <TabsBody className="w-[75%] rounded-[25px] p-6">
              <TabsContent index={0}>
                <UserInfo data={auth?.currentUser} />
              </TabsContent>
              <TabsContent index={1}>Lịch sử giao dịch</TabsContent>
              <TabsContent index={2}>Vé của bạn</TabsContent>
              <TabsContent index={3}>Thông báo</TabsContent>
              <TabsContent index={4}>
                <ChangePassword />
              </TabsContent>
            </TabsBody>
          </Tabs>
        </div>
      </div>
    );
  }else{
    return <Navigate to="/login"/>
  }
};

export default Profile;
