"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { AddEmployee } from "./AddEmployee";

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

export type formValues = {
  name: string;
  email: string;
  phone: string;
  designation: string;
  gender: string;
  course: string[];
};

type EmployeeDetails = {
  name: string;
  email: string;
  phone: string;
  designation: string;
  gender: string;
  course: string[];
  _id: string;
  createdAt: string;
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

const ViewEmployees = () => {
  const [showPopUp, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState<
    EmployeeDetails[] | null
  >(null);
  const [reRender, setReRender] = useState(false);

  const [initialFormValues, setInitialFormValues] = useState(initialValues);

  const handleFormSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/userbox`, values, {
        headers: {
          "Content-Type": "application/json",
          userLogin: sessionStorage.getItem("token"),
        },
      });
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
      setShowPopup(false);
      setReRender(!reRender);
    }
  };

  const fetchEmployees = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/userbox`,
        {
          headers: {
            "Content-Type": "application/json",
            userLogin: sessionStorage.getItem("token"),
          },
        }
      );
      setEmployeeDetails(response?.data?.users);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEmployeeById = async (id: string | number) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/userbox/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            userLogin: sessionStorage.getItem("token"),
          },
        }
      );
      setInitialFormValues(response?.data?.user);
      setShowPopup(true);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEmployeeById = async (id: string | number) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/userbox/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            userLogin: sessionStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
      setReRender(!reRender);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [reRender]);

  const handleShow = () => {
    setShowPopup(!showPopUp);
  };

  const { errors, handleSubmit, touched, handleChange, values } = useFormik({
    initialValues: initialFormValues,
    validationSchema: signupSchema,
    enableReinitialize: true,
    onSubmit: (values: formValues) => {
      handleFormSubmit(values);
    },
  });

  return (
    <>
      <div className="w-full flex items-center justify-end gap-x-4">
        <h3>Total Count:{employeeDetails?.length}</h3>
        {/* <Link href="/create-employee"> */}
        <button
          onClick={handleShow}
          className="bg-black text-white p-2 rounded-md m-2 "
        >
          Create Employee
        </button>
        {/* </Link> */}
      </div>
      <Table>
        <TableCaption>A list of your employees</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Unique Id</TableHead>
            {/* <TableHead className="text-center">Image</TableHead> */}
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Mobile No</TableHead>
            <TableHead className="text-center">Designation</TableHead>
            <TableHead className="text-center">gender</TableHead>
            <TableHead className="text-center">Course</TableHead>
            <TableHead className="text-center">Create date</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {employeeDetails?.map((invoice, i) => (
            <TableRow key={i}>
              <TableCell className="font-medium text-center">{i + 1}</TableCell>
              {/* <TableCell className="text-center">{invoice.image}</TableCell> */}
              <TableCell className="text-center">{invoice?.name}</TableCell>
              <TableCell className="text-center">{invoice?.email}</TableCell>
              <TableCell className="text-center">{invoice?.phone}</TableCell>
              <TableCell className="text-center">
                {invoice?.designation}
              </TableCell>
              <TableCell className="text-center">{invoice?.gender}</TableCell>
              <TableCell className="text-center">{invoice?.course}</TableCell>
              <TableCell className="text-center">
                {invoice?.createdAt?.slice(0, 10)}
              </TableCell>
              <TableCell className=" flex items-center justify-center gap-x-2">
                <button
                  onClick={() => fetchEmployeeById(invoice?._id as string)}
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteEmployeeById(invoice?._id as string)}
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {showPopUp && (
        <AddEmployee
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          touched={touched}
          values={values}
          open={showPopUp}
          onOpenChange={setShowPopup}
        />
      )}
    </>
  );
};

export default ViewEmployees;
