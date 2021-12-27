import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { ThemeBase } from "../../themes";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(duration);
dayjs.extend(relativeTime);

export default function TrainCard({
  stations,
  dateFrom,
  dateTo,
  delay,
  changes,
}: {
  stations: string;
  dateFrom: Date;
  dateTo: Date;
  delay: number;
  changes: number;
}) {
  const scheme = useColorScheme();
  const [message, setMessage] = useState("");

  const updateMessage = () =>
    setMessage(
      dayjs
        .duration(
          dayjs(dayjs().isBefore(dateFrom) ? dateFrom : dateTo)
            .add(delay, "m")
            .diff()
        )
        .humanize(true)
    );

  useEffect(() => {
    updateMessage();
    const intervalId = setInterval(updateMessage, 1000 * 30);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Main activeOpacity={0.7}>
      <Message>{message}</Message>
      <Stations>{stations}</Stations>
      <TimeContainer>
        <Time>
          {dayjs(dateFrom).format("HH:mm")} - {dayjs(dateTo).format("HH:mm")}
        </Time>
        <Delay style={{ opacity: delay ? 1 : 0 }}>+{delay} min</Delay>
      </TimeContainer>
      <Info>
        <Ionicons
          name="ios-timer-outline"
          size={18}
          color={scheme === "light" ? "#000" : "#FFF"}
        />
        <InfoText>
          {dayjs.duration(dayjs(dateTo).diff(dateFrom)).humanize()}
        </InfoText>
        <Ionicons
          style={{ marginLeft: 20 }}
          name="ios-swap-horizontal-outline"
          size={18}
          color={scheme === "light" ? "#000" : "#FFF"}
        />
        <InfoText>{changes === 1 ? `1 change` : `${changes} changes`}</InfoText>
      </Info>
    </Main>
  );
}

const Main = styled.TouchableOpacity`
  background: ${({ theme }: { theme: ThemeBase }) => theme.colors.card};
  margin: 10px 20px;
  border-radius: 15px;
`;

const Message = styled.Text`
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
