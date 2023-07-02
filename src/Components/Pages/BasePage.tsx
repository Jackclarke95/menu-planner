import { Stack, Text } from "@fluentui/react";

const BasePage: React.FC<{
  children: React.ReactNode;
  pageTitle: string;
  noPadding?: boolean;
}> = ({ children, pageTitle, noPadding = false }) => {
  return (
    <Stack
      styles={{
        root: {
          overflowY: "auto",
          padding: noPadding ? 0 : 20,
          paddingTop: noPadding ? 60 : 80,
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
