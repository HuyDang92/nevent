import Footer from '~/Layout/components/Footer';
import Header from '~/Layout/components/Header';
<<<<<<< HEAD
import { IconDiamond, IconTrophy } from '~/assets/icon';
import AboutImage1 from '~/assets/images/about_image1.png';
import AboutImage2 from '~/assets/images/about_image2.png';
import AboutImage3 from '~/assets/images/about_image3.png';
=======
import AboutImage from '~/assets/images/about_Image.png';
// import logo from '~/assets/images/logo.svg';
import IonIcon from '@reacticons/ionicons';

>>>>>>> 4c7658a70ab13303ec5781baacb66990ff45c338
function About() {
  return (
    <>
      <Header />
<<<<<<< HEAD
      <main className="min-h-screen dark:bg-cs_dark">
        <div className="relative mx-5">
          <h1 className="absolute left-1/2 top-10 -translate-x-1/2 text-5xl font-bold text-cs_light">NEVENT</h1>
          <img src={AboutImage1} className="w-full" alt="Photo of Nevent" />
          <div className="absolute left-1/2 top-36 w-[1000px] -translate-x-1/2 rounded-2xl bg-[rgba(255,255,255,0.2)] p-10 backdrop-blur-[100px]">
            <h1 className="mb-2.5 text-center text-3xl font-bold text-cs_light">Một phong cách mới. Tại sao?</h1>
            <p className="mb-10 text-center text-cs_light">
              Đi kèm nhu cầu sử dụng và trải nghiệm theo một phong cách hoàn toàn mới
            </p>
            <div className="flex justify-between">
              <div className="flex w-[440px] flex-col gap-5 rounded-2xl bg-cs_light p-5">
                <IconTrophy className="h-[52px] w-[52px]" />
                <h1 className="text-2xl font-bold">Linh hoạt trải nghiệm.</h1>
                <p>
                  Chúng tôi sẽ đem đến cho bạn một website đảm bảo được sự trải nghiệm của bạn luôn đạt ở mức tốt nhất.
                  Cùng với hàng loạt sự hỗ trợ tù những tính năng độc đáo mà chúng tôi đem lại và cũng đặc biệt nhất là
                  sự mới lạ từ giao diện sẽ cho bạn một trải nghiệm thoải mái trong việc lựa chọn vé để tham gia sự
                  kiện. Chúng tôi luôn đồng hành cùng bạn trong mọi cuộc vui.
                </p>
              </div>
              <div className="flex w-[440px] flex-col gap-5 rounded-2xl bg-cs_light p-5">
                <IconDiamond className="h-[52px] w-[52px]" />
                <h1 className="text-2xl font-bold">An toàn thông tin</h1>
                <p>
                  Chúng tôi sẽ đảm thông tin của khách hàng sử dụng dịch vụ của chúng tôi đồng thời. Nếu quý khách dụng
                  dịch vụ Nevent, sẽ được bảo hành nên hãy đảm bảo với chúng tôi. Chắc vậy!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-36 flex w-[1000px] justify-between gap-20 rounded-2xl bg-cs_light p-10 pr-0 shadow-border-full dark:bg-cs_icon_black dark:text-cs_light">
=======
      <main className="relative mt-[30rem] min-h-screen bg-cs_purple">
        <div className="absolute w-full -translate-y-1/2">
          <Typography className="mx-auto h-24 w-[62%] text-left text-[40px] font-bold">Thông tin về NEVENT</Typography>
          <div className="relative mx-auto w-[62%]">
            {/* <img className="absolute left-[10%]" src={logo} alt="logo of NEVENT" /> */}
            <img className="w-full" src={AboutImage} alt="About NEVENT image" />
          </div>
          <Typography className="flex h-24 items-center justify-center text-2xl font-normal text-cs_light">
            NEVENT là hệ thống quản lý và phân phối vé giúp bạn dễ dàng mua bán vé sự kiện
          </Typography>
        </div>
        <div className="flex gap-16 px-32 pb-32 pt-[27rem] text-cs_light">
>>>>>>> 4c7658a70ab13303ec5781baacb66990ff45c338
          <div>
            <h1 className="mb-5 text-2xl font-bold">Sự chú ý của bạn có thể bảo vệ túi tiền của bạn.</h1>
            <p>
              Nevent đảm bảo khi sử dụng dịch vụ của chúng tôi 100% bạn sẽ chẳng còn gì. Uy từ mọi khâu chuẩn bị đến sử
              dụng. Tiền của bạn là tiền của chúng tôi.
            </p>
          </div>
          <img src={AboutImage2} className="w-[455px]" alt="Photo of Nevent" />
        </div>
        <div className="mx-auto mt-10 flex w-[1000px] justify-between gap-10 pb-40">
          <div className="flex w-2/3 gap-[30px] rounded-2xl bg-cs_light p-[30px] shadow-border-full dark:bg-cs_icon_black dark:text-cs_light">
            <div>
              <h1 className="mb-5 text-2xl font-bold">Ai là người đứng sau Nevent?</h1>
              <p>
                Để xây dựng được một hệ thống vé điện tử Nevent thì một lập trình viên tài năng tên TOM MUSK đã xây dựng
                nên. Từ một tiệm tạp hóa anh đã xây dựng lên một cơ đồ to lớn mang quy mô đa quốc gia đa chủng tộc. Có
                thể nó thành tựu của Nevent trong hai từ. “Phá Sản”.
              </p>
            </div>
            <img src={AboutImage3} className="h-36 w-36" alt="Photo of Nevent" />
          </div>
          <div className="w-1/3 rounded-2xl bg-cs_light p-[30px] shadow-border-full dark:bg-cs_icon_black dark:text-cs_light">
            <h1 className="mb-5 text-2xl font-bold">Tom Musk</h1>
            <p className="text-lg font-semibold">
              Lập trình viên đến từ cao đẳng FPT Polytechnic với hơn 97.5% có việc làm
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default About;
