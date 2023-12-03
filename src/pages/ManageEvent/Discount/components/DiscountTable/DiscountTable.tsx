import Icon from '~/components/customs/Icon';
import { Card, Typography, CardBody, Chip, Avatar, IconButton, Tooltip } from '@material-tailwind/react';

const TABLE_HEAD = ['Mã giảm giá', 'Giảm giá', 'Thời hạn', 'Tình trạng', ''];
// code, discount, startDate, endDate, amount
const TABLE_ROWS = [
  {
    code: 'VB321D',
    discount: '25k',
    startDate: '2023-12-19',
    endDate: '2023-12-26',
    amount: 35,
  },
  {
    code: 'XZ351Z',
    discount: '5k',
    startDate: '2023-12-30',
    endDate: '2023-12-31',
    amount: 0,
  },
  {
    code: 'TRS254',
    discount: '25%',
    startDate: '2023-12-19',
    endDate: '2023-12-26',
    amount: 35,
  },
  {
    code: 'YR259x',
    discount: '5%',
    startDate: '2023-12-19',
    endDate: '2023-12-26',
    amount: 35,
  },
];
const getDaysDifference = (startDate: Date, endDate: Date) => {
  const oneDay = 24 * 60 * 60 * 1000; // Số mili giây trong một ngày
  const startDateTime = startDate.getTime();
  const endDateTime = endDate.getTime();

  const differenceInDays = Math.round(Math.abs((startDateTime - endDateTime) / oneDay));
  return differenceInDays;
};

const DiscountTable = () => {
  return (
    <Card className="h-full w-full">
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
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
            {TABLE_ROWS.map(({ code, discount, startDate, endDate, amount }, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';
              const startD = new Date(startDate);
              const endD = new Date(endDate);
              const days = getDaysDifference(startD, endD);

              return (
                <tr key={index}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Typography variant="small" color="blue-gray" className="font-bold">
                        {code}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {discount}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {days} ngày
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Tooltip content={`${amount} mã`}>
                        <Chip
                          size="sm"
                          variant="ghost"
                          value={amount !== 0 ? 'Còn mã' : 'Hết mã'}
                          color={amount !== 0 ? 'green' : 'red'}
                        />
                      </Tooltip>
                    </div>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Xóa mã giảm giá">
                      <IconButton variant="text">
                        <Icon name="trash-outline" className="text-2xl" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};
export default DiscountTable;
