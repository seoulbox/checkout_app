import React, { useEffect, useState } from "react";
import {
  reactExtension,
  Divider,
  Image,
  Banner,
  Heading,
  Button,
  InlineLayout,
  BlockStack,
  Text,
  SkeletonText,
  SkeletonImage,
  useCartLines,
  View,
  useApplyCartLinesChange,
  useApi,
} from "@shopify/ui-extensions-react/checkout";
// Set up the entry point for the extension
export default reactExtension("purchase.checkout.block.render", () => <App />);




const VariantId = "gid://shopify/ProductVariant/40764315533354";



function App() {
  const { query, i18n } = useApi();
  const applyCartLinesChange = useApplyCartLinesChange();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [showError, setShowError] = useState(false);
  const lines = useCartLines();

   const [VariantData, setVariant] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);



  useEffect(() => {





    
    if (showError) {
      const timer = setTimeout(() => setShowError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

    async function handleAddToCart(variantId) {
      setAdding(true);
      const result = await applyCartLinesChange({
        type: 'addCartLine',
        merchandiseId: variantId,
        quantity: 1,
      });
      setAdding(false);
      if (result.type === 'error') {
        setShowError(true);
        console.error(result.message);
      }
    }

  async function fetchProducts() {
    setLoading(true);
    try {
      // const { data } = await query(
      //   `query ($productId: ID!) {
      //     node(id: $productId) {
      //       ... on ProductVariant {
      //         id
      //         title
      //         price {
      //           amount
      //           currencyCode
      //         }
      //         product {
      //           id
      //           title
      //           description
      //           images(first: 1) {
      //             nodes {
      //               url
      //             }
      //           }
      //         }
               
      //       }
      //     } 
      //   }`,
      //   {
      //     variables: { productId: 'gid://shopify/ProductVariant/40737360740394' },
      //   }
      // );
      


      const { data } = await query(
        `query ($first: Int!) {
          products(first: $first) {
            nodes {
              id
              title
              description
              images(first:1){
                nodes {
                  url
                }
              }
              variants(first: 1) {
                nodes {
                  id
                  price {
                    amount
                  }
                }
              }
            }
          }
        }`,
        {
          variables: { first: 5 },
        }
      );
      setProducts(data.products.nodes);



console.log(data); 
console.log("Hellooo");
// setProducts([data.node.product]);

    //  setProducts(data.nodes.product);
      console.log(data.node.product);
      console.log("Hellooo2");
    } catch (error) {
      console.error(error);
    } finally { 
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (!loading && products.length === 0) {
    return null;
  }

  const productsOnOffer = getProductsOnOffer(lines, products);

  if (!productsOnOffer.length) {
    return null;
  }

  return (
    <ProductOffer
      product={productsOnOffer[0]}
      i18n={i18n}
      adding={adding}
      handleAddToCart={handleAddToCart}
      showError={showError}
    />
  );
}

function LoadingSkeleton() {
  return (
    <BlockStack spacing='loose'>
      <Divider />
      <Heading level={2}>You might also like</Heading>
      <BlockStack spacing='loose'>
        <InlineLayout
          spacing='base'
          columns={[64, 'fill', 'auto']}
          
          
        >
          <SkeletonImage aspectRatio={0} />
          <BlockStack spacing='none'>
            <SkeletonText inlineSize='large' />
            <SkeletonText inlineSize='small' />
          </BlockStack>
          <Button kind='secondary' disabled={true}>
            Add
          </Button>
        </InlineLayout>
      </BlockStack>
    </BlockStack>
  );
}

function getProductsOnOffer(lines, products) {

  
  const cartLineProductVariantIds = lines.map((item) => item.merchandise.id);
  console.log(cartLineProductVariantIds);
  return products.filter((product) => {
    const isProductVariantInCart = product.variants.nodes.some(({ id }) =>
      cartLineProductVariantIds.includes(id)
      
    );
    return !isProductVariantInCart;
    
  });
  
}

function ProductOffer({ product, i18n, adding, handleAddToCart, showError }) {
  const { images, title,description, variants } = product;
  const renderPrice = i18n.formatCurrency(variants.nodes[0].price.amount);
  const imageUrl =
    images.nodes[0]?.url ??
    'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_medium.png?format=webp&v=1530129081';

  return (
    <View border="base" padding="base">
    <BlockStack spacing='loose' >
      {/* <Divider /> */}
      {/* <Heading level={2}>You might also like</Heading> */}
      <Button
            kind='primary'
            loading={adding}
            accessibilityLabel={`Add ${title} to cart`}
            onPress={() => handleAddToCart(variants.nodes[0].id)}
          >
            YES! Add Mystery Box to my order {renderPrice}
          </Button>
      <BlockStack spacing='loose'>
        <InlineLayout
          spacing='base'
          columns={[100, 'auto']}
          blockAlignment='start'
        >
          <Image
            
            source={imageUrl}
            description={title}
            aspectRatio={1}
          />
          <BlockStack spacing='base'>
            <Heading level={3} size='medium' emphasis='strong'>
              {title}
            </Heading>
            <Text size='medium' spacing='base' emphasis='strong' marginBottom='20'>
              {description}
            </Text>
            <Text appearance='subdued'> </Text>
            
          </BlockStack>
         
        </InlineLayout>
      </BlockStack>
      {showError && <ErrorBanner />}
    </BlockStack>
    </View>
  );
}

function ErrorBanner() {
  return (
    <Banner status='critical'>
      There was an issue adding this product. Please try again.
    </Banner>
  );
}
