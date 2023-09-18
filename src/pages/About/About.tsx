import { Typography } from '@material-tailwind/react';
import Footer from '~/Layout/components/Footer';
import Header from '~/Layout/components/Header';
import AboutImage from '~/assets/images/about_Image.png';
import Logo from '~/assets/images/Logo.png';
import IonIcon from '@reacticons/ionicons';
function About() {
  return (
    <>
      <Header />
      <main className="min-h-screen mt-[30rem] bg-cs_purple relative">
        <div className='absolute w-full -translate-y-1/2'>
          <Typography className="h-24 mx-auto w-[62%] text-left text-[40px] font-bold">Thông tin về NEVENT</Typography>
          <div className="relative mx-auto w-[62%]">
            <img className="absolute left-[10%]" src={Logo} alt="Logo of NEVENT" />
            <img className="w-full" src={AboutImage} alt="About NEVENT image" />
          </div>
          <Typography className="h-24 text-2xl font-normal text-cs_light flex justify-center items-center">
            NEVENT là hệ thống quản lý và phân phối vé giúp bạn dễ dàng mua bán vé sự kiện
          </Typography>
        </div>
        <div className="pt-[27rem] flex gap-16 pb-32 px-32 text-cs_light">
          <div>
            <div className="mb-7">
              <IonIcon name="people" className="text-[100px]" />
              <Typography className="text-3xl font-bold">GIỚI THIỆU</Typography>
            </div>
            <p className="text-xl leading-[50px]">
              Được thành lập vào năm 2023, 2023 Nevent là nền tảng phân phối vé sự kiện trực tuyến. Chúng tôi đã hợp tác
              với nhiều đơn vị tổ chức sự kiện và các chương trình quy mô lớn hàng đầu. Các sự kiện thành công được bán
              qua Nevent bao gồm Super Show 9, Concert Hà Anh Tuấn, Idecaf Theater, TEDx, Tech In Asia, WeChoice Awards,
              Forbes Vietnam, Hoa hậu Việt Nam, DJ Hardwell, v.v.
            </p>
          </div>
          <div>
            <div className="mb-7">
              <IonIcon name="infinite" className="text-[100px]" />
              <Typography className="text-3xl font-bold">SỨ MỆNH</Typography>
            </div>
            <p className="text-xl leading-[50px]">
              Nevent không ngừng hoàn thiện để khẳng định vị thế tiên phong trong ngành phân phối vé sự kiện tại Việt
              Nam. Với sự hiểu biết về công nghệ và thị trường, chúng tôi mong muốn góp phần phát triển ngành tổ chức sự
              kiện Việt Nam, sánh ngang với các nước trong khu vực và mang đến những trải nghiệm quốc tế cho khán giả.
            </p>
          </div>
          <div>
            <div className="mb-7">
              <IonIcon name="diamond" className="text-[100px]" />
              <Typography className="text-3xl font-bold">GIÁ TRỊ</Typography>
            </div>
            <p className="text-xl leading-[50px]">
              Đối với chúng tôi, giá trị của một doanh nghiệp là sự đóng góp của nó vào việc làm cho xã hội tốt đẹp hơn.
              Ticketbox được vận hành bởi những người trẻ đam mê và nhiệt huyết, mong muốn giúp việc mua bán vé trở nên
              dễ dàng và thuận tiện hơn cho cả người tổ chức sự kiện và người tham dự.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default About;
