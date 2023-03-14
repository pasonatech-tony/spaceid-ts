import styled from "@emotion/styled";
import Icon from "@web/components/atoms/Icon";
import React, { useState } from "react";

interface TabProps {
  title?: string;
  icon?: string;
  children: React.ReactNode;
}

const TabWrapper: React.FC<TabProps> = ({ children }) => {
  const tabs = children
    ? React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return null;
        }
        const { title, icon } = child.props;
        return { title, icon, content: child.props.children };
      }) ?? []
    : [];

  const [activeTab, setActiveTab] = useState(tabs[0].title);

  const handleTabClick = (title: string) => {
    if (activeTab !== title) {
      setActiveTab(title);
    }
  };

  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {tabs.map(({ title, icon }) => (
          <button
            key={title}
            style={{
              backgroundColor: activeTab === title ? "lightgrey" : "#ffffff",
              padding: "10px",
              border: "none",
              outline: "none",
              width: "50%",
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              alignItems: "center",
            }}
            onClick={() => handleTabClick(title)}
          >
            {icon && <Icon icon={icon} size={20} />}
            {title}
          </button>
        ))}
      </div>
      {tabs.map(({ title, content }) =>
        activeTab === title ? (
          <ContentTab key={title}>{content}</ContentTab>
        ) : null
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Tab: React.FC<TabProps> = ({ children }) => {
  return <>{children}</>;
};

const ContentTab = styled.div`
  width: 100%;
  padding: 12px 12px 12px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 12px;
  background-color: #f5f5f5;
`;

export { Tab, TabWrapper };
