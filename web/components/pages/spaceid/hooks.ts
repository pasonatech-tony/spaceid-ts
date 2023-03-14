import { postMsg } from "@web/utils/common";
import { useState, useCallback } from "react";

export type Label = {
  id: string;
  value: string;
};

export default () => {
  const [isSidebarShown, setSidebarShown] = useState(true);

  const hideSidebar = useCallback(() => {
    setSidebarShown(false);
    setTimeout(() => {
      postMsg("setSidebarShown", false);
    }, 250);
  }, []);

  const showSidebar = useCallback(() => {
    postMsg("setSidebarShown", true);
    setTimeout(() => {
      setSidebarShown(true);
    }, 100);
  }, []);

  const [labelList, setLabelList] = useState<Label[]>([]);

  const addLabel = useCallback((label: Label) => {
    setLabelList((list) => [...list, label]);
  }, []);

  const updateLabel = useCallback((id: string, labeling: string) => {
    postMsg("updateLabel", { id, labeling });
  }, []);

  const removeLabel = useCallback((id: string, value: string) => {
    setLabelList((list) => list.filter((a) => a.id !== id));
    postMsg("removeLabel", value);
  }, []);

  return {
    isSidebarShown,
    hideSidebar,
    showSidebar,
    labelList,
    updateLabel,
    removeLabel,
    addLabel,
  };
};
