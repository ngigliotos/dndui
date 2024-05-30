import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { HeaderContent } from "./HeaderContent";
import TitleBar from "./TitleBar";

export function Header({ children }: any) {
  return (
    <div>
      <Layout className="body">
        <TitleBar></TitleBar>
        <HeaderContent />
        <Content>{children}</Content>
      </Layout>
    </div>
  );
}

export default Header;
