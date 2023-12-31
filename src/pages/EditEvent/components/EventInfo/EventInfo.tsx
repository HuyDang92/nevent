import Icon from '~/components/customs/Icon';
import Button from '~/components/customs/Button';
import Input from '~/components/customs/Input';
import { useGetAllCategoryQuery } from '~/features/Category/categoryApi.service';
import * as Yup from 'yup';
import { useFormik } from 'formik';
// import Chamaleon2 from '~/assets/images/chamaleon-2.svg';
import { useEffect, useState, useMemo, useRef } from 'react';
// import banner3 from '~/assets/images/banner3.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/hooks/useActionRedux';
import { setEventInfo } from '~/features/Business/businessSlice';
import { useGetEventByIdQuery, useGetLocationsQuery, useUpdateEventMutation } from '~/features/Event/eventApi.service';
import MyCarousel from '~/components/customs/MyCarousel';
import Loading from '~/components/customs/Loading';
import { isFetchBaseQueryError } from '~/utils/helper';
import { errorNotify, successNotify } from '~/components/customs/Toast';
import { uploadApi } from '~/features/Upload/uploadApi.service';
import { useUploadFile } from '~/hooks/useUpLoadFile';
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';
import 'react-quill/dist/quill.snow.css';
import { useUploadDesc } from '~/hooks/useUploadDesc';
import useClickOutside from '~/hooks/useClickOutside';
Quill.register('modules/imageResize', ImageResize);

const EventInfo = () => {
  const { idEvent } = useParams();
  const dispatch = useAppDispatch();
  // const eventInfo = useAppSelector((state) => state.bussiness.eventInfo);
  const event = useGetEventByIdQuery(idEvent || '');
  const { data: locations } = useGetLocationsQuery();
  const { data: categories } = useGetAllCategoryQuery();
  const { upLoad, loading } = useUploadFile();
  const { upLoadDesc, loadingDesc } = useUploadDesc();
  const navigate = useNavigate();
  // console.log(categories);
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // console.log(selectedFile);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string[]>([]);
  const [categoryIpt, setCategoryIpt] = useState<string>('');
  const [categoryArr, setCategoryArr] = useState<ICategory[]>([]);
  const [updateEvent, { isLoading, isSuccess, isError, error }] = useUpdateEventMutation();
  const [imageData, setImageData] = useState<string[]>([]);
  const [imagesUploaded, setImagesUploaded] = useState<boolean>(false);
  const [focusCategory, setFocusCategory] = useState<boolean>(false);

  const errorForm = useMemo(() => {
    if (isFetchBaseQueryError(error)) {
      return error;
    }
    return null;
  }, [error]);

  const upLoadImg = async (url: string) => {
    return new Promise((resolve, reject) => {
      const date = new Date();
      const signature = `${date.getTime()}-${Math.random()}`;
      fetch(url)
        .then((r) => r.blob())
        .then(
          (blobFile) =>
            new File(
              [blobFile],
              `${event?.data?.data?.title ? event?.data?.data?.title + '-' + signature : 'eventImage' + signature}`,
              {
                type: 'image/png',
              },
            ),
        )
        .then(async (file) => {
          const idImg = await upLoad(file);
          resolve(idImg);
        })
        .catch((err) => reject(err));
    });
  };

  const uploadDescImg = async (url: string) => {
    return new Promise((resolve, reject) => {
      const date = new Date();
      const signature = `${date.getTime()}-${Math.random()}`;
      fetch(url)
        .then((r) => r.blob())
        .then(
          (blobFile) =>
            new File(
              [blobFile],
              `${event?.data?.data?.title ? event?.data?.data?.title + '-' + signature : 'eventImage' + signature}`,
              {
                type: 'image/png',
              },
            ),
        )
        .then(async (file) => {
          const urlImg = await upLoadDesc(file);
          resolve(urlImg);
        })
        .catch((err) => reject(err));
    });
    // return new Promise((resolve, reject) => {
    //   const date = new Date();
    //   const signature = `${date.getTime()}-${Math.random()}`;

    //   // Nếu URL là base64, không cần tải lại
    //   if (url.startsWith('data:image')) {
    //     const blob = dataURLtoBlob(url);
    //     fetch(blob)
    //     .then((r) => r.blob())
    //     .then(
    //       (blobFile) =>
    //         new File([blobFile], `${eventInfo?.name ? eventInfo?.name + '-' + signature : 'eventImage' + signature}`, {
    //           type: 'image/png',
    //         }),
    //     )
    //     .then(async (file) => {
    //       const idImg = await upLoad(file);
    //       resolve(idImg);
    //     })
    //     .catch((err) => reject(err));
    //   } else {
    //     // Nếu URL không phải là base64, tải ảnh từ URL và chuyển thành File
    //     fetch(url)
    //       .then((r) => r.blob())
    //       .then(
    //         (blobFile) =>
    //           new File(
    //             [blobFile],
    //             `${eventInfo?.name ? 'desc_' + eventInfo?.name + '-' + signature : 'desc_' + 'eventImage' + signature}`,
    //             {
    //               type: 'image/png',
    //             },
    //           ),
    //       )
    //       .then(async (file) => {
    //         await upLoad(file);
    //         resolve(urlImg);
    //       })
    //       .catch((err) => reject(err));
    //   }
    // });
  };

  const quillRef = useRef<any>(null);
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6] }],
      [{ size: ['small', false, 'large', 'huge'] }],

      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      [{ align: [] }],
      ['clean'],
    ],
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize'],
    },
  };

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current?.getEditor();
      quill.on('text-change', (delta: any, oldDelta: any, source: string) => {
        if (source === 'user') {
          const insertedImage = delta.ops.find((op: any) => op.insert && op.insert.image);
          if (insertedImage) {
            const imageData = insertedImage.insert.image;
            // console.log(imageData);
            if (!imagesUploaded) {
              setImageData((prevData: any) => [...prevData, imageData]);
            }
          }
        }
      });
    }
  }, [imagesUploaded]);

  const formik = useFormik({
    initialValues: {
      banner: [],
      name: '',
      location: '',
      categories: [],
      description: '',
      address: '',
      description_img: [],
      file: null,
      // organization_name: '',
      // organization_desc: '',
      // organization_phone: '',
      // organization_email: '',
      // organization_img: Chamaleon2,
    },
    validationSchema: Yup.object({
      banner: Yup.mixed(),
      // logo: Yup.string().required('Logo không được bỏ trống'),
      name: Yup.string().required('Tên sự kiện không được bỏ trống'),
      address: Yup.string().required('Địa chỉ không được bỏ trống'),
      location: Yup.string().required('Địa điểm tổ chức không được bỏ trống'),
      categories: Yup.mixed()
        .test('cateLength', 'Chọn ít nhat 1 danh mục', (value: any) => {
          if (value && value?.length > 0) {
            return true;
          }
          return false;
        })
        .required('Danh mục sự kiện không được bỏ trống'),
      description: Yup.string().required('Mô tả sự kiện không được bỏ trống'),
      // file: Yup.mixed()
      //   .required('Yêu cầu banner sự kiện')
      //   .test('fileSize', 'File ảnh quá lớn', (value: any) => {
      //     return value ? value.size <= 1024000 : true; // 1MB
      //   }),
      file: Yup.mixed()
        .test('filesize', 'File quá lớn', (value: any) => {
          if (value && value?.length > 0) {
            for (let i = 0; i < value.length; i++) {
              if (value[i].size > 5242880) {
                return false;
              }
            }
          }
          return true;
        })
        .test('filetype', 'Không hỗ trợ kiểu file này', (value: any) => {
          if (value && value.length > 0) {
            for (let i = 0; i < value.length; i++) {
              if (value[i].type != 'image/png' && value[i].type != 'image/jpg' && value[i].type != 'image/jpeg') {
                return false;
              }
            }
          }
          return true;
        })
        .notRequired(),
      // .required('Yêu cầu banner sự kiện'),
      // organization_name: Yup.string().required('Tên tổ chức không được bỏ trống'),
      // organization_phone: Yup.string().required('Hotline tổ chức không được bỏ trống'),
      // organization_desc: Yup.string().required('Mô tả tổ chức không được bỏ trống'),
      // organization_email: Yup.string()
      //   .required('Email không được bỏ trống')
      //   .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email không đúng'),
    }),
    onSubmit: async (value: IEventInfo) => {
      try {
        setImagesUploaded(true);
        if (imageData.length > 0) {
          const old_desc_img = imageData.filter(function (item, index) {
            return imageData.indexOf(item) == index;
          });
          const new_desc_img = await Promise.all((old_desc_img || []).map((url) => uploadDescImg(url)))
            .then((images) => {
              console.log('All images fetched successfully:', images);
              return images;
            })
            .catch((error) => {
              console.error('Error fetching images:', error);
              return [];
            });
          new_desc_img.forEach((newImageURL, index) => {
            if (old_desc_img) {
              const oldImageData = old_desc_img[index];
              if (typeof newImageURL === 'string') {
                value.description = value.description?.replace(oldImageData, newImageURL);
              }
            }
          });
        }
        const checkNewBanner = value.banner.find((banner) => banner.includes('blob:http://localhost:8080/'));
        if (checkNewBanner) {
          const bannerId = await Promise.all(value.banner.map((url) => upLoadImg(url)))
            .then((images) => {
              // 'images' is an array containing the results of all the promises
              console.log('All images fetched successfully:', images);
              return images;
              // Further processing or rendering of images can be done here
            })
            .catch((error) => {
              // Handle any errors that occurred during the fetching process
              console.error('Error fetching images:', error);
              return [];
            });
          console.log(bannerId);
          await updateEvent({
            eventId: idEvent,
            body: {
              title: value.name,
              location: value.location,
              categories: value.categories,
              desc: value.description,
              banner: bannerId,
            },
          });
        } else {
          await updateEvent({
            eventId: idEvent,
            body: {
              title: value.name,
              location: value.location,
              categories: value.categories,
              desc: value.description,
            },
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      successNotify('Cập nhật thành công');
    }
    if (isError) {
      errorNotify('Cập nhật thất bại');
    }
  }, [isError, isSuccess]);

  // Set old value
  useEffect(() => {
    const bannerUrls = event?.data?.data?.banner.map((banner: IBanner) => banner.url);
    const currentCates = event?.data?.data?.categories.map((cate: ICategory) => cate._id);
    const cateArr = categories?.data.filter((cate: ICategory) => currentCates?.includes(cate._id));
    setCategoryArr(cateArr);
    setImagePreviewUrl(bannerUrls);
    formik.setValues({
      banner: bannerUrls,
      name: event?.data?.data?.title,
      location: event?.data?.data?.location._id,
      categories: currentCates,
      description: event?.data?.data?.desc,
      file: null,
      address: event?.data?.data?.address,
    });
  }, [event.isSuccess, categories]);

  // useEffect(() => {
  //   if (eventInfo?.banner) {
  //     setImagePreviewUrl(eventInfo?.banner);
  //   }
  // }, [eventInfo]);
  // useEffect(() => {
  //   if (eventInfo?.categories) {
  //     const cateArr = categories?.data.filter((cate: ICategory) => eventInfo?.categories.includes(cate._id));
  //     console.log(cateArr);
  //     setCategoryArr(cateArr);
  //   }
  // }, [categories, eventInfo]);

  // Category
  useEffect(() => {
    const cateList = categoryArr?.map((cate: ICategory) => cate._id);
    formik.setFieldValue('categories', cateList);
  }, [categoryArr]);
  const ref = useRef<any>(null);
  useClickOutside(ref, () => {
    setFocusCategory(false);
  });
  return (
    <>
      {(event.isLoading || loadingDesc || isLoading || loading) && <Loading />}
      <div className="">
        {errorForm && (
          <small className="px-2 text-center text-[12px] text-red-600">{(errorForm.data as any).message}</small>
        )}
        {/* Banner sự kiện */}
        <form onSubmit={formik.handleSubmit} className="mt-3">
          <div className="group relative h-[350px] w-full">
            {imagePreviewUrl?.length > 0 ? (
              <MyCarousel data={imagePreviewUrl} />
            ) : (
              <img
                src="https://img.freepik.com/free-photo/medium-shot-man-wearing-vr-glasses_23-2149126949.jpg?w=1060&t=st=1699186131~exp=1699186731~hmac=9b55cc41f50452febc175954dbc59a7a19eb60e6cc3bd19e65822d2dad11d941"
                alt="banner"
                className="h-full w-full rounded-xl object-cover "
              />
            )}
            <div
              className={`pointer-events-none absolute top-0 z-10 h-full w-full rounded-xl bg-black opacity-30 transition ${
                imagePreviewUrl && '!opacity-0 group-hover:!opacity-50'
              }`}
            ></div>
            <div className="absolute top-0 flex h-full w-full cursor-pointer items-center justify-center ">
              <div
                className={`relative z-20 w-[250px] overflow-hidden rounded-xl border-2 border-white text-center text-sm text-white  transition hover:scale-105 ${
                  imagePreviewUrl && '!opacity-0 group-hover:!opacity-100'
                }`}
              >
                <input
                  multiple
                  type="file"
                  name="file"
                  id="file"
                  className="absolute left-0 top-0 h-full cursor-pointer text-2xl opacity-0 shadow-border-light"
                  onChange={(event) => {
                    console.log('asda');
                    const selectedFile = event.target.files;
                    formik.setFieldValue('file', selectedFile);
                    if (selectedFile) {
                      // setSelectedFile(selectedFile);
                      const fileArray = Array.from(selectedFile);
                      const filesURL = fileArray.map((file) => {
                        return URL.createObjectURL(file);
                      });
                      setImagePreviewUrl(filesURL);
                      formik.setFieldValue('banner', filesURL);
                    }
                  }}
                />
                <Icon name="image" className="text-3xl" />
                <p>Kích thước ảnh 1500 x 600 (Ảnh không quá 1MB) </p>
              </div>
            </div>
            {formik.errors.file ? <div className="z-10 px-2 text-[12px] text-red-600">{formik.errors.file}</div> : null}
          </div>
          {/* //// */}
          {/* <div className="mt-7 flex items-center gap-2">
            <div className="relative flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 bg-cs_input_gray">
              <input
                type="file"
                name="logo"
                id="logo"
                className="absolute left-0 top-0 cursor-pointer text-2xl opacity-0"
              />
              <Icon name="add" className="cursor-pointer text-2xl" />
            </div>
            <span className="font-semibold dark:text-white">Logo sự kiện</span>
          </div> */}
          {/* //// */}
          <div className="mt-5 grid w-full grid-cols-2 gap-2">
            <div className="relative">
              {formik.errors.name && (
                <small className="absolute left-[90px] top-[9px] z-10 px-2 text-[12px] text-red-600">
                  {formik.errors.name}
                </small>
              )}
              <Input
                name="name"
                id="name"
                label="Tên sự kiện"
                classNameLabel="!text-cs_label_gray !text-sm"
                classNameInput="!w-full"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </div>
            <div className="relative pt-3">
              {formik.errors.location && (
                <small className="absolute left-[70px] top-[15px] z-10 px-2 text-[12px] text-red-600">
                  {formik.errors.location}
                </small>
              )}
              <label htmlFor="type" className="ml-2 text-sm font-medium text-cs_label_gray dark:text-gray-400">
                Địa chỉ
              </label>
              <br />
              <select
                name="location"
                id="location"
                className=" w-[100%] rounded-xl p-[10px] shadow-border-light dark:border-none dark:bg-cs_formDark dark:text-white"
                value={formik.values.location}
                onChange={formik.handleChange}
              >
                <option value={''}>Hãy chọn địa chỉ </option>
                {locations?.data?.map((location: ILocation, index: number) => (
                  <option key={index} value={location._id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              {formik.errors.address && (
                <small className="absolute left-[90px] top-[9px] z-10 px-2 text-[12px] text-red-600">
                  {formik.errors.address}
                </small>
              )}
              <Input
                name="address"
                id="address"
                label="Địa chỉ cụ thể"
                classNameLabel="!text-cs_label_gray !text-sm"
                classNameInput="!w-full"
                value={formik.values.address}
                onChange={formik.handleChange}
              />
            </div>
            <div className="relative pt-3">
              {formik.errors.categories && (
                <small className="absolute left-[140px] top-[15px] z-10 px-2 text-[12px] text-red-600">
                  {formik.errors.categories}
                </small>
              )}
              <label htmlFor="type" className="ml-2 text-sm font-medium text-cs_label_gray dark:text-gray-400">
                Danh mục sự kiện
              </label>
              <br />
              <Input
                value={categoryIpt}
                onFocus={() => setFocusCategory(true)}
                classNameInput="w-full"
                onChange={(e) => setCategoryIpt(e.target.value)}
              />
              {categoryIpt !== '' ? (
                <div className="absolute z-20 w-full rounded border-[1px] border-cs_light bg-cs_light p-3 shadow-border-full dark:bg-cs_lightDark dark:text-cs_light">
                  {categories.data
                    ?.filter((cate: ICategory) => cate.name.includes(categoryIpt))
                    .map((cate: ICategory, index: number) => (
                      <div
                        key={index}
                        onClick={() => {
                          setCategoryIpt('');
                          if (!categoryArr.includes(cate)) {
                            setCategoryArr([...categoryArr, cate]);
                          }
                        }}
                        className="my-1 cursor-pointer rounded-lg p-1 pl-3 hover:bg-cs_semi_green"
                      >
                        {cate.name}
                      </div>
                    ))}
                </div>
              ) : (
                <>
                  {focusCategory && (
                    // This is div I want click without run input's onBlur event
                    <div className="absolute z-20 w-full rounded border-[1px] border-cs_light bg-cs_light p-3 shadow-border-full dark:bg-cs_lightDark dark:text-cs_light">
                      {categories.data.map((cate: ICategory, index: number) => (
                        <div
                          key={index}
                          onClick={() => {
                            setCategoryIpt('');
                            setFocusCategory(false);
                            if (!categoryArr.includes(cate)) {
                              setCategoryArr([...categoryArr, cate]);
                            }
                          }}
                          className="category my-1 cursor-pointer rounded-lg p-1 pl-3 hover:bg-cs_semi_green"
                        >
                          {cate.name}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                {categoryArr?.map((cate: ICategory, index: number) => (
                  <div
                    key={index}
                    className="my-1 flex w-fit cursor-pointer items-center justify-between gap-1 rounded-lg bg-cs_semi_green p-1 pl-3 font-semibold text-cs_light dark:text-cs_light"
                  >
                    <span>{cate.name}</span>
                    <Icon
                      name="close"
                      onClick={() => {
                        setCategoryArr(categoryArr.filter((item) => item !== cate));
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="relative mt-5">
            {formik.errors.description && (
              <small className="absolute left-[130px] top-[4px] z-10 px-2 text-[12px] text-red-600">
                {formik.errors.description}
              </small>
            )}
            <label htmlFor="description" className=" ml-2 !text-sm font-medium text-cs_label_gray dark:text-gray-400">
              Giới thiệu sự kiện
            </label>
            <ReactQuill
              id="description"
              // name="description"
              theme="snow"
              value={formik.values.description}
              onChange={(value) => {
                formik.setFieldValue('description', value);
              }}
              modules={modules}
              ref={quillRef}
            />
          </div>
          {/* //// */}
          {/* <div className="">
            <label
              htmlFor="organization_name"
              className=" ml-2 !text-sm font-medium text-cs_label_gray dark:text-gray-400"
            >
              Thông tin ban tổ chức
            </label>
            <div className="flex justify-between gap-3">
              <div className="group relative h-[100px] w-[100px] overflow-hidden rounded-full border-2 border-cs_semi_green">
                <img
                  src={formik.values.organization_img}
                  alt="oraganization pic"
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-0 z-10 h-full w-full rounded-xl bg-black opacity-0  transition group-hover:opacity-40"></div>
                <div className="absolute top-0 z-20 flex h-full w-full items-center justify-center opacity-0 transition group-hover:opacity-100">
                  <div className="relative overflow-hidden transition hover:scale-105">
                    <input
                      type="file"
                      name="organization_img"
                      id="organization_img"
                      onChange={formik.handleChange}
                      className="absolute left-0 top-0 h-full cursor-pointer text-2xl opacity-0"
                    />
                    <Icon name="image" className="text-xl text-white" />
                  </div>
                </div>
              </div>
              <div className="flex w-[88%] flex-col gap-2">
                <div className="relative">
                  {formik.errors.organization_name && (
                    <small className="absolute left-[125px] top-[9px] z-10 px-2 text-[12px] text-red-600">
                      {formik.errors.organization_name}
                    </small>
                  )}
                  <Input
                    name="organization_name"
                    id="organization_name"
                    label="Tên ban tổ chức"
                    classNameLabel="!text-cs_label_gray !text-sm"
                    classNameInput="!w-full"
                    value={formik.values.organization_name}
                    onChange={formik.handleChange}
                  />
                </div>

                <div className="relative">
                  {formik.errors.organization_desc && (
                    <small className="absolute left-[150px] top-[4px] z-10 px-2 text-[12px] text-red-600">
                      {formik.errors.organization_desc}
                    </small>
                  )}
                  <label
                    htmlFor="organization_desc"
                    className=" ml-2 !text-sm font-medium text-cs_label_gray dark:text-gray-400"
                  >
                    Thông tin giới thiệu
                  </label>
                  <textarea
                    name="organization_desc"
                    id="organization_desc"
                    className="mt-2 !h-[200px] !w-full rounded-xl p-2 text-sm shadow-border-light  focus:outline-cs_semi_green dark:bg-cs_formDark dark:text-white dark:outline-none"
                    placeholder="Nhập thông tin giới thiệu"
                    onChange={formik.handleChange}
                    value={formik.values.organization_desc}
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
              <p className="text-sm font-semibold dark:text-white">
                Thông tin liên hệ{' '}
                <span className="text-xs font-normal italic">
                  (Thông tin này chỉ được sử dụng để kết nối giữa Nevent và Ban tổ chức nên sẽ không được đăng tải trên
                  website Nevent)
                </span>
              </p>
              <div className="mt-6 flex justify-between gap-5">
                <div className="relative w-1/2">
                  {formik.errors.organization_phone && (
                    <small className="absolute -top-[20px] left-[60px] z-10 px-2 text-[12px] text-red-600">
                      {formik.errors.organization_phone}
                    </small>
                  )}
                  <Input
                    name="organization_phone"
                    id="organization_phone"
                    type="text"
                    placeholder="Hotline"
                    classNameInput="w-full rounded-xl p-2 pl-20 text-sm"
                    value={formik.values.organization_phone}
                    onChange={formik.handleChange}
                  />
                  <div className="absolute top-0 flex h-full w-16 items-center justify-center rounded-l-xl bg-cs_semi_green text-xl text-white">
                    <Icon name="call" />
                  </div>
                </div>
                <div className="relative w-1/2">
                  {formik.errors.organization_email && (
                    <small className="absolute -top-[20px] left-[60px] z-10 px-2 text-[12px] text-red-600">
                      {formik.errors.organization_email}
                    </small>
                  )}
                  <Input
                    name="organization_email"
                    id="organization_email"
                    type="text"
                    placeholder="Email"
                    classNameInput="w-full rounded-xl p-2 pl-20 text-sm"
                    value={formik.values.organization_email}
                    onChange={formik.handleChange}
                  />
                  <div className="absolute top-0 flex h-full w-16 items-center justify-center rounded-l-xl bg-cs_semi_green text-xl text-white">
                    <Icon name="mail" />
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* //// */}
          <div className="w-full text-right"></div>
          <Button className="md:w mt-5 w-full" type="submit" mode="dark" value="Lưu thay đổi" />
        </form>
        <Button
          onClick={() => navigate(`/organization/edit-event/${idEvent}/1`)}
          className="md:w mt-5 w-full"
          type="button"
          mode="dark"
          value="Tiếp tục"
        />
        {/* //// */}
      </div>
    </>
  );
};
export default EventInfo;
