import axios from "axios";
import { Field, Formik } from "formik";
import JoditEditor from "jodit-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const initialValues = {
  name: "",
  uses: "",
  works: "",
  sideEffects: "",
  expertAdvice: "",
  faq: "",
};

const AddGeneric = () => {
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const postGenericData = async (values) => {
    try {
      const response = await axios.post(
        "https://api.assetorix.com:4100/ah/api/v1/generic",
        values,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authorization")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      navigate("/all-generic");
      toast.success("Data posted Successfully...");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    postGenericData();
  }, []);

  return (
    <div className="bg-[#f0f0f1]">
      <div className="p-5 sm:w-[60vw] w-[100%] mx-auto">
        <div className="flex flex-col gap-5">
          <p className="font-bold text-center text-2xl">Add Generics</p>

          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              postGenericData(values);
              console.log(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="mt-5">
                  <div className="flex flex-col gap-2">
                    <label className="px-3 font-bold">Name</label>
                    <input
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      type="text"
                      placeholder="Enter name here"
                      className="p-3 border rounded-xl h-[45px]"
                    />
                    {errors.name && touched.name && (
                      <div className="text-red-500">{errors.name}</div>
                    )}
                  </div>

                  <div className="mt-5 flex flex-col gap-2">
                    <label className="px-3 font-bold">Uses</label>
                    <div>
                      <Field name="uses">
                        {({ field }) => (
                          <JoditEditor
                            value={values.uses}
                            onChange={(value) =>
                              handleChange({
                                target: {
                                  name: "uses",
                                  value: value,
                                },
                              })
                            }
                            required
                          />
                        )}
                      </Field>
                      {errors.uses && touched.uses && (
                        <div className="text-red-500">{errors.uses}</div>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-2">
                    <label className="px-3 font-bold">Works</label>
                    <div>
                      <Field name="works">
                        {({ field }) => (
                          <JoditEditor
                            value={values.works}
                            onChange={(value) =>
                              handleChange({
                                target: {
                                  name: "works",
                                  value: value,
                                },
                              })
                            }
                            required
                          />
                        )}
                      </Field>
                      {errors.works && touched.works && (
                        <div className="text-red-500">{errors.works}</div>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-2">
                    <label className="px-3 font-bold">Side Effects</label>
                    <div>
                      <Field name="sideEffects">
                        {({ field }) => (
                          <JoditEditor
                            value={values.sideEffects}
                            onChange={(value) =>
                              handleChange({
                                target: {
                                  name: "sideEffects",
                                  value: value,
                                },
                              })
                            }
                            required
                          />
                        )}
                      </Field>
                      {errors.sideEffects && touched.sideEffects && (
                        <div className="text-red-500">{errors.sideEffects}</div>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-2">
                    <label className="px-3 font-bold">Expert Advice</label>
                    <div>
                      <Field name="expertAdvice">
                        {({ field }) => (
                          <JoditEditor
                            value={values.expertAdvice}
                            onChange={(value) =>
                              handleChange({
                                target: {
                                  name: "expertAdvice",
                                  value: value,
                                },
                              })
                            }
                            required
                          />
                        )}
                      </Field>
                      {errors.expertAdvice && touched.expertAdvice && (
                        <div className="text-red-500">
                          {errors.expertAdvice}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col gap-2">
                    <label className="px-3 font-bold">Faq's</label>
                    <div>
                      <Field name="faq">
                        {({ field }) => (
                          <JoditEditor
                            value={values.faq}
                            onChange={(value) =>
                              handleChange({
                                target: {
                                  name: "faq",
                                  value: value,
                                },
                              })
                            }
                            required
                          />
                        )}
                      </Field>
                      {errors.faq && touched.faq && (
                        <div className="text-red-500">{errors.faq}</div>
                      )}
                    </div>
                  </div>
                </div>

                <button className="mt-5 bg-[#13a3bc] hover:bg-[#13b6d5] w-[100%] font-bold text-white py-2 rounded-xl">
                  {saving ? "Saving..." : "Save Data"}
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddGeneric;
