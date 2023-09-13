import { ErrorMessage } from "formik";

const KErrorMessage = ({ name }) => {
  return (
    <div className="text-[12px] text-red-500 absolute top-[13px] left-4 bg-slate-50">
      <ErrorMessage name={name} />
    </div>
  );
};

export default KErrorMessage;