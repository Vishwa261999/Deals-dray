"uss client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FormikErrors, FormikTouched } from "formik";

import React, { ChangeEvent, FormEvent } from "react";
import { formValues } from "./ViewEmployees";

export function AddEmployee({
  open,
  onOpenChange,
  values,
  handleChange,
  handleSubmit,
  touched,
  errors,
  isLoading,
}: {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  errors: FormikErrors<formValues>;
  values: formValues;
  handleChange: (e: ChangeEvent<any>) => void;
  handleSubmit: (e?: FormEvent<HTMLFormElement>) => void;
  touched: FormikTouched<formValues>;
  isLoading: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form className="flex flex-col  p-4 rounded-lg" onSubmit={handleSubmit}>
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
            className="border border-gray-400  w-full p-2 rounded-md"
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
            className="border border-gray-400  w-full p-2 rounded-md"
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
            className="border border-gray-400  w-full p-2 rounded-md"
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
            className="border border-gray-400  w-full p-2 rounded-md"
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
              className="border border-gray-400   p-2 rounded-md mt-3"
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
              className="border border-gray-400   p-2 rounded-md mt-3"
            />
          </div>
          {errors.gender && touched.gender && (
            <p className="text-red-600">{errors.gender}</p>
          )}

          <div className="flex gap-x-5 items-center">
            <label htmlFor="" className="mt-3">
              Course:
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
              className="border border-gray-400   p-2 mt-3 rounded-md"
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
              className="border border-gray-400   p-2 mt-3 rounded-md"
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
              className="border border-gray-400   p-2 mt-3 rounded-md"
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
            className=" text-white font-semibold p-2 rounded-md mt-3 bg-black disabled:bg-black/50"
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
