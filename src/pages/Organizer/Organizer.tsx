import Footer from '~/Layout/components/Footer';
import Header from '~/Layout/components/Header';
import Image_1 from '~/assets/images/Organizer_1.png';
import Image_2 from '~/assets/images/Organizer_2.png';
function Organizer() {
  return (
    <>
      <Header />
      <main className="min-h-screen dark:bg-cs_dark">
        <img src={Image_1} alt="" className="w-full" />
        <div className="mx-auto my-20 max-w-[1265px]">
          <img src={Image_2} alt="" className="w-full" />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Organizer;
