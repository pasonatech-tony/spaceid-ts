import styled from "@emotion/styled"
import Button from "@web/components/atoms/Button"
import Line from "@web/components/atoms/Line"
import { useCallback, useEffect, useState } from "react"

type FormField = {
  [key: string]: string
}

type Props = {
  onResize?: () => void
}
const PanelOne: React.FC<Props> = ({ onResize }) => {
  const initialFormFields: FormField[] = [
    {
      attr: "pop_sex_code_1",
      value: "0",
      color: "#ffffff",
      hex: "#ffffff",
      operator: ">=",
    },
  ]
  const [formFields, setFormFields] = useState<FormField[]>(initialFormFields)
  const [selectedColors, setSelectedColors] = useState<string[]>(
    initialFormFields.map((field) => field.color)
  )
  const handleColorChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newColors = [...selectedColors]
    newColors[index] = event.target.value

    setSelectedColors(newColors)
  }
  const handleFormChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
      index: number
    ) => {
      const data = [...formFields]
      const { value } = event.target
      if (value === "color") {
        setSelectedColors([
          ...selectedColors.slice(0, index),
          value,
          ...selectedColors.slice(index + 1),
        ])
      }

      const isValidHex = /^#([A-Fa-f0-9]{3}){1,2}$/.test(value)
      if (isValidHex) {
        data[index]["color"] = value
      }

      data[index][event.target.name] = value
      setFormFields(data)
    },
    [formFields]
  )

  const submit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent
  ): void => {
    e.preventDefault()
    console.log("download data")
  }
  const addFields = () => {
    const object = {
      attr: "pop_sex_code_1",
      value: "0",
      color: "#ffffff",
      operator: ">=",
    }
    setFormFields([...formFields, object])
    setSelectedColors([...selectedColors, "#ffffff"])
  }
  const removeFields = (index: number) => {
    const data = [...formFields]
    data.splice(index, 1)
    setFormFields(data)
    setSelectedColors([
      ...selectedColors.slice(0, index),
      ...selectedColors.slice(index + 1),
    ])
  }

  const removeAllCondition = () => {
    console.log("remove all condition")
    setFormFields(initialFormFields)
    setSelectedColors(initialFormFields.map((field) => field.color))
  }

  const applyAllCondition = () => {
    console.log("apply all condition")
    console.log(formFields)
  }

  useEffect(() => {
    onResize?.()
  }, [onResize, handleFormChange])
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
              <SelectAtt
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
              </SelectAtt>
              <SelectOpe
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
              </SelectOpe>
              <InputVal
                name="value"
                placeholder="Value"
                onChange={(event) => handleFormChange(event, index)}
                value={form.value}
              />
              <InputCol
                type="color"
                name={`color-${index}`}
                value={form.color}
                onChange={(event) => {
                  handleFormChange(event, index)
                  handleColorChange(event, index)
                }}
              />
              <InputHex
                key={`input-hex-${index}`}
                type="text"
                name={`hex-${index}`}
                value={selectedColors[index]}
                onChange={(event) => handleColorChange(event, index)}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault()
                    handleColorChange(event, index)
                    handleFormChange(event, index)
                  }
                }}
              />
              <Button
                onClick={() => removeFields(index)}
                icon="trash"
                buttonStyle="secondary"
              ></Button>
            </CardSettings>
          )
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
        <Button text="Remove all" width={128} onClick={removeAllCondition} />
        <Button text="Apply all" width={128} onClick={applyAllCondition} />
      </Line>

      <br />
      <Button text="Download" icon="sun" extendWidth onClick={submit} />
    </Wrapper>
  )
}
const EmptyTip = styled.div`
  color: #8c8c8c;
  text-align: center;
`
const CardSettings = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  max-width: 100%;
  margin-bottom: 8px;
  & > * {
    flex: 1;
    max-width: calc(40% - 8px); /* subtract gap between inputs */
  }
`
const Wrapper = styled.div`
  max-width: 100%;
`

const SelectAtt = styled.select`
  display: flex;
  height: 30px;
  padding: 0 4px;
  margin: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  font-size: 12px;
  color: #333;
  background-color: #fff;
`

const SelectOpe = styled.select`
  display: flex;
  width: 40px;
  height: 30px;
  padding: 0 2px;
  margin: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  font-size: 12px;
  color: #333;
  background-color: #fff;
`

const InputVal = styled.input`
  height: 30px;
  border: none;
  padding: 0 4px !important;
  border: 1px solid #ccc;
  outline: none;
  padding: 0;
  margin: 0;
  border-radius: 4px;
  font-size: 12px;
`

const InputCol = styled.input`
  width: 10px;

  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  margin-top: -11px;
  border-radius: 4px;
  &::-webkit-color-swatch-wrapper {
    border-radius: 4px;
  }
  &::-webkit-color-swatch {
    border-radius: 4px;
    height: 28px;
    border: 1px solid #ccc;
  }
`

const InputHex = styled.input`
  display: flex;
  width: 40px;
  height: 30px;
  padding: 0 4px;
  margin: 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  font-size: 12px;
  color: #333;
  background-color: #fff;
`

export default PanelOne
