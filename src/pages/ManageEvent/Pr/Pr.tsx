import Button from '~/components/customs/Button';
import { Link } from 'react-router-dom';
import Dropdown from '~/components/Dropdown';
import Chamaleon from '~/assets/images/chamaleon-3.svg';
import Icon from '~/components/customs/Icon';
const Pr = () => {
  const event = {
    _id: '652cd125fc13ae657b6c7cdf',
    title: 'ÅÍÎÏ˝ÓÔÒÚÆ☃',
    start_date: '2022-08-11T00:00:00.000Z',
    location: {
      _id: '6545c75892a98643864286e2',
      name: 'Hồ Chí Minh',
      code: '700000',
    },
    categories: [
      {
        _id: '652ccfbc9341999a095b76b5',
        name: 'Âm nhạc',
        image: '652ccf9c9341999a095b76b3',
        createdAt: '2023-10-16T05:53:00.698Z',
        updatedAt: '2023-10-16T05:53:00.698Z',
        __v: 0,
      },
    ],
    banner: [
      {
        _id: '652cd4a7911b66e0c85f305a',
        url: 'http://res.cloudinary.com/dtvqj8h4b/image/upload/v1699107752/Nevents/nevent-1699107751118.jpg',
        secureUrl: 'https://res.cloudinary.com/dtvqj8h4b/image/upload/v1697436836/Nevents/nevent-1697436837783.png',
        publicId: 'Nevents/nevent-1697436837783',
        width: 54,
        height: 54,
        format: 'png',
        type: 'image',
        createdAt: '2023-10-16T06:13:59.316Z',
        updatedAt: '2023-10-16T06:13:59.316Z',
        __v: 0,
      },
    ],
    desc: 'Bypass Upper Esophagus to Jejunum, Open Approach',
    status: 'UPCOMING',
    approve: false,
    hot: false,
    hotLevel: 1,
    updatedAt: '2023-10-16T08:27:36.488Z',
  };

  return (
    <div className="h-full w-full rounded-2xl bg-cs_light p-7 dark:bg-cs_lightDark">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold dark:text-white">Quản lý RSVPS</h1>
        <Dropdown />
      </div>
      <div className="mt-8 overflow-hidden rounded-xl border-[1px] border-cs_semi_green">
        <div className="bg-cs_semi_green p-5">
          <h1 className="text-xl font-bold text-cs_light">{event.title}</h1>
        </div>
        <div className="p-5">
          <div className="border-b-[1px]">
            <b className="text-xl dark:text-cs_light">Link quảng bá : </b>
            <Link className="text-xl text-cs_semi_green" to={`/event-detail/${event._id}`}>
              https://www.nevsolit.website/
            </Link>
            <br />
            <Button className="my-5 !bg-[#3547E4] px-32 text-xl" value="Chia sẻ lên Facebook" />
          </div>
          <div className="flex gap-5 border-b-[1px] py-5">
            <div className="w-1/2">
              <b className="text-xl dark:text-cs_light">Chia sẻ lên Blog website</b>
              <br />
              <span className="text-cs_grayText">
                Copy đoạn mã bên dưới để tạo widget bán vé trên blog hoặc website của bạn
              </span>
              <div className="flex justify-between gap-12">
                <span className="dark:text-cs_light">Size: 500 x 600 px</span>
                <div className="rounded-lg bg-cs_gray p-2.5 w-[60%]">
                  {`<iframe frameborder="0" width="600" height="500" style="max-width:100%" src="https://ticketbox.vn/ticket-booking/88640/widget/v1?colorscheme=default"></iframe>`}
                </div>
              </div>
            </div>
            <div className="flex w-1/2 flex-col items-center rounded-lg border-[1px] border-cs_semi_green px-7 py-9">
              <h1 className="text-xl font-bold text-cs_semi_green">
                Rất tiếc, trang bạn đang tìm kiếm không được tìm thấy.
              </h1>
              <img src={Chamaleon} alt="" />
            </div>
          </div>
          <div className="flex flex-col items-start gap-4 pt-5">
            <b className="text-xl dark:text-cs_light">Quảng bá sự kiện của bạn với Nevent</b>
            <div className="flex items-center gap-5">
              <Icon className="text-2xl text-cs_grayText" name="arrow-forward-outline" />
              <span className="text-xl text-cs_grayText">Xuất hiện trên trang nhất dưới dạng sự kiện nóng. </span>
            </div>
            <div className="flex items-center gap-5">
              <Icon className="text-2xl text-cs_grayText" name="arrow-forward-outline" />
              <span className="text-xl text-cs_grayText">
                Gửi vụ nổ email tùy chỉnh cho những người tham dự tiềm năng.
              </span>
            </div>
            <b className="text-xl dark:text-cs_light">Tải xuống danh sách dịch vụ khuyến mãi của chúng tôi</b>
            <Button className="w-60 text-xl" mode="dark" value="Download" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pr;
