import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { ResetPasswordd } from "../../redux/features/forgotPasswordSlice";

export default function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.forgotPassword.email);
  const formik = useFormik({
    initialValues: {
      newPassword: "",
      repeatNewPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().required("Required"),
      repeatNewPassword: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(
        ResetPasswordd({
          email: email,
          newPassword: values.newPassword,
          repeatNewPassword: values.repeatNewPassword,
        })
      );
      navigate("/login");
    },
  });

  return (
    <div className="hero-bg w-full">
      <div className="backdrop-blur-[5px] w-full">
        <section className="bg-gray-50 dark:bg-gray-900 h-[100vh]">
          <div className="flex flex-col items-center justify-center pt-[90px] px-6 pb-8 mx-auto">
            <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
              <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Change Password
              </h2>
              <form
                className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
                onSubmit={formik.handleSubmit}
              >
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-color focus:border-primary-color block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="********"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.newPassword}
                  />
                </div>
                <div>
                  <label
                    htmlFor="repeatNewPassword"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Repeat New Password
                  </label>
                  <input
                    type="password"
                    name="repeatNewPassword"
                    id="repeatNewPassword"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-color focus:border-primary-color block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="********"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.repeatNewPassword}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-primary-color border border-primary-color hover:bg-primary-color hover:text-color-white  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-color duration-300"
                >
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
