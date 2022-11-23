import { Box, Spinner } from "@chakra-ui/react";

export default function Loader() {
  return (
    <>
      <Box
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Spinner
          display="flex"
          thickness="5px"
          speed="0.65s"
          emptyColor="gray.200"
          color="#2e8c81"
          size="xl"
          marginX="auto"
        />
      </Box>
    </>
  );
}
