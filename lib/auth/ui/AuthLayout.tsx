import { AppFooter } from "@ui/components/AppFooter";
import { AppHeader } from "@ui/components/AppHeader";
import { Box, Card, Icon, SEO, Text, useColorModeValue } from "@ui/index";
import Trans from "next-translate/Trans";
import useTranslation from "next-translate/useTranslation";
import { ReactNode } from "react";
import { IoArrowBack } from "react-icons/io5";

export const AuthLayout = ({
  title,
  caption = "",
  actions,
  contentWidth,
  children,
}: {
  title: string;
  caption: string;
  actions?: ReactNode;
  contentWidth: string;
  children: ReactNode;
}) => {
  const { t: ta } = useTranslation("auth");

  return (
    <>
      <SEO title={title} />
      <Box as="main" display="flex" px="6" bg={"#f4f6fa"}>
        <Box w="full" mx="auto">
          <Text
            mt="12"
            mb="4"
            //mx={{ base: 6, md: 0 }}
            textAlign="center"
            color={useColorModeValue("gray.50", "gray.400")}
            fontSize="22px"
            fontWeight="bold"
            lineHeight={1.212}
          >
            {caption}
          </Text>
          <Card
            w="full"
            maxW={contentWidth}
            px={{ base: 6, md: 12 }}
            py={{ base: 6, md: 12 }}
            mx="auto"
            pos="relative"
            borderRadius="16px"
          >
            {children}
            {actions ? (
              <Box w="full" pt="8" textAlign="right">
                {actions}
              </Box>
            ) : (
              <></>
            )}
          </Card>
        </Box>
      </Box>
    </>
  );
};
