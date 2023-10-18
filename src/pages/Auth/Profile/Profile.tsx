import DefaultCoverImage from '~/assets/images/default-coverImage.png';
import DefaultAvatar from '~/assets/images/default-avatar.jpg';
import { useAppSelector } from '~/hooks/useActionRedux';
import { Tab, Tabs, TabsContent, TabsBody, TabsHeader } from '~/components/Tabs';
import Icon from '~/components/customs/Icon';
import UserInfo from '~/pages/Auth/Profile/components/UserInfo';
import ChangePassword from '~/pages/Auth/Profile/components/ChangePassword';
import { useCurrentViewportView } from '~/hooks/useViewPort';
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
  const isMdBreakpoint = useCurrentViewportView();
  return (
    <div>
      <div className="relative">
        <img className="w-full h-[170px]" src={auth?.currentUser?.coverImage || DefaultCoverImage} alt="" />
        <div className="absolute flex -translate-y-[75%] items-start gap-4 md:ml-[30px] ml-5">
          <div className="relative">
            <div className="h-[120px] w-[120px] overflow-hidden rounded-full border-[2px] border-cs_semi_green">
              <img src={auth?.currentUser?.avatar || DefaultAvatar} alt="" />
            </div>
            <button className="absolute left-[calc(100%/6*5)] top-[calc(100%/6*5)] grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[1px] border-cs_semi_green bg-cs_light shadow-border-light shadow-cs_light">
              <Icon name="pencil-outline" />
            </button>
          </div>
          <div className="mt-5">
            <h1 className="text-2xl font-bold text-cs_light">{auth?.currentUser?.fullName}</h1>
            <span className="text-cs_light">{auth?.currentUser?.email}</span>
          </div>
        </div>
        <button className="absolute sm:bottom-[5px] top-[35px] right-[5px] grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[1px] border-cs_semi_green bg-cs_light shadow-border-light shadow-cs_light">
          <Icon name="camera-reverse-outline" />
        </button>
      </div>
      <div className=" mt-12 sm:mt-16 dark:text-cs_light">
        <Tabs orientation={isMdBreakpoint.width > 1024 ? 'horizontal' : 'vertical'}>
          <TabsHeader className="w-full xl:w-[25%]">
            <Tab className="flex items-center justify-center xl:justify-between" index={0}>
              <span className="!hidden xl:!block">Thông tin tài khoản</span>
              <Icon name="newspaper" className="text-2xl xl:text-base"></Icon>
            </Tab>
            <Tab className="flex items-center justify-center xl:justify-between" index={1}>
              <span className="!hidden xl:!block">Lịch sử giao dịch</span>
              <Icon name="time" className="text-2xl xl:text-base"></Icon>
            </Tab>
            <Tab className="flex items-center justify-center xl:justify-between" index={2}>
              <span className="!hidden xl:!block">Vé của bạn</span>
              <Icon name="wallet" className="text-2xl xl:text-base"></Icon>
            </Tab>
            <Tab className="flex items-center justify-center xl:justify-between" index={3}>
              <span className="!hidden xl:!block">Thông báo</span>
              <Icon name="notifications" className="text-2xl xl:text-base"></Icon>
            </Tab>
            <Tab className="flex items-center justify-center xl:justify-between" index={4}>
              <span className="!hidden xl:!block">Đổi mật khẩu</span>
              <Icon name="key" className="text-2xl xl:text-base"></Icon>
            </Tab>
          </TabsHeader>
          <TabsBody className="w-full rounded-[25px] p-6 xl:w-[75%]">
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
};

export default Profile;
