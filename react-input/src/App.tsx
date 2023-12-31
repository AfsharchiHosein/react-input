import "./App.css";
import ValidationComponent from "./ValidationComponent";
import Input from "./components/react-input";
import { CustomValidations } from "./types";
import useInput from "./useInput";
let renderCont = 0;

const App = () => {
  const { register, update, handleSubmit } = useInput();

  const customValidation: CustomValidations = [
    {
      func: (value: string | number) => {
        if (value == 278) {
          return false;
        }
        return true;
      },
      error: "278 is reserved",
    },
    {
      func: (value: string | number) => {
        if (value == 500) {
          return false;
        }
        return true;
      },
      error: "500 is so easy",
    },
  ];
  return (
    <>
      <div onClick={update}>Hello</div>

      {/* <Input
        id="12"
        validationOn="submit-blur"
        placeholder="Decimal Input"
        register={register}
        name="decTest"
        type="decimal"
        maxValue={3.2}
        title="3"
        separator=","
      /> */}

      <Input
        type="integer"
        name="intTest"
        id="26"
        register={register}
        minValue={2}
        maxValue={500}
        title="Integer Input"
        validationOn="submit-blur"
        placeholder="the test is here"
        validationComponent={ValidationComponent}
        customValidations={customValidation}
      />

      {/* <Input
        id="1"
        validationOn="submit"
        placeholder="vgh"
        register={register}
        name="name3"
        type="select"
        title="3"
        options={[{ label: "s3", value: 2 }]}
      />
      <Input
        locale="persian"
        id="312"
        validationOn="submit"
        placeholder="vgh"
        register={register}
        name="datename"
        type="calendar"
        title="3"
      /> */}

      <div>APP RENDER: {renderCont++}</div>

      <div onClick={handleSubmit}>click here to SUBMIT</div>
    </>
  );
};

export default App;
