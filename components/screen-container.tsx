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

interface ScreenContainerProps extends React.ComponentProps<typeof ScrollView> {
  children?: React.ReactNode;
  vStackClassName?: string;
  stickyContentClassName?: string;
  stickyContent?: React.ReactNode;
  initialIndex?: number;
  tabScreens?: TabScreen[];
  tabBar?: (props: SceneRendererProps) => React.ReactNode;
}

const ScreenContainer = ({
  children,
  vStackClassName,
  className,
  stickyContent,
  stickyContentClassName,
  initialIndex = 0,
  tabScreens,
  refreshControl,
  tabBar,
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

  const renderHeader = () => {
    return (
      <VStack
        space="md"
        className={twMerge(
          stickyContentClassName,
          "bg-background-0 py-4 shadow-sm"
        )}
      >
        {stickyContent}
      </VStack>
    );
  };

  return (
    <>
      {tabScreens ? (
        <VStack
          className={twMerge("bg-background-0 flex-1", className)}
          {...rest}
        >
          {stickyContent && renderHeader()}
          {routes && renderScene && tabBar && (
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={{ width: layout.width }}
              renderTabBar={tabBar}
            />
          )}
        </VStack>
      ) : (
        <ScrollView
          className={twMerge("bg-background-0 flex-1", className)}
          stickyHeaderIndices={[0]}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          {...rest}
        >
          {stickyContent && renderHeader()}
          <VStack
            space="md"
            className={twMerge(vStackClassName, "bg-background-0 pb-4")}
          >
            {children}
          </VStack>
        </ScrollView>
      )}
    </>
  );
};

export default ScreenContainer;
