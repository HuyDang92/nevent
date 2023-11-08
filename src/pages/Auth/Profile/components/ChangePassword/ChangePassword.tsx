import { useState } from 'react';
import Button from '~/components/customs/Button';
import Input from '~/components/customs/Input';
import Loading from '~/components/customs/Loading';
import { useChangePasswordMutation } from '~/features/Auth/authApi.service';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [rePassword, setRePassword] = useState<string>('');
  const [changePass, result] = useChangePasswordMutation();

  const handleSubmit = () => {};
  return (
    <div>
      {result.isLoading && <Loading />}
      <h1 className="text-xl font-bold">Đổi mật khẩu</h1>
      <form>
        <div>
          <Input
            classNameInput="w-full border"
            type="password"
            label="Mật khẩu cũ"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <Input
          classNameInput="w-full border"
          type="password"
          label="Mật khẩu mới"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Input
          classNameInput="w-full border"
          type="password"
          label="Xác nhận mật khẩu mới"
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
        />
        <div className="mt-20 text-right">
          <Button className="w-[200px]" mode="dark" value="Lưu thông tin" onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
