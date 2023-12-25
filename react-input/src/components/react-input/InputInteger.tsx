import { forwardRef, useImperativeHandle, useRef, memo, useState } from "react";
import { Integer } from "../../types";
import { vMinValue } from "../../utils/validations/vMinValue";
import { vMaxValue } from "../../utils/validations/vMaxValue";
import { vInteger } from "../../utils/validations/vInteger";
import { separate } from "../../utils/Separate";

const InputInteger = memo(
  forwardRef((_: Integer, ref: any) => {
    const [isValid, setIsValid] = useState<boolean>(true);
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      getValue: () => {
        if (inputRef.current) {
          return inputRef.current?.value;
        }
      },
      updateValue: (newValue: string) => {
        if (inputRef.current) {
          inputRef.current.value = newValue;
        }
      },
    }));

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (_.onChange) return _.onChange;
      vInteger({ event: e });
      if (_.separator) separate({ event: e, seperator: _.separator });

      if (_.validationOn == "submit-blur-change" || !isValid)
        setIsValid(checkValidation(e));
    };

    const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (_.onChange) return _.onChange;
      vInteger({ event: e });
      if (_.separator) separate({ event: e, seperator: _.separator });

      if (
        _.validationOn == "submit-blur-change" ||
        _.validationOn == "submit-blur" ||
        !isValid
      )
        setIsValid(checkValidation(e));
    };

    const checkValidation = (
      e: React.ChangeEvent<HTMLInputElement>
    ): boolean => {
      if (_.minValue && !vMinValue({ event: e, minValue: _.minValue }))
        return false;
      if (_.maxValue && !vMaxValue({ event: e, maxValue: _.maxValue }))
        return false;
      return true;
    };

    return (
      <>
        <input
          defaultValue={1}
          ref={inputRef}
          className={`${isValid ? "" : "input-not-valid"}`}
          type="text"
          title={_.title}
          placeholder={_.placeholder}
          onChange={(e) => onChange(e)}
          onBlur={(e) => onBlur(e)}
        />
      </>
    );
  })
);

export default InputInteger;
