import { Stack, Text } from "@fluentui/react";

const BasePage: React.FC<{
  children: React.ReactNode;
  pageTitle: string;
}> = ({ children, pageTitle }) => {
  return (
    <Stack
      styles={{
        root: {
          overflowY: "auto",
          paddingTop: 20,
          paddingLeft: 10,
          paddingRight: 10,
          position: "absolute",
          top: 60,
          bottom: 41,
          width: "100%",
        },
      }}
      tokens={{ childrenGap: 10 }}
    >
      <Text variant="xxLargePlus" styles={{ root: { textAlign: "center" } }}>
        {pageTitle}
      </Text>
      <Stack
        styles={{
          root: {
            overflowY: "auto",
          },
        }}
      >
        {children}
      </Stack>
    </Stack>
  );
};

export default BasePage;
