import React from "react";
import { VStack } from "@/components/ui/vstack";
import { ScrollView, useWindowDimensions } from "react-native";
import { twMerge } from "tailwind-merge";
import { TabView, SceneMap, SceneRendererProps } from "react-native-tab-view";

type TabScreen = {
  key: string;
  render: React.ReactNode;
  title: string;
};

interface ScreenContainerProps extends React.ComponentProps<typeof VStack> {
  children?: React.ReactNode;
  vStackClassName?: string;
  initialIndex?: number;
  tabScreens?: TabScreen[];
  tabBar?: (props: SceneRendererProps) => React.ReactNode;
}

const ScreenContainer = ({
  children,
  vStackClassName,
  className,
  initialIndex = 0,
  tabScreens,
  tabBar,
  space = "md",
  ...rest
}: ScreenContainerProps) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(initialIndex);

  const routes = tabScreens?.map((item) => ({
    key: item.key,
    title: item.title,
  }));

  const renderScene =
    tabScreens &&
    SceneMap(
      Object.fromEntries(
        tabScreens.map((item) => [
          item.key,
          () => (
            <ScrollView>
              <VStack
                space="md"
                className={twMerge(vStackClassName, "bg-background-0 pb-4")}
              >
                {item.render}
              </VStack>
            </ScrollView>
          ),
        ])
      )
    );

  return (
    <VStack
      className={twMerge(
        "bg-background-0 p-2 pb-0 shadow-sm flex-1",
        className
      )}
      space={space}
      {...rest}
    >
      {routes && renderScene && tabBar && (
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={tabBar}
        />
      )}
      {children}
    </VStack>
  );
};

export default ScreenContainer;
