import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components/native";
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withTiming,
//   Easing,
//   withRepeat,
//   color,
//   processColor,
//   interpolateColor,
// } from "react-native-reanimated";
import TouchableScale from "@jonny/touchable-scale";
import { ThemeBase, TraveDark, TraveLight } from "../../themes";
import { useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TrainCard from "./TrainCard";
import dayjs from "dayjs";
import { StationData } from "../SearchOptions/suggestionsData";
import { getConnections, ITrainConnection } from "../../api/train";
import { useFavorites } from "../../hooks/useFavorites";

export default function SearchResults({ route, navigation: { goBack } }: any) {
  const {
    date,
    type,
    from: stationFrom,
    to: stationTo,
  }: {
    date: Date;
    type: "BUS" | "TRAIN";
    from: StationData;
    to: StationData;
  } = route.params;
  const scheme = useColorScheme();

  const { favorites, isFavorite, addFavorite, removeFavorite } = useFavorites();

  const stations = useMemo(
    () => ({ from: stationFrom, to: stationTo, type }),
    [stationFrom, stationTo, type]
  );

  const [liked, setLiked] = useState(false);

  useEffect(() => setLiked(isFavorite(stations)), [favorites]);

  const toggleLike = () => {
    setLiked(!liked);
    isFavorite(stations) ? removeFavorite(stations) : addFavorite(stations);
  };

  // const heartColor = useSharedValue(0);

  // const toggleLike = () => {
  //   if (heartColor.value === 0) {
  //     heartColor.value = withTiming(1, {
  //       duration: 200,
  //       easing: Easing.linear,
  //     });
  //   } else {
  //     heartColor.value = withTiming(0, {
  //       duration: 200,
  //       easing: Easing.linear,
  //     });
  //   }
  // };

  // const heartStyle = useAnimatedStyle(() => {
  //   return {
  //     color: interpolateColor(
  //       heartColor.value,
  //       [0, 1],
  //       ["rgb(255, 101, 132)", "rgb(0, 0, 0)"]
  //     ),
  //   };
  // });

  const [connections, setConnections] = useState<Array<ITrainConnection>>([]);

  useEffect(() => {
    getConnections(stationFrom.id, stationTo.id, new Date(date)).then(
      setConnections
    );
  }, [route.params]);

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
            <NavBarDateDayTime>
              {dayjs(date).format("dddd HH:mm")}
            </NavBarDateDayTime>
            <NavBarDateYear>
              {dayjs(date).format("MMMM D, YYYY")}
            </NavBarDateYear>
          </NavBarDate>
          {/* <Animated.View style={heartStyle}> */}
          <NavBarBtn
            activeScale={0.9}
            transitionDuration={180}
            onPress={() => toggleLike()}
          >
            <HeartCircleBackground
              style={{
                backgroundColor: liked
                  ? "rgb(255, 255, 255)"
                  : scheme === "dark"
                  ? "rgb(255, 255, 255)"
                  : TraveLight.colors.text,
              }}
            />
            <HeartCircleIcon
              name="heart-circle"
              size={36}
              style={{
                color: liked
                  ? "rgb(255, 101, 132)"
                  : scheme === "dark"
                  ? TraveDark.colors.foreground
                  : TraveLight.colors.foreground,
              }}
            />
          </NavBarBtn>
          {/* </Animated.View> */}
        </NavBar>
      </SafeAreaView>
      <Content>
        {connections.map((item) => (
          <TrainCard
            stations={`${stationFrom.name} - ${stationTo.name}`}
            dateFrom={item.departure.date}
            dateTo={item.arrival.date}
            delay={item.arrival.delay}
            changes={item.changes}
            key={item.arrival.date.toISOString()}
          />
        ))}
        <View style={{ height: 20 }} />
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
  padding-top: 10px;
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

const NavBarBtn = styled(TouchableScale)`
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
  /* background: #fff; */
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
  opacity: 0.6;
`;

const NavBarDateYear = styled.Text`
  font-weight: 600;
  padding: 5px;
  color: ${({ theme }: { theme: ThemeBase }) => theme.colors.primary};
`;
