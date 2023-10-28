import Button from '~/components/customs/Button';
import Input from '~/components/customs/Input';

const ChangePassword = () => {
  return (
    <div>
      <h1 className="text-xl font-bold">Đổi mật khẩu</h1>
      <form>
        <div>
          <Input classNameInput="w-full border" type="password" label="Mật khẩu cũ" />
        </div>
        <Input classNameInput="w-full border" type="password" label="Mật khẩu mới" />
        <Input classNameInput="w-full border" type="password" label="Xác nhận mật khẩu mới" />
        <div className="mt-20 text-right">
          <Button className="w-[230px]" mode="dark" value="Lưu thông tin" />
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
