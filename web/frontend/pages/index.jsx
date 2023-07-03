import { Icon, Layout } from "@shopify/polaris";
import React, { useState } from "react";
import { FormsMajor } from "@shopify/polaris-icons";
import Dashboard from "./dashboard";
import Reports from "./reports";
import Customization from "./customization";
import Installation from "./installation";
import Settings from "./settings";
import "../assets/style.css";

const HomePage = () => {
  const [activeButton, setActiveButton] = useState(0);

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  return (
    <div className="dr-page">
      <div className="dr-navigation">
        <div
          className={`dr-icon-with-text-navigation dashbaord ${
            activeButton === 0 ? "active" : ""
          }`}
          onClick={() => handleButtonClick(0)}
        >
          <div className="dr-navigation-icon">
            <Icon source={FormsMajor} color="000" />
          </div>
          <h2 className="dr-navigation-heading">Dashboard</h2>
        </div>
        <div
          className={`dr-icon-with-text-navigation reports ${
            activeButton === 1 ? "active" : ""
          }`}
          onClick={() => handleButtonClick(1)}
        >
          <div className="dr-navigation-icon">
            <Icon source={FormsMajor} color="base" />
          </div>
          <h2 className="dr-navigation-heading">Reports</h2>
        </div>
        <div
          className={`dr-icon-with-text-navigation customization ${
            activeButton === 2 ? "active" : ""
          }`}
          onClick={() => handleButtonClick(2)}
        >
          <div className="dr-navigation-icon">
            <Icon source={FormsMajor} color="base" />
          </div>
          <h2 className="dr-navigation-heading">Customization</h2>
        </div>
        <div
          className={`dr-icon-with-text-navigation installation ${
            activeButton === 3 ? "active" : ""
          }`}
          onClick={() => handleButtonClick(3)}
        >
          <div className="dr-navigation-icon">
            <Icon source={FormsMajor} color="base" />
          </div>
          <h2 className="dr-navigation-heading">Installation</h2>
        </div>
        <div
          className={`dr-icon-with-text-navigation settings ${
            activeButton === 4 ? "active" : ""
          }`}
          onClick={() => handleButtonClick(4)}
        >
          <div className="dr-navigation-icon">
            <Icon source={FormsMajor} color="base" />
          </div>
          <h2 className="dr-navigation-heading">Settings</h2>
        </div>
      </div>
      {activeButton === 0 && <Dashboard />}
      {activeButton === 1 && <Reports />}
      {activeButton === 2 && <Customization />}
      {activeButton === 3 && <Installation />}
      {activeButton === 4 && <Settings />}
    </div>
  );
};

export default HomePage;

// import {
//   Card,
//   Page,
//   Layout,
//   TextContainer,
//   Image,
//   Stack,
//   Link,
//   Heading,
// } from "@shopify/polaris";
// import { TitleBar } from "@shopify/app-bridge-react";
// import "../assets/style.css"
// import { trophyImage } from "../assets";

// import { ProductsCard } from "../components";

// export default function HomePage() {
//   return (
//     <Page narrowWidth>
//       <TitleBar title="App name" primaryAction={null} />
//       <Layout>
//         <Layout.Section>
//           <Card sectioned>
//             <Stack
//               wrap={false}
//               spacing="extraTight"
//               distribution="trailing"
//               alignment="center"
//             >
//               <Stack.Item fill>
//                 <TextContainer spacing="loose">
//                   <Heading>Nice work on building a Shopify app 🎉</Heading>
//                   <p>
//                     Your app is ready to explore! It contains everything you
//                     need to get started including the{" "}
//                     <Link url="https://polaris.shopify.com/" external>
//                       Polaris design system
//                     </Link>
//                     ,{" "}
//                     <Link url="https://shopify.dev/api/admin-graphql" external>
//                       Shopify Admin API
//                     </Link>
//                     , and{" "}
//                     <Link
//                       url="https://shopify.dev/apps/tools/app-bridge"
//                       external
//                     >
//                       App Bridge
//                     </Link>{" "}
//                     UI library and components.
//                   </p>
//                   <p>
//                     Ready to go? Start populating your app with some sample
//                     products to view and test in your store.{" "}
//                   </p>
//                   <p>
//                     Learn more about building out your app in{" "}
//                     <Link
//                       url="https://shopify.dev/apps/getting-started/add-functionality"
//                       external
//                     >
//                       this Shopify tutorial
//                     </Link>{" "}
//                     📚{" "}
//                   </p>
//                 </TextContainer>
//               </Stack.Item>
//               <Stack.Item>
//                 <div style={{ padding: "0 20px" }}>
//                   <Image
//                     source={trophyImage}
//                     alt="Nice work on building a Shopify app"
//                     width={120}
//                   />
//                 </div>
//               </Stack.Item>
//             </Stack>
//           </Card>
//         </Layout.Section>
//         <Layout.Section>
//           <ProductsCard />
//         </Layout.Section>
//       </Layout>
//     </Page>
//   );
// }
