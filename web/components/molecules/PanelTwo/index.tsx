import styled from "@emotion/styled";
import Button from "@web/components/atoms/Button";
import Line from "@web/components/atoms/Line";
import { useCallback, useEffect, useState } from "react";

type FormField = {
  [key: string]: string;
};

type Props = {
  onResize?: () => void;
};
const PanelOne: React.FC<Props> = ({ onResize }) => {
  const initialFormFields: FormField[] = [
    { attr: "pop_sex_code_1", value: "0", color: "#ffffff", operator: ">=" },
  ];
  const [formFields, setFormFields] = useState<FormField[]>(initialFormFields);
  const handleFormChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
      index: number
    ) => {
      const data = [...formFields];
      data[index][event.target.name] = event.target.value;
      setFormFields(data);
    },
    [formFields]
  );
  const submit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent
  ): void => {
    e.preventDefault();
    console.log("download data");
  };
  const addFields = () => {
    const object = {
      attr: "pop_sex_code_1",
      value: "0",
      color: "#ffffff",
      operator: ">=",
    };
    setFormFields([...formFields, object]);
  };
  const removeFields = (index: number) => {
    const data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  const removeAllCondition = () => {
    console.log("remove all condition");
    setFormFields(initialFormFields);
  };

  const applyAllCondition = () => {
    console.log("apply all condition");
    console.log(formFields);
  };

  useEffect(() => {
    onResize?.();
  }, [onResize, handleFormChange]);
  return (
    <Wrapper>
      <form
        onSubmit={submit}
        style={{
          display: "flex",
          flexWrap: "wrap",
          maxHeight: "400px",
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        {formFields.length === 0 && (
          <EmptyTip>Click the button to add new condition please</EmptyTip>
        )}
        {formFields.map((form, index) => {
          return (
            <CardSettings key={index}>
              <select
                value={form.attr}
                name="attr"
                onChange={(event) => handleFormChange(event, index)}
              >
                <option value="pop_sex_code_1">男性</option>
                <option value="pop_sex_code_2">女性</option>
                <option value="pop_age00">男女合計、全年代</option>
                <option value="pop_age10">男女合計:10-19歳</option>
                <option value="pop_age20">男女合計:20-29歳</option>
                <option value="pop_age30">男女合計:30-39歳</option>
                <option value="pop_age40">男女合計:40-49歳</option>
                <option value="pop_age50">男女合計:50歳-</option>
              </select>
              <select
                name="operator"
                onChange={(event) => handleFormChange(event, index)}
                value={form.operator}
              >
                <option value=">=">以上</option>
                <option value="<=">以下</option>
                <option value="===">等しい</option>
                <option value="!==">等しくない</option>
                <option value=">">より大きい</option>
                <option value="<">未満 </option>
              </select>
              <input
                name="value"
                placeholder="Value"
                onChange={(event) => handleFormChange(event, index)}
                value={form.value}
              />
              <input
                type="color"
                name="color"
                value={form.color}
                onChange={(event) => handleFormChange(event, index)}
              />
              <Button
                onClick={() => removeFields(index)}
                icon="trash"
                extendWidth
              ></Button>
            </CardSettings>
          );
        })}
      </form>
      <Button
        text="Add condition"
        icon="plusCircle"
        extendWidth
        onClick={addFields}
      />
      <br />
      <Line>
        <Button text="Remove all condition" onClick={removeAllCondition} />
        <Button text="Apply all condition" onClick={applyAllCondition} />
      </Line>

      <br />
      <Button text="Download" icon="sun" extendWidth onClick={submit} />
    </Wrapper>
  );
};
const EmptyTip = styled.div`
  color: #8c8c8c;
  text-align: center;
`;
const CardSettings = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  max-width: 100%;
  & > * {
    flex: 1;
    max-width: calc(40% - 8px); /* subtract gap between inputs */
  }
`;
const Wrapper = styled.div`
  max-width: 100%;
`;
export default PanelOne;
