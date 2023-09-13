// import MultiStepForm from "../../components/forms/MultiStepForm"
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import KErrorMessage from '../../components/forms/KErrorMessage';
import { PrimaryButtonLoader } from '../../components/loadrs';
import GoogleMapComponent from '../../components/Map/MapComponent';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import APIClient from '../../App/API/API';
import axios from 'axios';

const validationSchema = yup.object({
  name: yup.string().required('Name is Required!'),
  phone_number: yup.string().required('Phone Number is Required!'),
  email: yup.string().required('Email is Required'),
  address: yup.string().required('Address is Required'),

  r_name: yup.string().required('Name is Required!'),
  r_phone_number: yup.string().required('Phone Number is Required!'),
  r_email: yup.string().required('Email is Required'),
  r_address: yup.string().required('Address is Required'),

  pickup_date: yup.date().required('Date of Birth is required'),
  weight: yup.number().required('Weight is Required'),
  items: yup
    .string()
    .min(2, 'too small!')
    .max(500, 'Too Long String')
    .required('Required'),
  items_type: yup.string().required('Select Item Type'),
  // truck_type_id: yup.string ().required ("select truck type"),
  good_type_id: yup.string().required('select good type'),
  currency: yup.string().required('Currency is Required'),
});

const BookNow = () => {
  const apiBaseURL = 'https://api.katundu.africa/api/v1/';
  const [previewImages, setPreviewImages] = useState([]);
  //state for image file objects
  const [imageFiles, setImageFiles] = useState([]);

  const Locations = useSelector(state => state.BookingLocation.addresses);

  const [trucks, setTrucks] = useState([]);
  const [goods, setGoods] = useState([]);

  const api = new APIClient(apiBaseURL);
  const headers = {
    Authorization:
      'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMjhmNDA4OTM3YTkwMjgxNWM4NDE1MGY4N2EwYjBmOWQ3YjNiYWU1Y2Y2MTViOTAyZjQwZWYwMjczNzI3ZDgxOTA1Njg0MjE5YjZmNDJmMDciLCJpYXQiOjE2ODkzNzg4NjMuNTE2NjkxLCJuYmYiOjE2ODkzNzg4NjMuNTE2Njk0LCJleHAiOjE3MjEwMDEyNjMuMTcwMzYsInN1YiI6IjEyIiwic2NvcGVzIjpbXX0.P3Cz52bIxQT4azFLLBahUHjurCl2-wGVhNyAqBlG6Q7XS_Tpx7rM_ztLOUV0zU1SUdoG_33tCLMlYxw-7u0E8uBSk5spYfDeM1SMsOUNEd5hp2zGEoHT6f3Dh-kTHTrWcQvRMgk08WpcdGmdK7S15NEoCNwnsAJ7g86wNsFh9AbzmlYyyzuYzkkuFPF20-zJ7rq3wIc5Vd4Shs-kbbEngC-iNItuzbOPoc4_RC6yXwkX3RGg8kIa0roy65JbBAJp57NyMs_byxlG8p8dQEMNgghhP4qky6sNuD3ZERZwzCm5ErC5hp3W7ryn28EtWUhazEpxzrJx3_ezi7aybBs8BCrZPjrGoYBomviRmBiwYxc7zFYZbIKOA5JijwuNDrjkBaXbO0LiZE57TUpW8Al6C9pEJVJPJ85T-SZR-bWlZW9aZCjAlTkcwlJYLTEAPtDpRf7pRjmG6-g7fPtBKlvCPN_ldamJqjQcpdmWkCNvyjYSMDZktRkyearqFsRQZbTJVlfdJvui6A57GQuuspmlPBvdaQlXmGo2697M5AWaccHFQ2sjwdAsl08q61cSIhPAr_MqcVg4YWCL6Jkq3xqqvCzuRo4MzZ9_Lm6kL-9uIX94WAhM7h0AMyLGk6WqsJWDOiOIObbVb87NVPPd4G-v4ncU3bu2SyKT44lASllPOuI',
  };

  useEffect(() => {
    api
      .get('trailer-types/all', headers)
      .then(response => {
        // console.log(response.data)
        setTrucks(response.data);
      })
      .catch(error => {
        console.error(error.message);
      });

    api
      .get('good-types/all', headers)
      .then(response => {
        // console.log(response.data)
        setGoods(response.data);
      })
      .catch(error => {
        console.error(error.message);
      });
  }, []);

  // console.log(Locations)
  const handleImageChange = event => {
    const files = event.target.files;
    const imagePreviews = [];

    //server receives image file objects
    setImageFiles(prev => [...prev, ...files]);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          imagePreviews.push(reader.result);
          if (imagePreviews.length === files.length) {
            setPreviewImages(imagePreviews);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };
  // console.log(localStorage.getItem('access-token'));

  return (
    <div className="flex justify-center items-center h-[100%] w-[100%]">
      <div className="w-[100%] rounded-2xl  h-[100%] overflow-y-auto">
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            name: '',
            phone_number: '',
            email: '',
            address: '',
            r_name: '',
            r_phone_number: '',
            r_email: '',
            r_address: '',
            pickup_date: '',
            weight: 0,
            items: '',
            items_type: '',
            truck_type_id: '',
            good_type_id: '',
            currency: 'ZMW',
            load_type: '',
          }}
          onSubmit={values => {
            const mails = values.email.split(',');
            const r_mails = values.r_email.split(',');
            const items = values.items.split(',');
            const SendData = {
              source_address: {
                name: values.name,
                phone_numbers: [values.phone_number],
                emails: [...mails],
                address: values.address,
                lat: Locations.from.lat,
                lng: Locations.from.lng,
              },
              destination_address: {
                name: values.r_name,
                phone_numbers: [values.r_phone_number],
                emails: [...r_mails],
                address: values.r_address,
                lat: Locations.to.lat,
                lng: Locations.to.lng,
              },
              images: imageFiles,
              truck_type_id: values.truck_type_id,
              good_type_id: values.good_type_id,
              load_type: values.load_type,
              items_type: values.items_type,
              weight: values.weight,
              items: [...items],
              pickup_date: values.pickup_date,
              currency: values.currency,
            };

            console.log(SendData);

            const formData = new FormData();

            formData.append(
              'source_address',
              JSON.stringify(SendData.source_address)
            );
            formData.append(
              'destination_address',
              JSON.stringify(SendData.destination_address)
            );
            formData.append('truck_type_id', SendData.truck_type_id);
            formData.append('good_type_id', SendData.good_type_id);
            formData.append('load_type', SendData.load_type);
            formData.append('item_type', SendData.items_type);
            formData.append('weight', SendData.weight);
            formData.append('pickup_date', SendData.pickup_date);
            formData.append('currency', SendData.currency);

            SendData.images.forEach((image, index) => {
              formData.append(`images[${index}]`, image);
            });

            //you omitted items field
            SendData.items.forEach((item, index) => {
              formData.append(`items[${index}]`, item);
            });

            const headers = {
              // this is where am injecting the Token (Note its for testing purposes Only)
              Authorization:
                'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMjhmNDA4OTM3YTkwMjgxNWM4NDE1MGY4N2EwYjBmOWQ3YjNiYWU1Y2Y2MTViOTAyZjQwZWYwMjczNzI3ZDgxOTA1Njg0MjE5YjZmNDJmMDciLCJpYXQiOjE2ODkzNzg4NjMuNTE2NjkxLCJuYmYiOjE2ODkzNzg4NjMuNTE2Njk0LCJleHAiOjE3MjEwMDEyNjMuMTcwMzYsInN1YiI6IjEyIiwic2NvcGVzIjpbXX0.P3Cz52bIxQT4azFLLBahUHjurCl2-wGVhNyAqBlG6Q7XS_Tpx7rM_ztLOUV0zU1SUdoG_33tCLMlYxw-7u0E8uBSk5spYfDeM1SMsOUNEd5hp2zGEoHT6f3Dh-kTHTrWcQvRMgk08WpcdGmdK7S15NEoCNwnsAJ7g86wNsFh9AbzmlYyyzuYzkkuFPF20-zJ7rq3wIc5Vd4Shs-kbbEngC-iNItuzbOPoc4_RC6yXwkX3RGg8kIa0roy65JbBAJp57NyMs_byxlG8p8dQEMNgghhP4qky6sNuD3ZERZwzCm5ErC5hp3W7ryn28EtWUhazEpxzrJx3_ezi7aybBs8BCrZPjrGoYBomviRmBiwYxc7zFYZbIKOA5JijwuNDrjkBaXbO0LiZE57TUpW8Al6C9pEJVJPJ85T-SZR-bWlZW9aZCjAlTkcwlJYLTEAPtDpRf7pRjmG6-g7fPtBKlvCPN_ldamJqjQcpdmWkCNvyjYSMDZktRkyearqFsRQZbTJVlfdJvui6A57GQuuspmlPBvdaQlXmGo2697M5AWaccHFQ2sjwdAsl08q61cSIhPAr_MqcVg4YWCL6Jkq3xqqvCzuRo4MzZ9_Lm6kL-9uIX94WAhM7h0AMyLGk6WqsJWDOiOIObbVb87NVPPd4G-v4ncU3bu2SyKT44lASllPOuI',
              'content-type': 'multipart/form-data',
            };

            // const xhr = new XMLHttpRequest();
            // xhr.withCredentials = true;

            // xhr.addEventListener("readystatechange", function () {
            //     if (this.readyState === this.DONE) {
            //         console.log(this.responseText);
            //     }
            // });

            // xhr.open("POST", "https://api.katundu.africa/api/v1/orders/create");
            // xhr.setRequestHeader("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMjhmNDA4OTM3YTkwMjgxNWM4NDE1MGY4N2EwYjBmOWQ3YjNiYWU1Y2Y2MTViOTAyZjQwZWYwMjczNzI3ZDgxOTA1Njg0MjE5YjZmNDJmMDciLCJpYXQiOjE2ODkzNzg4NjMuNTE2NjkxLCJuYmYiOjE2ODkzNzg4NjMuNTE2Njk0LCJleHAiOjE3MjEwMDEyNjMuMTcwMzYsInN1YiI6IjEyIiwic2NvcGVzIjpbXX0.P3Cz52bIxQT4azFLLBahUHjurCl2-wGVhNyAqBlG6Q7XS_Tpx7rM_ztLOUV0zU1SUdoG_33tCLMlYxw-7u0E8uBSk5spYfDeM1SMsOUNEd5hp2zGEoHT6f3Dh-kTHTrWcQvRMgk08WpcdGmdK7S15NEoCNwnsAJ7g86wNsFh9AbzmlYyyzuYzkkuFPF20-zJ7rq3wIc5Vd4Shs-kbbEngC-iNItuzbOPoc4_RC6yXwkX3RGg8kIa0roy65JbBAJp57NyMs_byxlG8p8dQEMNgghhP4qky6sNuD3ZERZwzCm5ErC5hp3W7ryn28EtWUhazEpxzrJx3_ezi7aybBs8BCrZPjrGoYBomviRmBiwYxc7zFYZbIKOA5JijwuNDrjkBaXbO0LiZE57TUpW8Al6C9pEJVJPJ85T-SZR-bWlZW9aZCjAlTkcwlJYLTEAPtDpRf7pRjmG6-g7fPtBKlvCPN_ldamJqjQcpdmWkCNvyjYSMDZktRkyearqFsRQZbTJVlfdJvui6A57GQuuspmlPBvdaQlXmGo2697M5AWaccHFQ2sjwdAsl08q61cSIhPAr_MqcVg4YWCL6Jkq3xqqvCzuRo4MzZ9_Lm6kL-9uIX94WAhM7h0AMyLGk6WqsJWDOiOIObbVb87NVPPd4G-v4ncU3bu2SyKT44lASllPOuI");
            // xhr.setRequestHeader("Content-Type", "multipart/form-data");
            // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");

            // xhr.send(formData);

            api
              .post('orders/create', formData, headers)
              .then(response => {
                console.log('Server Response:', response.data);
              })
              .catch(error => {
                console.error('Error:', error.message);
              });
          }}
        >
          {({ values }) => (
            <Form className="w-[100%] h-[100%]">
              <h3 className="mb-4 text-2xl font-medium leading-none text-gray-900 dark:text-white">
                Booking Form
              </h3>
              <div className="grid grid-cols-2 gap-5">
                {/* Information Of The Users */}
                <div className="h-[300px] bg-slate-50 rounded-2xl p-5">
                  <div className="grid gap-1 gap-x-4 sm:grid-cols-2">
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Sender Name
                      </label>
                      <Field
                        type="text"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Senders Name"
                        required=""
                      />
                      <KErrorMessage name="name" />
                    </div>
                    <div className="relative">
                      <label
                        htmlFor="r_name"
                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Receivers Name
                      </label>
                      <Field
                        type="text"
                        name="r_name"
                        id="r_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Receivers Name"
                        required=""
                      />
                      <KErrorMessage name="r_name" />
                    </div>
                    <div className="relative">
                      <label
                        htmlFor="phone_number"
                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Sender Phone Number
                      </label>
                      <Field
                        type="text"
                        name="phone_number"
                        id="phone_number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Senders Phone Number"
                        required=""
                      />
                      <KErrorMessage name="phone_number" />
                    </div>
                    <div className="relative">
                      <label
                        htmlFor="r_phone_number"
                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Receivers Phone Number
                      </label>
                      <Field
                        type="text"
                        name="r_phone_number"
                        id="r_phone_number"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Receivers Phone Number"
                        required=""
                      />
                      <KErrorMessage name="r_phone_number" />
                    </div>
                    <div className="relative">
                      <label
                        htmlFor="email"
                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Sender Email Address
                      </label>
                      <Field
                        type="text"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Senders Email Address"
                        required=""
                      />
                      <KErrorMessage name="email" />
                    </div>

                    <div className="relative">
                      <label
                        htmlFor="r_email"
                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Receivers Email Address
                      </label>
                      <Field
                        type="text"
                        name="r_email"
                        id="r_email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Receivers Email Address"
                        required=""
                      />
                      <KErrorMessage name="r_email" />
                    </div>
                    <div className="relative">
                      <label
                        htmlFor="address"
                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Sender Address
                      </label>
                      <Field
                        type="text"
                        name="address"
                        id="address"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Senders Address"
                        required=""
                      />
                      <KErrorMessage name="address" />
                    </div>

                    <div className="relative">
                      <label
                        htmlFor="r_address"
                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Receivers Address
                      </label>
                      <Field
                        type="text"
                        name="r_address"
                        id="r_address"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Receivers Address"
                        required=""
                      />
                      <KErrorMessage name="r_address" />
                    </div>
                  </div>
                </div>
                {/* Shipment */}
                <div className="h-[300px] bg-slate-50 rounded-2xl p-5">
                  <div className="grid gap-1 mb-4 sm:grid-cols-2">
                    <div className="relative">
                      <label
                        htmlFor="items_type"
                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Truck Item Type{' '}
                      </label>
                      <Field
                        type="text"
                        as="select"
                        name="items_type"
                        id="items_type"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                      >
                        <option value="Weighable">Weighable</option>
                        <option value="Non-Weighable">Non-Weighable</option>
                      </Field>
                      <KErrorMessage name="items_type" />
                    </div>
                    <div className="relative">
                      <label
                        htmlFor="items"
                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Items
                      </label>
                      <Field
                        type="text"
                        name="items"
                        id="items"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Items Separated by Comas"
                        required=""
                      />
                      <KErrorMessage name="items" />
                    </div>
                    <div className="relative">
                      <label
                        htmlFor="weight"
                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Weight
                      </label>
                      <Field
                        type="number"
                        name="weight"
                        id="weight"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Receivers Phone Number"
                        required=""
                      />
                      <KErrorMessage name="weight" />
                    </div>
                    <div className="relative">
                      <label
                        htmlFor="pickup_date"
                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Pickup Date
                      </label>
                      <Field
                        type="date"
                        name="pickup_date"
                        id="pickup_date"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Pickup Date"
                        required=""
                      />
                      <KErrorMessage name="pickup_date" />
                    </div>

                    <div className="relative">
                      <label
                        htmlFor="currency"
                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Currency
                      </label>
                      <Field
                        type="text"
                        name="currency"
                        id="currency"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Currency"
                        required=""
                      />
                      <KErrorMessage name="currency" />
                    </div>

                    <div className="relative">
                      <label
                        htmlFor="truck_type_id"
                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Truck Type
                      </label>
                      <Field
                        type="text"
                        as="select"
                        name="truck_type_id"
                        id="truck_type_id"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                      >
                        {trucks?.map(truck => (
                          <option key={truck.id} value={truck.id}>
                            {truck.attributes.name}
                          </option>
                        ))}
                      </Field>
                      <KErrorMessage name="truck_type_id" />
                    </div>
                    <div className="relative">
                      <label
                        htmlFor="good_type_id"
                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Good Type{' '}
                      </label>
                      <Field
                        type="text"
                        as="select"
                        name="good_type_id"
                        id="good_type_id"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                      >
                        {goods?.map(good => (
                          <option key={good.id} value={good.id}>
                            {good.attributes.name}
                          </option>
                        ))}
                      </Field>
                      <KErrorMessage name="good_type_id" />
                    </div>
                    <div className="relative">
                      <label
                        htmlFor="load_type"
                        className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Load Type{' '}
                      </label>
                      <Field
                        type="text"
                        as="select"
                        name="load_type"
                        id="load_type"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                      >
                        <option value="FTL">Full Truck Load</option>
                        <option value="LTL">Less Truck Load</option>
                      </Field>
                      <KErrorMessage name="load_type" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-5 mt-5">
                <div className="h-[450px] w-[70%] bg-slate-50 rounded-2xl p-5 relative">
                  <GoogleMapComponent form={true} />
                </div>
                <div className="h-[450px] w-[30%] bg-slate-50 rounded-2xl p-5">
                  <div className="h-[90%] w-[100%]">
                    <div className="text-left">
                      <label
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        htmlFor="file_input"
                      >
                        {' '}
                        Add Images
                      </label>
                      <input
                        onChange={handleImageChange}
                        name="image"
                        multiple
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        aria-describedby="file_input_help"
                        id="file_input"
                        type="file"
                      />
                      <p
                        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                        id="file_input_help"
                      >
                        SVG, PNG, JPG or GIF (MAX. 800x400px).
                      </p>
                      <div className="flex items-center w-[94%] flex-wrap gap-1">
                        {previewImages.map((preview, index) => (
                          <img
                            className="block object-contain w-[32%]"
                            key={index}
                            src={preview}
                            alt={`Preview ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="payment">{/* workon this later */}</div>
                  </div>
                  <div className="flex items-center justify-start">
                    <button
                      type="button"
                      className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Nest
                    </button>
                    <PrimaryButtonLoader
                      isloading={false}
                      text="Create Order"
                      type="submit"
                    />
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BookNow;
