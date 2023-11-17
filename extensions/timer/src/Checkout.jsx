



import React, { useEffect, useState } from "react";
import { reactExtension, Banner, Text, useSettings, View ,Grid,Image} from "@shopify/ui-extensions-react/checkout";
// Set the entry points for the extension
const checkoutBlock = reactExtension("purchase.checkout.block.render", () => <Extension />);
export { checkoutBlock };


function Extension() {
  const countdownTime = 8;
  const initialTime = countdownTime * 60;
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(interval);
          setIsTimeUp(true);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <>
      {!isTimeUp && (
        <View padding= 'base' border='base'  borderWidth='base' borderRadius='loose'>
          <Grid  spacing='base'  columns={['5%', 'auto']} >
          <Image inlineAlignment="center" Alignment="center" source="https://cdn.shopify.com/s/files/1/0550/5164/9153/files/clock.png?v=1699958461" />
          <Text size="large">
            Hurry! Your orders will be reversed in {minutes}m {seconds}s
          </Text>
          </Grid>
          
        </View>
      )}
    </>
  );
}
