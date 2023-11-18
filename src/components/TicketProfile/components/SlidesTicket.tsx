{
  /* <Dialog
        open={open}
        handler={setOpen}
        className="dark:bg-cs_lightDark"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="xs"
      >
        <DialogBody className="relative font-normal">
          <p className="text-center text-lg font-bold uppercase text-cs_semi_green">Scan QR để check-in</p>
          <span onClick={() => setOpen(false)}>
            <Icon name="close" className="absolute right-4 top-4 text-2xl transition-all hover:scale-110" />
          </span>
          {data?.myTickets?.length > 1 ? (
            <Carousel
              className=""
              prevArrow={({ handlePrev }) => (
                <span onClick={handlePrev} className="!absolute !left-0 top-2/4 -translate-y-2/4 text-cs_dark">
                  <Icon
                    name="chevron-back-outline"
                    className="rounded-full bg-[#eee] bg-opacity-50 p-1 text-sm text-cs_dark transition-all hover:scale-105"
                  />
                </span>
              )}
              nextArrow={({ handleNext }) => (
                <span onClick={handleNext} className="!absolute !right-0 top-2/4 -translate-y-2/4 text-cs_dark">
                  <Icon
                    name="chevron-forward-outline"
                    className="rounded-full bg-[#eee] bg-opacity-50 p-1 text-sm text-cs_dark transition-all hover:scale-105"
                  />
                </span>
              )}
              navigation={({ setActiveIndex, activeIndex, length }) => (
                <div className="absolute bottom-10 left-2/4 z-30 flex -translate-x-2/4 gap-2">
                  {new Array(length).fill('').map(
                    (_, i) =>
                      activeIndex === i && (
                        <span className="cursor-pointer font-semibold" key={i} onClick={() => setActiveIndex(i)}>
                          {activeIndex === i && `${activeIndex + 1}/${length}`}
                        </span>
                      ),
                  )}
                </div>
              )}
            >
              {data?.myTickets?.map((item: Ticket, index: number) => {
                // const code = JSON.stringify({ id: item?._id, qr: item?.qr });
                // const qrCodeRef = useRef(null);
                // qrCodeRefs.push(qrCodeRef);

                return (
                  <Fragment key={index}>
                    <div className="flex justify-center py-3 pb-8">
                      <div>
                        <div className="flex justify-between pb-2 font-bold">
                          <span>Vé: {item?.title}</span>
                          <span>{item?.status === 'unworn' ? 'Chưa sử dụng' : 'Đã sử dụng'}</span>
                        </div>
                        <QRCode className="bg-cs_light p-2" ref={qrCodeRef} id="qrcode" value={item?.qr} />
                      </div>
                    </div>
                    <Button
                      value="Tải về"
                      icon="download-outline"
                      className="ms-[50%] -translate-x-1/2 !bg-cs_semi_green pt-2 !text-white"
                      onClick={() => handleDownload(item?.title)}
                    />
                  </Fragment>
                );
              })}
            </Carousel>
          ) : (
            <>
              <div className="flex justify-center py-5">
                <div>
                  <div className="pb-2 font-bold">Vé: {data?.myTickets[0]?.type}</div>
                  <QRCode ref={qrCodeRef} id="qrcode" value={data?.myTickets[0]?.qr} />
                </div>
              </div>
              <Button
                value="Tải về"
                icon="download-outline"
                className="ms-[35%] !bg-cs_semi_green !text-white"
                onClick={() => handleDownload(data?.myTickets[0]?.title)}
              />
            </>
          )}
        </DialogBody>
      </Dialog> */
}
