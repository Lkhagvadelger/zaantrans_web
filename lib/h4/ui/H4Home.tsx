import {
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdChevronRight, MdOutlineFeed, MdSchedule } from "react-icons/md";
import { SurveyTile } from "./Article/SurveyTile";
import { H4AppNavigationKey } from "./H4AppLayout";

export const H4Home = ({
  onNavChange,
}: {
  onNavChange?: (nav: H4AppNavigationKey) => void;
}) => {
  return (
    <Box p={4}>
      <VStack gap={"22px"}>
        {/* Date Categories */}
        <HStack px={3} gap={"10px"}>
          <Button>Өнөөдөр</Button>
          <Button>Энэ 7 хоногт</Button>
          <Button>Бүгд</Button>
        </HStack>
        {/* Pinned survey */}
        <Box w="full">
          <Box p={3}>
            <HStack justifyContent={"space-between"}>
              <Text> Судалгаа</Text>
              <Icon as={MdChevronRight} />
            </HStack>
            <Box>
              <Text>
                Энэ цэсэнд хэрэглэгчээс авах судалгатай холбоотой бүхий л
                мэдээлэл багтсан байна.
              </Text>
            </Box>
          </Box>
          <Box overflowX={"scroll"}>
            <HStack gap={1}>
              <SurveyTile />
              <SurveyTile />
            </HStack>
          </Box>
        </Box>
        {/* Categoriez article */}
        <Box></Box>
      </VStack>
    </Box>
  );
};
