import { useState } from 'react';
import Button from '~/components/customs/Button';
import SectionTitle from '~/components/SectionTitle';
import Thumb from '~/assets/images/pro.webp';
import des from '~/assets/images/detail.png';
import des2 from '~/assets/images/detail2.png';
import Icon from '~/components/customs/Icon';
import BreadcrumbsComponent from '~/components/Breadcrumbs/Breadcrumbs';
import { Link } from 'react-router-dom';
import ProductCard from '~/components/EventCard';

function DetailEvent() {
  const [visibleProducts, setVisibleProducts] = useState(8); // Số lượng sản phẩm hiển thị ban đầu
  const tabHeader = ['Giới thiệu', 'Thông tin về', 'Ngày tổ chức', 'Lưu ý'];
  const tabContent = [
    'content 1',
    'content 2',
    'content 3',
    'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for "lorem ipsum" will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for "lorem ipsum" will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for "lorem ipsum" will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for "lorem ipsum" will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for "lorem ipsum" will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for "lorem ipsum" will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for "lorem ipsum" will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
  ];
  const tempProductData = [
    {
      image: Thumb,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: Thumb,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: Thumb,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: Thumb,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: Thumb,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: Thumb,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: Thumb,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: Thumb,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
    {
      image: Thumb,
      title: '[PARADISE SHOW 29.09] MYRA TRẦN & BẠCH MÃ HOÀNG TỬ CỨU CÔNG CHÚA',
      date: '12:00 - 21/12/2023',
      place: 'Hồ Chí Minh',
      category: 'Cuộc thi',
    },
  ];

  return (
    <div className="relative">
      <BreadcrumbsComponent baseLink="Trang chủ" linkBack="/" link="Name product" />
      <div className="flex-row-reverse gap-4 xl:flex">
        <div className="mb-5 h-fit md:top-[80px] xl:sticky xl:block xl:w-[380px]">
          <div className="rounded-xl p-3 text-[14px] shadow-border-blur dark:border">
            <img src={Thumb} alt="" className="h-[180px] w-full rounded-xl object-cover sm:h-[300px] xl:h-[180px]" />
            <div className="space-y-3  p-1 pt-2 sm:px-28 xl:px-1">
              <h1 className="text-[20px] font-bold text-cs_dark dark:text-cs_light">
                PARTY NIGHT - WE ARE GAYS | EVENT SUPER MUSIC NIGHT
              </h1>
              <div className="flex items-center gap-[15px]">
                <Icon name="timer-outline" className="w-[10%] text-xl dark:text-cs_light" />
                <span className="w-[90%] dark:text-cs_light">Friday, 10 November 2023 (07:00 PM - 11:00 PM)</span>
              </div>
              <div className="flex items-center gap-[15px]">
                <Icon name="navigate-outline" className="w-[10%] text-xl dark:text-cs_light" />
                <span className="w-[90%] dark:text-cs_light">
                  <b>Cung thể thao Điền Kinh - Mỹ Đình,</b> <br />
                  <span>Phố Trần Hữu Dực, Phường Cầu Diễn, District Nam Tu Liem, Ha Noi City</span>
                </span>
              </div>
              <div className="">
                <span className="w-[90%] dark:text-cs_light">Giá vé:</span>
                <div className="py-2">
                  <ul className="grid grid-cols-2 gap-2">
                    <li className="rounded-lg  bg-[#FF3232] p-2 text-cs_light">
                      <span className="">VIP: 3.800.000 VNĐ</span>
                    </li>
                    <li className="rounded-lg bg-[#FF6F32] p-2 text-cs_light">
                      <span className="">VIP: 3.800.000 VNĐ</span>
                    </li>
                    <li className="rounded-lg bg-[#D7C524] p-2 text-cs_light">
                      <span className="">VIP: 3.800.000 VNĐ</span>
                    </li>
                    <li className="rounded-lg bg-[#3FD827] p-2 text-cs_light">
                      <span className="">VIP: 3.800.000 VNĐ</span>
                    </li>
                  </ul>
                </div>
              </div>
              <Button className="w-full" value="Đặt vé ngay" mode="dark" />
            </div>
          </div>
        </div>
        <div className="xl:w-[80%]">
          <div className="hidden xl:block">
            <img src={Thumb} alt="" className="w-full rounded-xl object-cover sm:h-[350px] xl:h-[450px]" />
          </div>
          <div className="space-y-10 xl:py-5 ">
            <div className=" hidden flex-col justify-between text-[12px] md:text-[18px] xl:flex">
              <h1 className="text-[18px] font-bold text-cs_dark dark:text-cs_light md:text-[1.5rem]">
                PARTY NIGHT - WE ARE GAYS | EVENT SUPER MUSIC NIGHT
              </h1>
              <div className="mt-[10px] flex items-center gap-[10px] md:gap-[20px] ">
                <div className="h-[70px] w-[120px] overflow-hidden rounded-[5px] shadow-border-full dark:border md:h-[120px] md:w-[115px]">
                  <div className="grid h-[10px] place-content-center bg-cs_semi_green py-2 text-[8px] text-cs_light md:h-[35px] md:text-[15px]">
                    Tháng 10
                  </div>
                  <div className="flex h-[60px] flex-col items-center justify-center md:h-[85px]">
                    <span className="text-xl font-bold dark:text-cs_light md:mb-2 md:text-[40px]">20</span>
                    <span className="text-[8px] dark:text-cs_light md:text-[14px]">Thứ 6</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-[15px]">
                    <Icon name="timer-outline" className="w-[10%] text-[15px] dark:text-cs_light md:text-xl" />
                    <span className="w-[90%] dark:text-cs_light">
                      Friday, 10 November 2023&nbsp;<span className="text-[#ff0000] "> (07:00 PM - 11:00 PM)</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-[15px]">
                    <Icon name="navigate-outline" className="w-[10%] text-[15px] dark:text-cs_light md:text-xl" />
                    <span className="w-[90%] dark:text-cs_light">
                      <b>Cung thể thao Điền Kinh - Mỹ Đình,</b> <br />
                      <span>Phố Trần Hữu Dực, Phường Cầu Diễn, District Nam Tu Liem, Ha Noi City</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* description  */}
            <div className="space-y-4 px-2 text-[14px] dark:text-cs_light sm:px-0  sm:text-[16px]">
              <h1 className="text-[18px] font-bold text-cs_dark dark:text-cs_light md:text-[1.5rem]">Mô tả</h1>
              <div className=" leading-8">
                <h3>
                  I. THÔNG TIN CHI TIẾT VỀ SỰ KIỆN “LEE JONG SUK 2023 FANMEETING TOUR in HO CHI MINH” [ ENGLISH BELOW]
                </h3>
                <ul>
                  <li>▪️ Tên sự kiện: “LEE JONG SUK 2023 FANMEETING TOUR in HO CHI MINH”</li>
                  <li>
                    ▪️ Tên sự kiện: “LEE JONG SUK 2023 FANMEETING TOUR in HO CHI MINH” ▪️ Thời gian tổ chức: 18h00 thứ
                    7, 21/10/2023 tại Trung tâm Hội nghị Adora Center, 431 Hoàng Văn Thụ, Phường 4, Quận Tân Bình, TP.Hồ
                    Chí Minh ▪️ Tên sự kiện: “LEE JONG SUK 2023 FANMEETING TOUR in HO CHI MINH”
                  </li>
                  <li>▪️ Hotline hỗ trợ: 08.999.80.818 - 0243.788.00.99</li>
                </ul>
                <h3>GIÁ VÉ VÀ QUYỀN LỢI CÁC HẠNG VÉ</h3>
                <ul>
                  <li>▪️ Tên sự kiện: “LEE JONG SUK 2023 FANMEETING TOUR in HO CHI MINH”</li>
                  <li>
                    ▪️ Giá vé: VVIP: 4.600.000 VNĐ - Vé VIP: 3.800.000 VNĐ - Vé Platinum A: 2.000.000 VNĐ - Vé Platinum
                    B: 1.500.000VNĐ
                  </li>
                  <li>
                    ▪️ Lưu ý: Tất cả giá vé trên chưa bao gồm thuế GTGT theo quy định của pháp luật áp dụng hiện hành.
                  </li>
                </ul>
              </div>
              <img src={des} alt="" className="w-full" />
              <img src={des2} alt="" className="w-full" />
              <div className=" leading-8">
                <h3>
                  I. THÔNG TIN CHI TIẾT VỀ SỰ KIỆN “LEE JONG SUK 2023 FANMEETING TOUR in HO CHI MINH” [ ENGLISH BELOW]
                </h3>
                <ul>
                  <li>▪️ Tên sự kiện: “LEE JONG SUK 2023 FANMEETING TOUR in HO CHI MINH”</li>
                  <li>
                    ▪️ Tên sự kiện: “LEE JONG SUK 2023 FANMEETING TOUR in HO CHI MINH” ▪️ Thời gian tổ chức: 18h00 thứ
                    7, 21/10/2023 tại Trung tâm Hội nghị Adora Center, 431 Hoàng Văn Thụ, Phường 4, Quận Tân Bình, TP.Hồ
                    Chí Minh ▪️ Tên sự kiện: “LEE JONG SUK 2023 FANMEETING TOUR in HO CHI MINH”
                  </li>
                  <li>▪️ Hotline hỗ trợ: 08.999.80.818 - 0243.788.00.99</li>
                </ul>
                <h3>GIÁ VÉ VÀ QUYỀN LỢI CÁC HẠNG VÉ</h3>
                <ul>
                  <li>▪️ Tên sự kiện: “LEE JONG SUK 2023 FANMEETING TOUR in HO CHI MINH”</li>
                  <li>
                    ▪️ Giá vé: VVIP: 4.600.000 VNĐ - Vé VIP: 3.800.000 VNĐ - Vé Platinum A: 2.000.000 VNĐ - Vé Platinum
                    B: 1.500.000VNĐ
                  </li>
                  <li>
                    ▪️ Lưu ý: Tất cả giá vé trên chưa bao gồm thuế GTGT theo quy định của pháp luật áp dụng hiện hành.
                  </li>
                </ul>
              </div>
            </div>
            {/* Info bussiness */}
            <div className="space-y-4 rounded-xl p-4 shadow-border-blur dark:text-cs_light">
              <h1 className="text-[18px] font-bold text-cs_dark dark:text-cs_light md:text-[20px]">
                Thông tin nhà tổ chức
              </h1>
              <div className="gap-4 sm:flex">
                <Link to="/" className="w-1/4">
                  <img src={Thumb} alt="" className="h-[250px] w-full rounded-lg object-cover sm:h-[150px]" />
                </Link>
                <div className="w-3/4 pt-3 sm:pt-0">
                  <h3 className="font-bold ">BOM ENTERTAINMENT</h3>
                  <p className="line-clamp-5">
                    Được thành lập từ năm 2016, Công ty TNHH Bôm Hà Nội là công ty đa ngành nghề với các lĩnh vực như
                    xây dựng; đầu tư, cho thuê bất động sản; xuất nhập khẩu các sản phẩm y tế;…Năm 2022, BÔM Hà Nội phát
                    triển lĩnh vực hoạt động nghệ thuật giải trí với tên gọi BOM Entertainment - mục đích là cầu nối,
                    kết nối, quảng bá văn hóa Hàn Quốc đến khán giả Việt Nam rộng rãi hơn nữa. BOM Entertainment có mối
                    quan hệ thân thiết với các công ty giải trí hàng đầu tại Hàn Quốc. Vào 21/10/2023 tại Trung tâm Hội
                    nghị Adora Center, 431 Hoàng Văn Thụ, Phường 4, Quận Tân Bình, TP.Hồ Chí Minh, BOM Entertainment là
                    đơn vị tổ chức chương trình Lee Jong Suk 2023 Fanmeeting tour – “Dear.My with” trong Fanmeeting tour
                    của diễn viên Lee Jong Suk.
                  </p>
                </div>
              </div>
            </div>
            <SectionTitle value="Sự kiện sắp diễn ra" />
            <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
              {tempProductData.map((item, index) => (
                <Link to={'/'} key={index}>
                  <ProductCard data={item} index={index} />
                </Link>
              ))}
            </div>
            <div className="mt-5 flex justify-center">
              <Button className="" value="Xem thêm" mode="dark" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailEvent;
