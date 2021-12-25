import React from "react";
import styled from "styled-components/native";
import { ThemeBase } from "../../themes";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TrainCard from "./TrainCard";

export default function SearchResults({ navigation: { goBack } }: any) {
  const scheme = useColorScheme();
  return (
    <Main>
      <SafeAreaView edges={["top"]}>
        <NavBar>
          <NavBarBtn onPress={() => goBack()}>
            <Ionicons
              name="chevron-back"
              size={24}
              color={scheme === "light" ? "#000" : "#FFF"}
            />
          </NavBarBtn>
          <NavBarDate>
            <NavBarDateDayTime>Thursday 23:54</NavBarDateDayTime>
            <NavBarDateYear>December 23, 2021</NavBarDateYear>
          </NavBarDate>
          <NavBarBtn onPress={() => console.log("bajojajo")}>
            <HeartCircleBackground />
            <HeartCircleIcon
              name="heart-circle"
              size={36}
              color={"rgb(255, 101, 132)"}
            />
          </NavBarBtn>
        </NavBar>
      </SafeAreaView>
      <Content>
        <TrainCard />
      </Content>
    </Main>
  );
}

const Main = styled.View`
  flex: 1;
  background: ${({ theme }: { theme: ThemeBase }) => theme.colors.card};
`;

const Content = styled.ScrollView`
  flex: 1;
  background: ${({ theme }: { theme: ThemeBase }) => theme.colors.background};
`;

const NavBar = styled.View`
  height: 80px;
  padding: 0 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }: { theme: ThemeBase }) => theme.colors.card};
  border-bottom-width: 1px;
  border-bottom-color: rgba(255, 255, 255, 0.05);
`;

const NavBarBtn = styled.TouchableOpacity`
  height: 44px;
  width: 44px;
  border-radius: 22px;
  justify-content: center;
  align-items: center;
  background: ${({ theme }: { theme: ThemeBase }) => theme.colors.foreground};
`;

const HeartCircleBackground = styled.View`
  position: relative;
  top: 18px;
  height: 24px;
  width: 24px;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 12px;
`;

const HeartCircleIcon = styled(MaterialCommunityIcons)`
  position: relative;
  top: -12px;
`;

// TODO: Clean this up ^

const NavBarDate = styled.View`
  width: 60%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const NavBarDateDayTime = styled.Text`
  font-weight: 500;
  font-size: 14px;
  padding-top: 5px;
  color: ${({ theme }: { theme: ThemeBase }) => theme.colors.text};
  opacity: 0.8;
`;

const NavBarDateYear = styled.Text`
  font-weight: 500;
  padding: 5px;
  color: ${({ theme }: { theme: ThemeBase }) => theme.colors.primary};
`;
