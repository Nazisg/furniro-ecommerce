import { useFormik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { MdPersonOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import cart from "../../assets/icons/cart.svg";
import heart from "../../assets/icons/header-heart.svg";
import exit from "../../assets/images/exit.png";
import {
  ChangePassword,
  UserData,
  editUser,
} from "../../redux/features/authSlice";

export default function Profile() {
  const [isChangePassword, setIsChangePassword] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.addToCart.items);
  const userID_Int = useMemo(() => {
    if (userId) {
      return parseInt(userId);
    }
  }, [userId]);
  const ProfileSchema = Yup.object().shape({
    userName: Yup.string().required("Required"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
  });
  const formik = useFormik({
    initialValues: {
      userName: userData?.userName || "",
      firstName: userData?.firstName || "",
      lastName: userData?.lastName || "",
      email: userData?.email || "",
    },
    validationSchema: ProfileSchema,
    onSubmit: (values) => {
      if (userID_Int && values) {
        dispatch(
          editUser({
            id: userID_Int,
            userName: values.userName,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
          })
        );
      }
    },
  });
  const ProfileSchemaChangePassword = Yup.object().shape({
    currentPassword: Yup.string().required("Required"),
    newPassword: Yup.string().required("Required"),
    repeatNewPassword: Yup.string().required("Required"),
  });
  const formikChangePassword = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      repeatNewPassword: "",
    },
    validationSchema: ProfileSchemaChangePassword,
    onSubmit: (values) => {
      if (userID_Int && values) {
        dispatch(
          ChangePassword({
            id: userID_Int,
            currentPassword: formikChangePassword.values.currentPassword,
            newPassword: formikChangePassword.values.newPassword,
            repeatNewPassword: formikChangePassword.values.repeatNewPassword,
          })
        );
      }
    },
  });

  useEffect(() => {
    if (userID_Int) {
      dispatch(UserData(userID_Int));
    }
  }, [dispatch, userID_Int]);

  useEffect(() => {
    if (
      userData?.userName &&
      userData?.firstName &&
      userData?.lastName &&
      userData?.email
    ) {
      formik.setValues({
        userName: userData?.userName || "",
        firstName: userData?.firstName || "",
        lastName: userData?.lastName || "",
        email: userData?.email || "",
      });
    }
  }, [userData]);

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };
  const handleChangePassword = () => {
    setIsChangePassword(true);
  };

  const handleProfile = () => {
    setIsChangePassword(false);
  };
  return (
    <div className="pt-[90px] pb-8 bg-color-light-bg flex justify-center">
      <div className="w-[85%] flex flex-col justify-center gap-6  items-start  md:flex-row ">
        <div className="w-[270px] max-[768px]:min-w-full md:w-[350px] flex flex-col gap-4 rounded-xl bg-color-white p-6">
          <div className="flex flex-col gap-2 ">
            <p>
              {userData?.firstName} {userData?.lastName}
            </p>
            <p>{userData?.email}</p>
          </div>
          <hr />
          <div className="flex flex-col gap-4">
            <div className="flex gap-3 cursor-pointer" onClick={handleProfile}>
              <MdPersonOutline size={20} />
              <p>Profile</p>
            </div>
            <div
              className="cursor-pointer flex gap-3"
              onClick={handleChangePassword}
            >
              <RiLockPasswordLine size={20} />
              <p> Change Password</p>
            </div>
            <Link to="/favorites" className="flex gap-3">
              <img src={heart} className="w-5 cursor-pointer" />
              <p>Favorites</p>
            </Link>
            <Link to="/cart" className="flex gap-3">
              <div className="relative cursor-pointer">
                <img src={cart} className="w-5 " />
                <div className="w-4 h-4 rounded-full bg-primary-color text-color-white absolute top-[-7px] right-[-7px] text-xs flex justify-center items-center">
                  {items?.length || 0}
                </div>
              </div>
              <p>Cart</p>
            </Link>

            <div
              onClick={() => {
                {
                  localStorage.removeItem("userId");
                  localStorage.removeItem("jwtToken");
                  navigate("/login");
                }
              }}
              className="flex gap-3 cursor-pointer"
            >
              <img src={exit} className="w-[20px] h-[20px]" />
              <p>Exit</p>
            </div>
          </div>
        </div>
        {isChangePassword ? (
          <form className="w-full flex flex-col gap-4">
            <div className="w-full rounded-lg bg-color-white p-4">
              <h2 className="text-[25px]">Change Password</h2>
            </div>
            <div className="w-full rounded-lg bg-color-white p-4 flex flex-col gap-3">
              <div className="flex lg:flex-row md:flex-col flex-col gap-4 w-full">
                <label className="flex flex-col gap-2 w-full">
                  Current Password
                  <input
                    value={formikChangePassword.values.currentPassword}
                    name="currentPassword"
                    type="password"
                    onChange={formikChangePassword.handleChange}
                    onBlur={formikChangePassword.handleBlur}
                    {...formikChangePassword.getFieldProps("currentPassword")}
                    className="border border-color-gray-2 rounded-md p-2 w-full"
                  />
                </label>
                <label className="flex flex-col gap-2 w-full">
                  New Password
                  <input
                    value={formikChangePassword.values.newPassword}
                    name="newPassword"
                    type="password"
                    onChange={formikChangePassword.handleChange}
                    onBlur={formikChangePassword.handleBlur}
                    {...formikChangePassword.getFieldProps("newPassword")}
                    className="border border-color-gray-2 rounded-md p-2 w-full"
                  />
                </label>
                <label className="flex flex-col gap-2 w-full">
                  Repeat New Password
                  <input
                    value={formikChangePassword.values.repeatNewPassword}
                    name="repeatNewPassword"
                    type="password"
                    onChange={formikChangePassword.handleChange}
                    onBlur={formikChangePassword.handleBlur}
                    {...formikChangePassword.getFieldProps("repeatNewPassword")}
                    className="border border-color-gray-2 rounded-md p-2 w-full"
                  />
                </label>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                onClick={formikChangePassword.handleSubmit}
                className="py-2 px-8 text-white bg-green-500 rounded-lg"
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full flex flex-col gap-4"
          >
            <div className="w-full rounded-lg bg-color-white p-4">
              <h2 className="text-[25px]">Profile</h2>
            </div>
            <div>
              <div className="w-full rounded-lg bg-color-white p-4 flex flex-col gap-3">
                <div className="flex lg:flex-row md:flex-row flex-col gap-4 w-full">
                  <label className="flex flex-col gap-2 w-full">
                    User name
                    <input
                      value={formik.values.userName}
                      name="userName"
                      type="text"
                      disabled={!isEditing}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      {...formik.getFieldProps("userName")}
                      className={`border ${isEditing ? "border-color-gray-2" : ""
                        } rounded-md p-2 w-full`}
                    />
                    {formik.touched.userName && formik.errors.userName ? (
                      <div className="text-red-500">
                        {formik.errors.userName}
                      </div>
                    ) : null}
                  </label>
                  <label className="flex flex-col gap-2 w-full">
                    First name
                    <input
                      value={formik.values.firstName}
                      name="firstName"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={!isEditing}
                      {...formik.getFieldProps("firstName")}
                      className={`border ${isEditing ? "border-color-gray-2" : ""
                        } rounded-md p-2 w-full`}
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <div className="text-red-500">
                        {formik.errors.firstName}
                      </div>
                    ) : null}
                  </label>
                </div>
                <div className="flex lg:flex-row md:flex-row flex-col gap-4 w-full">
                  <label className="flex flex-col gap-2 w-full">
                    Last name
                    <input
                      name="lastName"
                      value={formik.values.lastName}
                      type="text"
                      disabled={!isEditing}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`border ${isEditing ? "border-color-gray-2" : ""
                        } rounded-md p-2 w-full`}
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <div className="text-red-500">
                        {formik.errors.lastName}
                      </div>
                    ) : null}
                  </label>
                  <label className="flex flex-col gap-2 w-full">
                    Email
                    <input
                      name="email"
                      value={formik.values.email}
                      type="email"
                      disabled={!isEditing}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`border ${isEditing ? "border-color-gray-2" : ""
                        } rounded-md p-2 w-full`}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-red-500">{formik.errors.email}</div>
                    ) : null}
                  </label>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`py-2 px-8 text-white ${isEditing ? "bg-green-500" : "bg-red-500"
                    } rounded-lg`}
                  onClick={() => {
                    if (isEditing) formik.handleSubmit();
                    handleEditClick();
                  }}
                >
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
