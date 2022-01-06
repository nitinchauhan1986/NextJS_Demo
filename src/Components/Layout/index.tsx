import * as React from "react";

import { LayoutProps } from "./Layout";

const Layout: React.FunctionComponent<LayoutProps> = ({
    children,
}): JSX.Element => {
    return <div className="layout">{children} Hello ABCZ</div>;
};

export { Layout };
