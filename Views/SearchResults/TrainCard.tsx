import React from "react";
import styled from "styled-components/native";
import { ThemeBase } from "../../themes";
import { Platform, useColorScheme, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TrainCard() {
  const scheme = useColorScheme();
  return (
    <Main activeOpacity={0.7}>
      <Departure>Departure in: 4 hours, 6 minutes</Departure>
      <Stations>Pruszcz Gdański - Gdańsk Oliwa</Stations>
      <TimeContainer>
        <Time>06:21 - 06:43</Time>
        <Delay>+5 min</Delay>
      </TimeContainer>
      <Info>
        <Ionicons
          name="ios-timer-outline"
          size={18}
          color={scheme === "light" ? "#000" : "#FFF"}
        />
        <InfoText>22 minutes</InfoText>
        <Ionicons
          style={{ marginLeft: 20 }}
          name="ios-swap-horizontal-outline"
          size={18}
          color={scheme === "light" ? "#000" : "#FFF"}
        />
        <InfoText>0 changes</InfoText>
      </Info>
    </Main>
  );
}

const Main = styled.TouchableOpacity`
  background: ${({ theme }: { theme: ThemeBase }) => theme.colors.card};
  margin: 10px 20px;
  border-radius: 15px;
`;

const Departure = styled.Text`
  font-size: 14px;
  color: ${({ theme }: { theme: ThemeBase }) => theme.colors.text};
  opacity: 0.5;
  margin: 10px 15px;
`;

const Stations = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin: 0px 15px;
  color: ${({ theme }: { theme: ThemeBase }) => theme.colors.text};
`;

const TimeContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Time = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin: 2px 15px;
  margin-right: 5px;
  color: ${({ theme }: { theme: ThemeBase }) => theme.colors.text};
`;

const Delay = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #ff6666;
`;

const Info = styled.View`
  height: 30px;
  padding: 0px 15px;
  margin-bottom: 5px;
  flex-direction: row;
  align-items: center;
  opacity: 0.5;
`;

const InfoText = styled.Text`
  font-size: 14px;
  margin-left: 5px;
  color: ${({ theme }: { theme: ThemeBase }) => theme.colors.text};
`;
