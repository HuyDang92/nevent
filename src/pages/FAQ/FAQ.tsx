import { useState } from 'react';
import Header from '~/Layout/components/Header';
import { IconCommunity, IconFAQ, IconGuide } from '~/assets/icon';
import SearchBar from '~/components/customs/SearchBar';
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import Footer from '~/Layout/components/Footer';

function Icon({ id, open }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? 'rotate-180' : ''} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

const data = [
  {
    title: 'Tôi phải làm sao để mua vé tham gia sự kiện?',
    description: `Đầu tiên, bạn chọn sự kiện mà bạn muốn tham gia trên website, chọn nút "Đặt vé ngay" ở bên trái,
    chọn số lượng vé, trả lời các câu hỏi được yêu cầu từ Ban tổ chức, điền thông tin thanh toán, chọn
    phương tiện thanh toán và thanh toán`,
  },
  {
    title: 'Khi nào là hết hạn để đặt vé?',
    description: ` Ngay khi nhập thông tin mua vé, bạn có thể chọn trả bằng thẻ ngân hàng nội địa ATM, hoăc thẻ thanh
    toán quốc tế Visa, Mastercard hoặc bằng tiền mặt. Ticketbox được tích hợp hoàn toàn với Cybersource
    và 123pay.vn`,
  },
  {
    title: 'Tôi sẽ thanh toán đơn hàng như thế nào?',
    description: ` Ngay khi nhập thông tin mua vé, bạn có thể chọn trả bằng thẻ ngân hàng nội địa ATM, hoăc thẻ thanh toán quốc tế Visa, Mastercard hoặc bằng tiền mặt.
    Ticketbox được tích hợp hoàn toàn với Cybersource và 123pay.vn`,
  },
  {
    title: 'Qúa trình thanh toán trực tuyến của Ticketbox an toàn như thế nào?',
    description: `Đối với  tất cả các giao dịch mua vé bằng thẻ tín dụng và thẻ ATM ngân hàng địa phương, Ticketbox rất chú trọng tới việc đảm bảo thông tin tài chính của bạn an toàn và được bảo mật. Chúng tôi sử dụng giao thức SSL (Secure Sockets Layer) để chắc chắn rằng việc trao đổi trong suốt quá trình mua vé là an toàn. 
    Ngoài ra, Ticketbox không bao giờ lưu trữ thông tin thẻ tín dụng của bạn.
    Trong màn hình mua vé bằng thẻ tín dụng, Ticketbox sử dụng một Cybersource iFrame được bảo vệ bởi giao thức SSL nhằm đảm bảo an ninh tối đa.`,
  },
  {
    title: 'Tôi có thể nhận vé bằng cách nào?',
    description: `Đối với  tất cả các giao dịch mua vé bằng thẻ tín dụng và thẻ ATM ngân hàng địa phương, Ticketbox rất chú trọng tới việc đảm bảo thông tin tài chính của bạn an toàn và được bảo mật. Chúng tôi sử dụng giao thức SSL (Secure Sockets Layer) để chắc chắn rằng việc trao đổi trong suốt quá trình mua vé là an toàn. 
    Ngoài ra, Ticketbox không bao giờ lưu trữ thông tin thẻ tín dụng của bạn.
    Trong màn hình mua vé bằng thẻ tín dụng, Ticketbox sử dụng một Cybersource iFrame được bảo vệ bởi giao thức SSL nhằm đảm bảo an ninh tối đa.`,
  },
  {
    title: 'Tôi có thể nhận vé bằng cách nào?',
    description: `Đối với  tất cả các giao dịch mua vé bằng thẻ tín dụng và thẻ ATM ngân hàng địa phương, Ticketbox rất chú trọng tới việc đảm bảo thông tin tài chính của bạn an toàn và được bảo mật. Chúng tôi sử dụng giao thức SSL (Secure Sockets Layer) để chắc chắn rằng việc trao đổi trong suốt quá trình mua vé là an toàn. 
    Ngoài ra, Ticketbox không bao giờ lưu trữ thông tin thẻ tín dụng của bạn.
    Trong màn hình mua vé bằng thẻ tín dụng, Ticketbox sử dụng một Cybersource iFrame được bảo vệ bởi giao thức SSL nhằm đảm bảo an ninh tối đa.`,
  },
  {
    title: 'Tôi có thể nhận vé bằng cách nào?',
    description: `Đối với  tất cả các giao dịch mua vé bằng thẻ tín dụng và thẻ ATM ngân hàng địa phương, Ticketbox rất chú trọng tới việc đảm bảo thông tin tài chính của bạn an toàn và được bảo mật. Chúng tôi sử dụng giao thức SSL (Secure Sockets Layer) để chắc chắn rằng việc trao đổi trong suốt quá trình mua vé là an toàn. 
    Ngoài ra, Ticketbox không bao giờ lưu trữ thông tin thẻ tín dụng của bạn.
    Trong màn hình mua vé bằng thẻ tín dụng, Ticketbox sử dụng một Cybersource iFrame được bảo vệ bởi giao thức SSL nhằm đảm bảo an ninh tối đa.`,
  },
  {
    title: 'Tôi có thể nhận vé bằng cách nào?',
    description: `Đối với  tất cả các giao dịch mua vé bằng thẻ tín dụng và thẻ ATM ngân hàng địa phương, Ticketbox rất chú trọng tới việc đảm bảo thông tin tài chính của bạn an toàn và được bảo mật. Chúng tôi sử dụng giao thức SSL (Secure Sockets Layer) để chắc chắn rằng việc trao đổi trong suốt quá trình mua vé là an toàn. 
    Ngoài ra, Ticketbox không bao giờ lưu trữ thông tin thẻ tín dụng của bạn.
    Trong màn hình mua vé bằng thẻ tín dụng, Ticketbox sử dụng một Cybersource iFrame được bảo vệ bởi giao thức SSL nhằm đảm bảo an ninh tối đa.`,
  },
];

const FAQ = () => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value: any) => setOpen(open === value ? 0 : value);

  return (
    <>
      <Header />
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center space-y-4 py-20">
          <h1 className="text-4xl font-bold dark:text-cs_light ">Trung tâm hỗ trợ</h1>
          <p className=" dark:text-cs_light">
            Chúng tôi luôn luôn tạo mọi điều kiện để quy trình mua bán vé trở nên thuận tiện và an toàn hơn. <br /> Vì
            vậy chúng tôi liệt kê ra đây những câu hỏi mà chúng tôi thường nhận được từ khách hàng.
          </p>
          <SearchBar size="lg" className="ms-5 hidden rounded-xl shadow-border-light xl:block" />
        </div>
        <div className="grid grid-cols-3 gap-5">
          <div className="flex flex-col items-center justify-between rounded-xl bg-cs_light py-8 shadow-border-full dark:bg-cs_lightDark">
            <IconGuide className="w-16" />
            <span className="text-lg font-bold   dark:text-cs_light">Hướng dẫn mua vé</span>
          </div>
          <div className="flex flex-col items-center justify-between rounded-xl bg-cs_light py-8 shadow-border-full dark:bg-cs_lightDark">
            <IconFAQ className="w-16" />
            <span className="text-lg font-bold  dark:text-cs_light">FAQ</span>
          </div>
          <div className="flex flex-col items-center justify-between rounded-xl bg-cs_light py-8 shadow-border-full dark:bg-cs_lightDark">
            <IconCommunity className="w-16" />
            <span className="text-lg font-bold  dark:text-cs_light">Hướng dẫn mua vé</span>
          </div>
        </div>

        <div className="space-y-5 py-20 pb-10">
          <Accordion
            className="rounded-xl border-none bg-cs_light dark:bg-cs_lightDark px-5 shadow-border-full"
            open={open === 1}
            icon={<Icon id={1} open={open} />}
          >
            <AccordionHeader
              className={`${open === 1 ? 'border-b' : 'border-none'}  py-7 text-cs_semiDark hover:text-cs_semi_green`}
              onClick={() => handleOpen(1)}
            >
              <div>
                <p className={`${open === 1 && 'text-cs_semi_green '} dark:text-cs_light`}>Thắc mắc về việc đặt vé</p>
                <p className="text-sm dark:text-cs_light font-medium text-cs_semiDark">
                  Thắc mắc về việc đặt vé, thời hạn đặt vé, hình thức thanh toán và những câu hỏi khác
                </p>
              </div>
            </AccordionHeader>
            <AccordionBody>
              <div className="h-[90vh] space-y-4 overflow-y-scroll">
                {data.map((item, index) => (
                  <div key={index}>
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="font-normal">{item.description}</p>
                  </div>
                ))}
              </div>
            </AccordionBody>
          </Accordion>
          <Accordion
            className="rounded-xl border-none bg-cs_light dark:bg-cs_lightDark px-5 shadow-border-full"
            open={open === 2}
            icon={<Icon id={2} open={open} />}
          >
            <AccordionHeader
              className={`${open === 2 ? 'border-b' : 'border-none'}  py-7 text-cs_semiDark hover:text-cs_semi_green`}
              onClick={() => handleOpen(2)}
            >
              <div>
                <p className={`${open === 2 && 'text-cs_semi_green '} dark:text-cs_light`}>Thắc mắc về việc đặt vé</p>
                <p className="text-sm dark:text-cs_light font-medium text-cs_semiDark">
                  Thắc mắc về việc đặt vé, thời hạn đặt vé, hình thức thanh toán và những câu hỏi khác
                </p>
              </div>
            </AccordionHeader>
            <AccordionBody>
              <div className="h-[90vh] space-y-4 overflow-y-scroll">
                {data.map((item, index) => (
                  <div key={index}>
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="font-normal">{item.description}</p>
                  </div>
                ))}
              </div>
            </AccordionBody>
          </Accordion>
          <Accordion
            className="rounded-xl border-none bg-cs_light dark:bg-cs_lightDark px-5 shadow-border-full"
            open={open === 3}
            icon={<Icon id={3} open={open} />}
          >
            <AccordionHeader
              className={`${open === 3 ? 'border-b' : 'border-none'}  py-7 text-cs_semiDark hover:text-cs_semi_green`}
              onClick={() => handleOpen(3)}
            >
              <div>
                <p className={`${open === 3 && 'text-cs_semi_green '} dark:text-cs_light`}>Thắc mắc về việc đặt vé</p>
                <p className="text-sm dark:text-cs_light font-medium text-cs_semiDark">
                  Thắc mắc về việc đặt vé, thời hạn đặt vé, hình thức thanh toán và những câu hỏi khác
                </p>
              </div>
            </AccordionHeader>
            <AccordionBody>
              <div className="h-[90vh] space-y-4 overflow-y-scroll">
                {data.map((item, index) => (
                  <div key={index}>
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="font-normal">{item.description}</p>
                  </div>
                ))}
              </div>
            </AccordionBody>
          </Accordion>
          <p className="py-5 text-center">
            Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi qua email
            <span className="font-semibold text-cs_semi_green"> email@gmail.com</span> hoặc gọi{' '}
            <span className="font-semibold text-cs_semi_green"> 9999999999</span>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default FAQ;
