import {
  CloseOutlined,
  MinusOutlined,
  MinusSquareOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { Button, Modal, Typography } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCharacters, selectInitialCharacters } from "../store/Characters";

export function TitleBar() {
  const { ipcRenderer } = window.require("electron");

  const [isFocused, setIsFocused] = useState(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [quitWithoutSaving, setQuitWithoutSaving] = useState<boolean>(false);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);

  const characters = useSelector(selectCharacters);
  const initialCharacters = useSelector(selectInitialCharacters);

  ipcRenderer.on("unFocused", (e: any) => {
    setIsFocused(false);
  });

  ipcRenderer.on("focused", (e: any) => {
    setIsFocused(true);
  });

  useEffect(() => {
    const handleUnload = (e: BeforeUnloadEvent) => {
      if (
        !quitWithoutSaving &&
        JSON.stringify(characters) !== JSON.stringify(initialCharacters)
      ) {
        e.preventDefault();
        setShowModal(true);
        return;
      }
    };
    window.addEventListener("beforeunload", handleUnload);

    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [initialCharacters, characters, quitWithoutSaving]);

  //Tried doing ternary class setting with isFocused but that led to a lag
  //of the button changing vs the bar changing that I couldnt figure out how
  //to fix. So I did this instead
  return (
    <div>
      <Modal
        width={"600px"}
        title={`You have unsaved character changes! Are you sure you want to leave?`}
        okText={<Typography.Text>Yes</Typography.Text>}
        cancelText={<Typography.Text>No</Typography.Text>}
        open={showModal}
        onCancel={(e) => setShowModal(false)}
        onOk={(e) => {
          setQuitWithoutSaving(true);
          ipcRenderer.invoke("close-event");
        }}
        footer={[
          <Button
            onClick={(e) => {
              setQuitWithoutSaving(true);
              ipcRenderer.invoke("close-event");
              setShowModal(false);
            }}
          >
            Close app
          </Button>,
          <Button
            onClick={(e) => {
              setQuitWithoutSaving(true);
              ipcRenderer.invoke("refresh-event");
              setShowModal(false);
            }}
          >
            Reload app
          </Button>,
          <Button
            onClick={(e) => {
              setShowModal(false);
            }}
          >
            Go back
          </Button>,
        ]}
      ></Modal>

      <div className={isFocused ? "title-bar-in-focus" : "title-bar"}>
        <Button
          className={
            isFocused ? "title-bar-button-in-focus" : "title-bar-button"
          }
          icon={<MinusOutlined />}
          onClick={(e) => {
            ipcRenderer.invoke("minimize-event");
          }}
        ></Button>

        <Button
          className={
            isFocused ? "title-bar-button-in-focus" : "title-bar-button"
          }
          icon={isMaximized ? <MinusSquareOutlined /> : <PlusSquareOutlined />}
          onClick={(e) => {
            setIsMaximized(ipcRenderer.sendSync("maximize-event"));
          }}
        ></Button>
        <Button
          className={
            isFocused ? "title-bar-button-x-in-focus" : "title-bar-button-x"
          }
          icon={<CloseOutlined />}
          onClick={(e) => {
            window.close();
          }}
        ></Button>
      </div>
    </div>
  );
}

export default TitleBar;
