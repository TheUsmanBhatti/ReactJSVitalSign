import React from "react";

import { useFormik, Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Services() {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  const validate = (values) => {
    let errors = {};

    if (!values?.name) {
      errors.name = "Required";
    }
    if (!values?.email) {
      errors.email = "Required";
    }
    if (!values?.phone) {
      errors.phone = "Required";
    }

    return errors;
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Field Required"),
    email: Yup.string().email("Invalid email").required("Field Required"),
    phone: Yup.number().typeError("Enter number").required("Field Required"),
  });

  //   const formik = useFormik({
  //     initialValues,
  //     onSubmit,
  //     validationSchema,
  //     // validate
  //   });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div>
          <Field
            placeholder="Name"
            name="name"
            // {...formik.getFieldProps("name")}
            // onChange={formik.handleChange}
            // onBlur={formik?.handleBlur}
            // value={formik.values.name}
          />
          <ErrorMessage name="name" />
        </div>

        <div>
          <Field
            placeholder="Email"
            name="email"
            // {...formik.getFieldProps("email")}
            // onChange={formik.handleChange}
            // onBlur={formik?.handleBlur}
            // value={formik.values.email}
          />
          <ErrorMessage name="email" />
        </div>

        <div>
          <Field
            placeholder="Phone"
            name="phone"
            // {...formik.getFieldProps("phone")}
            // onChange={formik.handleChange}
            // onBlur={formik?.handleBlur}
            // value={formik.values.phone}
          />
          <ErrorMessage name="phone" />
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
