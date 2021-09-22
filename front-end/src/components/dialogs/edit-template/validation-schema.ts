import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  text: Yup.string().required("Поле обязательно для заполнения"),
});

export default validationSchema
