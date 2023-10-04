import Footer from '~/Layout/components/Footer';
import Header from '~/Layout/components/Header';
import { IconDiamond, IconTrophy } from '~/assets/icon';
import AboutImage1 from '~/assets/images/about_image1.webp';
import AboutImage2 from '~/assets/images/about_image2.png';
import AboutImage3 from '~/assets/images/about_image3.png';
function About() {
  return (
    <>
      <Header />
      <main className="min-h-screen dark:bg-cs_dark pt-5">
        <div className="relative grid place-items-center">
          <h1 className="z-10 my-20 text-5xl font-bold text-cs_light">NEVENT</h1>
          <img src={AboutImage1} className="absolute top-0 px-5" alt="Photo of Nevent" />
          <div className="rounded-2xl bg-[rgba(169,167,167,0.2)] p-3 backdrop-blur-[100px] md:w-[70%] md:p-10">
            <h1 className="mb-2.5 text-center text-3xl font-bold text-cs_light">Một phong cách mới. Tại sao?</h1>
            <p className="mb-10 text-center text-cs_light">
              Đi kèm nhu cầu sử dụng và trải nghiệm theo một phong cách hoàn toàn mới
            </p>
            <div className="flex flex-wrap justify-between gap-10 md:flex-nowrap">
              <div className="flex  flex-col gap-5 rounded-2xl bg-cs_light p-5 md:w-1/2">
                <IconTrophy className="h-[52px] w-[52px]" />
                <h1 className="text-2xl font-bold">Linh hoạt trải nghiệm.</h1>
                <p>
                  Chúng tôi sẽ đem đến cho bạn một website đảm bảo được sự trải nghiệm của bạn luôn đạt ở mức tốt nhất.
                  Cùng với hàng loạt sự hỗ trợ tù những tính năng độc đáo mà chúng tôi đem lại và cũng đặc biệt nhất là
                  sự mới lạ từ giao diện sẽ cho bạn một trải nghiệm thoải mái trong việc lựa chọn vé để tham gia sự
                  kiện. Chúng tôi luôn đồng hành cùng bạn trong mọi cuộc vui.
                </p>
              </div>
              <div className="flex flex-col gap-5 rounded-2xl bg-cs_light p-5 md:w-1/2">
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
        <div className="mx-auto mt-10 flex flex-col justify-between gap-3 rounded-2xl bg-cs_light p-3 shadow-border-full dark:bg-cs_icon_black dark:text-cs_light md:w-[70%] md:flex-row md:gap-20 md:p-10">
          <div>
            <h1 className="mb-5 text-2xl font-bold">Sự chú ý của bạn có thể bảo vệ túi tiền của bạn.</h1>
            <p>
              Nevent đảm bảo khi sử dụng dịch vụ của chúng tôi 100% bạn sẽ chẳng còn gì. Uy từ mọi khâu chuẩn bị đến sử
              dụng. Tiền của bạn là tiền của chúng tôi.
            </p>
          </div>
          <img src={AboutImage2} className="w-[455px]" alt="Photo of Nevent" />
        </div>
        <div className="mx-auto mt-10 flex flex-col justify-between gap-10 pb-10 md:w-[70%] md:flex-row md:pb-20">
          <div className="flex gap-[30px] rounded-2xl bg-cs_light p-[30px] shadow-border-full dark:bg-cs_icon_black dark:text-cs_light md:w-2/3">
            <div>
              <h1 className="mb-5 text-2xl font-bold">Ai là người đứng sau Nevent?</h1>
              <p>
                Để xây dựng được một hệ thống vé điện tử Nevent thì một lập trình viên tài năng tên TOM MUSK đã xây dựng
                nên. Từ một tiệm tạp hóa anh đã xây dựng lên một cơ đồ to lớn mang quy mô đa quốc gia đa chủng tộc. Có
                thể nó thành tựu của Nevent trong hai từ. “Phá Sản”.
              </p>
            </div>
            <img src={AboutImage3} className="hidden h-36 w-36 md:block" alt="Photo of Nevent" />
          </div>
          <div className="flex gap-3 rounded-2xl bg-cs_light p-[30px] shadow-border-full dark:bg-cs_icon_black dark:text-cs_light md:w-1/3">
            <div>
              <h1 className="mb-5 text-2xl font-bold">Tom Musk</h1>
              <p className="text-lg font-semibold">
                Lập trình viên đến từ cao đẳng FPT Polytechnic với hơn 97.5% có việc làm
              </p>
            </div>
            <img src={AboutImage3} className="h-36 w-36 md:hidden" alt="Photo of Nevent" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default About;
