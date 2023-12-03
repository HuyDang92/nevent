import Dropdown from '~/components/Dropdown';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { CardBody, IconButton, Tab, Tabs, TabsHeader, Tooltip, Typography } from '@material-tailwind/react';
import { useListCustomerPaymentQuery } from '~/features/Business/business.service';
import LoadingLocal from '~/components/customs/Loading/LoadingLocal';
import Icon from '~/components/customs/Icon';
import nothing from '~/assets/images/nothing.svg';
import DefaultAvatar from '~/assets/images/default-avatar.jpg';
import { PopupDetailHistory } from './PopupDetailHistory';

const TABS = [
  {
    label: 'Tất cả',
    value: '',
  },
  {
    label: 'Đã check-in',
    value: 'HAPPENING',
  },
];

const TABLE_HEAD = ['STT', 'Người mua', 'Email', 'Số điện thoại', 'Thao tác'];

const CustomersManage = () => {
  const { idEvent } = useParams();
  const [isLimit, setIsLimit] = useState<number>(10);
  const [isPage, setIsPage] = useState<number>(1);

  const customer = useListCustomerPaymentQuery(idEvent || '');

  return (
    <div className="h-full w-full rounded-2xl bg-cs_light p-5 dark:bg-cs_lightDark">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold dark:text-white">Quản lý khách hàng</h1>
        <Dropdown />
      </div>
      {/* <Tabs value="" className="w-full max-w-[50rem]">
        <TabsHeader>
          {TABS.map(({ label, value }) => (
            <Tab key={value} value={value} className="max-w-content py-2 text-sm">
              &nbsp;&nbsp;{label}&nbsp;&nbsp;
            </Tab>
          ))}
        </TabsHeader>
      </Tabs> */}
      <div className="mt-5 overflow-hidden rounded-xl border">
        <CardBody className="p-0">
          {customer.isFetching && (
            <div className="p-10 py-40">
              <LoadingLocal />
            </div>
          )}
          {customer.data?.data?.length === 0 ? (
            <div className="flex justify-center py-20 text-center">
              <div>
                <img src={nothing} alt="QRCode" className="pointer-events-none w-[80%] ps-10" />
                <h3 className="font-medium text-[#ccc]">Không có khách hàng</h3>
              </div>
            </div>
          ) : (
            <table className="w-full min-w-max table-auto overflow-x-scroll text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                      <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customer.data?.data.map((item: { user: IUserField; payments: IPurchase }, index: number) => {
                  const isLast = index === customer.data?.data.length - 1;
                  const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';
                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {index + 1}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="flex max-w-[20rem] items-center justify-start gap-4 rounded-lg px-4 py-2">
                          <div className="h-[3rem] w-[3rem] overflow-hidden rounded-full">
                            <img
                              src={item?.user?.avatar?.url ?? DefaultAvatar}
                              alt="0"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-semibold">{item?.user?.fullName}</p>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography variant="paragraph" color="blue-gray" className="font-normal">
                          <p className="font-semibold text-gray-700">{item?.user?.email}</p>
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography variant="paragraph" color="blue-gray" className="font-normal">
                          <p className="font-semibold text-gray-700">{item?.user?.phone}</p>
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="flex items-center gap-4">
                          <PopupDetailHistory data={item?.payments}>
                            <Tooltip content="Thông tin mua vé">
                              <IconButton variant="text">
                                <Icon name="information-circle-outline" className="text-xl" />
                              </IconButton>
                            </Tooltip>
                          </PopupDetailHistory>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardBody>
      </div>
      {customer.data?.data.length > 10 && (
        <div className="flex items-center justify-end gap-4 border-t border-blue-gray-50 px-8 py-4">
          <h2 className="">Hiển thị</h2>
          <select
            className="select select-bordered h-[2.5rem] min-h-[2.5rem] w-full max-w-[5rem] rounded-lg border-2 p-2 text-sm  focus:outline-none"
            value={isLimit}
            onChange={(e) => setIsLimit(Number(e.target.value))}
          >
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
          <div className="join flex rounded-lg border border-[#dbdbdb] bg-white text-sm shadow-sm">
            <motion.button
              className="join-item flex h-[2.5rem]  w-[2.5rem] items-center justify-center"
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsPage(isPage - 1)}
              disabled={isPage === 1}
            >
              <Icon name="chevron-back-outline" className="text-xl" />
            </motion.button>
            <div className="join-item flex h-[2.5rem] items-center justify-center border-x border-[#dbdbdb] bg-white px-4 font-semibold">
              {isPage} / {10}
            </div>
            <motion.button
              className="join-item  flex h-[2.5rem]  w-[2.5rem] items-center justify-center"
              whileTap={{ scale: 0.9 }}
              disabled={10 === isPage}
              onClick={() => setIsPage(isPage + 1)}
            >
              <Icon name="chevron-forward-outline" className="text-xl" />
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomersManage;
