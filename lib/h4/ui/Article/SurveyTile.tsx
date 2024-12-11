import { VStack, HStack, Icon, Box, Text, Image } from "@chakra-ui/react";
import { MdSchedule, MdOutlineFeed } from "react-icons/md";

export const SurveyTile = () => {
  return (
    <VStack
      w="297px"
      p={3}
      border={"1px solid red"}
      borderRadius="12px"
      gap="3px"
      justifyItems="flex-start"
    >
      <Box w="273px">
        <Image
          alt=""
          height={"146px"}
          w="full"
          borderRadius="6px"
          src="https://fastly.picsum.photos/id/984/536/354.jpg?hmac=V1ZEeb4s8heIcZUiO6U-IFKBAqv_jxEtzCV1pBVi8RE"
        />
      </Box>
      {/* Title of the news */}
      <VStack w="full" gap="0">
        <Text
          color="#BD4B4D"
          fontSize={"17px"}
          fontWeight="700"
          lineHeight={"24px"}
          w="full"
        >
          NURA төвийн шинжилгээ
        </Text>
        <Text
          w="full"
          maxH={"80px"}
          overflow="hidden"
          fontSize={"14px"}
          fontWeight="500"
          lineHeight={"16px"}
          color="#454545"
        >
          Хиймэл оюун ухаанд суурилсан NURA төвийн шинжилгээгээр хавдрын
          сэжигтэй болон бусад эмгэг өөрчлөлттэй 689 тохиолдол илэрчээ Хиймэл
          оюун ухаанд суурилсан NURA төвийн шинжилгээгээр хавдрын сэжигтэй болон
          бусад эмгэг өөрчлөлттэй 689 тохиолдол илэрчээ Хиймэл оюун ухаанд
          суурилсан NURA төвийн шинжилгээгээр хавдрын сэжигтэй болон бусад эмгэг
          өөрчлөлттэй 689 тохиолдол илэрчээ Хиймэл оюун ухаанд суурилсан NURA
          төвийн шинжилгээгээр хавдрын сэжигтэй болон бусад эмгэг өөрчлөлттэй
          689 тохиолдол илэрчээ Хиймэл оюун ухаанд суурилсан NURA төвийн
          шинжилгээгээр хавдрын сэжигтэй болон бусад эмгэг өөрчлөлттэй 689
          тохиолдол илэрчээ
        </Text>
      </VStack>
      <HStack
        justifyContent={"space-between"}
        fontSize="11px"
        fontWeight={600}
        w="full"
        lineHeight={"12px"}
      >
        <HStack gap={0} w="full" color="#61646B">
          <Icon as={MdSchedule} mt={"-3px"} />
          <Text marginInlineStart={"4px !important"} justifyContent="center">
            2024.03.23
          </Text>
        </HStack>
        <HStack gap={0} color="#734BBD">
          <Text justifyContent="center">Судалгаа</Text>

          <Icon
            as={MdOutlineFeed}
            mt={"-20px"}
            marginInlineStart={"4px !important"}
          />
        </HStack>
      </HStack>
    </VStack>
  );
};
