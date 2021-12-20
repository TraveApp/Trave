import React from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import type { ThemeBase } from "../../themes";

export default function Search({ navigation }: any) {
  const scheme = useColorScheme();
  return (
    <Main>
      <PageHeader>
        <PageTitle>Find a </PageTitle>
        <PageTitleAccentColor>train</PageTitleAccentColor>
      </PageHeader>
      <Options>
        <TouchableOpacity>
          <OptionBody>
            <OptionTitle>From</OptionTitle>
            <OptionContent>Gdańsk Rotmanka</OptionContent>
          </OptionBody>
        </TouchableOpacity>
        <OptionsDivider />
        <TouchableOpacity>
          <OptionBody>
            <OptionTitle>To</OptionTitle>
            <OptionContent>Pruszcz Oliwa</OptionContent>
          </OptionBody>
        </TouchableOpacity>
        <OptionSmall activeOpacity={1}>
          <CurrentLocal>
            <Ionicons
              name="ios-swap-horizontal"
              size={24}
              color={scheme === "light" ? "#FFF" : "#000"}
            />
          </CurrentLocal>
        </OptionSmall>
      </Options>
      <SearchBtn
        activeOpacity={0.7}
        onPress={() => navigation.navigate("Home")}
      >
        <SearchBtnText>Search</SearchBtnText>
      </SearchBtn>
    </Main>
  );
}

const Main = styled(SafeAreaView)`
  flex: 1;
`;

const PageHeader = styled.View`
  margin-top: 30px;
  margin-left: 30px;
  flex-direction: row;
`;

const PageTitle = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: ${({ theme }: { theme: ThemeBase }) => theme.colors.text};
`;

const PageTitleAccentColor = styled(PageTitle)`
  color: ${({ theme }: { theme: ThemeBase }) => theme.colors.primary};
`;

const Options = styled.View`
  height: 160px;
  margin: 20px 30px;
  background: ${({ theme }: { theme: ThemeBase }) => theme.colors.card};
  border-radius: 20px;
`;

const OptionsDivider = styled.View`
  position: absolute;
  top: 80px;
  left: 25px;
  right: 25px;
  height: 2px;
  opacity: 0.05;
  background: ${({ theme }: { theme: ThemeBase }) => theme.colors.text};
`;

const OptionSmall = styled.TouchableOpacity`
  position: absolute;
  right: 0px;
  top: 40px;
  bottom: 40px;
  width: 80px;
  align-items: center;
  justify-content: center;
`;

const CurrentLocal = styled.View`
  height: 40px;
  width: 40px;
  border-radius: 12.5px;
  background: ${({ theme }: { theme: ThemeBase }) => theme.colors.primary};
  align-items: center;
  justify-content: center;
`;

const OptionBody = styled.View`
  height: 80px;
  justify-content: center;
`;

const OptionTitle = styled.Text`
  opacity: 0.5;
  font-weight: 500;
  margin-left: 25px;
  color: ${({ theme }: { theme: ThemeBase }) => theme.colors.text};
`;

const OptionContent = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin-left: 25px;
  color: ${({ theme }: { theme: ThemeBase }) => theme.colors.text};
`;

const SearchBtn = styled.TouchableOpacity`
  height: 60px;
  margin: 0px 30px;
  background: ${({ theme }: { theme: ThemeBase }) => theme.colors.card};
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

const SearchBtnText = styled.Text`
  font-weight: 600;
  font-size: 18px;
  color: ${({ theme }: { theme: ThemeBase }) => theme.colors.primary};
`;
