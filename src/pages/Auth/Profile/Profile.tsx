import DefaultCoverImage from '~/assets/images/default-coverImage.png';
import DefaultAvatar from '~/assets/images/default-avatar.jpg';
import { useAppSelector } from '~/hooks/useActionRedux';
import Tabs from '~/components/Tabs';
import Icon from '~/components/customs/Icon';
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
  console.log(auth);
  const tabHeaders = [
    <>
      <span>Thông tin tài khoản</span>
      <Icon name="newspaper-outline" />
    </>,
    <>
      <span>Lịch sử giao dịch</span>
      <Icon name="time-outline" />
    </>,
    <>
      <span>Vé của bạn</span>
      <Icon name="wallet-outline" />
    </>,
    <>
      <span>Đổi mật khẩu</span>
      <Icon name="key-outline" />
    </>,
  ];
  const tabContent = [
    <div>Thông tin tài khoản</div>,
    <div>Lịch sử giao dịch</div>,
    <div>Vé của bạn</div>,
    <div>Đổi mật khẩu </div>,
  ];
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
          <Icon name="pencil-outline" />
        </button>
      </div>
      <div className="h-[1000px]">
        <Tabs className="h-full" tabHeaders={tabHeaders} tabContent={tabContent} />
      </div>
    </div>
  );
};

export default Profile;
