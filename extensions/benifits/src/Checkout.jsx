import {
  reactExtension,
  Banner,
  View,
  BlockStack,
  useSettings,
  Heading,
  Grid,
} from '@shopify/ui-extensions-react/checkout';

import React from "react";
import { Text, Image } from "@shopify/ui-extensions-react/checkout";
import { InlineLayout } from '@shopify/ui-extensions/checkout';


export default reactExtension(
  'purchase.checkout.block.render',
  () => <Extension />,
);

function CustomContentBlock() {
  const {
    heading = "Your Custom Heading",
    column1Image = "path-to-image-1.jpg",
    column1Text = "Text for Column 1",
    column2Image = "path-to-image-2.jpg",
    column2Text = "Text for Column 2",
    column3Image = "path-to-image-3.jpg",
    column3Text = "Text for Column 3",
  } = useSettings();





  return (
    <div style={{ border: "1px solid #e0e0e0", padding: "16px", marginBottom: "16px" }}>
      <Text size="medium" spacing="tight" emphasis="strong">
        {heading}
      </Text>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* <ColumnSettings image={column1Image} text={column1Text} />
        <ColumnSettings image={column2Image} text={column2Text} />
        <ColumnSettings image={column3Image} text={column3Text} /> */}
      </div>
    </div>
  );
}

function Extension() {

  const {
    heading = "Benifits",
  column1Image = "https://cdn.shopify.com/s/files/1/0550/5164/9153/files/korea.png?v=1691748412",
  column1Text = "18 AUTHENTIC KOREAN GOODIES",
  column2Image = "https://cdn.shopify.com/s/files/1/0550/5164/9153/files/face.png?v=1691748412",
  column2Text = "15000+ HAPPY CUSTOMERS",
  column3Image = "https://cdn.shopify.com/s/files/1/0550/5164/9153/files/gift.png?v=1691748412",
  column3Text = "MAKES A GREAT GIFT",} = useSettings();
  return (
    <>
      <View padding= 'base' border='base'  borderWidth='base' borderRadius='loose'>
        <View >
          <Heading inlineAlignment="center" level={1} spacing='base'>{heading}</Heading>
        </View>
      

      <BlockStack blockAlignment='center' inlineAlignment="center">
        <Grid  spacing='base'  columns={['fill', 'fill','fill']} blockAlignment='center' inlineAlignment="center">

        <View inlineAlignment="center"   >
            <View padding= 'base' ><Image inlineAlignment="center" Alignment="center" source={column1Image} /></View>
            <Heading  size='base' padding="base"  inlineAlignment="center">
              {column1Text}
            </Heading>
          </View>
          <View inlineAlignment="center"   >
            <View padding= 'base' ><Image inlineAlignment="center" Alignment="center" source={column2Image} /></View>
            <Heading  size='base' padding="base"  inlineAlignment="center">
              {column2Text}
            </Heading>
          </View>
          
          <View inlineAlignment="center"   >
            <View padding= 'base' ><Image inlineAlignment="center" Alignment="center" source={column3Image} /></View>
            <Heading  size='base' padding="base"  inlineAlignment="center">
              {column3Text}
            </Heading>
          </View>

        </Grid>
      </BlockStack>
      
      </View>
  
      
   </>
    
  
  );
}
