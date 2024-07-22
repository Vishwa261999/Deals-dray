"use client";

import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

const signupSchema = Yup.object({
  name: Yup.string().min(5).required("Please Enter Your Name"),
  email: Yup.string().nullable().email().required("Enter email"),
  phone: Yup.number()
    .min(1111111111, "Minimum 10 digits")
    .max(9999999999, "Maximum 10 digits")
    .required("Please Enter Your mobile no"),
  designation: Yup.string().required("Please check the designation"),
  gender: Yup.string().required("Please select the gender"),
  course: Yup.array()
    .length(1, "Please select any one of the courses")
    .required("Please select the course"),
  // image: Yup.mixed().required("Please upload the image"),
});

type formValues = {
  name: string;
  email: string;
  phone: string;
  designation: string;
  gender: string;
  course: string[];
};
const initialValues: formValues = {
  name: "",
  email: "",
  phone: "",
  designation: "",
  gender: "",
  course: [],
  // image: "",
};

const CreateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const handleFormSubmit = async (values: formValues) => {
    setIsLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/userbox`, values, {
        headers: {
          "Content-Type": "application/json",
          userLogin:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OWNlNzk5YmU0M2Q2OWVjOThhMjJjMyIsImlhdCI6MTcyMTU2MjcyM30.aPcxA3l0f8D9OIwuAjaJFosbulz_bh19-Tza6f9M8uk",
        },
      });
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  // can you check why the headers is going in the payload?

  const { errors, handleSubmit, touched, handleChange, values } = useFormik({
    initialValues: initialValues,
    validationSchema: signupSchema,
    onSubmit: (values: formValues) => {
      // action.resetForm();
      // console.log("values", values);
      handleFormSubmit(values);
    },
  });

  console.log("values", values);

  return (
    <section className="flex items-center justify-center h-screen ">
      <form
        className="flex flex-col border border-gray-200  p-10 rounded-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center font-bold text-2xl">Create Employee</h1>
        <label htmlFor="name" className="mt-3">
          Name :
        </label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Enter Your Name"
          className="border border-gray-100 bg-black w-full p-2 rounded-md"
        />
        {errors.name && touched.name && (
          <p className="text-red-600">{errors.name}</p>
        )}
        <label htmlFor="" className="mt-3">
          Email :
        </label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Enter Your Email id"
          className="border border-gray-100 bg-black w-full p-2 rounded-md"
        />
        {errors.email && touched.email && (
          <p className="text-red-600">{errors.email}</p>
        )}
        <label htmlFor="" className="mt-3">
          Mobile No :
        </label>
        <input
          type="number"
          name="phone"
          placeholder="Enter Your Mobile No."
          value={values.phone}
          onChange={handleChange}
          className="border border-gray-100 bg-black w-full p-2 rounded-md"
        />
        {errors.phone && touched.phone && (
          <p className="text-red-600">{errors.phone}</p>
        )}
        <label htmlFor="designation" className="mt-3">
          Designation
        </label>

        <select
          name="designation"
          value={values.designation}
          id="designation"
          onChange={handleChange}
          className="border border-gray-100 bg-black w-full p-2 rounded-md"
        >
          <option value="" disabled>
            Choose
          </option>
          <option value="hr">HR</option>
          <option value="manager">Manager</option>
          <option value="sales">Sales</option>
        </select>

        {errors.designation && touched.designation && (
          <p className="text-red-600">{errors.designation}</p>
        )}

        <div className="flex gap-5">
          <label htmlFor="" className="mt-3">
            Gender :
          </label>
          <label htmlFor="male" className="mt-3">
            Male
          </label>
          <input
            id="male"
            name="gender"
            type="radio"
            value="male"
            onChange={handleChange}
            className="border border-gray-100 bg-black  p-2 rounded-md mt-3"
          />
          <label htmlFor="female" className="mt-3">
            Female
          </label>
          <input
            id="female"
            name="gender"
            type="radio"
            value="female"
            onChange={handleChange}
            className="border border-gray-100 bg-black  p-2 rounded-md mt-3"
          />
        </div>
        {errors.gender && touched.gender && (
          <p className="text-red-600">{errors.gender}</p>
        )}

        <div className="flex gap-5">
          <label htmlFor="" className="mt-3">
            Course :
          </label>
          <label htmlFor="mca" className="mt-3">
            MCA
          </label>
          <input
            id="mca"
            type="checkbox"
            name="course"
            value="mca"
            onChange={handleChange}
            className="border border-gray-100 bg-black  p-2 mt-3 rounded-md"
          />
          <label htmlFor="bca" className="mt-3">
            BCA
          </label>
          <input
            id="bca"
            type="checkbox"
            name="course"
            value="bca"
            onChange={handleChange}
            className="border border-gray-100 bg-black  p-2 mt-3 rounded-md"
          />
          <label htmlFor="bsc" className="mt-3">
            BSC
          </label>
          <input
            id="bsc"
            type="checkbox"
            name="course"
            value="bsc"
            onChange={handleChange}
            className="border border-gray-100 bg-black  p-2 mt-3 rounded-md"
          />
        </div>
        {errors.course && touched.course && (
          <p className="text-red-600">{errors.course}</p>
        )}

        {/* <label htmlFor="" className="mt-3">
          Upload Image
        </label>
        <input type="file" name="image" onChange={handleChange} id="image" />
        {errors.image && touched.image && (
          <p className="text-red-600">{errors.image}</p>
        )} */}
        <button
          type="submit"
          className="bg-white text-black font-semibold p-2 rounded-md mt-3 hover:bg-black hover:text-white hover:border border-gray-200 hover:duration-300"
        >
          {isLoading ? "Loading" : "Submit"}
        </button>
      </form>
    </section>
  );
};

export default CreateUser;
