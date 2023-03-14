import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Icon from "@web/components/atoms/Icon";
import React, { useRef } from "react";

type Props = {
  text: string;
  icon?: string;
  buttonStyle?: "primary" | "secondary";
  status?: string;
  disabled?: boolean;
  width?: number;
  extendWidth?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  parentChannel: (msg: File | undefined) => void;
};

const FileInput: React.FC<Props> = ({
  text,
  icon,
  buttonStyle = "primary",
  status,
  width,
  disabled = false,
  extendWidth = false,
  onChange,
  parentChannel,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.click();
    }
  };

  // const handleChange = () => {
  //   console.log("handleChange");
  // };

  return (
    <StyledFileInput
      buttonStyle={buttonStyle}
      status={status ?? ""}
      disabled={disabled}
      width={width}
      extendWidth={extendWidth}
      onClick={handleClick}
      onChange={onChange}
    >
      {icon && (
        <IconArea>
          <Icon icon={icon} size={16} />
        </IconArea>
      )}
      <TextWrapper>{text}</TextWrapper>
      <input
        ref={inputRef}
        type="file"
        style={{ display: "none" }}
        onChange={(e) =>
          parentChannel(e.target.files ? e.target.files[0] : undefined)
        }
      />
    </StyledFileInput>
  );
};

const StyledFileInput = styled.div<{
  buttonStyle: string;
  status: string;
  disabled: boolean;
  width?: number;
  extendWidth: boolean;
}>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 2px 8px;
  width: ${(props) =>
    props.extendWidth ? "100%" : props.width ? `${props.width}px` : "auto"};
  height: 30px;
  border-radius: 4px;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  outline: none;
  pointer-events: ${({ disabled }) => (disabled ? "none" : "all")};
  transition: all 0.1s ease-out;
  border: 1px solid ${(props) => props.theme.colors.primary};
  cursor: pointer;
  user-select: none;

  ${(props) => {
    if (props.buttonStyle === "secondary") {
      return css`
        background: none;
        color: ${props.theme.colors.primary};
        border-color: ${props.theme.colors.primary};
      `;
    } else {
      // primary
      return css`
        background: ${props.theme.colors.primary};
        color: ${props.theme.fontColors.primary};
        border-color: ${props.theme.colors.primary};
      `;
    }
  }};

  ${(props) => {
    if (props.status === "on") {
      return css`
        background: ${props.theme.colors.primary};
        color: ${props.theme.fontColors.primary};
        border-color: ${props.theme.colors.primary};
      `;
    }
  }};

  ${(props) => {
    if (props.disabled) {
      return css`
        background: none;
        color: ${props.theme.colors.disabled};
        border-color: ${props.theme.colors.disabled};
      `;
      // if (props.buttonStyle === "secondary") {
      //   return css`
      //     background: none;
      //     color: ${props.theme.colors.disabled};
      //     border-color: ${props.theme.colors.disabled};
      //   `;
      // } else {
      //   return css`
      //     background: ${props.theme.colors.disabled};
      //     color: ${props.theme.fontColors.disabled};
      //     border-color: ${props.theme.colors.disabled};
      //   `;
      // }
    }
  }};

  @media (any-hover: hover) {
    &:hover {
      ${(props) => {
        if (props.buttonStyle === "secondary") {
          return css`
            background: ${props.theme.colors.primary};
            color: ${props.theme.fontColors.primary};
            border-color: ${props.theme.colors.primary};
          `;
        } else {
          // primary
          return css`
            background: ${props.theme.colors.primary};
            color: ${props.theme.fontColors.primary};
            border-color: ${props.theme.colors.primary};
            &::before {
              content: "";
              display: block;
              position: absolute;
              width: 100%;
              height: 100%;
              background: ${props.theme.name === "light"
                ? "rgba(255,255,255,.05)"
                : "rgba(255,255,255,.05)"};
            }
          `;
        }
      }};
    }
  }
`;

const TextWrapper = styled.div`
  position: relative;
  z-index: 2;
`;

const IconArea = styled.div`
  display: flex;
  align-items: center;
  margin-right: 5px;
`;

export default FileInput;
