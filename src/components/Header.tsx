import { Button, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { HeaderContent } from "./HeaderContent";

export function Header({ children }: any) {
  return (
    <div>
      <Layout className="body">
        <HeaderContent />
        <Content>{children}</Content>
      </Layout>
    </div>
  );
}

export default Header;
