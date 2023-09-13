import { useDispatch, useSelector } from "react-redux"
import { quotation_model } from "../../App/Features/UICoontroller"
import { useEffect } from "react";
import APIClient from "../../App/API/API";
import { allTruckTypes } from "../../App/Features/TrucksSlice";
import { allGoodTypes } from "../../App/Features/goodsSlice";
import KErrorMessage from "../../components/forms/KErrorMessage";
// import { Formik, FieldArray, Field } from 'formik';
import { Field, Formik, Form } from 'formik';

const Quotations = () => {
    const apiBaseURL = "https://api.katundu.africa/api/v1/"
    const dispatch = useDispatch ()


    const trucks = useSelector ((state) => state.Trucks.truck_types)
    const goods = useSelector ((state) => state.Goods.goods_types)
    // console.log(goods);
    
    const api = new APIClient (apiBaseURL)
    const headers= {
        Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMjhmNDA4OTM3YTkwMjgxNWM4NDE1MGY4N2EwYjBmOWQ3YjNiYWU1Y2Y2MTViOTAyZjQwZWYwMjczNzI3ZDgxOTA1Njg0MjE5YjZmNDJmMDciLCJpYXQiOjE2ODkzNzg4NjMuNTE2NjkxLCJuYmYiOjE2ODkzNzg4NjMuNTE2Njk0LCJleHAiOjE3MjEwMDEyNjMuMTcwMzYsInN1YiI6IjEyIiwic2NvcGVzIjpbXX0.P3Cz52bIxQT4azFLLBahUHjurCl2-wGVhNyAqBlG6Q7XS_Tpx7rM_ztLOUV0zU1SUdoG_33tCLMlYxw-7u0E8uBSk5spYfDeM1SMsOUNEd5hp2zGEoHT6f3Dh-kTHTrWcQvRMgk08WpcdGmdK7S15NEoCNwnsAJ7g86wNsFh9AbzmlYyyzuYzkkuFPF20-zJ7rq3wIc5Vd4Shs-kbbEngC-iNItuzbOPoc4_RC6yXwkX3RGg8kIa0roy65JbBAJp57NyMs_byxlG8p8dQEMNgghhP4qky6sNuD3ZERZwzCm5ErC5hp3W7ryn28EtWUhazEpxzrJx3_ezi7aybBs8BCrZPjrGoYBomviRmBiwYxc7zFYZbIKOA5JijwuNDrjkBaXbO0LiZE57TUpW8Al6C9pEJVJPJ85T-SZR-bWlZW9aZCjAlTkcwlJYLTEAPtDpRf7pRjmG6-g7fPtBKlvCPN_ldamJqjQcpdmWkCNvyjYSMDZktRkyearqFsRQZbTJVlfdJvui6A57GQuuspmlPBvdaQlXmGo2697M5AWaccHFQ2sjwdAsl08q61cSIhPAr_MqcVg4YWCL6Jkq3xqqvCzuRo4MzZ9_Lm6kL-9uIX94WAhM7h0AMyLGk6WqsJWDOiOIObbVb87NVPPd4G-v4ncU3bu2SyKT44lASllPOuI'
    }

    useEffect (() => {
        api.get('trailer-types/all', headers).then((response) => {
            dispatch (allTruckTypes (response.data))
        }).catch((error) => {
            console.error(error.message)
        })

        api.get('good-types/all', headers).then((response) => {
            // console.log(response.data);
            dispatch ( allGoodTypes (response.data) )
        }).catch((error) => {
            console.error(error.message)
        })

    }, [])


    const model = useSelector ((state) => state.UIController.models.quotation_model)
    // console.log(model);

    return (
        <div className="w-[100%] h-[85vh] overflow-y-auto">
            {
                model && <div className="fixed top-0 bottom-0 left-[250px] right-0 bg-black/20 z-10">
                    <div className="flex items-center justify-end mt-[40px] p-[30px] mb-3 bg-white">
                        <span className="text-2xl font-bold text-red-400 cursor-pointer" onClick={() => dispatch (quotation_model ())} >X</span>
                    </div>
                    <Formik
                        initialValues={
                            {
                                first_name: "",
                                last_name: "",
                                phone_number: "",
                                email: "",
                                company: "",
                                position: "",
                                weight: "",
                                truck_type_id: "",
                                load_type: "",
                                item_type: "",
                                good_type_id: "",
                                item_description: "",
                                currency: "ZMW",
                            }
                        }
                        onSubmit={(values) => {
                            console.log(values);
                            const SendData = { ...values }
                        }}
                        >
                        {({ values }) => (
                            <div className="p-20 overflow-y-auto h-[78vh] dark:text-gray-900 text-white bg-slate-50 rounded-xl dark:bg-slate-700 w-[80%] mx-auto">
                                <Form action="#">
                                    <h3 className="mb-4 text-2xl font-medium leading-none text-gray-900 dark:text-white">Booking Form</h3>
                                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                            <Field type="text" name="first_name" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First Name" required="" />
                                            <KErrorMessage name="first_name" />
                                        </div>
                                        <div>
                                            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                            <Field type="text" name="last_name" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last Name" required="" />
                                            <KErrorMessage name="last_name" />
                                        </div>
                                        <div>
                                            <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                            <Field type="text" name="phone_number" id="phone_number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone Number" required="" />
                                            <KErrorMessage name="phone_number" />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                            <Field type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required="" />
                                            <KErrorMessage name="email" />
                                        </div>
                                        <div>
                                            <label htmlFor="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company</label>
                                            <Field type="text" name="company" id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Company" required="" />
                                            <KErrorMessage name="company" />
                                        </div>
                                        <div>
                                            <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
                                            <Field type="text" name="position" id="position" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Position" required="" />
                                            <KErrorMessage name="position" />
                                        </div>
                                        <div>
                                            <label htmlFor="weight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Weight</label>
                                            <Field type="number" name="weight" id="weight" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Weight" required="" />
                                            <KErrorMessage name="weight" />
                                        </div>
                                        <div className="relative">
                                        <label htmlFor="truck_type_id" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Truck Type</label>
                                            <Field type="text" as="select" name="truck_type_id" id="truck_type_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                                                <option>Select Truck Type</option>
                                                {
                                                    trucks?.map ((truck) => <option key={truck.id} value={truck.id}>{truck.attributes.name}</option>)
                                                } 
                                                
                                            </Field>
                                            <KErrorMessage name="truck_type_id" />
                                        </div>
                                        <div className="relative">
                                            <label htmlFor="load_type" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Load Type </label>
                                            <Field type="text" as="select" name="load_type" id="load_type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                                                <option>Select Load Type</option>
                                                <option value="FTL">Full Truck Load</option>
                                                <option value="LTL">Less Truck Load</option>
                                            </Field>
                                            <KErrorMessage name="load_type" />
                                        </div> 
                                        <div className="relative">
                                            <label htmlFor="item_type" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"> Item Type </label>
                                            <Field type="text" as="select" name="item_type" id="item_type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                                                <option>Select Item Type</option>
                                                <option value="Weighable">Weighable</option>
                                                <option value="Non-Weighable">Non-Weighable</option>
                                            </Field>
                                            <KErrorMessage name="item_type" />
                                        </div>  
                                        <div className="relative">
                                            <label htmlFor="good_type_id" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Good Type </label>
                                            <Field type="text" as="select" name="good_type_id" id="good_type_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                                                <option>Select Good Type</option>
                                                {
                                                    goods?.map ((good) => <option key={good.id} value={good.id}>{good.attributes.name}</option>)
                                                } 
                                            </Field>
                                            <KErrorMessage name="good_type_id" />
                                        </div> 
                                        
                                        <div className="relative">
                                            <label htmlFor="currency" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Currency</label>
                                            <Field type="text" name="currency" id="currency" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Currency" required="" />
                                            <KErrorMessage name="currency" />
                                        </div>  

                                    </div>
                                    <div>
                                        <label htmlFor="item_description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Description</label>
                                        <Field as="textarea" type="text" name="item_description" id="item_description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description" required=""></Field>
                                    </div>
                                    {/* <FieldArray name="rows">
                                        {({ push, remove }) => (
                                        <div>
                                            {values.rows.map((_, index) => (
                                            <div key={index}>
                                                <label htmlFor={`rows.${index}.weight`}>Weight:</label>
                                                <Field
                                                    type="number"
                                                    name={`rows.${index}.weight`}
                                                    placeholder="Enter weight"
                                                />

                                                <label htmlFor={`rows.${index}.email`}>Email:</label>
                                                <Field
                                                    type="text"
                                                    name={`rows.${index}.email`}
                                                    placeholder="Enter email"
                                                />

                                                <button type="button" onClick={() => remove(index)}  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 mt-9 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                                    Remove Row
                                                </button>
                                            </div>
                                            ))}
                                            <button type="button" onClick={() => push({ name: '', email: '' })}  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 mt-9 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                Add Row
                                            </button>
                                        </div>
                                        )}
                                    </FieldArray> */}
                                    <div className="flex justify-end">
                                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 mt-9 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Create Quotation
                                        </button>
                                    </div>
                                </Form>
                            </div>
                        )
                    }
                    </Formik>
                </div>
            }
            <div className="grid grid-cols-1 w-full bg-red-500">
                <div className="bg-slate-50">
                <div className="flex items-center justify-between py-4 bg-white dark:bg-gray-800 p-10">
                    <div>
                        <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                            <span className="sr-only">Action button</span>
                            Action
                            <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                            </svg>
                        </button>
                        {/* <!-- Dropdown menu --> */}
                        <div id="dropdownAction" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Date</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Customer</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Pending</a>
                                </li>
                            </ul>
                            <div className="py-1">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Completed</a>
                            </div>
                        </div>

                        
                        <button onClick={() => dispatch (quotation_model ())} type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ml-9">+ New</button>
                    </div>
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                            </svg>
                        </div>
                        <input type="text" id="table-search-users" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Job" />
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> 
                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Customer
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Receiver
                            </th>
                            <th scope="col">
                                Due Data
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="w-4 p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" /> 
                                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <td>
                                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image" />
                                    <div className="pl-3">
                                        <div className="text-base font-semibold">Neil Sims</div>
                                        <div className="font-normal text-gray-500">neil.sims@flowbite.com</div>
                                    </div>  
                                </th>
                            </td>
                            
                            <td className="px-6 py-4">
                                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <img className="w-10 h-10 rounded-full mr-2" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image" />
                                    <div className="pl-3">
                                        <div className="text-base font-semibold">Neil Sims</div>
                                        <div className="font-normal text-gray-500">neil.sims@flowbite.com</div>
                                    </div>  
                                </th>
                            </td>
                            <td className="px-6 py-4">
                                23 Aug, 2023
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center">
                                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div> Pending
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" type="button" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View Quotation</a>
                            </td>
                        </tr> */}
                    </tbody>
                </table>
                
                </div>
            </div>
        </div>
    )
}

export default Quotations
